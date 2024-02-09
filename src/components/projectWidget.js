import React, { useState } from "react";
import "../App.css";
import { projectService } from "../services/projectService";
import EditProjectForm from "./EditProjectForm";
import ListOfDeals from "./listOfDeals";
import { dealService } from "../services/dealService";

const ProjectWidget = ({ project, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [isShowing, setIsShowing] = useState(false);



  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const updateProjectHandle = (project) =>
  {
    setIsEditing(false);
    projectService.updateProject(project.id, project);
    setEditedProject(project);
  }

  const showDeals = () => 
  {
    setIsShowing(!isShowing);
  }


  return (
    <div className="bg-white shadow rounded p-4 my-4">
      {isEditing ? (
        <EditProjectForm project={editedProject} onUpdate={updateProjectHandle} endEdit={() => setIsEditing(false)}/>

      ) : (
        <>
          <h2>{editedProject.title}</h2>
          {/* Display other project details as needed */}
          <button onClick={handleEdit} className="btn btn-warning mr-2">Edit</button>
          <button onClick={() => onDelete(project.id)} className="btn btn-danger mr-2">Delete</button>
          <button onClick={() => showDeals()} className="btn btn-danger">{isShowing ? "hide" : "show"}</button>

        { isShowing ?  <ListOfDeals fetchDealsFunction={ () => dealService.getDealsByIds(project.deals)}/> : null }
        </>
      )}
    </div>
  );
};

export default ProjectWidget;
