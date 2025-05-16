import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CourtTrack from '../assets/CourtTrack.svg';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePage, setActivePage] = useState(location.pathname);

    const handleSetActivePage = (pagePath: string) => {
      setActivePage(pagePath);
    };
    const handleEditTeams = () => {
        navigate('/edit-teams');
    };
    
    const handleViewPlayerStats = () =>{
        navigate('/view-player-stats');
    };
    
    const handleMatchHistory = () => {
        navigate('/get-match-history');
    };
    const handleLeaderboards = () => {
        navigate('/leaderboard');
    };
    
    const handleDashboard = () => {
        navigate('/dashboard');
    };
    
    const handleLogout = () => {
      navigate('/login');
    };

    // Function to determine if a page is active
    const isActivePage = (path: string) => {
      return activePage === path;
    };

    // Common button classes
    const baseButtonClasses = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full";
    const activeButtonClasses = "flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-gray-100 dark:bg-gray-700 group w-full";

  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <img src={CourtTrack} alt="CourtTrack" className="w-full h-auto" />

        <ul className="space-y-2 font-medium">
            <li>
              <button 
                onClick={() => { handleDashboard(); handleSetActivePage('/dashboard'); }}
                className={isActivePage('/dashboard') ? activeButtonClasses : baseButtonClasses}
              >
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.1121 1H3.88806C3.12219 1.00079 2.38792 1.30546 1.84646 1.84711C1.305 2.38876 1.00059 3.12313 1.00006 3.889V10.111C1.00059 10.8769 1.305 11.6112 1.84646 12.1529C2.38792 12.6945 3.12219 12.9992 3.88806 13H10.1121C10.8779 12.9992 11.6122 12.6945 12.1537 12.1529C12.6951 11.6112 12.9995 10.8769 13.0001 10.111V3.889C12.9995 3.12313 12.6951 2.38876 12.1537 1.84711C11.6122 1.30546 10.8779 1.00079 10.1121 1ZM11.0001 10.111C11.0001 10.3466 10.9065 10.5726 10.74 10.7393C10.5735 10.906 10.3477 10.9997 10.1121 11H3.88806C3.65246 10.9997 3.42659 10.906 3.26009 10.7393C3.09359 10.5726 3.00006 10.3466 3.00006 10.111V3.889C3.00006 3.6534 3.09359 3.42743 3.26009 3.26074C3.42659 3.09404 3.65246 3.00027 3.88806 3H10.1121C10.3477 3.00027 10.5735 3.09404 10.74 3.26074C10.9065 3.42743 11.0001 3.6534 11.0001 3.889V10.111Z" fill="white"/>
                  <path d="M24.112 1H17.888C17.1221 1.00079 16.3879 1.30546 15.8464 1.84711C15.3049 2.38876 15.0005 3.12313 15 3.889V10.111C15.0005 10.8769 15.3049 11.6112 15.8464 12.1529C16.3879 12.6945 17.1221 12.9992 17.888 13H24.112C24.8779 12.9992 25.6121 12.6945 26.1536 12.1529C26.6951 11.6112 26.9995 10.8769 27 10.111V3.889C26.9995 3.12313 26.6951 2.38876 26.1536 1.84711C25.6121 1.30546 24.8779 1.00079 24.112 1ZM25 10.111C25 10.3466 24.9065 10.5726 24.74 10.7393C24.5735 10.906 24.3476 10.9997 24.112 11H17.888C17.6524 10.9997 17.4265 10.906 17.26 10.7393C17.0935 10.5726 17 10.3466 17 10.111V3.889C17 3.6534 17.0935 3.42743 17.26 3.26074C17.4265 3.09404 17.6524 3.00027 17.888 3H24.112C24.3476 3.00027 24.5735 3.09404 24.74 3.26074C24.9065 3.42743 25 3.6534 25 3.889V10.111Z" fill="white"/>
                  <path d="M24.112 15H17.888C17.1221 15.0008 16.3879 15.3055 15.8464 15.8471C15.3049 16.3888 15.0005 17.1231 15 17.889V24.111C15.0005 24.8769 15.3049 25.6112 15.8464 26.1529C16.3879 26.6945 17.1221 26.9992 17.888 27H24.112C24.8779 26.9992 25.6121 26.6945 26.1536 26.1529C26.6951 25.6112 26.9995 24.8769 27 24.111V17.889C26.9995 17.1231 26.6951 16.3888 26.1536 15.8471C25.6121 15.3055 24.8779 15.0008 24.112 15ZM25 24.111C25 24.3466 24.9065 24.5726 24.74 24.7393C24.5735 24.906 24.3476 24.9997 24.112 25H17.888C17.6524 24.9997 17.4265 24.906 17.26 24.7393C17.0935 24.5726 17 24.3466 17 24.111V17.889C17 17.6534 17.0935 17.4274 17.26 17.2607C17.4265 17.094 17.6524 17.0003 17.888 17H24.112C24.3476 17.0003 24.5735 17.094 24.74 17.2607C24.9065 17.4274 25 17.6534 25 17.889V24.111Z" fill="white"/>
                  <path d="M10.1121 15H3.88806C3.12219 15.0008 2.38792 15.3055 1.84646 15.8471C1.305 16.3888 1.00059 17.1231 1.00006 17.889V24.111C1.00059 24.8769 1.305 25.6112 1.84646 26.1529C2.38792 26.6945 3.12219 26.9992 3.88806 27H10.1121C10.8779 26.9992 11.6122 26.6945 12.1537 26.1529C12.6951 25.6112 12.9995 24.8769 13.0001 24.111V17.889C12.9995 17.1231 12.6951 16.3888 12.1537 15.8471C11.6122 15.3055 10.8779 15.0008 10.1121 15ZM11.0001 24.111C11.0001 24.3466 10.9065 24.5726 10.74 24.7393C10.5735 24.906 10.3477 24.9997 10.1121 25H3.88806C3.65246 24.9997 3.42659 24.906 3.26009 24.7393C3.09359 24.5726 3.00006 24.3466 3.00006 24.111V17.889C3.00006 17.6534 3.09359 17.4274 3.26009 17.2607C3.42659 17.094 3.65246 17.0003 3.88806 17H10.1121C10.3477 17.0003 10.5735 17.094 10.74 17.2607C10.9065 17.4274 11.0001 17.6534 11.0001 17.889V24.111Z" fill="white"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Dashboard</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => { handleEditTeams(); handleSetActivePage('/edit-teams'); }}
                className={isActivePage('/edit-teams') ? activeButtonClasses : baseButtonClasses}
              >
                <svg className='flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3834 0L0 3.51438V11.901C0 11.901 0.551964 15.1844 1.43771 17.0927C2.57236 19.5372 3.83388 21.0863 5.59106 22.6038C7.58217 24.3234 10.3834 25 10.3834 25V0ZM10.3834 0L20.7668 3.51438V11.901C20.7668 11.901 20.7668 13.9776 19.3291 17.0927C18.5713 18.4695 16.9329 21.0863 15.1757 22.6038C13.1846 24.3234 10.3834 25 10.3834 25V0ZM18.7963 5.22563L10.4365 2.39617V22.524C10.4365 22.524 12.6918 21.9792 14.2948 20.5948C15.7096 19.373 17.0287 17.2662 17.6387 16.1577C18.7963 13.6497 18.7963 11.9778 18.7963 11.9778V5.22563Z" fill="white"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Manage Teams</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => { handleMatchHistory(); handleSetActivePage('/get-match-history'); }}
                className={isActivePage('/get-match-history') ? activeButtonClasses : baseButtonClasses}
              >
                <svg width="23" height="23" viewBox="0 0 33 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.7157 9.29012L32 6.45679V1H13.3798C13.3798 1 8.94393 1.36728 6.82917 5.45988C6.19973 6.67802 5.67719 7.98722 5.64285 9.29012M22.7157 9.29012C22.7157 9.29012 22.3086 12.365 21.323 14.0123C19.721 16.69 17.2998 18 14.2566 18C11.1109 18 9.02619 17.1028 7.29339 14.4321C6.30284 12.9054 5.59503 11.1038 5.64285 9.29012M22.7157 9.29012V6.66667M5.64285 9.29012C5.73511 10.7135 4.86915 11.966 3.4765 11.966C1.98537 11.966 1.03115 11.0165 1.00069 9.5C0.972746 8.10905 1.79937 7.03395 3.16703 7.03395C4.5081 7.03395 5.23021 7.76852 5.64285 9.29012ZM13.9987 5.82716C16.0494 5.75722 17.8171 7.41279 17.8156 9.5C17.8142 11.514 16.2353 13.102 14.2566 13.1728C12.1499 13.2482 10.3177 11.4309 10.4397 9.29012C10.5511 7.33691 12.0765 5.89272 13.9987 5.82716Z" stroke="white" strokeWidth="2"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">View Matches</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => { handleViewPlayerStats(); handleSetActivePage('/view-player-stats'); }}
                className={isActivePage('/view-player-stats') ? activeButtonClasses : baseButtonClasses}
              >
                <svg width="20" height="20" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.5417 10.875L16.6642 16.6912C16.2383 17.3301 15.2811 17.2705 14.9377 16.5837L14.0623 14.8329C13.7189 14.1462 12.7618 14.0866 12.3358 14.7254L8.45835 20.5417" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="3.625" y="3.625" width="23.75" height="23.75" rx="2" stroke="white" strokeWidth="3"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Player Stats</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => { handleLeaderboards(); handleSetActivePage('/leaderboard'); }}
                className={isActivePage('/leaderboard') ? activeButtonClasses : baseButtonClasses}
              >
                <svg width="20" height="20" viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="6.66666" width="5.66666" height="16.3333" rx="2.83333" stroke="white" strokeWidth="2"/>
                  <rect x="7.66669" y="1" width="5.66666" height="22" rx="2.83333" stroke="white" strokeWidth="2"/>
                  <rect x="14.3334" y="11" width="5.66666" height="12" rx="2.83333" stroke="white" strokeWidth="2"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Leaderboards</span>
              </button>
            </li>

            <li>
              <button 
                onClick={() => { handleLogout(); handleSetActivePage('/login'); }}
                className="mt-32 flex items-center p-2 text-gray-900 bg-red-500 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-red-300 group w-full"
              >
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.45751 8.45754C6.96575 9.9493 5.94985 11.8499 5.53827 13.919C5.12669 15.9882 5.33793 18.1329 6.14526 20.082C6.9526 22.031 8.31977 23.697 10.0739 24.869C11.828 26.0411 13.8903 26.6667 16 26.6667C18.1096 26.6667 20.1719 26.0411 21.9261 24.869C23.6802 23.697 25.0474 22.031 25.8547 20.082C26.662 18.1329 26.8733 15.9882 26.4617 13.919C26.0501 11.8499 25.0342 9.9493 23.5425 8.45754" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M16 13V4" stroke="white" strokeWidth="4" strokeLinecap="round"/>
                </svg>
                <span className="ms-3 flex-1 whitespace-nowrap">Logout</span>
              </button>
            </li>
        </ul>
      </div>
      
    </aside>
  );
};

export default Sidebar;