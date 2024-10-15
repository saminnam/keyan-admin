import React, { useState } from "react";
import ShortInfo from "./ShortInfo";
import { RiCodeView } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";

const Contact = ({ newList, setNewList, portfolioList, serviceList }) => {
  // Sample data for messages (can be replaced with your actual data)
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
      read: false,
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
      read: false,
    },
  ]);

  // State to store the selected message for viewing
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Function to handle deleting all messages
  const handleDeleteAll = () => {
    setMessages([]); // Clear the messages state
    setSelectedMessage(null); // Clear selected message
  };

  // Function to handle deleting a specific message
  const handleDeleteMessage = (id) => {
    setMessages(messages.filter((message) => message.id !== id));
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage(null); // Clear selected message if it's deleted
    }
  };

  // Function to handle viewing a specific message and marking it as "Read"
  const handleViewMessage = (message) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === message.id ? { ...msg, read: true } : msg
      )
    );
    setSelectedMessage(message); // Set the selected message to display
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
          <h2 className="text-2xl font-bold md:text-5xl font-serif">Messages</h2>
          <button
            onClick={handleDeleteAll} // Call the function when button is clicked
            className="bg-transparent font-semibold rounded-lg border hover:bg-blue-500 hover:text-white transition-transform duration-300 border-blue-500 text-blue-500 lg:px-8 py-3"
          >
            Delete All
          </button>
        </div>
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
                    <td className="border border-gray-300 px-4 flex py-2 space-x-2">
                      <button
                        onClick={() => handleViewMessage(message)} // Pass the message to the view handler
                        className="bg-blue-500 text-white px-2 py-2 rounded-full"
                      >
                        <RiCodeView className="text-white text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteMessage(message.id)} // Delete individual message
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

        {/* Display the selected message's details */}
        {selectedMessage && (
          <div className="mx-10 mt-10 p-5 border border-gray-300 rounded-lg bg-gray-100 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedMessage(null)} // Close the message details
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &#x2715;{" "}
              {/* Unicode for the "X" symbol, you can replace it with an icon */}
            </button>

            <h3 className="text-3xl font-bold mb-4 font-serif">
              Message Details
            </h3>
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
      </section>
    </>
  );
};

export default Contact;
