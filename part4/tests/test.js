const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')


describe('tests', () => {

     const blogs = [
    {
        title: "Myzhde Agu",
        author: "Enis Rama",
        url: "http://www.myzhdeagu.com",
        likes: 5
    },
     {
        title: "Aaaaaaaa",
        author: "Ardian Syla",
        url: "http://www.aaaaaa.com",
        likes: 5
    },
     {
        title: "Bbbbbbbb",
        author: "Enis Rama",
        url: "http://www.bbbbbbb.com",
        likes: 5
    }
   ]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

test('total likes', () => {
  
   const result = listHelper.totalLikes(blogs)
   assert.strictEqual(result, 15)
})

test('favorite blog', () => {
   
    const result = listHelper.favoriteBlog(blogs)
   assert.deepStrictEqual(result, blogs[0])
})

test('most blogs', () => {
   
    const result = listHelper.mostBlogs(blogs)
   assert.deepStrictEqual(result, {author: "Enis Rama", blogs: 2})
})

test('most likes', () => {
   
    const result = listHelper.mostLikes(blogs)
   assert.deepStrictEqual(result, {author: "Enis Rama", likes: 10})
})


})

