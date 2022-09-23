import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import addClasses from 'rehype-add-classes';
import smartypants from 'remark-smartypants'

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap(), react(), image(), tailwind()],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
    remarkPlugins: [
      smartypants,
    ],
    rehypePlugins: [
      [
        addClasses,
        {
          h1: 'text-4xl font-bold font-mplus py-1 pt-6',
          h2: 'text-2xl font-bold font-mplus py-1 pt-6',
          h3: 'text-xl font-bold font-mplus py-1 pt-6',
          h4: 'text-lg font-bold font-mplus py-1 pt-6',
          h5: 'font-bold font-mplus',
          h6: 'font-bold font-mplus',
          img: 'border border-sky-200 dark:border-gray-600 rounded-xl mb-6',
          p: '',
          a: 'underline underline-offset-2 hover:text-sky-600 decoration-sky-600 dark:hover:text-sky-400 dark:decoration-sky-400',
          hr: 'border-top border-gray-500 my-2',
          li: "flex before:content-['●'] before:pr-2 pl-1 align-middle"
        }
      ]
    ]
  }
});