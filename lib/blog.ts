import blogData from "@/data/blog.json";
import type { BlogTypes } from "@/types/blogs.types";

const posts = blogData as BlogTypes[];

/** Every post, in editorial order. */
export function getAllPosts(): BlogTypes[] {
  return posts;
}

/** The first post is treated as the featured article. */
export function getFeaturedPost(): BlogTypes {
  return posts[0];
}

export function getPostBySlug(slug: string): BlogTypes | null {
  return posts.find((post) => post.slug === slug) ?? null;
}
