import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout.js';
import Alert from '../../components/alert.js'

{/*import Script from 'next/script';*/}

export default function FirstPost() {    
    return (
      <Layout>
        <Head>
          <title>My First Post</title>
        </Head>
        {/*<Script
            src="https://connect.facebook.net/en_US/sdk.js"
            strategy="lazyOnload"
            onLoad={() =>
            console.log(`script loaded correctly, window.FB has been populated`)
            }
        />*/}
        <h1>First Post</h1>
        <Alert ptype='success'>
            <p>This is a success alert</p>
        </Alert>
        <Alert ptype='error'>
            <p>This is an error alert</p>
        </Alert>
        <p className="text-slate-50">This is using tailwind css</p>
        <h2>
          <Link href="/">← ⬅️ &larr;Back to home&rarr;</Link>
        </h2>
      </Layout>
    );
  }
{/* 
The Link component enables client-side navigation between two pages in the same Next.js app.

Client-side navigation means that the page transition happens using JavaScript, which is faster than 
the default navigation done by the browser.
Next.js automatically optimizes your application for the best performance by code splitting, 
client-side navigation, and prefetching (in production).

Code splitting:
Only loading the code for the page you request also means that pages become isolated. 
If a certain page throws an error, the rest of the application would still work.
Note: If you need to link to an external page outside the Next.js app, just use an <a> 
tag without Link.
Instead of optimizing images at build time, Next.js optimizes images on-demand, as users request them.
*/}