"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var client_1 = require("@notionhq/client");
var notion_to_md_1 = require("notion-to-md");
var fs = require("fs");
var yargs = require('yargs/yargs');
var helpers_1 = require("yargs/helpers");
var argv = yargs((0, helpers_1.hideBin)(process.argv)).argv;
var notionClient = new client_1.Client({ auth: argv['notion-secret'] });
var notionToMarkdown = new notion_to_md_1.NotionToMarkdown({ notionClient: notionClient });
function parseMarkdownFrontmatter(title, description, thumbnail, createdAt, lastEditedAt, tags) {
    return "---\nlayout: \"../../layouts/BlogPost.astro\"\ntitle: \"".concat(title, "\"\ndescription: \"").concat(description, "\"\nthumbnail: \"").concat(thumbnail, "\"\ncreatedAt: \"").concat(createdAt, "\"\nlastEditedAt: \"").concat(lastEditedAt, "\"\ntags: ").concat(JSON.stringify(tags), "\n---\n");
}
function parsePostTags(rawTags) {
    var result = [];
    rawTags.forEach(function (rawTag) {
        result.push(JSON.parse(JSON.stringify(rawTag)).name);
    });
    return result;
}
function fetchBlogPosts(databaseId) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Cleaning posts folder...");
                    fs.rmSync(__dirname + "/../src/pages/posts/", { recursive: true, force: true });
                    fs.mkdirSync(__dirname + "/../src/pages/posts/", { recursive: true });
                    console.log("Fetching Notion data...");
                    return [4 /*yield*/, notionClient.databases.query({
                            database_id: databaseId
                        })];
                case 1:
                    data = _a.sent();
                    data.results.forEach(function (rawPostData) { return __awaiter(_this, void 0, void 0, function () {
                        var postData, rawMarkdown, markdownString, markdownFrontmatter;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    postData = JSON.parse(JSON.stringify(rawPostData));
                                    console.log("Parsing post ".concat(postData.id, "..."));
                                    if (!postData.properties.Public.checkbox) {
                                        console.log("Post ".concat(postData.id, " is private, skipping..."));
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, notionToMarkdown.pageToMarkdown(postData.id)];
                                case 1:
                                    rawMarkdown = _a.sent();
                                    markdownString = notionToMarkdown.toMarkdownString(rawMarkdown);
                                    markdownFrontmatter = parseMarkdownFrontmatter(postData.properties.Title.title[0].plain_text, postData.properties.Description.rich_text[0].plain_text, postData.properties.Thumbnail.files[0].external.url, postData.created_time, postData.last_edited_time, parsePostTags(postData.properties.Tags.multi_select));
                                    console.log("Writting post ".concat(postData.id, "..."));
                                    fs.writeFileSync(__dirname + "/../src/pages/posts/".concat(postData.id, ".md"), markdownFrontmatter + markdownString);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
fetchBlogPosts(argv['database-id']);
