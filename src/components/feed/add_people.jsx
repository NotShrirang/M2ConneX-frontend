import React from 'react'

const AddPeopleCard = () => {
  return (
    <>
    <div className='w-full flex justify-center items-center gap-x-2 mt-4'>
              <div className=' border-[#bc383e] border-2 flex justify-center items-center rounded-[3rem] w-[3rem] h-[3rem]'>
                <i class="fa-solid fa-user fa-2xl" style={{ color: '#bc383e' }}></i>
              </div>
              <div className="flex justify-between items-center">
                <h2 className='text-lg font-medium mr-8'>Ayush Deshpande</h2>
                <button>
                  <i class="fa-solid fa-circle-plus fa-xl" style={{ color: '#404040' }}></i>
                </button>
              </div>
            </div>
    </>
  )
}

export default AddPeopleCard