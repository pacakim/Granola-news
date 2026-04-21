import Head from "next/head";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getAllSlugs } from "../lib/posts";
import styles from "../styles/Detail.module.css";

export default function PostDetail({ post }) {
  if (!post) return <p>글을 찾을 수 없습니다.</p>;

  return (
    <>
      <Head>
        <title>{post.title} — Granola News</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Serif+KR:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <Link href="/" className={styles.backBtn}>← 목록으로</Link>

        <article>
          <div className={styles.meta}>
            <span className={styles.vol}>Vol. {post.vol}</span>
            <h1 className={styles.title}>{post.title}</h1>
            <span className={styles.date}>{formatDate(post.date)}</span>
          </div>

          {post.cover && (
            <div className={styles.coverWrap}>
              <img src={post.cover} alt={post.title} className={styles.coverImg} />
            </div>
          )}

          <div className={styles.content}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        <footer className={styles.footer}>
          <Link href="/" className={styles.footerLink}>← 다른 글 보기</Link>
        </footer>
      </main>
    </>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}. ${d.getMonth() + 1}.`;
}

export async function getStaticPaths() {
  const slugs = getAllSlugs();
  return {
    paths: slugs.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug);
  return { props: { post } };
}
