export default function Login(){
    return(
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center pt-4">

            <div className="flex flex-col pt-16 items-center justify-center w-full">
                    <div className="flex flex-row pr-4">

                        <label htmlFor="role" className={
                            "px-4 rounded-l-lg w-48 lg:w-64 font-bold"
                            }>Registration Type</label>
                        <select name="role" id="role" className="pr-4">
                            <option value="student">Student</option>
                            <option value="alumni">Alumni</option>
                        </select>
                    </div>

                <div className="inputs flex flex-col items-center justify-center pt-16 w-full">
                    <div className="flex flex-row justify-between w-[60%]">
                        <input type="text" placeholder="Name" className="border-2 border-black w-full p-1 mr-2" />
                        <input type="email" placeholder="Email" className="border-2 border-black w-full p-1 ml-2" />
                    </div>
                    <input type="text" placeholder="CPRN" className="border-2 border-black w-[60%] p-1 mt-8" />
                    <input type="password" placeholder="Password" className="border-2 border-black w-[60%] p-1 mt-8" />
                    <input type="password" placeholder="Confirm Password" className="border-2 border-black w-[60%] p-1 mt-8" />
                    <button className="bg-primary text-white px-4 py-2 rounded-lg mt-16 w-32 font-bold">Login</button>
                </div>
            </div>

            
        </div>
    </div>
    )
}