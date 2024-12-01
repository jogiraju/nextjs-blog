import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);    

    // Combine the data with the id
    return {
      id,     
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
};

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]aa
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        },
      };
    });
  };

  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();
    // Combine the data with the id
    return {
      id,
      contentHtml,
      ...matterResult.data,
    };
  };
/*
export async function getSortedPostsData() {
    // Instead of the file system,
    // fetch post data from an external API endpoint
    const res = await fetch('..');
    return res.json();
  };

  import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
 You can also query the database directly:

Pre-rendering and Data Fetching
getStaticProps Details
Here is some essential information you should know about getStaticProps.

Fetch External API or Query Database
In lib/posts.js, we’ve implemented getSortedPostsData which fetches data from the file system. But you can fetch the data from other sources, like an external API endpoint, and it’ll work just fine:

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..');
  return res.json();
}
Note: Next.js polyfills fetch() on both the client and server. You don't need to import it.

You can also query the database directly:

import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
This is possible because getStaticProps only runs on the server-side.
 It will never run on the client-side. It won’t even be included in the JS bundle 
 for the browser. That means you can write code such as direct database queries 
 without them being sent to browsers.
 export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    },
  };
}

in client side rendering and fetching data
import useSWR from 'swr';

function Profile() {
  const { data, error } = useSWR('/api/user', fetch);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}
 
 */
