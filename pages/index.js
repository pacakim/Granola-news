import Head from "next/head";
import Link from "next/link";
import { getAllPosts } from "../lib/posts";
import styles from "../styles/Home.module.css";

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Granola News</title>
        <meta name="description" content="고마워서그래의 그래놀라 뉴스" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Noto+Serif+KR:wght@300;400;500&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.siteTitle}>Granola News</h1>
          <p className={styles.siteSubtitle}>고마워서그래의 그래놀라 뉴스</p>
        </header>
        <hr className={styles.divider} />
        <section>
          <p className={styles.sectionLabel}>연재 목록</p>
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link href={`/${post.slug}`} key={post.slug} className={styles.card}>
                <div className={styles.imgWrap}>
                  {post.cover ? (
                    <img src={post.cover} alt={post.title} className={styles.coverImg} />
                  ) : (
                    <div className={styles.imgPlaceholder}><span>이미지</span></div>
                  )}
                  <div className={styles.cardOverlay}>
                    <span className={styles.vol}>Vol. {post.vol}</span>
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <span className={styles.date}>{formatDate(post.date)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
        <footer className={styles.footer}>건강한 재료로 정성껏 만든 수제 프리미엄 그래놀라와 맛과 균형을 생각한 비건 디저트를 만듭니다</footer>
      </main>
    </>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}. ${d.getMonth() + 1}.`;
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
