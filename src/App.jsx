import { useState } from "react";
import NewProject from "./Components/NewProject";
import NoProjectSelected from "./Components/NoProjectSelected";
import ProjectsSidebar from "./Components/ProjectsSidebar";
import SelectedProject from "./Components/SelectedProject";

function App() {
  const [projectsState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(tasktext) {
    setProjectState((prevstate) => {
      const newTask = {
        text: tasktext,
        projectId: prevstate.selectedProjectId,
        id: Math.random(),
      };
      return {
        ...prevstate,
        tasks: [...prevstate.tasks, newTask],
      };
    });
  }

  function handleDeleteTask(id) {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        tasks: prevstate.tasks.filter((task) => task.id !== id),
      };
    });
  }

  function handleStartAddProject() {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: null,
      };
    });
  }

  function handleCancelAddProject() {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
      };
    });
  }

  function handleAddProject(projectData) {
    setProjectState((prevstate) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevstate,
        projects: [...prevstate.projects, newProject],
        selectedProjectId: undefined,
      };
    });
  }

  function handleSelectProject(id) {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: id,
      };
    });
  }

  function handleDeleteProject() {
    setProjectState((prevstate) => {
      return {
        ...prevstate,
        selectedProjectId: undefined,
        projects: prevstate.projects.filter(
          (project) => project.id !== prevstate.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );

  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectsState.tasks}
    />
  );

  if (projectsState.selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onstarAddProject={handleStartAddProject} />;
  }

  console.log(projectsState);
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onstarAddProject={handleStartAddProject}
        projects={projectsState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
