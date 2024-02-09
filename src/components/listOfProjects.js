import React, { useState, useEffect } from 'react';
import "../App.css";
import { projectService } from '../services/projectService';
import ProjectWidget from './projectWidget';

const ListOfProjects = ({fetchProjectsFuncion}) => {
  const [projects, setProjects] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await fetchProjectsFuncion();
      setProjects(allProjects);
    };
    fetchProjects();
  }, []);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
    setProjects([...projects].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 :  1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ?  1 : -1;
      }
      return  0;
    }));
  };

  const onDelete = async (id) => {
    await projectService.deleteProject(id);
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-2">
        {['title'].map((field) => (
          <button
            key={field}
            onClick={() => handleSort(field)}
            className={`px-4 py-2 ${sortConfig.key === field ? (sortConfig.direction === 'asc' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black') : ''}`}
          >
            Sort by {field.charAt(0).toUpperCase() + field.slice(1)}
            {sortConfig.key === field && (
              <span className={`ml-2 ${sortConfig.direction === 'asc' ? 'border-b-2 border-blue-500' : 'border-t-2 border-gray-500'}`}></span>
            )}
          </button>
        ))}
      </div>
      {projects.map((project) => (
        <ProjectWidget key={project.id} project={project} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ListOfProjects;
