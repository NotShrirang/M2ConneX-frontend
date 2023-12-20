import React from 'react'
import { Link } from 'react-router-dom';

const Batchmates = () => {
    const years = [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027];

    return (
        <>
        <div className='flex flex-col justify-center items-center mt-8'>
            <h3 className='text-lg font-medium my-4'>Select Batch</h3>
            <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
                {years.map((year) => (
                    <Link to={`/batches/${year}`}>
                    <div  className="cursor-pointer border-[#dedede] border-[1px] rounded-lg shadow-md hover:shadow-xl text-base hover:border-primary duration-300 transition-all w-[15rem] h-[7rem] flex flex-col items-center justify-center" key={year}>
                        <div className='font-semibold '>{year} Passout</div>
                        <div className='text-sm font-semibold text-gray'>x members</div>
                    </div>
                        </Link>
                ))}
            </div>
        </div>
        </>
    );
}

export default Batchmates