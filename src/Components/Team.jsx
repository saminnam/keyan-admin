import React, { useState, useEffect } from "react";
import ShortInfo from "./ShortInfo";
import { apiRequest } from "./Api";

const TeamTable = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [addTeam, setAddTeam] = useState(false);
  const [formData, setFormData] = useState({ Name: "", Role: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editMode, setEditMode] = useState(null); // Tracks the ID of the member being edited

  // Fetch team members data from the backend
  useEffect(() => {
    fetchTeamMembers();
  }, []);

  // Fetch team members from the API
  const fetchTeamMembers = async () => {
    try {
      const data = await apiRequest("get", "team"); // Use the generic function
      setTeamMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  // Handle input changes for new team member or edit
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Add or update team member based on editMode
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("Name", formData.Name);
    form.append("Role", formData.Role);
    if (imageFile) form.append("image", imageFile);

    try {
      if (editMode) {
        // Update existing team member
        await apiRequest("put", `team/${editMode}`, form); // Use the generic function
      } else {
        // Add new team member
        await apiRequest("post", "team", form); // Use the generic function
        setFormData({ Name: "", Role: "" });
        fetchTeamMembers(); // Refresh the list after adding
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (id) => {
    const memberToEdit = teamMembers.find((member) => member._id === id);
    setFormData({ Name: memberToEdit.Name, Role: memberToEdit.Role });
    setEditMode(id);
    setAddTeam(true); // Set edit mode to the ID of the member being edited
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      await apiRequest("delete", `team/${id}`); // Use the generic function
      setTeamMembers(teamMembers.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
    }
  };

  return (
    <section className="mt-14">
      <ShortInfo />
      <div className="mx-10 mb-5 mt-20 items-center">
        {/* Form for adding/editing team member */}
        <div className="flex justify-between mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">
            Team Members
          </h2>
          <button
            className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
            onClick={() => setAddTeam(!addTeam)}
          >
            {!addTeam ? "Add Team" : "Close Team"}
          </button>
        </div>
        {addTeam && (
          <form onSubmit={handleFormSubmit} className="mb-8 mt-5">
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <input
                type="text"
                name="Role"
                value={formData.Role}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                required={!editMode} // Image is required only for new members
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
            >
              {editMode ? "Update Team Member" : "Add Team Member"}
            </button>
          </form>
        )}

        {/* Table for displaying team members */}
        <div className={`${!addTeam ? "mt-0" : "mt-16"}`}>
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-white border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                    Role
                  </th>
                  <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr
                    key={member._id}
                    className="text-center  hover:bg-gray-100 border-gray-300"
                  >
                    <td className="py-2 px-4 border">{member.Name}</td>
                    <td className="py-2 px-4 border">{member.Role}</td>
                    <td className="py-2 px-4 border flex justify-center">
                      <img
                        src={`http://localhost:3000/Images/${member.image}`}
                        alt={member.Name}
                        className="h-16 w-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => handleEditClick(member._id)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamTable;
