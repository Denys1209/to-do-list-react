import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import DealForm from "./components/dealForm";
import { dealService } from "./services/dealService";
import ListOfDeals from "./components/listOfDeals";
import ListOfProjects from "./components/listOfProjects";
import ProjectForm from "./components/projectForm";
import { projectService } from "./services/projectService";

function App() {
 const [activeWidget, setActiveWidget] = useState("all-deals");

 const handleWidgetChange = (widgetName) => {
    setActiveWidget(widgetName);
 };
 return (
    <Router>
      <div className="flex"> {/* Move the flex class here */}
        <div className="flex flex-col min-h-screen"> {/* Keep this div for the SideBar */}
          <SideBar onWidgetChange={handleWidgetChange} />
        </div>
        <main className="flex-grow min-h-screen m-4 border-gray-200"> {/* Keep this div for the main content */}
          {activeWidget === "all-deals" && <ListOfDeals fetchDealsFunction={() => dealService.getAllDeals()}/>}
          {activeWidget === "all-projects" && <ListOfProjects fetchProjectsFuncion={() => projectService.getAllProjects()}/>}
          {activeWidget === "today-deals" && <ListOfDeals fetchDealsFunction={() => dealService.getDealsForToday()}/>}
          {activeWidget === "week-deals" && <ListOfDeals fetchDealsFunction={() => dealService.getDealsForThisWeek()}/>}
          {activeWidget === "month-deals" && <ListOfDeals fetchDealsFunction={() => dealService.getDealsForThisMonth()}/>}
          {activeWidget === "create-new-project" && <ProjectForm onCreate={projectService.createProject}/>}
          {activeWidget === "create-new-deal" && <DealForm onCreate={dealService.createDeal} />}
        </main>
      </div>
    </Router>
 );
}

export default App;
