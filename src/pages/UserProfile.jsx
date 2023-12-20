import { useState } from "react";

export default function UserProfile() {
  // user data fetched from api :readonly
  const user = {
    id: "12921664-6ad7-447a-809e-8b08423b6bd1",
    email: "swanandkulkarni2021.comp@mmcoe.edu.in",
    firstName: "Swanand",
    lastName: "Kulkarni",
    department: "Computer Engineering",
    privilege: "Student",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    resume: "someresumelink.com",
    profilePicture: "https://i.pravatar.cc/500",
    city: "Pune",
    phoneNumber: "102030405060",
    createdAt: "2023-12-13T13:11:31.040446Z",
    updatedAt: "2023-12-13T13:11:31.040460Z",
    isVerified: true,
    is_active: false,
    is_admin: false,
    is_staff: false,
    is_superuser: false,
  };

  const people =
    [
      {
        name: "Jobin Anthony",
        department: "zoho school of business (student)",
        profilePicture: "https://i.pravatar.cc/500"
      },
      {
        name: "Jose Sweety",
        department: "Accounts Executive",
        profilePicture: "https://i.pravatar.cc/300"
      },
      {
        name: "A S Bharathi Nesar",
        department: "Artificial intelligence Enthusiastic's",
        profilePicture: "https://i.pravatar.cc/300"
      },
      {
        name: "Deepa Srinivasan",
        department: "Assistant Manager",
        profilePicture: "https://i.pravatar.cc/300"

      },
      {
        name: "Mogith P N",
        department: "SAA-C03 AWS Certified",
        profilePicture: "https://i.pravatar.cc/300"

      },
    ]

  const activity = [
    {
      id: "12921664-6ad7-447a-809e-8b08423b6bd1",
      repost: false,
      title: "How I learned Tailwind CSS",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      media: "https://i.pravatar.cc/500",
      createdAt: "2023-12-13T13:11:31.040446Z",
      updatedAt: "2023-12-13T13:11:31.040460Z",
    },
    {
      id: "12921664-6ad7-447a-809e-8b08423b6bd1",
      repost: false,
      title: "How I did not learned Tailwind CSS",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      media: "https://i.pravatar.cc/500",
      createdAt: "2023-12-13T13:11:31.040446Z",
      updatedAt: "2023-12-13T13:11:31.040460Z",
    }
  ]


  // update data state
  const [updateUser, setUpdateUser] = useState({
    id: "12921664-6ad7-447a-809e-8b08423b6bd1",
    email: "swanandkulkarni2021.comp@mmcoe.edu.in",
    firstName: "Swanand",
    lastName: "Kulkarni",
    department: "Computer Engineering",
    privilege: "Student",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    resume: "someresumelink.com",
    profilePicture: "https://i.pravatar.cc/500",
    city: "Pune",
    phoneNumber: "102030405060",
    createdAt: "2023-12-13T13:11:31.040446Z",
    updatedAt: "2023-12-13T13:11:31.040460Z",
    isVerified: true,
    is_active: false,
    is_admin: false,
    is_staff: false,
    is_superuser: false,
  });

  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setShowModal(false);
    setUser({ ...updateUser });
  };

  return (
    <>
      <div className="flex flex-row w-full bg-[#f4f2ee] justify-center">
        <div className="profile-analytics flex flex-col pl-8 w-3/4 max-w-3xl">
          <div className="profile-card flex flex-col items-center justify-center rounded-lg bg-white my-16 shadow-md drop-shadow-md h-fit py-16">
            <button className="py-4 absolute top-0 right-5" onClick={() => { setShowModal(true) }}>
              <i className="fas fa-edit text-2xl"></i>
            </button>
            <div className="profile-pic flex justify-center items-center rounded-full pb-8">
              <img src={user.profilePicture} alt="" className="w-32 h-32 rounded-full bg-gray" />
            </div>
            <div className="profile-name w-full flex flex-col pl-8">
              <h1 className="text-xl font-bold">{user.firstName} {user.lastName}</h1>
            </div>
            <div className="profile-department w-full flex flex-col pl-8">
              <p className="text-md text-left font-medium">{user.department}</p>
            </div>
            <div className="city w-full pl-8">
              <p className="text-md text-left font-medium">{user.city} - <span className="text-blue hover:cursor-pointer">Contact info</span></p>
            </div>
            <div className="profile-bio flex flex-col w-full pt-4 pl-8 justify-center">
              <p className="text-md text-left font-medium">{/* user.connections */} 120 connections</p>
            </div>
          </div>
          <div className="analytics rounded-sm flex gap-y-2 flex-col shadow-lg drop-shadow-lg bg-white pl-4 py-4">
            <p className="font-semibold text-xl">Analytics</p>

            <div className="flex flex-row pt-4">
              <i className="fas fa-user-friends text-lg pl-2"></i>
              <p className="text-md font-medium px-4">47 profile views</p>
            </div>
            <div className="flex flex-row">
              <i className="fas fa-eye text-lg pl-2"></i>
              <p className="text-md font-medium px-4">1,222 post impressions</p>
            </div>
            <div className="flex flex-row">
              <i className="fas fa-search text-lg pl-2"></i>
              <p className="text-md font-medium px-4">8 search appearances</p>
            </div>
          </div>
          <div className="w-full text-center py-2 shadow-lg drop-shadow-lg border-t-[0.1px] hover:cursor-pointer bg-white hover:bg-[#ebebebeb]">
            <p className="text-blue font-medium">Show All analytics</p>
          </div>


          <div className="About rounded-sm flex gap-y-2 mt-16 flex-col shadow-lg drop-shadow-lg bg-white pl-4 py-4">
            <p className="font-semibold text-xl">About</p>
            <p>
              {user.bio}
            </p>
          </div>

          <div className="Activity rounded-sm flex gap-y-2 mt-16 flex-col shadow-lg drop-shadow-lg bg-white pl-4 py-4">
            <p className="font-semibold text-xl">Activity</p>
            {
              activity.map((act) =>
                <div className="flex flex-col">
                  <p className="text-sm">{user.firstName + " " + user.lastName} {act.repost ? "reposted" : "posted"}</p>
                  <div className="flex flex-row">
                    <div className="w-[80px] h-[80px] rounded-sm">
                      <img
                        src={act.media}
                        alt=""
                        className="max-w-[100px] h-[80px] w-[80px] rounded-sm"
                      />
                    </div>
                    <div className="ml-5">
                      <p>
                        <span className="font-bold">{act.title}</span>
                        <p className="text-gray-400 text-[14px] font-medium">
                          {act.content}
                        </p>
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
          <div className="Experience rounded-sm flex gap-y-2 mt-16 flex-col shadow-lg drop-shadow-lg bg-white pl-4 py-4">
            <p className="font-semibold text-xl">Experience</p>
            <p>
              {user.bio}
            </p>
          </div>
        </div>
        <div className="suggestions-and-more flex flex-col w-1/2 full px-8 max-w-md">
          <div className="suggestions bg-white mt-16 drop-shadow-lg shadow-lg">
            <p className="px-8 py-5 text-lg font-bold">
              People also viewed
            </p>
            {console.log(people)}
            {
              people.map((person) =>
                <div className="flex flex-col px-8 py-4">
                  <div className="flex">
                    <div className="w-[60px] h-[60px] rounded-full">
                      <img
                        src={person.profilePicture}
                        alt=""
                        className="max-w-[60px] h-[60px] rounded-full"
                      />
                    </div>
                    <div className="ml-5">
                      <p>
                        <span className="font-bold">{person.name}</span>
                        <p className="text-gray-400 text-[14px] font-medium">
                          {person.department}
                        </p>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center pt-4 font-bold">
                    <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
                      <i className="fa-solid fa-user-plus mr-2"></i>Connect
                    </button>
                  </div>
                </div>
              )
            }
            <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
            <p className="text-center font-bold  mt-3 mb-3">
              Show All
            </p>
          </div>
        </div>



      </div >




      {
        showModal ? (
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
                      className="bg-primary  w-[5rem] h-[2rem] uppercase text-sm font-bold rounded"
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
        ) : null
      }

    </>

    // <>












    //   <main>
    //     <section>
    //       <div className="flex flex-row">
    //         <div className="flex flex-col">
    //           <div>
    //             <div className="flex">
    //               <div className=" mt-5 rounded-full h-8 w-8 bg-[#fff] flex items-center justify-center z-20">
    //                 <img
    //                   src={user.profilePicture}
    //                   alt="Profile Picture"
    //                   className="h-full w-full rounded-tl-md rounded-tr-md static z-10"
    //                 />
    //               </div>
    //             </div>
    //             <div className="w-36 h-36">
    //               <img
    //                 src="https://media.licdn.com/dms/image/D4E03AQEA660EJG0Pzg/profile-displayphoto-shrink_400_400/0/1682890800244?e=1693440000&v=beta&t=p1bREi6mD9mus5FPvj3JTZEzUnUxijO8Fgedi9-ONZU"
    //                 alt=""
    //                 className="w-[144px] h-[144px]  -mt-24 ml-3 rounded-full absolute z-20 border-4 border-white max-[1060px]:w-24 max-[1060px]:h-24 max-[1060px]:-mt-16"
    //               />
    //             </div>
    //           </div>
    //           <div className="flex justify-between">
    //             <div className="w-full">
    //               <h1 className="font-bold  text-2xl max-[990px]:text-[18px]">
    //                 {user.firstName} {user.lastName}
    //               </h1>
    //               <p className="text-gray-300 font-medium max-[990px]:text-[13px]">
    //                 {user.department}
    //               </p>
    //               <p className="text-gray-400 max-[990px]:text-[13px]">
    //                 {user.bio}
    //               </p>
    //               <p className="text-gray-400 max-[990px]:text-[13px]">
    //                 {user.city}
    //               </p>
    //               <span className="text-blue-600 font-medium max-[990px]:text-[13px] hover:cursor-pointer hover:text-gray">
    //                 Contact info
    //               </span>
    //               {/* <p className="text-blue-600 font-medium max-[990px]:text-[13px]">
    //                   13 followers .12 connction
    //                 </p> */}
    //               <div className="mt-2">
    //                 {/* <button className="bg-blue-500 rounded-l-full rounded-r-full w-20 h-8">
    //                     Open to
    //                   </button> */}

    //                 {/* <button className="text-blue-500 border-blue-500 border rounded-l-full rounded-r-full h-8 w-40 ml-1 max-[951px]:mt-2">
    //                     Edit profile section
    //                   </button> */}

    //                 {/* <button className=" border-white border rounded-l-full rounded-r-full h-8 w-16 ml-1 max-[1060px]:mt-2">
    //                     More
    //                   </button> */}
    //               </div>
    //             </div>
    //             <div className="max-[375px]:hidden hover:cursor-pointer">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //                 data-supported-dps="24x24"
    //                 fill="currentColor"
    //                 className="mercado-match mb-2 text-gray-400"
    //                 width="24"
    //                 height="24"
    //                 focusable="false"
    //               >
    //                 <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
    //               </svg>
    //               {/* <p className=" font-bold mr-3 max-[990px]:text-[13px]">
    //                   Marwari college ranchi
    //                 </p> */}
    //             </div>
    //           </div>
    //           <div className="mt-9 flex justify-around  flex-wrap mb-5 border">
    //             Filler
    //           </div>
    //         </div>
    //         <div className="col-[6_/_span_2] bg-white row-[3_/_span_2] rounded-md w-[374px] max-[1060px]:w-[300px] max-[1060px]:mt-1  max-[768px]:col-span-8 max-[768px]:row-[8_/_span_1]  max-[768px]:w-full">
    //           <p className="px-8 py-5  font-bold">
    //             People also viewed
    //           </p>
    //           <div className="flex  px-8 py-4">
    //             <div className="w-[60px] h-[60px] rounded-full">
    //               <img
    //                 src="https://media.licdn.com/dms/image/D5603AQHaWowm75pfsA/profile-displayphoto-shrink_100_100/0/1683257704964?e=1693440000&v=beta&t=vq0JI2fnN5KF3sYR9NsQMUF3Z2iHdqe_np-7emZFUIo"
    //                 alt=""
    //                 className="w-[60px] h-[60px] rounded-full"
    //               />
    //             </div>
    //             <div className="ml-5">
    //               <p>
    //                 <span className="font-bold">Jobin Anthony</span>
    //                 <span className="text-gray-400">· 2nd</span>
    //                 <p className="text-gray-400 text-[14px] font-medium">
    //                   {" "}
    //                   zoho school of business (student)
    //                 </p>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center  font-bold">
    //             <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
    //               <i className="fa-solid fa-user-plus mr-2"></i>Connect
    //             </button>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
    //           <div className="flex  px-8 py-4">
    //             <div className="w-[60px] h-[60px] rounded-full">
    //               <img
    //                 src="https://media.licdn.com/dms/image/D5603AQEFtjMvaJv_rw/profile-displayphoto-shrink_100_100/0/1675133794341?e=1693440000&v=beta&t=unWInKAys_iFbwc9mpWRgSE3tkxssRMIBYDIcFRDBN4"
    //                 alt=""
    //                 className="w-[60px] h-[60px] rounded-full"
    //               />
    //             </div>
    //             <div className="ml-5">
    //               <p>
    //                 <span className="font-bold">Jose Sweety</span>
    //                 <span className="text-gray-400">· 3rd</span>
    //                 <p className="text-gray-400 text-[14px] font-medium">
    //                   Accounts Executive
    //                 </p>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center  font-bold">
    //             <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
    //               <i className="fa-solid fa-plus mr-2"></i>Connect
    //             </button>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
    //           <div className="flex  px-8 py-4">
    //             <div className="w-[60px] h-[60px] rounded-full">
    //               <img
    //                 src="https://media.licdn.com/dms/image/D5603AQGlPijYuGttig/profile-displayphoto-shrink_100_100/0/1672194368311?e=1693440000&v=beta&t=SYQupcPTm9eB0ZKDy1e0J2aZ8dF2sLUXqDjYagqVMXM"
    //                 alt=""
    //                 className="w-[60px] h-[60px] rounded-full"
    //               />
    //             </div>
    //             <div className="ml-5">
    //               <p>
    //                 <span className="font-bold">A S Bharathi Nesar</span>
    //                 <span className="text-gray-400">· 2nd</span>
    //                 <p className="text-gray-400 text-[14px] font-medium w-40">
    //                   Artificial intelligence Enthusiastic's{" "}
    //                 </p>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center  font-bold">
    //             <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
    //               <i className="fa-solid fa-plus mr-2"></i>Connect
    //             </button>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
    //           <div className="flex  px-8 py-4">
    //             <div className="w-[60px] h-[60px] rounded-full">
    //               <img
    //                 src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcR-o6hgJ_xP_VYrdNT2so6fF7YnrifpJS3RTYnASME-qUhYf6Mz"
    //                 alt=""
    //                 className="w-[60px] h-[60px] rounded-full"
    //               />
    //             </div>
    //             <div className="ml-5">
    //               <p>
    //                 <span className="font-bold">Deepa Srinivasan</span>
    //                 <span className="text-gray-400">· 2nd</span>
    //                 <p className="text-gray-400 text-[14px] font-medium">
    //                   Assistant Manager
    //                 </p>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center  font-bold">
    //             <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
    //               <i className="fa-solid fa-user-plus mr-2"></i>Connect
    //             </button>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
    //           <div className="flex  px-8 py-4">
    //             <div className="w-[60px] h-[60px] rounded-full">
    //               <img
    //                 src="https://media.licdn.com/dms/image/C5103AQETqcuSe4Vm3Q/profile-displayphoto-shrink_100_100/0/1583250770628?e=1693440000&v=beta&t=uLLlMfr3OKjgRJW5Z82Fpz03Y3wf_N-p6L380Mnqz-8"
    //                 alt=""
    //                 className="w-[60px] h-[60px] rounded-full"
    //               />
    //             </div>
    //             <div className="ml-5">
    //               <p>
    //                 <span className="font-bold">Mogith P N</span>
    //                 <span className="text-gray-400">· 3rd</span>
    //                 <p className="text-gray-400 text-[14px] font-medium">
    //                   SAA-C03 AWS Certified
    //                 </p>
    //               </p>
    //             </div>
    //           </div>
    //           <div className="flex justify-center  font-bold">
    //             <button className="border-2 rounded-l-full rounded-r-full w-40 h-10">
    //               <i className="fa-solid fa-user-plus mr-2"></i>Connect
    //             </button>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mt-6" />
    //           <p className="text-center font-bold  mt-3 mb-3">
    //             Show All
    //           </p>
    //         </div>
    //         <div className="bg-white col-[2_/_span_4] row-[4_/_span_1] rounded-md max-[768px]:row-[3_/_span_1] max-[768px]:col-span-8 h-fit">
    //           <h2 className=" text-xl font-bold ml-5">Resourses</h2>
    //           <p className="text-gray-400 font-medium ml-5">
    //             <i className="fa-solid fa-eye mb-4"></i>Private to you
    //           </p>
    //           <div>
    //             <h2 className=" font-bold  ml-5">
    //               <i className="fa-sharp fa-solid fa-satellite-dish text-gray-400"></i>
    //               Creator mode{" "}
    //               <span className="px-[8px] bg-green-500 rounded-md text-black">
    //                 on
    //               </span>
    //             </h2>
    //             <p className="text-gray-400 font-normal text-[14px] ml-5">
    //               Get discovered, showcase content on your profile, and get
    //               access to creator tools.
    //             </p>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mb-2 mt-2" />
    //           <div>
    //             <h2 className="text-gray-400 ml-5">
    //               <i className="mr-10 fa-solid fa-user-group"></i>
    //               <span className=" font-bold -ml-9">My network</span>
    //             </h2>
    //             <p className="ml-5 font-normal text-gray-400 text-[14px]">
    //               See and manage your connections and intrests.
    //             </p>
    //           </div>
    //           <hr className="w-full  h-[1px] border-[#ffffff1f] mx-auto mb-2 mt-2" />
    //           <p className="mb-2 flex justify-center font-bold ">
    //             {" "}
    //             Show all 5 resourses
    //           </p>
    //         </div>
    //         <div className="bg-white col-[2_/_span_4] row-span-4 rounded-md max-[768px]:col-span-8 max-[768px]:row-[4_/_span_1]">
    //           <div className="flex justify-between mt-4 mx-4">
    //             <div>
    //               <h2 className=" font-bold text-xl">Activity</h2>
    //               <p className="text-blue-500 font-medium">13 followers</p>
    //             </div>
    //             <div>
    //               <div className="flex">
    //                 <button className="mr-4 text-blue-500 font-medium border border-blue-500 px-2 py-1 rounded-l-full rounded-r-full">
    //                   Create a post
    //                 </button>
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   viewBox="0 0 24 24"
    //                   data-supported-dps="24x24"
    //                   fill="currentColor"
    //                   className="mercado-match "
    //                   width="24"
    //                   height="24"
    //                   focusable="false"
    //                 >
    //                   <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
    //                 </svg>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="mt-3 mb-2 ml-5">
    //             <button className="text-black font-medium bg-green-500 px-2 py-1 rounded-l-full rounded-r-full">
    //               Posts
    //             </button>
    //             <button className=" font-medium border border-white px-2 py-1 rounded-l-full rounded-r-full ml-2">
    //               Comments
    //             </button>
    //             <button className=" font-medium border border-white px-2 py-1 rounded-l-full rounded-r-full ml-2">
    //               Articles
    //             </button>
    //           </div>
    //           <div className="mt-5 ml-5">
    //             <p className="text-gray-400 text-[13px] font-medium mb-3">
    //               Abhay Verma posted this . 1w
    //             </p>
    //             <div className="flex ">
    //               <div>
    //                 <img
    //                   src="https://media.licdn.com/dms/image/D4D12AQHxNf_kv8sh5Q/article-cover_image-shrink_180_320/0/1687594194935?e=1694044800&v=beta&t=5Lr-Di2Xak2dZ1t_p5BWYuKj7N1mPD4KYj4RqB9Zecc"
    //                   alt=""
    //                   className="h-[64px] w-[64px] object-cover rounded-md"
    //                 />
    //               </div>
    //               <div className="ml-2">
    //                 <h2 className=" font-bold">
    //                   How I learned Tailwind CSS
    //                 </h2>
    //                 <p className="text-gray-400 font-medium text-[13px]">
    //                   Abhay Verma posted this . 1w
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mb-5 mt-5" />
    //           <div className="mt-5 ml-5">
    //             <p className="text-gray-400 text-[13px] font-medium mb-3">
    //               Abhay Verma posted this . 1 mo
    //             </p>
    //             <div className="flex ">
    //               <div>
    //                 <img
    //                   src="https://media.licdn.com/dms/image/D4E12AQFj34INdJZ-Jw/article-cover_image-shrink_180_320/0/1684064760442?e=1694044800&v=beta&t=7DswzzVwn7zRlC72i6RznLIxv7AFUrVawO3r57LIsVE"
    //                   alt=""
    //                   className="h-[64px] w-[64px] object-cover rounded-md"
    //                 />
    //               </div>
    //               <div className="ml-2">
    //                 <h2 className=" font-bold">
    //                   Creating a multi page html website
    //                 </h2>
    //                 <p className="text-gray-400 font-medium text-[13px]">
    //                   Abhay Verma posted this . 1 min read
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //           <hr className="w-full  h-[1px] border-[#ffffff1f] mx-auto mb-5 mt-5" />
    //           <p className="mb-2 flex justify-center font-bold ">
    //             {" "}
    //             Show all posts
    //           </p>
    //         </div>
    //         <div className="bg-white col-[2_/_span_4] row-span-5 rounded-md max-[768px]:col-span-8 max-[768px]:row-[5_/_span_1]">
    //           <div className="flex justify-between mt-5 mx-4 mb-6">
    //             <div className=" font-bold text-xl">
    //               <h2>Skills</h2>
    //             </div>
    //             <div>
    //               <div className="flex items-center">
    //                 <button className="mr-4 text-blue-500 font-medium border border-blue-500 px-2 py-1 rounded-l-full rounded-r-full">
    //                   Take skill quiz
    //                 </button>
    //                 <i className="fa-solid fa-plus mr-4 "></i>
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   viewBox="0 0 24 24"
    //                   data-supported-dps="24x24"
    //                   fill="currentColor"
    //                   className="mercado-match "
    //                   width="24"
    //                   height="24"
    //                   focusable="false"
    //                 >
    //                   <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
    //                 </svg>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="ml-4">
    //             <div>
    //               <div>
    //                 <h2 className="font-medium text-xl  mb-2">
    //                   Html 5
    //                 </h2>
    //               </div>
    //               <div className="flex">
    //                 <img
    //                   src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT43Xzff_Z_V_02kJjxjXr70dtEKuG_kgbbrl12KUclVZyKRkZM"
    //                   alt=""
    //                   className="w-6 h-6"
    //                 />
    //                 <p className="ml-2  text-[14px]">
    //                   Marwari college ranchi
    //                 </p>
    //               </div>
    //             </div>
    //             <hr className="w-[95%]  h-[1px] border-[#ffffff1f] mx-auto mt-7 mb-7" />
    //             <div>
    //               <div>
    //                 <h2 className="font-medium text-xl  mb-2">
    //                   Cascading style sheets (CSS)
    //                 </h2>
    //               </div>
    //               <div className="flex">
    //                 <img
    //                   src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT43Xzff_Z_V_02kJjxjXr70dtEKuG_kgbbrl12KUclVZyKRkZM"
    //                   alt=""
    //                   className="w-6 h-6"
    //                 />
    //                 <p className="ml-2  text-[14px]">
    //                   Marwari college ranchi
    //                 </p>
    //               </div>
    //             </div>
    //             <hr className="w-[95%]  h-[1px] border-[#ffffff1f] mx-auto mt-7 mb-7" />
    //             <div className="mb-5">
    //               <div>
    //                 <h2 className="font-medium text-xl  mb-2">
    //                   Tailwind CSS
    //                 </h2>
    //               </div>
    //               <div className="flex">
    //                 <img
    //                   src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT43Xzff_Z_V_02kJjxjXr70dtEKuG_kgbbrl12KUclVZyKRkZM"
    //                   className="w-6 h-6"
    //                   alt=""
    //                 />
    //                 <p className="ml-2  text-[14px]">
    //                   Marwari college ranchi
    //                 </p>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="col-[6_/_span_2] row-[5_/_span_2] bg-white rounded-md w-[374px] max-[1060px]:w-[300px] max-[768px]:col-span-8 max-[768px]:row-[7_/_span_1]  max-[768px]:w-full">
    //           <div className="mt-5 ml-5 mr-14">
    //             <h2 className="">
    //               <i className="fa-brands fa-linkedin"></i>
    //               <span className="ml-2 font-semibold">LEARNING</span>
    //             </h2>
    //             <p className=" font-semibold mt-2">
    //               Add new skills with these courses, free for 24 hours
    //             </p>
    //           </div>
    //           <div className="flex mt-5 mx-6">
    //             <img
    //               src="https://media.licdn.com/dms/image/C4E0DAQGLB7B8YW2Fmg/learning-public-crop_60_100/0/1611610348863?e=1688882400&v=beta&t=LV0KRd4KwAN7SdoFNMA2Gjdc1MnriM51OSdXbuSUPeo"
    //               alt=""
    //               className="w-[100px] h-[60px]"
    //             />
    //             <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap ml-3  font-medium">
    //               Create a Quick, Clean, <br /> and Cheap Website with
    //             </p>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mb-4 mt-4" />
    //           <div className="flex mt-5 mx-6">
    //             <img
    //               src="https://media.licdn.com/dms/image/C4D0DAQHG3oWZOpVl0Q/learning-public-crop_60_100/0/1605130201130?e=1688882400&v=beta&t=H5-bDZbiXpmbC0gAXrNrh_9CfpGNvSjkGSRnrVemniw"
    //               alt=""
    //               className="w-[100px] h-[60px]"
    //             />
    //             <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap ml-3  font-medium">
    //               Creating flowcharts for <br />
    //               Beginners
    //             </p>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mb-4 mt-4" />
    //           <div className="flex mt-5 mx-6">
    //             <img
    //               src="https://media.licdn.com/dms/image/C4E0DAQGWqNJbTO18sA/learning-public-crop_60_100/0/1601574383805?e=1688882400&v=beta&t=NdikUdvynP9GIojFcKMDrY_eGWMqgZoe65e8t3-OJMY"
    //               alt=""
    //               className="w-[100px] h-[60px]"
    //             />
    //             <p className="w-40 overflow-hidden text-ellipsis whitespace-nowrap ml-3  font-medium">
    //               CSS: print style sheets
    //             </p>
    //           </div>
    //           <hr className="w-11/12  h-[1px] border-[#ffffff1f] mx-auto mb-4 mt-4" />
    //           <p className="mb-2 flex justify-center font-bold ">
    //             {" "}
    //             See my recommendations
    //           </p>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </>
  );
}
