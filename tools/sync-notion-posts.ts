import { Client } from '@notionhq/client';
import { NotionToMarkdown } from "notion-to-md";
import * as fs from 'fs';
const yargs = require('yargs/yargs');
import { hideBin } from 'yargs/helpers';


const argv = yargs(hideBin(process.argv)).argv;
const notionClient = new Client(
  { auth: argv['notion-secret'] }
);
const notionToMarkdown = new NotionToMarkdown(
  { notionClient: notionClient }
);

function parseMarkdownFrontmatter(
  title: string,
  description: string,
  thumbnail: string,
  createdAt: string,
  lastEditedAt: string,
  tags: Array<string>
): string {
  return `---
layout: "../../layouts/BlogPost.astro"
title: "${title}"
description: "${description}"
thumbnail: "${thumbnail}"
createdAt: "${createdAt}"
lastEditedAt: "${lastEditedAt}"
tags: ${JSON.stringify(tags)}
---\n`
}

function parsePostTags(rawTags: Array<Object>): Array<string> {
  let result: Array<string> = [];
  rawTags.forEach((rawTag) => {
    result.push(
      JSON.parse(JSON.stringify(rawTag)).name
    );
  });
  return result;
}

async function fetchBlogPosts(databaseId: string): Promise<void> {
  console.log("Cleaning posts folder...");
  fs.rmSync(__dirname + `/../src/pages/posts/`, { recursive: true, force: true });
  fs.mkdirSync(__dirname + `/../src/pages/posts/`, { recursive: true });
  console.log("Fetching Notion data...");
  let data = await notionClient.databases.query(
    {
      database_id: databaseId
    }
  );
  data.results.forEach(async (rawPostData) => {
    let postData = JSON.parse(JSON.stringify(rawPostData));
    console.log(`Parsing post ${postData.id}...`);
    if (!postData.properties.Public.checkbox) {
      console.log(`Post ${postData.id} is private, skipping...`);
      return;
    }
    let rawMarkdown = await notionToMarkdown.pageToMarkdown(postData.id);
    let markdownString = notionToMarkdown.toMarkdownString(rawMarkdown).replace(/^  \<\/details\>$/mg, "</details>").replace(/^  $/mg, "<br/>");
    let markdownFrontmatter = parseMarkdownFrontmatter(
      postData.properties.Title.title[0].plain_text,
      postData.properties.Description.rich_text[0].plain_text,
      postData.properties.Thumbnail.files[0].external.url,
      postData.created_time,
      postData.last_edited_time,
      parsePostTags(postData.properties.Tags.multi_select)
    );
    console.log(`Writting post ${postData.id}...`);
    fs.writeFileSync(__dirname + `/../src/pages/posts/${postData.id}.md`, markdownFrontmatter + markdownString);
  });
}

fetchBlogPosts(argv['database-id']);