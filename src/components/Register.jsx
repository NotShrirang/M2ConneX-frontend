export default function Login(){
    return(
        <div className="flex flex-col">
            <div className="flex flex-row items-center justify-center pt-4">

                <div className="flex flex-col pt-5">
                    <div className="flex flex-row items-center justify-center">

                    <label htmlFor="role">Register</label>
                    <select name="role" id="role">
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                    </select>
                    </div>
                <input type="text" placeholder="Email" className="border-2 border-black" />
                <input type="password" placeholder="Password" className="border-2 border-black" />
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Login</button>
                </div>

            
            </div>
        </div>
    )
}