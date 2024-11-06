import React, { useEffect, useState } from "react";
import { apiRequest } from "./Api";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ShortInfo from "./ShortInfo";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [addServices, setAddServices] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await apiRequest("get", "services"); // Use the generic function
        setServices(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiRequest("put", `services/${currentId}`, formData); // Use the generic function
      } else {
        await apiRequest("post", "services", formData); // Use the generic function
      }
      const data = await apiRequest("get", "services"); // Refresh services
      setServices(data);
      setFormData({ title: "", description: "" });
      setEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (service) => {
    setFormData({ title: service.title, description: service.description });
    setCurrentId(service._id);
    setEditing(true);
    setAddServices(true)
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest("delete", `services/${id}`); // Use the generic function
      const data = await apiRequest("get", "services"); // Refresh services
      setServices(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const columnDefs = [
    { headerName: "ID", field: "_id", width: 150 },
    { headerName: "Title", field: "title", flex: 1 },
    { headerName: "Description", field: "description", flex: 2 },
    {
      headerName: "Created At",
      field: "createdAt",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      width: 200,
    },
    {
      headerName: "Updated At",
      field: "updatedAt",
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
      width: 200,
    },
    {
      headerName: "Actions",
      field: "actions",
      cellRenderer: (params) => (
        <div className="flex gap-3 m-3 items-center cursor-pointer">
          <FaRegEdit
            onClick={() => handleEdit(params.data)} // Use node.rowIndex
            className="text-xl"
          />
          <RiDeleteBin2Line
            onClick={() => handleDelete(params.data._id)}
            className="text-xl"
          />
        </div>
      ),
      width: 150,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="mt-14">
      <ShortInfo />
      <div className="flex justify-between mx-10 mb-5 mt-20 items-center">
        <h2 className="text-2xl font-bold md:text-5xl font-serif">Services</h2>
        <button
          className="border py-3 px-5 text-xs font-medium uppercase tracking-tight rounded-lg hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500"
          onClick={() => setAddServices(!addServices)}
        >
          {!addServices ? "Add Services" : "Close Services"}
        </button>
      </div>
      <div className="mx-10">
        {addServices && (
          <div className="flex justify-between flex-wrap gap-5">
            <div className="w-[400px] lg:w-[640px] ">
              <form
                onSubmit={handleSubmit}
                className="mb-8 p-5 rounded-lg border flex flex-col gap-5"
              >
                <input
                  type="text"
                  name="title"
                  placeholder="Service Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Service Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 rounded px-4 py-2 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-xs font-medium uppercase tracking-tight text-white px-4 py-3 rounded-md w-full hover:bg-transparent hover:text-blue-500 border border-blue-500 duration-300"
                >
                  {editing ? "Update Service" : "Add Service"}
                </button>
              </form>
            </div>
            <div className="lg:w-[450px] rounded-lg">
              {services.length > 0 && (
                <div
                  key={services[services.length - 1]._id}
                  className="mb-4 border p-4"
                >
                  <h2 className="font-bold text-center py-2">
                    {services[services.length - 1].title}
                  </h2>
                  <p className="text-justify">
                    {services[services.length - 1].description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        <div
          className="ag-theme-alpine"
          style={{
            height: 400,
            width: "100%",
            marginTop: addServices ? "16px" : "2px",
          }}
        >
          <AgGridReact
            rowData={services}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
