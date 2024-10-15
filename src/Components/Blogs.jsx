import React, { useState } from "react";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import ShortInfo from "./ShortInfo";

const Blogs = ({ newList, setNewList, portfolioList, serviceList }) => {
  const [newTopic, setNewTopic] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newDate, setNewDate] = useState(new Date());
  const [editBlogId, setEditBlogId] = useState(null);

  const addList = () => {
    if (
      !newTopic ||
      !newTitle ||
      !newSubtitle ||
      !blogImage ||
      !newAuthor ||
      !newDate
    ) {
      alert("Please fill in all fields before adding the blog.");
      return;
    }

    const list = {
      id: editBlogId ? editBlogId : newList.length + 1,
      newTopic,
      newTitle,
      newSubtitle,
      blogImage,
      newAuthor,
      newDate: newDate ? newDate.toISOString().substring(0, 10) : "",
    };

    // If editing, update the blog; otherwise, add a new one
    if (editBlogId) {
      setNewList(newList.map((blog) => (blog.id === editBlogId ? list : blog)));
      setEditBlogId(null); // Reset the edit id after editing
    } else {
      setNewList([...newList, list]);
    }

    // Reset input fields
    setNewTopic("");
    setNewTitle("");
    setNewSubtitle("");
    setBlogImage("");
    setNewAuthor("");
    setNewDate(new Date());
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    const updatedList = newList.filter((blog) => blog.id !== id);
    setNewList(updatedList);
  };

  // Edit functionality
  const editList = (blog) => {
    setEditBlogId(blog.id);
    setNewTopic(blog.newTopic);
    setNewTitle(blog.newTitle);
    setNewSubtitle(blog.newSubtitle);
    setBlogImage(blog.blogImage);
    setNewAuthor(blog.newAuthor);
    setNewDate(new Date(blog.newDate)); // Convert to Date object if necessary
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBlogImage(reader.result); // Set the image as a base64 string
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
        />
        <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Blogs</h2>
          <button
            onClick={addList}
            className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-8 py-3"
          >
            Add
          </button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <table className="w-full table-auto border border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Id</th>
                <th className="py-2 px-4 border">Topic</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Sub-Title</th>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Author</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4 border">Total {newList.length}</td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-1 border"
                  />
                  {blogImage && (
                    <img src={blogImage} alt="Blog" className="w-24 mt-2" />
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="date"
                    value={
                      newDate ? newDate.toISOString().substring(0, 10) : ""
                    }
                    onChange={(e) => setNewDate(new Date(e.target.value))}
                    className="w-full p-1 border"
                  />
                </td>
                <td className="flex px-4 border justify-center items-center gap-1 py-5 cursor-pointer">
                  <MdOutlineLibraryAddCheck
                    className="text-2xl text-black"
                    onClick={addList}
                  />
                </td>
              </tr>

              {newList.map((blogs) => (
                <tr key={blogs.id} className="text-center">
                  <td className="py-2 px-4 border">{blogs.id}</td>
                  <td className="py-2 px-4 border">{blogs.newTopic}</td>
                  <td className="py-2 px-4 border">{blogs.newTitle}</td>
                  <td className="py-2 px-4 border">{blogs.newSubtitle}</td>
                  <td className="py-2 px-4 border flex justify-center items-center">
                    <img
                      src={blogs.blogImage}
                      alt="Blog"
                      className="w-24 rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4 border">{blogs.newAuthor}</td>
                  <td className="py-2 px-4 border">{blogs.newDate}</td>
                  <td className="flex py-5 px-4 justify-center items-center gap-2 cursor-pointer">
                    <CiEdit
                      className="text-2xl text-black"
                      onClick={() => editList(blogs)}
                    />
                    <RiDeleteBinLine
                      className="text-2xl text-black"
                      onClick={() => handleDelete(blogs.id)}
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

export default Blogs;
