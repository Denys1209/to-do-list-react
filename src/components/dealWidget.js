import React, { useState } from "react";
import "../App.css";
import { dealService } from "../services/dealService";

const DealWidget = ({ deal, onDelete, onAddToProject, checkInProject}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDeal, setEditedDeal] = useState(deal);

  const handleDelete = async () => {
    await dealService.deleteDeal(deal.id);
    onDelete(deal.id);
  };
  const handleEditChange = (event) => {
    setEditedDeal({ ...editedDeal, [event.target.name]: event.target.value });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    await dealService.updateDealById(editedDeal.id, editedDeal);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
    // You could also pass the deal to an edit form here
  };
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-white shadow rounded p-4 my-4">
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={editedDeal.name}
              onChange={handleEditChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <input
              id="content"
              name="content"
              type="text"
              value={editedDeal.content}
              onChange={handleEditChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700"
            >
              Time
            </label>
            <input
              id="time"
              name="time"
              type="datetime-local"
              value={editedDeal.time}
              onChange={handleEditChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm font-medium text-gray-700"
            >
              Priority
            </label>
            <input
              id="priority"
              name="priority"
              type="number" // Assuming priority is numeric
              value={editedDeal.priority}
              onChange={handleEditChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700"
            >
              Tags
            </label>
            <input
              id="tags"
              name="tags"
              type="text" // Tags might be represented as a comma-separated string or as an array, adjust accordingly
              value={editedDeal.tags}
              onChange={handleEditChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <button type="submit" className="btn btn-primary mr-2">
            Save
          </button>
          <button
            type="button"
            onClick={handleEditToggle}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{editedDeal.name}</h2>
          <p>{editedDeal.content}</p>
          <p>
            <strong>Time:</strong> {editedDeal.time}
          </p>
          <p>
            <strong>Priority:</strong> {editedDeal.priority}
          </p>
          <p>
            <strong>Tags:</strong> {editedDeal.tags}
          </p>
          <button onClick={handleEdit} className="btn btn-warning mr-2">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-danger mr-2">
            Delete
          </button>
          {onAddToProject ? <button onClick={ () => onAddToProject(editedDeal.id)} className="btn btn-green mr-2"> {checkInProject(editedDeal.id) ? "remove" : "add"}</button> : null}
        </>
      )}
    </div>
  );
};

export default DealWidget;
