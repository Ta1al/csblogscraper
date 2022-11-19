# CS Blog and Updates Scraper
### Usage:
```ts
import { getBlogPosts, getUpdatePosts } from "csblogscraper";

const blogPosts = await getBlogPosts();
const updatePosts = await getUpdatePosts();
```
OR
```ts
import getPosts from "csblogscraper";

const posts = await getPosts("https://blog.counter-strike.net/");
```
### Output:
```ts
interface Post {
  title: string;
  url: string;
  date: string;
  content: string;
}
```