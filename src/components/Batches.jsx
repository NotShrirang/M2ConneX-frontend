import React from 'react'
import { Link } from 'react-router-dom'

const Batches = () => {
    const departments = ['Computer engineering', "Information technology", "Artificial Intelligence and Data Science", "Mechanical Engineering", "Electronics And Telecommunication Engineering", "Electrical Engineering"]
    return (
        <>
            <div>
                <div>
                    <Link to='/batches' className='relative left-[20%] top-6 border-[#dedede] px-4 py-2 rounded-sm border-[1px] shadow-md'>
                        <i class="fa fa-arrow-left" aria-hidden="true" style={{color:"gray", marginRight:"8px"}}></i>
                        Go back
                    </Link>
                    <div className="flex flex-col justify-center items-center mt-4">

                        {departments.map((department) => (
                            <div className='w-1/2 mx-4 my-6' key={department}>

                                <h2 className='text-lg font-medium my-3'>{department}</h2>
                                <div className="cursor-pointer border-[#dedede] border-[1px] rounded-lg shadow-md hover:shadow-xl text-base hover:border-primary duration-300 transition-all w-[18rem] h-[7rem] flex flex-col items-center justify-center" key={department}>
                                    <div className="font-medium ">Under Gradute</div>
                                    <div className="text-sm font-semibold text-gray">x members</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Batches