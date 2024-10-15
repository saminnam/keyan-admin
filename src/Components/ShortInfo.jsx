import React from "react";
import { GrServices } from "react-icons/gr";
import { GrBlog } from "react-icons/gr";
import { GoFileSymlinkFile } from "react-icons/go";

const ShortInfo = ({ newList,portfolioList, serviceList}) => {
  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-4 text-white">
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-blue-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{serviceList.length}</h2>
            <h2 className="font-serif">Current Services</h2>
          </div>
          <GrServices className="text-6xl me-1" />
        </div>
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-green-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{newList.length}</h2>
            <h2 className="font-serif">Current Blogs</h2>
          </div>
          <GrBlog className="text-6xl me-1" />
        </div>
        <div className="w-64 flex p-2 items-center justify-between h-32 bg-red-500 rounded-lg">
          <div className="flex flex-col gap-2 justify-center p-3 items-start">
            <h2 className="text-6xl">{portfolioList.length}</h2>
            <h2 className="font-serif">Current Portfolios</h2>
          </div>
          <GoFileSymlinkFile className="text-6xl" />
        </div>
      </div>
    </>
  );
};

export default ShortInfo;
