import React, { useEffect, useState } from "react";
import { GrServices } from "react-icons/gr";
import { GrBlog } from "react-icons/gr";
import { GoFileSymlinkFile } from "react-icons/go";
import axios from "axios";

const ShortInfo = () => {
  const [blogLen,setBlogLen] = useState([]);
  const [serviceLen, setServiceLen] = useState([]);
  const [contactLen, setContactLen] = useState([]);

  useEffect (() => {
    blogFetcher()
    serviceFetcher()
    contactFetcher()
  },[])

  const blogFetcher = () => {
    axios.get("http://localhost:3000/api/blogs")
    .then((res) => setBlogLen(res.data))
    .catch((error) => console.log(error))
  }

  const serviceFetcher = () => {
    axios.get("http://localhost:3000/api/services")
    .then((res) => setServiceLen(res.data))
    .catch((error) => console.log(error))
  }

  const contactFetcher = () => {
    axios.get("http://localhost:3000/api/contacts")
    .then((res) => setContactLen(res.data))
    .catch((error) => console.log(error))
  }


  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-4 text-white">
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-blue-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{serviceLen.length}</h2>
            <h2 className="font-serif">Current Services</h2>
          </div>
          <GrServices className="text-6xl me-1" />
        </div>
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-green-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{blogLen.length}</h2>
            <h2 className="font-serif">Current Blogs</h2>
          </div>
          <GrBlog className="text-6xl me-1" />
        </div>
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-red-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{contactLen.length}</h2>
            <h2 className="font-serif">Current Messages</h2>
          </div>
          <GoFileSymlinkFile className="text-6xl" />
        </div>
      </div>
      <hr className="mt-20"/>
    </>
  );
};

export default ShortInfo;
