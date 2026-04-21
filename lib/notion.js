import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

// 모든 에세이 목록 가져오기
export async function getEssays() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
    sorts: [
      {
        property: "Vol",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => ({
    id: page.id,
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? page.id,
    title: page.properties.Title?.title[0]?.plain_text ?? "제목 없음",
    vol: page.properties.Vol?.number ?? 0,
    date: page.properties.Date?.date?.start ?? "",
    cover: page.cover?.external?.url ?? page.cover?.file?.url ?? null,
  }));
}

// 특정 에세이 상세 가져오기
export async function getEssayBySlug(slug) {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  if (!response.results.length) return null;

  const page = response.results[0];
  const mdBlocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdBlocks);

  return {
    id: page.id,
    slug,
    title: page.properties.Title?.title[0]?.plain_text ?? "제목 없음",
    vol: page.properties.Vol?.number ?? 0,
    date: page.properties.Date?.date?.start ?? "",
    cover: page.cover?.external?.url ?? page.cover?.file?.url ?? null,
    content: mdString.parent,
  };
}

// 모든 슬러그 가져오기 (정적 경로 생성용)
export async function getAllSlugs() {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
  });

  return response.results.map((page) => ({
    slug: page.properties.Slug?.rich_text[0]?.plain_text ?? page.id,
  }));
}
