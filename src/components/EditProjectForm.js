import React, { useState } from "react";
import "../App.css";
import ListOfDeals from "./listOfDeals";
import { dealService } from "../services/dealService";

const EditProjectForm = ({ project, onUpdate, endEdit }) => {
  const [state, setState] = useState(project);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(state);
    setState({id: "", title: "", deals: [] });
  };

  const onAddToProject = (id) => {
    if (state.deals.includes(id)) {
      setState((prevState) => ({
        ...prevState,
        deals: prevState.deals.filter((item) => item !== id),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        deals: [...prevState.deals, id],
      }));
    }
  };

  const checkIfDealInProject = (id) => {
    return state.deals.includes(id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-lg">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={state.title}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 text-white bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          save
        </button>
        <button
            type="button"
            onClick={endEdit}
            className="btn btn-secondary ml-2"
          >
            Cancel
            </button>
      </form>
      <ListOfDeals
        fetchDealsFunction={() => dealService.getAllDeals()}
        onAddToProject={onAddToProject}
        checkInProject={checkIfDealInProject}
      />
    </div>
  );
};

export default EditProjectForm;
