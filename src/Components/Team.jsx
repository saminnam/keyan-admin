import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const Team = ({
  newList,
  portfolioList,
  serviceList,
  setServiceList,
  teamList,
  setTeamList,
}) => {
  const [personProfile, setPersonProfile] = useState("");
  const [personName, setPersonName] = useState("");
  const [personDepartment, setPersonDepartment] = useState("");
  const [editPersonId, setEditPersonId] = useState(null);

  const addList = () => {
    if (!personProfile || !personName || !personDepartment) {
      alert("Please fill in all the fields");
      return;
    }

    const list = {
      id: editPersonId ? editPersonId : teamList.length + 1,
      personProfile,
      personName,
      personDepartment,
    };

    if (editPersonId) {
      setTeamList(
        teamList.map((team) => (team.id === editPersonId ? list : team))
      );
      setEditPersonId(null);
    } else {
      setTeamList([...teamList, list]);
    }

    // Reset all input fields
    setPersonProfile("");
    setPersonName("");
    setPersonDepartment("");
  };

  const handleDelete = (id) => {
    const teamUpdatedList = teamList.filter((team) => team.id !== id);
    setTeamList(teamUpdatedList);
  };

  const editList = (team) => {
    setEditPersonId(team.id);
    setPersonProfile(team.personProfile);
    setPersonName(team.personName);
    setPersonDepartment(team.personDepartment);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPersonProfile(reader.result); // Set the image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="mt-14">
        <ShortInfo
          newList={newList}
          portfolioList={portfolioList}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
        <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Team</h2>
          <button className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-8 py-3">
            Add
          </button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Id</th>
                <th className="py-2 px-4 border">Profile</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4 border">Total: </td>
                <td className="py-2 px-4 border">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-1 border"
                  />
                  {personProfile && (
                    <img
                      src={personProfile}
                      alt="customer profile"
                      className="w-24 mt-2"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-1 border"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-1 border"
                    value={personDepartment}
                    onChange={(e) => setPersonDepartment(e.target.value)}
                  />
                </td>
                <td className="flex px-4 border justify-center items-center gap-1 py-5 cursor-pointer">
                  <MdOutlineLibraryAddCheck
                    className="text-2xl text-black"
                    onClick={addList}
                  />
                </td>
              </tr>
              {teamList.map((team) => (
                <tr key={team.id} className="text-center border">
                  <td className="py-4 px-4 border border-gray-300">
                    {team.id}
                  </td>
                  <td className="py-4 px-4 flex justify-center">
                    <img
                      src={team.personProfile}
                      alt="person profile"
                      className="w-20 h-20 rounded-full"
                    />
                  </td>
                  <td className="py-4 px-4 border border-gray-300">
                    {team.personName}
                  </td>
                  <td className="py-4 px-4 border border-gray-300">
                    {team.personDepartment}
                  </td>
                  <td className="py-4 px-4 border-gray-300 flex justify-center items-center gap-4">
                    <CiEdit
                      className="text-2xl text-black cursor-pointer"
                      onClick={() => editList(team)}
                    />
                    <RiDeleteBinLine
                      className="text-2xl text-black cursor-pointer"
                      onClick={() => handleDelete(team.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Team;
