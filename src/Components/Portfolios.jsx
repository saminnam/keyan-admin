import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const Portfolios = ({
  newList,
  portfolioList,
  setPortfolioList,
  serviceList,
}) => {
  const [portfolioName, setPortfolioName] = useState("");
  const [toolName, setToolName] = useState("");
  const [portfolioImg, setPortfolioImg] = useState("");
  const [editPortfolioId, setEditPortfolioId] = useState(null);

  const addList = () => {
    if (!portfolioName || !toolName || !portfolioImg) {
      alert("Please fill in all portfolio information.");
      return;
    }

    const list = {
      id: editPortfolioId ? editPortfolioId : portfolioList.length + 1,
      portfolioName,
      toolName,
      portfolioImg,
    };

    if (editPortfolioId) {
      // Update existing portfolio
      setPortfolioList(
        portfolioList.map((portfo) =>
          portfo.id === editPortfolioId ? list : portfo
        )
      );
    } else {
      // Add new portfolio
      setPortfolioList([...portfolioList, list]);
    }

    // Reset input fields
    setPortfolioName("");
    setToolName("");
    setPortfolioImg("");
    setEditPortfolioId(null);
  };

  const handleDelete = (id) => {
    const portfolioUpdatedList = portfolioList.filter(
      (portfo) => portfo.id !== id
    );
    setPortfolioList(portfolioUpdatedList);
  };

  const editPortfolioList = (portfo) => {
    setEditPortfolioId(portfo.id);
    setPortfolioName(portfo.portfolioName);
    setToolName(portfo.toolName);
    setPortfolioImg(portfo.portfolioImg);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolioImg(reader.result); // Set the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="mt-14">
      <ShortInfo
        newList={newList}
        portfolioList={portfolioList}
        serviceList={serviceList}
      />
      <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
        <h2 className="text-2xl font-bold md:text-5xl font-serif">Portfolios</h2>
        <button
          onClick={addList}
          className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-8 py-3"
        >
          {editPortfolioId ? "Update" : "Add"}
        </button>
      </div>
      <div className="mx-10 overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4 border">Id</th>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Tool</th>
              <th className="py-2 px-4 border">Image</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-4 border">
                Total: {portfolioList.length}
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  className="w-full p-1 border"
                  value={portfolioName}
                  onChange={(e) => setPortfolioName(e.target.value)}
                  placeholder="Portfolio Name"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  className="w-full p-1 border"
                  value={toolName}
                  onChange={(e) => setToolName(e.target.value)}
                  placeholder="Tool Used"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-1 border"
                />
                {portfolioImg && (
                  <img
                    src={portfolioImg}
                    alt="Portfolio"
                    className="w-24 mt-2"
                  />
                )}
              </td>
              <td className="py-5 px-4 border flex justify-center items-center cursor-pointer">
                <MdOutlineLibraryAddCheck
                  className="text-2xl text-black"
                  onClick={addList}
                />
              </td>
            </tr>
            {portfolioList.map((portfolios) => (
              <tr key={portfolios.id} className="text-center">
                <td className="py-2 px-4 border">{portfolios.id}</td>
                <td className="py-2 px-4 border">{portfolios.portfolioName}</td>
                <td className="py-2 px-4 border">{portfolios.toolName}</td>
                <td className="py-2 px-4 border flex justify-center items-center">
                  <img
                    src={portfolios.portfolioImg}
                    alt="Portfolio"
                    className="w-24 rounded-lg"
                  />
                </td>
                <td className="py-2 px-4 border gap-2">
                  <div className="flex justify-center items-center gap-4">
                    <CiEdit
                      className="text-2xl text-black cursor-pointer"
                      onClick={() => editPortfolioList(portfolios)}
                    />
                    <RiDeleteBinLine
                      className="text-2xl text-black cursor-pointer"
                      onClick={() => handleDelete(portfolios.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Portfolios;
