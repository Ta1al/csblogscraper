/* eslint-disable @typescript-eslint/no-non-null-assertion */
import fetch from 'node-fetch'
import { load } from 'cheerio'

const urls = {
  blog: 'https://blog.counter-strike.net/',
  updates: 'https://blog.counter-strike.net/index.php/category/updates/'
}

/**
 * Uses this url: "https://blog.counter-strike.net/"
 * @param index - The page index, first page (default) is 0
 * @returns {Promise<Post[]>}
 */
export async function getBlogPosts (index: number = 0): Promise<Post[]> {
  let url = urls.updates
  ;(Boolean(index)) && (url += `page/${index}/`)
  return await getPosts(urls.blog)
}

/**
 * Uses this url: https://blog.counter-strike.net/index.php/category/updates/
 * @param index - The page index, first page (default) is 0
 * @returns {Promise<Post[]>}
 */
export async function getUpdatePosts (index: number = 0): Promise<Post[]> {
  let url = urls.updates
  ;(Boolean(index)) && (url += `page/${index}/`)
  return await getPosts(url)
}

/**
 *
 * @param url - The url to scrape
 * @returns {Promise<Post[]>}
 */
export default async function getPosts (url: string): Promise<Post[]> {
  const res = await fetch(url)
  const data = await res.arrayBuffer()
  const buffer = Buffer.from(data)
  const $ = load(buffer)
  const postContainer = $.root().find('#post_container')
  const posts = postContainer
    .children()
    .filter('.inner_post')
    .map((_, el) => {
      const post = $(el)
      const title = post.find('h2').find('a').text()
      const link = post.find('h2').find('a').attr('href')!
      const date = new Date(post.find('p').filter('.post_date').text().split(' ')[0])
      const image =
            post.find('img').length > 1
              ? post.find('img').eq(1).attr('src')!
              : post.find('img').attr('src')!
      const content = post
        .find('p')
        .slice(1)
        .toArray()
        .map(el => $(el).text())
        .join('\n\n')
      return { title, link, date, image, content }
    })
    .toArray()
  return posts
}

export interface Post {
  title: string
  link: string
  date: Date
  image: string
  content: string
}
