import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import DunkImage from '../components/utils/MovingImage.tsx'
import axios from 'axios';
import { API_BASE_URL } from '../config/config.tsx'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LandingPage = () => {
    const [formUsername, setFormUsername] = useState("");
    const [formPassword, setFormPassword] = useState("");
    const nav = useNavigate();
    sessionStorage.clear();

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 

        //Backend code here
        const loginData = {
            username:formUsername,
            password:formPassword
        }

        const responce = await axios.post(`${API_BASE_URL}/login-req`,loginData);
        if(!responce.status){
            if(responce.data.message === "No-user-found"){
                toast.error("No user with this username found!", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if(responce.data.message === "Mismatch"){
                toast.error("Incorrect password or username", {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else{
                toast.error(responce.status, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            return;
        }

        sessionStorage.setItem("username",formUsername);
        nav("/dashboard")
    };

    return(
        <div>
            <div className='w-1/2 h-screen fixed right-0 top-0 overflow-hidden'>
                <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center bg-black opacity-70" >
                </div>
                <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center">
                    <ToastContainer />
                    <form className="w-full max-w-sm p-8 bg-zinc-900 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-semibold text-center mb-6 text-white">Welcome to CourtTrack</h2>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-white mb-2">Username</label>
                            <input type="text" 
                                id="username" 
                                name="username" 
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" 
                                placeholder="Enter your username"
                                value={formUsername}
                                onChange={(e) => setFormUsername(e.target.value)} 
                                required/>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-white mb-2">Password</label>
                            <input type="password" 
                                id="password" 
                                name="password" 
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" 
                                placeholder="Enter your password" 
                                value={formPassword}
                                onChange={(e) => setFormPassword(e.target.value)} 
                                required/>
                        </div>
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Login
                        </button>
                        <div className="mt-4">
                            <Link to="/signup" className="text-white">
                                New here? Click here to Signup
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <DunkImage src='https://media.giphy.com/media/3oEjI7tZ0VjyBmptDy/giphy.gif'/>
        </div>
    )
}

export default LandingPage