import React from "react";

const Footer = () => { 
    return (
        <footer className="bg-white shadow-md border-t">
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-2">
                    <img src="/campus.png" alt="Campus Logo" className="h-8 w-auto" />
                    <span className="text-gray-700 text-sm">&copy; {new Date().getFullYear()} Campus. All Rights Reserved.</span>
                </div>


                <div className="flex space-x-6 mt-4 md:mt-0 text-black">
                    <a href="/about" className="text-gray-600 hover:text-gray-900 text-sm">About</a>
                    <a href="/privacy" className="text-black hover:text-gray-900 text-sm">Privacy Policy</a>
                    <a href="/contact" className="text-gray-600 hover:text-gray-900 text-sm">Contact</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;