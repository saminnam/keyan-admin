import React, { useEffect, useState } from "react";
import { apiRequest } from "./Api";
import ShortInfo from "./ShortInfo";

const Testimonials = () => {
  const [addTestimonials, setAddTestimonials] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    content: "",
    rating: 1,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch testimonials from the API
  const fetchTestimonials = async () => {
    try {
      const data = await apiRequest("get", "testimonials"); // Use the generic function
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (editingId) {
        await apiRequest("put", `testimonials/${editingId}`, formDataToSend); // Use the generic function
      } else {
        await apiRequest("post", "testimonials", formDataToSend); // Use the generic function
      }
      fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  // Reset form and state
  const resetForm = () => {
    setFormData({ name: "", image: null, content: "", rating: 1 });
    setImagePreview(null);
    setEditingId(null);
  };

  // Handle edit
  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setImagePreview(`http://localhost:3000/Images/${testimonial.image}`);
    setEditingId(testimonial._id);
    setAddTestimonials(true); // Control the form display for editing
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await apiRequest("delete", `testimonials/${id}`); // Use the generic function
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  return (
    <>
      <section className="mt-14">
        <ShortInfo />
        <div className="mx-10 mt-14">
          <div className="flex justify-between mb-5 mt-20 items-center">
            <h2 className="text-2xl font-bold md:text-5xl font-serif">
              Testimonials
            </h2>
            <button
              className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
              onClick={() => setAddTestimonials(!addTestimonials)}
            >
              {!addTestimonials ? "Add" : "Close"}
            </button>
          </div>
          {addTestimonials && (
            <form onSubmit={handleSubmit} className="mb-6 mt-10">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                className="mt-1 mb-3 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {imagePreview && (
                <div className="mb-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded"
                  />
                </div>
              )}
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Content"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                min="1"
                max="5"
                required
                className="border border-gray-300 rounded p-2 mb-2 w-full"
              />
              <button
                type="submit"
                className="bg-blue-500 text-xs font-medium uppercase tracking-tight mt-2 text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
              >
                {editingId ? "Update" : "Add"} Testimonial
              </button>
            </form>
          )}
        </div>
        <div className="mx-10">
          <div className={`${!addTestimonials ? "mt-0" : "mt-16"}`}>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-collapse text-center">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                      Image
                    </th>
                    <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                      Content
                    </th>
                    <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="border border-gray-300 p-2 text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map((testimonial) => (
                    <tr
                      key={testimonial._id}
                      className="border hover:bg-gray-100 text-center border-gray-300"
                    >
                      <td className="border border-gray-300 p-2">
                        {testimonial.name}
                      </td>
                      <td className="border border-gray-300 p-2 flex justify-center">
                        <img
                          src={`http://localhost:3000/Images/${testimonial.image}`}
                          alt={testimonial.name}
                          style={{ width: "50px" }}
                          className="rounded"
                        />
                      </td>
                      <td className="border border-gray-300 p-2">
                        {testimonial.content}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {testimonial.rating}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
                            className="bg-red-500 text-white rounded p-1 hover:bg-red-600"
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

export default Testimonials;
