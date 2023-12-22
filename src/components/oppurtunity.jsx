

export default function Oppurtunity({ oppurtunities }) {
    
    const getDuration = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.ceil(diffDays / 30);
        return diffMonths
    }

    return (
        <>
            {
                oppurtunities.map((oppurtunity) => {
                    return (
                        <div className="flex flex-col items-center justify-center w-[95%] h-full p-4 bg-white rounded-lg shadow-lg drop-shadow-lg ">
                            <div className="company-details flex flex-row w-full">
                                <div className="company-image border w-14 h-14">
                                    <img src={oppurtunity.companyLogo} className='w-14 h-14' alt="company" />
                                </div>
                                <div className='flex flex-col pl-4'>
                                    <p className='text-xl font-bold'>{oppurtunity.companyName}</p>
                                    <p className='text-base'>{oppurtunity.companyshortdescription}</p>
                                    <p className='text-sm font-bold text-[#9e9e9e]'>{oppurtunity.companyNoOfEmployees} Employees</p>
                                </div>
                                <hr></hr>
                            </div>
                            <div className='flex flex-col pl-[70px] pt-4 w-full'>
                                <p className='text-xl font-bold'>{oppurtunity.name}</p>
                                <p className='text-sm font-bold text-[#9e9e9e]'>{oppurtunity.type}</p>
                                <p className='text-sm font-bold '>Skills Required: {oppurtunity.requiredSkills}</p>
                                <p className='text-sm font-bold '>Location: {oppurtunity.location}</p>
                                <p className='text-sm font-bold '>Work Mode: {oppurtunity.workMode}</p>
                                <p className='text-sm font-bold '>Duration: {oppurtunity.startDate} to {oppurtunity.endDate} ({getDuration(oppurtunity.startDate, oppurtunity.endDate)} months)</p>
                                <p className='text-base'>{oppurtunity.description}</p>
                            </div>
                            <div className='flex flex-row w-full justify-end'>
                                <button className='w-32 h-10 bg-[#ff3d00] text-white rounded-lg'>Apply</button>
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}