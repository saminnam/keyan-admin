import React, { useState, useEffect, useMemo } from "react";
import { apiRequest } from "./Api";
import ShortInfo from "./ShortInfo";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

const Blog = ({ portfolioList }) => {
  const [addBlogs, setAddBlogs] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    subContent: "",
    author: "",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await apiRequest("get", "blogs"); // Use the generic function
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("category", formData.category);
    formDataObj.append("content", formData.content);
    formDataObj.append("subContent", formData.subContent);
    formDataObj.append("author", formData.author);
    if (formData.image) {
      formDataObj.append("image", formData.image);
    }

    try {
      if (isEditing) {
        await apiRequest("put", `blogs/${currentBlogId}`, formDataObj);
      } else {
        await apiRequest("post", "blogs", formDataObj);
      }
      fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error saving blog", error);
    }
  };

  const handleEditClick = (blog) => {
    setFormData({
      title: blog.title,
      category: blog.category,
      content: blog.content,
      subContent: blog.subContent,
      author: blog.author,
      image: null,
    });
    setCurrentBlogId(blog._id);
    setIsEditing(true);
    setAddBlogs(true)
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      content: "",
      subContent: "",
      author: "",
      image: null,
    });
    setCurrentBlogId(null);
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest("delete", `blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  // Ag-Grid column definitions
  const columnDefs = useMemo(
    () => [
      { headerName: "Title", field: "title" },
      { headerName: "Category", field: "category" },
      { headerName: "Content", field: "content" },
      { headerName: "Sub Content", field: "subContent" },
      { headerName: "Author", field: "author" },
      {
        headerName: "Created At",
        field: "createdAt",
        valueFormatter: ({ value }) => new Date(value).toLocaleString(),
      },
      {
        headerName: "Image",
        field: "image",
        cellRenderer: (params) => (
          <img
            src={`http://localhost:3000/Images/${params.value}`}
            alt={params.data.title}
            width={100}
          />
        ),
      },
      {
        headerName: "Actions",
        field: "actions",
        cellRenderer: (params) => (
          <div className="flex gap-3 m-3 items-center cursor-pointer">
            <FaRegEdit
              onClick={() => handleEditClick(params.data)} // Use node.rowIndex
              className="text-xl"
            />
            <RiDeleteBin2Line
              onClick={() => handleDelete(params.data._id)}
              className="text-xl"
            />
          </div>
        ),
      },
    ],
    [blogs]
  );

  return (
    <section className="mt-14">
      <ShortInfo portfolioList={portfolioList} />
      <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
        <h2 className="text-2xl font-bold md:text-5xl font-serif">Blogs</h2>
        <button
          className="border text-xs font-medium uppercase tracking-tight py-3 px-5 rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
          onClick={() => setAddBlogs(!addBlogs)}
        >
          {!addBlogs ? "Add Blog" : "Close Blog"}
        </button>
      </div>

      {/* Form */}
      <div className="mx-10">
        {addBlogs && (
          <div className="flex justify-between flex-wrap gap-5">
            <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 mb-8"
              >
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Category"
                  className="p-2 border rounded"
                  required
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Content"
                  className="p-2 border rounded h-32"
                  required
                />
                <textarea
                  name="subContent"
                  value={formData.subContent}
                  onChange={handleInputChange}
                  placeholder="Sub Content" // Added subContent field in the form
                  className="p-2 border rounded h-24"
                  required
                />
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                >
                  {isEditing ? "Update Blog" : "Create Blog"}
                </button>
              </form>
            </div>
            <div className="lg:w-[450px] rounded-lg flex flex-col lg:flex-row lg:flex-wrap justify-between">
              {blogs.length > 0 && (
                <div
                  key={blogs[blogs.length - 1]._id}
                  className="mb-4 border p-4"
                >
                  <img
                    src={`http://localhost:3000/Images/${
                      blogs[blogs.length - 1].image
                    }`}
                    alt={blogs[blogs.length - 1].title}
                    className="object-cover w-full h-[250px]"
                  />
                  <span className="text-sky-500 bg-sky-100 mt-2 inline-flex px-4 py-2 text-xs font-semibold tracking-widest uppercase rounded-full">
                    {blogs[blogs.length - 1].category}
                  </span>
                  <p className="mt-6 text-xl font-semibold">
                    {blogs[blogs.length - 1].title}
                  </p>
                  <p className="mt-4 text-gray-600 text-justify">
                    {blogs[blogs.length - 1].subContent}
                  </p>
                  <div className="h-0 mt-6 mb-4 border-t-2 border-gray-200 border-dashed"></div>
                  <span className="block text-sm font-bold tracking-widest text-gray-500 uppercase">
                    {blogs[blogs.length - 1].author}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Ag-Grid Table */}
      <div className="ag-theme-alpine mx-10 mt-5">
        <AgGridReact
          rowData={blogs}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          pagination={true}
          paginationPageSize={10}
          getRowHeight={() => 50} // Adjust the height as needed (e.g., 50px)
          style={{ width: "100%", height: "500px" }} 
        />
      </div>
    </section>
  );
};

export default Blog;
