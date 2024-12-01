import Layout from '../../components/layout';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';
import  utilStyles from '../../styles/utils.module.css';

import Date from '../../components/date';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths: paths,
    fallback: false,
  };
};
{/* return object = { paths: [{ params: {id: 'pre-rendering'}, fallback: false }, { params: {id: 'ssg-ssr'}, fallback: false }] } */}
export async function getStaticProps({ params }) {
  const mypostData = await getPostData(params.id);
  return {
    props: {
      mypostData,
    },
  };
};
{/* when  rout is traversed: http://localhost:3000/ssg-ssr params object { params: {id: 'ssg-ssr'} }  is passed to it*/}
{/* using destructuring params property alone is obtained */}
{/* return object = { props: { id: 'ssg-ssr', contentHtml: "html...", title: '...', date: '...'  }  }*/}
export default function Post({mypostData}) {
  return (<Layout>
   <Head>
       <title>{mypostData.title}</title>
    </Head>
    <article>
        <h1 className={`${utilStyles.headingXl} ${utilStyles.blueText}`}>{mypostData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={mypostData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: mypostData.contentHtml }} />
      </article>  
    </Layout>);
};

{/* Post get props object { props: { postData: [{ id:'pre-rendering', contentHtml: '....', title: '...', date: '...' },{ id:'ssg-ssr', contentHtml: '....', title: '...', date: '...' }] } }
and it takes postData through destructuring */}