import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const Services = ({ newList, portfolioList, serviceList, setServiceList }) => {
  const [serviceName, setServiceName] = useState("");
  const [serviceContent, setServiceContent] = useState("");
  const [editServiceId, setEditServiceId] = useState(null);

  const addList = () => {
    if (!serviceName || !serviceContent) {
      alert("Please fill the input.");
      return;
    }

    const list = {
      id: editServiceId ? editServiceId : serviceList.length + 1,
      serviceName,
      serviceContent,
    };

    if (editServiceId) {
      setServiceList(
        serviceList.map((service) =>
          service.id === editServiceId ? list : service
        )
      );
    } else {
      setServiceList([...serviceList, list]);
    }

    //reset input fields

    setServiceName("");
    setServiceContent("");
  };

  const handleDelete = (id) => {
    const serviceUpdatedList = serviceList.filter(
      (service) => service.id !== id
    );
    setServiceList(serviceUpdatedList)
  };

  const editServiceList = (service) => {
    setEditServiceId(service.id);
    setServiceName(service.serviceName);
    setServiceContent(service.serviceContent);
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
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Services</h2>
          <button onClick={addList} className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-8 py-3">
            Add
          </button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Id</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Content</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4 border">
                  Total: {serviceList.length}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full border"
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    value={serviceContent}
                    className="w-full border"
                    onChange={(e) => setServiceContent(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border flex justify-center items-center">
                  <MdOutlineLibraryAddCheck
                    className="text-2xl cursor-pointer text-black"
                    onClick={addList}
                  />
                </td>
              </tr>

              {serviceList.map((services) => (
                <tr key={services.id} className="text-center">
                  <td className="py-2 px-4 border">{services.id}</td>
                  <td className="py-2 px-4 border">{services.serviceName}</td>
                  <td className="py-2 px-4 border">
                    {services.serviceContent}
                  </td>
                  <td className="py-2 px-4 border">
                    <div className="flex justify-center items-center gap-4">
                      <CiEdit
                        className="text-2xl text-black cursor-pointer"
                        onClick={() => editServiceList(services)}
                      />
                      <RiDeleteBinLine
                        className="text-2xl text-black cursor-pointer"
                        onClick={() => handleDelete(services.id)}
                      />
                    </div>
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

export default Services;
