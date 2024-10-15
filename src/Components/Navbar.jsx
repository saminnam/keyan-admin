import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/keyan-white.png";
import { TbLogs } from "react-icons/tb";
import { IoIosCloseCircleOutline } from "react-icons/io"; // Import close icon
import profile from "../assets/profile-icon.webp";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { LiaBlogSolid } from "react-icons/lia";
import { FaRegFileCode } from "react-icons/fa";
import { PiListStarDuotone } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { RiTeamLine } from "react-icons/ri";
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineFolderRemove } from "react-icons/hi";

const Navbar = ({ active, setActive }) => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [profileImage, setProfileImage] = useState(profile);

  function handleRemoveProfile() {
    setProfileImage(profile); // Reset the profile
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set the profile image to the loaded file
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLinkClick = (link) => {
    setActive(link);
    setIsMobileView(false); // Close mobile menu
  };

  return (
    <nav>
      {/* Desktop and Tablet View */}
      <aside className="h-auto py-8 px-12 lg:w-[280px] bg-[#2986FE] hidden lg:block sticky top-0 left-0 z-50">
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div className="mt-8 flex flex-wrap flex-col gap-3 items-center">
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="rounded-full w-24"
            />
          </div>
          {/* Profile Image Upload Input */}
          <div className="flex gap-10 text-white">
            <label htmlFor="file-upload" className="mt-2 cursor-pointer ">
              <MdOutlineDriveFolderUpload className="text-3xl mt-1" />
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <button onClick={handleRemoveProfile} className="mt-2">
              <HiOutlineFolderRemove className="text-3xl mt-1" />
            </button>
          </div>
        </div>
        <ul className="mt-4 text-white">
          {[
            { name: "HOME", icon: <IoHomeOutline />, link: "Home" },
            { name: "SERVICES", icon: <MdOutlineMiscellaneousServices />, link: "Services" },
            { name: "BLOGS", icon: <LiaBlogSolid />, link: "Blogs" },
            { name: "PORTFOLIOS", icon: <FaRegFileCode />, link: "Portfolios" },
            { name: "TESTIMONIALS", icon: <PiListStarDuotone />, link: "Testimonials" },
            { name: "TEAM", icon: <RiTeamLine />, link: "Team" },
            { name: "CONTACT", icon: <IoIosContact />, link: "Contact" },
          ].map((item) => (
            <li key={item.name} className="py-3 group">
              <Link to="/" onClick={() => handleLinkClick(item.link)}>
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[#2986FE] flex mx-auto gap-2 group mt-14 p-2 justify-center bg-white rounded-lg">
          <CgLogOut className="text-2xl mt-1 transition-transform duration-200 transform group-hover:-translate-x-2" />
          <button className="text-lg font-semibold">LOGOUT</button>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        className="absolute right-4 top-4 lg:hidden"
        onClick={() => {
          setIsMobileView(!isMobileView);
        }}
        aria-label="Toggle mobile menu"
      >
        {isMobileView ? (
          <IoIosCloseCircleOutline className="text-[#2986FE] text-4xl" />
        ) : (
          <TbLogs className="text-[#2986FE] text-4xl" />
        )}
      </button>

      {/* Mobile Menu - visible when `isMobileView` is true */}
      <aside
        className={`lg:hidden h-screen w-80 bg-[#2986FE] px-10 text-white fixed top-0 left-0 z-20 transform transition-transform duration-500 ease-in-out ${
          isMobileView ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex py-8">
          <img src={logo} alt="" className="w-52" />
        </div>
        <div className="py-2 gap-4 mb-10 flex flex-wrap justify-center items-center">
          <div>
            <img
              src={profileImage}
              alt="Profile"
              className="w-20 rounded-full"
            />
          </div>
          <div>
            <label htmlFor="file-upload" className="cursor-pointer text-white">
              <MdOutlineDriveFolderUpload className="text-3xl mt-3" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
        <ul className="text-center">
          {[
            { name: "HOME", icon: <IoHomeOutline />, link: "Home" },
            { name: "SERVICES", icon: <MdOutlineMiscellaneousServices />, link: "Services" },
            { name: "BLOGS", icon: <LiaBlogSolid />, link: "Blogs" },
            { name: "PORTFOLIOS", icon: <FaRegFileCode />, link: "Portfolios" },
            { name: "TESTIMONIALS", icon: <PiListStarDuotone />, link: "Testimonials" },
            { name: "TEAM", icon: <RiTeamLine />, link: "Team" },
            { name: "CONTACT", icon: <IoIosContact />, link: "Contact" },
          ].map((item) => (
            <li key={item.name} className="py-3 group">
              <Link
                to="/"
                onClick={() => handleLinkClick(item.link)}
              >
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div>{item.icon}</div>
                    <div>{item.name}</div>
                  </div>
                  <div className="text-2xl transition-transform duration-200 transform group-hover:translate-x-2">
                    <MdKeyboardArrowRight />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-[#2986FE] flex mx-auto gap-2 mt-14 p-2 justify-center bg-white rounded-lg">
          <CgLogOut className="text-2xl mt-1" />
          <button className="text-lg font-semibold">LOGOUT</button>
        </div>
      </aside>

      {/* Background overlay when menu is open */}
      {isMobileView && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => setIsMobileView(false)} // Close menu when overlay is clicked
        />
      )}
    </nav>
  );
};

export default Navbar;
