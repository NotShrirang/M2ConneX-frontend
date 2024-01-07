import React from 'react'

function WriteBlog() {
  return (
    <>
    <div className='w-full h-screen block lg:flex justify-center items-start bg-white py-2'>

      <div className='w-full lg:w-1/2'>
        <div>
          <input type="text" className="text-[2.2rem] w-full border-none outline-none p-4" placeholder='Title'/>
        </div>
        <div>
          <textarea name=""
                        id=""
                        cols="20"
                        rows="10"
                        className="text-[1.5rem] w-full border-none outline-none p-4"
                        placeholder="Share your story"></textarea>
        </div>
        <div>
          <button className='bg-gray hover:bg-primary transition-all duration-300 rounded text-white w-[5rem] h-[2rem]'>Publish</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default WriteBlog