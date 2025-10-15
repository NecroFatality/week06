import Layout from '../../components/layout';
import { getSortedPostsData  } from '../../lib/posts-firebase.js';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
const posts = await getSortedPostsData();

const paths = posts.map(post => ({ 

  params : { id: post.id }
}));

return {
  paths,
  fallback: true
  };
}

export async function getStaticProps({ params }) {
  // Fetch all posts from Firebase
  const posts = await getSortedPostsData();

  // Find the post that matches the ID in the URL
  const postData = posts.find(post => post.id === params.id);

  return {
    props: {
      postData: postData || null // Return null if not found
    }
  };
}
