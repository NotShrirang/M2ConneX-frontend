import React from 'react'
import Blogpost from '../components/Blogpost'
function Blogs() {
  return (
    <>
        <div className='w-full flex justify-center items-center'>
            <div className='w-[85%] grid grid-cols-3 gap-4 mt-8'>
                <Blogpost/>
                <Blogpost/>
                <Blogpost/>
                <Blogpost/>
                <Blogpost/>
                <Blogpost/>
            </div>
        </div>
    </>
  )
}

export default Blogs