import fetch from "node-fetch";
import { load } from "cheerio";

const urls = {
  blog: "https://blog.counter-strike.net/",
  updates: "https://blog.counter-strike.net/index.php/category/updates/"
};

/**
 * Uses this url: "https://blog.counter-strike.net/"
 * @param index - The page index, first page (default) is 0
 * @returns {Promise<Post[]>}
 */
export async function getBlogPosts(index: number = 0) {
  let url = urls.updates;
  index && (url += `page/${index}/`);
  return getPosts(urls.blog);
}


/**
 * Uses this url: https://blog.counter-strike.net/index.php/category/updates/
 * @param index - The page index, first page (default) is 0
 * @returns {Promise<Post[]>}
 */
export async function getUpdatePosts(index: number = 0) {
  let url = urls.updates;
  index && (url += `page/${index}/`);
  return getPosts(url);
}

/**
 * 
 * @param url - The url to scrape
 * @returns {Promise<Post[]>}
 */
export default async function getPosts(url: string): Promise<Post[]> {
  const res = await fetch(url),
    data = await res.arrayBuffer(),
    buffer = Buffer.from(data),
    $ = load(buffer),
    post_container = $.root().find("#post_container"),
    posts = post_container
      .children()
      .filter(".inner_post")
      .map((_, el) => {
        const post = $(el),
          title = post.find("h2").find("a").text(),
          link = post.find("h2").find("a").attr("href")!,
          date = new Date(post.find("p").filter(".post_date").text().split(" ")[0]),
          image =
            post.find("img").length > 1
              ? post.find("img").eq(1).attr("src")!
              : post.find("img").attr("src")!,
          content = post
            .find("p")
            .slice(1)
            .toArray()
            .map(el => $(el).text())
            .join("\n\n");
        return { title, link, date, image, content };
      })
      .toArray();
  return posts;
}

export interface Post {
  title: string;
  link: string;
  date: Date;
  image: string;
  content: string;
}
