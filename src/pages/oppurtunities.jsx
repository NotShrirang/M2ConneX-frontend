import Oppurtunity from "../components/oppurtunity";
import img from '../assets/college.png'
import Select from 'react-select'
export default function Oppurtunities() {
    // oppurtunities page
    // Features
    // 1. List of jobs
    // 2. List of internships
    // 3. List of projects
    // 4. List of scholarships
    // 5. List of competitions


    const Options = [
        { value: 'software engineer', label: 'Software Engineer' },
        { value: 'mobile developer', label: 'Mobile Developer' },
        { value: 'frontend developer', label: 'Frontend Developer' },
        { value: 'backend developer', label: 'Backend Developer' },
        { value: 'fullstack developer', label: 'Full-stack Developer' },
        { value: 'ios developer', label: 'iOS Developer' },
        { value: 'android developer', label: 'Android Developer' },
    ]


    const City = [

        { value: 'pune', label: 'Pune' },
        { value: 'banglore', label: 'Banglore' },
        { value: 'hydrebad', label: 'Hydrebad' },
    ]

    const oppurtunities = [
        {
            "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            "name": "Web developer internship",
            "description": "Be a part of the team, and work on the latest technologies",
            "payPerMonth": 0,
            "isPaid": true,
            "alumni": "b5ab5dde-42e4-46c0-9e34-886868a54ed2",
            "type": "internship",
            "companyName": "Company of a",
            "startDate": "2019-08-24",
            "endDate": "2019-12-24",
            "location": "Pune",
            "workMode": "Remote",
            "requiredSkills": "Python, Java, C++, C, HTML, CSS, JS, React, Django, Flask",
            "createdAt": "2019-08-24T14:15:22Z",
            "updatedAt": "2019-08-24T14:15:22Z",
            "alumniName": "Ayush Deshpande",
            "profilePicture": "https://avatars.githubusercontent.com/u/56189262?v=4",
            companyLogo: img,
            companyshortdescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit",
            companyNoOfEmployees: "0-20",
        },
    ]
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <p className="text-3xl font-bold pt-4 pl-4">Search for oppurtunities</p>

            {/* <div className="flex self-center w-[95%] flex-row items-center justify-center h-full p-4 bg-white rounded-lg shadow-lg drop-shadow-lg ">
                <input className="h-10 pl-4 pr-4 text-xl border rounded-lg" placeholder="Search for oppurtunities" />
                <button className="w-10 h-10 bg-[#ff3d00] text-white rounded-lg">Go</button>
            </div>
            <div className="w-[95%] self-center py-2 border mt-8 hover:cursor-pointer shadow-lg">
                <p className="w-full text-center">Filters
                    <i class="fas fa-filter pt-1 pl-2"></i>
                </p>
            </div> */}

            <div className="w-[95%] mx-auto p-4 border ">
                <div className="flex flex-col lg:flex-row my-2">
                    <div className="w-full lg:w-1/2">
                        {/* job role  */}
                        <p>Job title</p>
                        <Select
                            isMulti
                            name="colors"
                            options={Options}
                            className="basic-multi-select"
                            classNamePrefix="Add job title"
                        />
                        {/* location  */}
                    </div>
                    <div className="w-full lg:w-1/2">

                        <p>Job location</p>
                        <Select
                            isMulti
                            name="colors"
                            options={City}
                            className="basic-multi-select"
                            classNamePrefix="Add job title"
                        />
                    </div>
                </div>
                <button className="w-full p-2 border flex justify-center items-center" onClick={() => setShowModal(true)}>

                    <p>Filters</p>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
            </div>
            <Oppurtunity oppurtunities={oppurtunities} />
        </div>
    )
}

function FilterModal() {
    return (
        <>
        <div>
        <div className="w-[95%] mx-auto p-4 border ">
                <div className="flex flex-col lg:flex-row my-2">
                    <div className="w-full lg:w-1/2">
                        {/* job role  */}
                        <p>Job title</p>
                        <Select
                            isMulti
                            name="colors"
                            options={Options}
                            className="basic-multi-select"
                            classNamePrefix="Add job title"
                        />
                        {/* location  */}
                    </div>
                    <div className="w-full lg:w-1/2">

                        <p>Job location</p>
                        <Select
                            isMulti
                            name="colors"
                            options={City}
                            className="basic-multi-select"
                            classNamePrefix="Add job title"
                        />
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}