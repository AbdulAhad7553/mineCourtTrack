import { useNavigate } from 'react-router-dom';
import backImage from "../../assets/back-button.png"

/* 
    NavBar component: State 1
*/

const NBState1 = () => {
    const nav = useNavigate()


    const handelLogout = () => {
        sessionStorage.clear();
        nav("/");
    }

    const routeProfile = () => {

        nav("/profile");
    }  

    const routeDashboard = () => {
        nav("/dashboard");

    }

    return (
    <div className="bg-zinc-800 text-white text-lg p-4 rounded-t flex justify-between items-center">
        {/* <span>Welcome, {username}</span> */}
        
        <button className="transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={routeDashboard}>
            <img src={backImage} alt="Back" style={{ filter: 'brightness(0) invert(1)', marginRight: '8px', height: '40px' }}/>
        </button>
        <div>
        <button className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full mr-2 transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={routeProfile}>
            Profile
        </button>
        <button className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-6 rounded-full transition duration-250 ease-in-out transform hover:scale-105 hover:shadow-lg" onClick={handelLogout}>
            Logout
        </button>
        </div>
    </div>
    );
};

export default NBState1;
