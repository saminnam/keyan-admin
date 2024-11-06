import React, { useState, useEffect } from "react";
import { apiRequest } from "./Api";
import ShortInfo from "./ShortInfo";

const Portfolio = () => {
  const [addPortfolios, setAddPortfolios] = useState("");
  const [title, setTitle] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [image, setImage] = useState(null);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // For editing an item

  // Fetch all portfolio items on component mount

  useEffect(() => {
    const fetchPortfolioItems = async () => {
      try {
        const data = await apiRequest("get", "portfolio"); // Use the generic function
        setPortfolioItems(data);
      } catch (error) {
        console.error("Error fetching portfolio items:", error);
      }
    };
    fetchPortfolioItems();
  }, []);

  // Handle form submission for adding or updating an item
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("websiteUrl", websiteUrl);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingItem) {
        // Update existing item
        const response = await apiRequest("put", `portfolio/${editingItem._id}`, formData); // Use the generic function
        setPortfolioItems(
          portfolioItems.map((item) =>
            item._id === editingItem._id ? response.portfolio : item
          )
        );
        setEditingItem(null); // Reset editing state
      } else {
        // Add new item
        const response = await apiRequest("post", "portfolio", formData); // Use the generic function
        setPortfolioItems([...portfolioItems, response.portfolio]);
      }

      // Clear form fields
      setTitle("");
      setWebsiteUrl("");
      setImage(null);
    } catch (error) {
      console.error("Error adding/updating portfolio item:", error);
    }
  };

  // Handle editing
  const handleEdit = (item) => {
    setTitle(item.title);
    setWebsiteUrl(item.websiteUrl);
    setEditingItem(item);
    setAddPortfolios(true) // Correctly set the item being edited
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await apiRequest("delete", `portfolio/${id}`); // Use the generic function
      setPortfolioItems(portfolioItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
    }
  };
  return (
    <>
      <section className="mt-14">
        <ShortInfo />
        <div className="mx-10 mt-14">
          <div className="flex justify-between mb-5 mt-20 items-center">
            <h2 className="text-2xl font-bold md:text-5xl font-serif ">
              {editingItem ? "Edit Portfolio" : "Add Portfolio"}
            </h2>
            <button
              className="border py-3 px-5 rounded-lg text-xs font-medium uppercase tracking-tight hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
              onClick={() => setAddPortfolios(!addPortfolios)}
            >
              {!addPortfolios ? "Add" : "Close"}
            </button>
          </div>

          {/* Form to Add/Edit Portfolio Item */}
          {addPortfolios && (
            <div className="flex justify-between flex-wrap gap-5">
              <div className="w-[400px] lg:w-[640px] border p-5 rounded-lg">
                <form className="mb-6 mt-10" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                  >
                    {editingItem ? "Update Portfolio" : "Add Portfolio"}
                  </button>
                </form>
              </div>
              <div className="lg:w-[450px] ">
                {portfolioItems.length > 0 && (
                  <div key={portfolioItems[portfolioItems.length - 1].id}>
                    <img
                      src={`http://localhost:3000/Images/${
                        portfolioItems[portfolioItems.length - 1].image
                      }`}
                      alt={portfolioItems[portfolioItems.length - 1].title}
                      className="object-cover w-full h-[250px] rounded-lg"
                    />
                    <h2 className="text-center font-bold mt-4">
                      {portfolioItems[portfolioItems.length - 1].title}
                    </h2>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Display Portfolio Items in a Table */}
          <div className={`${!addPortfolios ? "mt-10" : "mt-16"}`}>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse divide-gray-200 text-center">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Image
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Title
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Website URL
                    </th>
                    <th className="py-2 px-4 border text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {portfolioItems.map((item) => (
                    <tr
                      key={item._id}
                      className=" hover:bg-gray-100 text-center border-gray-300"
                    >
                      <td className="py-2 px-4 border flex justify-center">
                        <img
                          src={`http://localhost:3000/Images/${item.image}`}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        <div className="text-sm font-medium text-gray-900">
                          {item.title}
                        </div>
                      </td>
                      <td className="py-2 px-4 border">
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {item.websiteUrl}
                        </a>
                      </td>
                      <td className="border px-4 py-2">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => handleEdit(item)} // Correct the argument here
                            className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)} // Correct the argument here
                            className="bg-red-500 text-white rounded px-2 py-1"
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
    </>
  );
};

export default Portfolio;
