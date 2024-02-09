import React, { useState } from 'react';
import '../App.css';

const DealForm = ({ onCreate }) => {
 const [state, setState] = useState({
    time: '',
    name: '',
    priority: '',
    content: '',
    tags: ''
 });

 const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(state);
    setState({
      time: '',
      name: '',
      priority: '',
      content: '',
      tags: ''
    });
 };

 return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg">
      <div>
        <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
        <input
          id="time"
          name="time"
          type="datetime-local"
          value={state.time}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={state.name}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div>
        <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Prirority</label>
        <input
          id="priority"
          name="priority"
          type="number"
          value={state.priority}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
       <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <input
          id="content"
          name="content"
          type="content"
          value={state.content}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
        <input
          id="tags"
          name="tags"
          type="tags"
          value={state.tags}
          onChange={handleChange}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Deal
      </button>
    </form>
 );
};

export default DealForm;
