import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate, Link } from "react-router-dom";
import MovingImage from '../components/utils/MovingImage.tsx';
import axios from 'axios';
import { API_BASE_URL } from '../config/config.tsx'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [formUsername, setFormUsername] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirmPassword, setFormConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false); // State to manage password error visibility
  const [usernameError, setUsernameError] = useState(false); // State to manage username error visibility
  const nav = useNavigate();
  sessionStorage.clear();
  
  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmPassword = e.target.value;
    setFormConfirmPassword(confirmPassword);
    setPasswordError(formPassword !== confirmPassword); // Set error state based on password match
  };

  const handelUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;
    if(username.length < 8){
      setUsernameError(true);
    }
    else{
      setUsernameError(false);
    }
    setFormUsername(username);
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    // Check for password mismatch and prevent submission
    if (usernameError || passwordError) {
        return;
    }

    const signupData = {
        username: formUsername,
        password: formPassword
    };

    // Use then and catch for handling the response and errors
    axios.post(`${API_BASE_URL}/signup-req`, signupData)
        .then(response => {
            // Assuming response.status contains the status code
            if (response.status >= 200 && response.status < 300) {
                // Success case
                sessionStorage.setItem("username", formUsername);
                nav("/dashboard");
            } else {
                // Handle non-successful HTTP statuses
                throw new Error('Server responded with non-success status');
            }
        })
        .catch(error => {
            // Error handling
            console.error("Signup error:", error);
            if(error.response.data.message == "User-already-exists"){
              toast.error("An account with that username already exist. Please try a different username.", {
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
              toast.error("An error occurred. Please try again.", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
            }
        });
};


  return(
    <div>
      <div className='w-1/2 h-screen fixed right-0 top-0 overflow-hidden'>
        <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center bg-black opacity-70" />
        <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center">
          <ToastContainer />
          <form className="w-full max-w-sm p-8 bg-zinc-900 rounded-lg shadow-lg" onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold text-center mb-6 text-white">Sign up</h2>
              <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium text-white mb-2">Username</label>
                  <input type="text" 
                      id="username" 
                      name="username" 
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" 
                      placeholder="Enter your username"
                      value={formUsername}
                      onChange={handelUsernameChange} 
                      required/>
                  {usernameError && <p className="text-red-500 text-xs italic">Username must be 8 characters long</p>}
              </div>
              <div className="mb-4">
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
              <div className="mb-6">
                  <label htmlFor="confirmpassword" className="block text-sm font-medium text-white mb-2">Confirm Password</label>
                  <input type="password" 
                      id="confirmpassword" 
                      name="confirmpassword" 
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md" 
                      placeholder="Enter your password again" 
                      value={formConfirmPassword}
                      onChange={handleConfirmPasswordChange} 
                      required/>
                  {passwordError && <p className="text-red-500 text-xs italic">Passwords do not match.</p>}
              </div>
              <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Signup
              </button>
              <div className="mt-4">
                  <Link to="/" className="text-white">
                      Already have an account? Click here to Login
                  </Link>
              </div>
          </form>
        </div>
      </div>
      <MovingImage src={'https://media.giphy.com/media/Qu0rJ5z8HqUNiaLR5L/giphy.gif'}/>
    </div>
  );
}

export default Signup;
