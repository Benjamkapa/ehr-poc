import profileImg from "../assets/profile.png";
import { IoIosSearch } from "react-icons/io";

const Navbar= ({ isCollapsed }) => {


    return (
        <div
            className={`fixed top-0 h-16 bg-white text-black flex items-center justify-between px-6 transition-all duration-300 ${
                isCollapsed ? "left-20 w-[calc(100%-80px)]" : "left-60 w-[calc(100%-240px)]"
            }`}
        >
            <div className="w-1/2 flex items-center space-x-1">
            <input type="text" className="border w-full p-1.5 rounded outline-none" placeholder="I am looking for.." />
                <button className="bg-primary text-white p-2 rounded">
                    <IoIosSearch size={20} />
                </button>
            </div>
            <div>
                <div className="flex items-center space-x-4">
                    <img
                        src={profileImg}
                        alt="Profile"
                        className="w-12 h-12 rounded-full "
                    />
                    <div>
                    <p className="text-sm font-semibold">Dr. Wanene</p>
                    <p className="text-sm font-semibold text-gray-600">254712345678</p>


                    </div>
                </div>
            </div>



        </div>
    );
};

export default Navbar;
