const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    let sum = 0
    for(let i = 0 ; i < blogs.length ; i++){
        sum += blogs[i].likes
    }
    return sum
}

const favoriteBlog = (blogs) => {
    let max = blogs[0]
    for (let i = 0; i < blogs.length; i++){
        if(blogs[i].likes > max.likes){
            max = blogs[i]
        }
    }
    return max
}

const mostBlogs = (blogs) => {
    const blogsMap = new Map() 
    for (let i = 0; i< blogs.length; i++){
        if(!blogsMap.has(blogs[i].author)){
            blogsMap.set(blogs[i].author, 1)
        } else {
            const numOfBlogsOfAuthor = blogsMap.get(blogs[i].author)
             blogsMap.set(blogs[i].author, numOfBlogsOfAuthor + 1)
        }
    } 

     let maxAuthor = '';
     let maxBlogs = 0;

    blogsMap.forEach((value, key) => {
        if(value > maxBlogs){
            maxBlogs = value
            maxAuthor = key
        }
    })
    return {author: maxAuthor, blogs: maxBlogs}
}

const mostLikes = (blogs) => {
    const likesMap = new Map() 
    for (let i = 0; i< blogs.length; i++){
        if(!likesMap.has(blogs[i].author)){
            likesMap.set(blogs[i].author, blogs[i].likes)
        } else {
            const numOfLikesOfAuthor = likesMap.get(blogs[i].author)
             likesMap.set(blogs[i].author, numOfLikesOfAuthor + blogs[i].likes)
        }
    } 
    let maxAuthor = '';
     let maxLikes = 0;
     likesMap.forEach((value, key) => {
        if(value > maxLikes){
            maxLikes = value
            maxAuthor = key
        }
    })
    return {author: maxAuthor, likes: maxLikes}
}


module.exports = {
  dummy,
  totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}