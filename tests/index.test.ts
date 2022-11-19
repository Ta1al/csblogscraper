import { getBlogPosts, getUpdatePosts } from '../src/index'

describe('getBlogPosts', () => {
  it('should return an array of posts', async () => {
    const posts = await getBlogPosts()
    expect(posts).toBeInstanceOf(Array)
  })
})

describe('getUpdatePosts', () => {
  it('should return an array of posts', async () => {
    const posts = await getUpdatePosts()
    expect(posts).toBeInstanceOf(Array)
  })
})
