import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";

const Testimonials = ({
  newList,
  portfolioList,
  serviceList,
  customerList,
  setCustomerList,
}) => {
  const [customerProfile, setCustomerProfile] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerDestination, setCustomerDestination] = useState("");
  const [customerComments, setCustomerComments] = useState("");
  const [customerRating, setCustomerRating] = useState(null);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const addList = () => {
    if (
      !customerProfile ||
      !customerName ||
      !customerDestination ||
      !customerComments ||
      !customerRating
    ) {
      alert("Please fill all the fields");
      return;
    }

    const list = {
      id: editCustomerId ? editCustomerId : customerList.length + 1,
      customerProfile,
      customerName,
      customerDestination,
      customerComments,
      customerRating,
    };

    if (editCustomerId) {
      setCustomerList(
        customerList.map((customer) =>
          customer.id === editCustomerId ? list : customer
        )
      );
      setEditCustomerId(null);
    } else {
      setCustomerList([...customerList, list]);
    }

    // reset input fields
    setCustomerProfile("");
    setCustomerName("");
    setCustomerDestination("");
    setCustomerComments("");
    setCustomerRating(null);
  };

  const handleDelete = (id) => {
    const customerUpdatedList = customerList.filter(
      (customer) => customer.id !== id
    );
    setCustomerList(customerUpdatedList);
  };

  const editList = (customer) => {
    setEditCustomerId(customer.id);
    setCustomerProfile(customer.customerProfile);
    setCustomerName(customer.customerName);
    setCustomerDestination(customer.customerDestination);
    setCustomerComments(customer.customerComments);
    setCustomerRating(customer.customerRating);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomerProfile(reader.result); // Set the image as a base64 string
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
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Testimonials</h2>
          <button
            className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 px-8 py-3"
            onClick={addList}
          >
            Add
          </button>
        </div>
        <div className="mx-10 overflow-x-auto">
          <table className="w-full table-auto border border-collapse">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4 border">Id</th>
                <th className="py-2 px-4 border">Customer Profile</th>
                <th className="py-2 px-4 border">Customer Name</th>
                <th className="py-2 px-4 border">Destination</th>
                <th className="py-2 px-4 border">Comments</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center">
                <td className="py-2 px-4 border">Total: {customerList.length} </td>
                <td className="py-2 px-4 border">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-1 border"
                  />
                  {customerProfile && (
                    <img
                      src={customerProfile}
                      alt="customer profile"
                      className="w-24 mt-2"
                    />
                  )}
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-1 border"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-1 border"
                    value={customerDestination}
                    onChange={(e) => setCustomerDestination(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="text"
                    className="w-full p-1 border"
                    value={customerComments}
                    onChange={(e) => setCustomerComments(e.target.value)}
                  />
                </td>
                <td className="py-2 px-4 border">
                  <input
                    type="number"
                    className="w-full p-1 border"
                    value={customerRating}
                    onChange={(e) => setCustomerRating(e.target.value)}
                  />
                </td>
                <td className="flex px-4 border justify-center items-center gap-1 py-5 cursor-pointer">
                  <MdOutlineLibraryAddCheck
                    className="text-2xl text-black"
                    onClick={addList}
                  />
                </td>
              </tr>
              {customerList.map((customer) => (
                <tr key={customer.id} className="text-center">
                  <td className="py-2 px-4 border">{customer.id}</td>
                  <td className="py-2 px-4 border flex justify-center">
                    <img src={customer.customerProfile} alt="customer profile" className="w-20 h-20 rounded-full" />
                  </td>
                  <td className="py-2 px-4 border">{customer.customerName}</td>
                  <td className="py-2 px-4 border">{customer.customerDestination}</td>
                  <td className="py-2 px-4 border">{customer.customerComments}</td>
                  <td className="py-2 px-4 border">{customer.customerRating}</td>
                  <td className="flex py-5 px-4 justify-center items-center gap-2 cursor-pointer">
                    <CiEdit
                      className="text-2xl text-black"
                      onClick={() => editList(customer)}
                    />
                    <RiDeleteBinLine
                      className="text-2xl text-black"
                      onClick={() => handleDelete(customer.id)}
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

export default Testimonials;
