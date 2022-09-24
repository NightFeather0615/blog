import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import image from "@astrojs/image";
import tailwind from "@astrojs/tailwind";
import addClasses from 'rehype-add-classes';
import smartypants from 'remark-smartypants'

// https://astro.build/config
export default defineConfig({
  site: 'https://NightFeather0615.github.io',
  base: '/blog',
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
          img: 'border border-sky-200 dark:border-gray-600 rounded-xl mb-6',
          a: 'underline underline-offset-2 hover:text-sky-500 decoration-sky-500 dark:hover:text-sky-400 dark:decoration-sky-400 transition-colors duration-50',
          hr: 'border-top border-gray-500 my-2',
          ul: 'list-disc list-inside',
          ol: 'list-decimal list-inside'
        }
      ]
    ]
  }
});