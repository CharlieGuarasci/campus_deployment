import { use } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-md w-full">
      <div className="flex items-center justify-between px-6 h-16">
        
        {/* Left Side: Logo (Prevents Shrinking) */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <img 
            src="/campus.png" 
            alt="Campus Logo" 
            className="h-10 w-auto min-w-[40px] object-contain"
          />
        </div>

        {/* Right Side: Icons & Buttons */}
        <div className="flex items-center space-x-6 ml-auto"> {/* Pushes everything to the right */}
          
          {/* Navigation - Black Icons Only */}
          <nav className="flex space-x-5">
            <Link to="/" className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition h-10 w-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="black" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>

            </Link>

            <Link to="/board" className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
            </Link>

            <Link to="/messages" className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition h-10 w-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>

            </Link>

            <Link to="/profile" className="border border-gray-300 p-2 rounded-md hover:bg-gray-100 transition h-10 w-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </Link>
          </nav>

           {/* Sign In / Register Buttons */}
           <div className="flex space-x-4">
            <button 
              onClick={() => navigate("/signin")} 
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition h-10"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate("/register")} 
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition h-10"
            >
              Register
            </button>
          </div>

        </div> {/* End Right Side */}

      </div>
    </header>
  );
};

export default Header;
