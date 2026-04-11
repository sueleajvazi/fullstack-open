const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try{
    if(!request.body.title || !request.body.url){
      return response.status(400).json({error: 'title and url are required'})
    }

  const user = request.user

    const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    user: user._id
  })

  const savedBlog = await blog.save()
   user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
} catch (error) {
  next(error)
}
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
 const id = request.params.id;
 try{
  
  const user = request.user

  const blogFound =  await Blog.findById(id).populate('user', { username: 1, name: 1 })
  if(blogFound.user.username !== user.username){
   return response.status(401).json({error: "Cannot delete blog of other user"})
  }


 await Blog.findByIdAndDelete(id);
 response.status(204).end();
 } catch (error) {
  next(error);
 }

})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id;

  try{
    const updatedBlog = await Blog.findByIdAndUpdate(id, request.body);
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});



module.exports = blogsRouter