import { useState } from "react";



export default function UserProfile() {
    // user data fetched from api :readonly
    const user = {
        "id": "12921664-6ad7-447a-809e-8b08423b6bd1",
        "email": "swanandkulkarni2021.comp@mmcoe.edu.in",
        "firstName": "Swanand",
        "lastName": "Kulkarni",
        "department": "Computer Engineering",
        "privilege": "Student",
        "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "resume": "someresumelink.com",
        "profilePicture": "https://i.pravatar.cc/500",
        "city": "Pune",
        "phoneNumber": "102030405060",
        "createdAt": "2023-12-13T13:11:31.040446Z",
        "updatedAt": "2023-12-13T13:11:31.040460Z",
        "isVerified": true,
        "is_active": false,
        "is_admin": false,
        "is_staff": false,
        "is_superuser": false
    }


    // update data state
    const [updateUser, setUpdateUser] = useState({
        "id": "12921664-6ad7-447a-809e-8b08423b6bd1",
        "email": "swanandkulkarni2021.comp@mmcoe.edu.in",
        "firstName": "Swanand",
        "lastName": "Kulkarni",
        "department": "Computer Engineering",
        "privilege": "Student",
        "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
        "resume": "someresumelink.com",
        "profilePicture": "https://i.pravatar.cc/500",
        "city": "Pune",
        "phoneNumber": "102030405060",
        "createdAt": "2023-12-13T13:11:31.040446Z",
        "updatedAt": "2023-12-13T13:11:31.040460Z",
        "isVerified": true,
        "is_active": false,
        "is_admin": false,
        "is_staff": false,
        "is_superuser": false
    })

    const [showModal, setShowModal] = useState(false);

    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
        setShowModal(false);
        setUser({ ...updateUser });
    }

    return (
        <>
            <div className="flex flex-col w-full items-center bg-[#f4f2ee]">
                <div className="w-[80%] profile-card flex flex-col items-center justify-center rounded-lg bg-white py-16 my-16 shadow-md drop-shadow-md">
                    <button className="py-4 absolute top-0 right-5" onClick={() => { setShowModal(true) }}>
                        <i className="fas fa-edit text-2xl"></i>
                    </button>
                    <div className="profile-pic flex justify-center items-center rounded-full pb-8">
                        <img src={user.profilePicture} alt="" className="w-32 h-32 rounded-full bg-gray" />
                    </div>
                    <div className="profile-name flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                        <h2 className="text-lg font-medium">{user.email}</h2>
                    </div>
                    <div className="profile-bio flex flex-col items-center w-[75%] pt-4 justify-center">
                        <p className="text-lg font-medium text-center">{user.bio}</p>
                    </div>
                </div>
            </div>

            {showModal ? (
                <>
                    <div
                        className="fixed inset-0 bg-black opacity-60 z-40"
                        onClick={() => setShowModal(false)}
                    ></div>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-1/2">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h3 className="text-2xl font=semibold">Update Data</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => {
                                            setShowModal(false)
                                            setUpdateUser({ ...user })
                                        }}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                            <i className="fa-solid fa-xmark"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="">
                                    <form className="rounded w-full" onSubmit={handleSubmit}>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="firstName" className="text-sm">First Name</label>
                                            <input type="text" name="firstName" id="firstName" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.firstName} onChange={(e) => { setUpdateUser({ ...updateUser, firstName: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="lastName" className="text-sm">Last Name</label>
                                            <input type="text" name="lastName" id="lastName" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.lastName} onChange={(e) => { setUpdateUser({ ...updateUser, lastName: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="email" className="text-sm">Email</label>
                                            <input type="email" name="email" id="email" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.email} onChange={(e) => { setUpdateUser({ ...updateUser, email: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="department" className="text-sm">Department</label>
                                            <input type="text" name="department" id="department" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.department} onChange={(e) => { setUpdateUser({ ...updateUser, department: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="bio" className="text-sm">Bio</label>
                                            <input type="text" name="bio" id="bio" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.bio} onChange={(e) => { setUpdateUser({ ...updateUser, bio: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="resume" className="text-sm">Resume</label>
                                            <input type="text" name="resume" id="resume" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.resume} onChange={(e) => { setUpdateUser({ ...updateUser, resume: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="profilePicture" className="text-sm">Profile Picture</label>
                                            <input type="text" name="profilePicture" id="profilePicture" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.profilePicture} onChange={(e) => { setUpdateUser({ ...updateUser, profilePicture: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between pt-4 px-4">
                                            <label htmlFor="city" className="text-sm">City</label>
                                            <input type="text" name="city" id="city" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.city} onChange={(e) => { setUpdateUser({ ...updateUser, city: e.target.value }) }} />
                                        </div>
                                        <div className="flex flex-col justify-between p-4">
                                            <label htmlFor="phoneNumber" className="text-sm">Phone Number</label>
                                            <input type="text" name="phoneNumber" id="phoneNumber" className="border-2 border-gray-300 rounded-md p-2" value={updateUser.phoneNumber} onChange={(e) => { setUpdateUser({ ...updateUser, phoneNumber: e.target.value }) }} />
                                        </div>

                                    </form>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <p className="text-red font-bold self-start">{error}</p>
                                    <button
                                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setUpdateUser({ ...user })
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-primary text-white w-[5rem] h-[2rem] uppercase text-sm font-bold rounded"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}

        </>
    )
}