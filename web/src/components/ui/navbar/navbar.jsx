import { useState } from "react";
import icon from "../../../assets/images/icono2.png";
import { Link, NavLink } from "react-router-dom";


function Navbar({ onDarkMode, darkMode }) {

  const [showOptions, setShowOptions] = useState(false);

  const handleShowOptions = () => {
    setShowOptions(prev => !prev);
  }

  return (

      <nav className="dark:bg-teal-950 container px-2 lg:max-w-[1114px] flex flex-wrap items-center justify-between mx-auto py-4 ">
        <Link to="/">
          <img src={icon} alt="icon" className="h-20 ms-2 lg:h-24 xl:h-28"/>
        </Link>
        
        <div className="md:order-2">
          <ul className="hidden md:flex md:space-x-8 items-center">
            <li>
              <button  onClick={onDarkMode} className="bg-slate-300 dark:bg-slate-700 p-1 rounded-md">
              { darkMode
                ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-black dark:text-white transition-colors duration-300 cursor-pointer" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M277.3 32h-42.7v64h42.7V32zm129.1 43.7L368 114.1l29.9 29.9 38.4-38.4-29.9-29.9zm-300.8 0l-29.9 29.9 38.4 38.4 29.9-29.9-38.4-38.4zM256 128c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128zm224 106.7h-64v42.7h64v-42.7zm-384 0H32v42.7h64v-42.7zM397.9 368L368 397.9l38.4 38.4 29.9-29.9-38.4-38.4zm-283.8 0l-38.4 38.4 29.9 29.9 38.4-38.4-29.9-29.9zm163.2 48h-42.7v64h42.7v-64z"></path></svg>
                : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-black dark:text-white transition-colors duration-300 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path></svg>
              }
              </button>
            </li>
          </ul>
          <div className="flex items-center">
            <button onClick={onDarkMode} className="bg-slate-300 dark:bg-slate-700 p-1 rounded-md md:hidden" title="Switcher button">
              { darkMode
                ? <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-black dark:text-white transition-colors duration-300 cursor-pointer" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M277.3 32h-42.7v64h42.7V32zm129.1 43.7L368 114.1l29.9 29.9 38.4-38.4-29.9-29.9zm-300.8 0l-29.9 29.9 38.4 38.4 29.9-29.9-38.4-38.4zM256 128c-70.4 0-128 57.6-128 128s57.6 128 128 128 128-57.6 128-128-57.6-128-128-128zm224 106.7h-64v42.7h64v-42.7zm-384 0H32v42.7h64v-42.7zM397.9 368L368 397.9l38.4 38.4 29.9-29.9-38.4-38.4zm-283.8 0l-38.4 38.4 29.9 29.9 38.4-38.4-29.9-29.9zm163.2 48h-42.7v64h42.7v-64z"></path></svg>
                : <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-black dark:text-white transition-colors duration-300 cursor-pointer" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M195 125c0-26.3 5.3-51.3 14.9-74.1C118.7 73 51 155.1 51 253c0 114.8 93.2 208 208 208 97.9 0 180-67.7 202.1-158.9-22.8 9.6-47.9 14.9-74.1 14.9-106 0-192-86-192-192z"></path></svg>
              }
            </button>
            <button className="p-2 text-sm text-black dark:text-white rounded-lg md:hidden" onClick={handleShowOptions}>
             { 
                showOptions
                ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path></svg>
              }
            </button>
          </div>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all duration-500 ${showOptions ? '' : 'hidden'}`}>
          <ul className="flex flex-col gap-6 p-4 md:p-0 mt-4 font-medium  md:flex-row  md:mt-0 md:border-0" onClick={handleShowOptions}>
            <li className="text-center"><NavLink to="/movies" className="relative overflow-hidden z-10 p-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:backdrop-blur-lg before:rounded-lg rounded-xl before:-z-10 before:transition-all before:duration-500 before:hover:w-full transition-all duration-300 dark:text-emerald-400 hover:text-white dark:text-dark-200 dark:hover:text-white font-bold">Movies</NavLink></li>
            <li className="text-center"><NavLink to="/cinemas" className="relative overflow-hidden z-10 p-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-white before:backdrop-blur-lg before:rounded-lg rounded-xl before:-z-10 before:transition-all before:duration-500 before:hover:w-full transition-all duration-300 dark:text-emerald-400 hover:text-white dark:text-dark-200 dark:hover:text-white font-bold">Cinemas</NavLink></li>
          </ul>
        </div>
      </nav>
  );

}

export default Navbar;
