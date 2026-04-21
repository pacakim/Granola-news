import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "posts");

export function getAllPosts() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(postsDir, filename), "utf-8");
    const { data } = matter(raw);
    return {
      slug,
      vol: data.vol ?? 0,
      title: data.title ?? "제목 없음",
      date: data.date ?? "",
      cover: data.cover ?? null,
    };
  });

  return posts.sort((a, b) => b.vol - a.vol);
}

export function getPostBySlug(slug) {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    vol: data.vol ?? 0,
    title: data.title ?? "제목 없음",
    date: data.date ?? "",
    cover: data.cover ?? null,
    content,
  };
}

export function getAllSlugs() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}
