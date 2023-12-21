import React from 'react'
import BlogPost from '../components/Blogpost'


import img from '../assets/college.png'


const blogs = [
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  },
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  },
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  },
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  },
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  },
  {
    img: img,
    title: "How To Build And Publish A Custom React Component Library",
    author: "Ayush Deshpande",
    date: "12/12/2021",
    category: "React",
  }
]

function Blogs() {
  return (
    <>
      <div className='w-full flex justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          {
            blogs.map((blog) => (
              <BlogPost img={blog.img} title={blog.title} author={blog.author} date={blog.date} category={blog.category} />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Blogs