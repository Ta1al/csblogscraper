import { getBlogPosts, getUpdatePosts } from '../src/index'

describe('getBlogPosts', () => {
  it('should return an array of posts', async () => {
    const posts = await getBlogPosts()
    expect(posts).toBeInstanceOf(Array)
  })

  it('should return an array of posts', async () => {
    const posts = await getBlogPosts(4)
    expect(posts).toBeInstanceOf(Array)
  })

  it('should throw an error', async () => {
    await expect(getBlogPosts(1000)).rejects.toThrow()
  })
})

describe('getUpdatePosts', () => {
  it('should return an array of posts', async () => {
    const posts = await getUpdatePosts()
    expect(posts).toBeInstanceOf(Array)
  })

  it('should return an array of posts', async () => {
    const posts = await getUpdatePosts(4)
    expect(posts).toBeInstanceOf(Array)
  })

  it('should throw an error', async () => {
    await expect(getUpdatePosts(1000)).rejects.toThrow()
  })
})
