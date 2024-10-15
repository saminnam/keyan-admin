import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { RiCodeView } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

const SubHome = ({ newList, portfolioList, serviceList, setServiceList }) => {
  // Initial messages data (can be replaced with actual data)
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "John",
      email: "john@example.com",
      subject: "Hello",
      message: "Hi there!",
      read: false,
    },
    {
      id: 2,
      name: "Jane",
      email: "jane@example.com",
      subject: "Update",
      message: "Need updates",
      read: false,
    },
    {
      id: 3,
      name: "Bob",
      email: "bob@example.com",
      subject: "Meeting",
      message: "Schedule meeting",
      read: false,
    },
    {
      id: 4,
      name: "Alice",
      email: "alice@example.com",
      subject: "Info",
      message: "Send info",
      read: true,
    },
    {
      id: 5,
      name: "John",
      email: "john@example.com",
      subject: "Hello",
      message: "Hi there!",
      read: false,
    },
    {
      id: 6,
      name: "Jane",
      email: "jane@example.com",
      subject: "Update",
      message: "Need updates",
      read: false,
    },
    {
      id: 7,
      name: "Bob",
      email: "bob@example.com",
      subject: "Meeting",
      message: "Schedule meeting",
      read: false,
    },
    {
      id: 8,
      name: "Alice",
      email: "alice@example.com",
      subject: "Info",
      message: "Send info",
      read: true,
    },
  ]);

  // State for selected message
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Handle "View" button
  const handleViewMessage = (message) => {
    // Mark message as read if it's unread
    if (!message.read) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === message.id ? { ...msg, read: true } : msg
        )
      );
    }
    // Set the selected message to display
    setSelectedMessage(message);
  };

  // Handle "Delete" button
  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== messageId)
    );
    // Clear selected message if deleted
    if (selectedMessage && selectedMessage.id === messageId) {
      setSelectedMessage(null);
    }
  };

  return (
    <>
      {/* Top section starts */}
      <section className="mt-14">
        <ShortInfo
          newList={newList}
          portfolioList={portfolioList}
          serviceList={serviceList}
          setServiceList={setServiceList}
        />
      </section>
      {/* Top section ends */}

      {/* Recent Messages Table section starts */}
      <section className="mt-16">
        <div className="w-full h-100vh p-5">
          {/* Container */}
          {/* Title */}
          <div className="flex justify-between items-center">
            <div className="ms-10 mb-5">
              <h2 className="text-2xl font-bold md:text-5xl font-serif">
                Recent Messages
              </h2>
            </div>
          </div>

          {/* Table starts */}
          <div className="overflow-x-auto mx-10">
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Email Id</th>
                  <th className="py-2 px-4 border">Subject</th>
                  <th className="py-2 px-4 border">Message</th>
                  <th className="py-2 px-4 border">Read</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {messages.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="border px-4 py-2">
                      No messages available
                    </td>
                  </tr>
                ) : (
                  messages.map((message, index) => (
                    <tr key={message.id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {message.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {message.email}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {message.subject}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {message.message}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {message.read ? "Read" : "Unread"}
                      </td>
                      <td className="border border-gray-300 flex px-4 py-2">
                        <button
                          onClick={() => handleViewMessage(message)}
                          className="bg-blue-500 text-white px-2 py-2 rounded-full mr-2"
                        >
                          <RiCodeView className="text-white text-xl" />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="bg-red-500 text-white px-2 py-2 rounded-full"
                        >
                          <RiDeleteBinLine className="text-white text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Table ends */}

          {/* Display selected message details */}
          {selectedMessage && (
            <div className="mt-10 p-5 mx-10 border relative border-gray-300 rounded-lg bg-gray-100">
              <button
                onClick={() => setSelectedMessage(null)} // Close the message details
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                &#x2715;{" "}
                {/* Unicode for the "X" symbol, you can replace it with an icon */}
              </button>
              <h3 className="text-3xl font-bold mb-4">Message Details</h3>
              <p>
                <strong>Name:</strong> {selectedMessage.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedMessage.email}
              </p>
              <p>
                <strong>Subject:</strong> {selectedMessage.subject}
              </p>
              <p>
                <strong>Message:</strong> {selectedMessage.message}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {selectedMessage.read ? "Read" : "Unread"}
              </p>
            </div>
          )}
        </div>
      </section>
      {/* Recent Messages Table section ends */}
    </>
  );
};

export default SubHome;
