// Handles the construction of Page.
// No event handler used inside here.
import "./style.css";
import drop from "./Images/drop.png";
import add from "./Images/add.png";
import edit from "./Images/edit.png";
import deleteIMG from "./Images/delete.png";
import { storeArray, getFromLocalStorage } from "./storageHandler";

let projectBeingDisplayed = 0;
let indexOfProjectDisplayed;
let finalArray = [];
finalArray = getFromLocalStorage();
// Project object Constructor.
function projectConstructor(title, description) {
  this.title = title;
  this.description = description;
  this.tasks = [
    {
      date: "dd/mm/yyyy",
      detail: "It is a Sample task",
      time: "11:01",
      taskTitle: "Sample Task",
    },
  ];
}
function TaskConstructor(taskTitle, detail, date, time) {
  (this.taskTitle = taskTitle),
    (this.detail = detail),
    (this.date = date),
    (this.time = time);
}

function DOMconstructor() {
  const body = document.getElementsByTagName("BODY")[0];
  body.innerHTML = "";
  // Creates Page Wrapper.
  const pageWrapper = document.createElement("div");
  pageWrapper.id = "wrapper";

  // Appending Left Pane to pageWrapper.
  const leftPane = leftPaneConstructor(finalArray);
  pageWrapper.appendChild(leftPane);

  // Appending Left Pane to pageWrapper.
  const rightPane = rightPaneConstructor(projectBeingDisplayed);
  pageWrapper.appendChild(rightPane);

  //Append pageWrapper to body;
  body.appendChild(pageWrapper);
  // updates locally stored data.
  storeArray(finalArray);
}

// Function to construct left Pane.
function leftPaneConstructor(projectArray) {
  //Temporarily create variables
  let totalTask = 0;
  let dueToday = 0;
  let dueThisWeek = 0;
  let totalProjects = projectArray.length;
  /////////////////////////////
  // Creates left Pane.
  const leftPane = document.createElement("div");
  leftPane.id = "leftPane";
  leftPane.innerHTML = "";

  // Creates Today option.
  const taskDueToday = document.createElement("div");
  taskDueToday.classList.add("flexEnd");
  const textTaskDueToday = document.createElement("div");
  textTaskDueToday.innerText = "Today";
  const numTaskDueToday = document.createElement("div");
  numTaskDueToday.innerText = `${dueToday}`;
  taskDueToday.appendChild(textTaskDueToday);
  taskDueToday.appendChild(numTaskDueToday);
  leftPane.appendChild(taskDueToday);

  // Creates This Week option.
  const dueWeek = document.createElement("div");
  dueWeek.classList.add("flexEnd");
  const textWeek = document.createElement("div");
  textWeek.innerText = "This Week";
  const numThisWeek = document.createElement("div");
  numThisWeek.innerText = `${dueThisWeek}`;
  dueWeek.appendChild(textWeek);
  dueWeek.appendChild(numThisWeek);
  leftPane.appendChild(dueWeek);
  // Creates Proejcts flex for projects display.
  const displayProjects = document.createElement("div");
  displayProjects.classList.add("flexColumn");
  displayProjects.id = "projectDisplay";
  // Creates Projects option.
  const optionProject = document.createElement("div");
  optionProject.classList.add("flexEnd");
  const textProject = document.createElement("div");
  textProject.innerText = "Projects";
  const container1 = document.createElement("div");
  container1.classList.add("flexRow");
  const numProject = document.createElement("div");
  numProject.innerText = `${totalProjects}`;
  const dropdown = new Image();
  dropdown.src = drop;
  dropdown.addEventListener("click", () => {
    displayProjects.classList.toggle("hidden");
  });
  dropdown.classList.add("enclosedIMG");
  optionProject.appendChild(textProject);
  container1.appendChild(numProject);
  container1.appendChild(dropdown);
  optionProject.appendChild(container1);
  leftPane.appendChild(optionProject);
  // Create add button inside displayProjects.
  const addProject = document.createElement("div");
  addProject.addEventListener("click", () => {
    addNewProject();
  });
  addProject.classList.add("flexEnd");
  const textAddProject = document.createElement("div");
  textAddProject.innerText = "Add Project";
  const addBtn = new Image();
  addBtn.src = add;
  addBtn.classList.add("enclosedIMG");
  addProject.appendChild(textAddProject);
  addProject.appendChild(addBtn);
  // Adds ProjectList to displayProjects.
  const projectList = createProjectDOM(projectArray);
  // Adds add Projects Button to displayProjects.
  displayProjects.appendChild(addProject);
  displayProjects.appendChild(projectList);
  leftPane.appendChild(displayProjects);
  return leftPane;
}
// Takes getFromLocalStorage as argument.
function rightPaneConstructor(project) {
  const rightPane = document.createElement("div");
  rightPane.id = "rightPane";
  rightPane.innerHTML = "";

  // To show details of each project.
  const projectDescription = document.createElement("div");
  projectDescription.classList.add("flexColumn");

  // Creating project name heading.
  const headingpart = document.createElement("div");
  headingpart.classList.add("flexStretch");
  const heading = document.createElement("h1");
  heading.innerText = `${project.title}`;
  heading.id = "projectTitle";
  headingpart.appendChild(heading);
  const editIMG = new Image();
  if (
    projectBeingDisplayed ==
      {
        title: "Select a project.",
        description: "Project Description will be shown here.",
        tasks: [],
      } ||
    projectBeingDisplayed ==
      {
        title: "No Projects in task List",
        description: "Create a Project to add tasks under it.",
        tasks: [],
      }
  ) {
    editIMG.classList.add("hidden");
  } else {
    editIMG.classList.remove("hidden");
  }
  editIMG.src = edit;
  editIMG.classList.add("enclosedIMG");
  editIMG.addEventListener("click", () => {
    editProject(indexOfProjectDisplayed);
  });
  headingpart.appendChild(editIMG);
  projectDescription.appendChild(headingpart);

  // Creating Description of Project.
  const describe = document.createElement("p");
  describe.innerText = `${project.description}`;
  describe.id = "projectDescription";
  projectDescription.appendChild(describe);
  rightPane.appendChild(projectDescription);

  // function to render tasks.
  const taskContainer = createTaskDOM(project.tasks);
  rightPane.appendChild(taskContainer);

  return rightPane;
}

function createTaskDOM(arg) {
  // Creating The task container.
  const taskContainer = document.createElement("div");
  taskContainer.id = "taskContainer";

  const addTask = document.createElement("button");
  addTask.innerText = "Add Task";
  if (
    projectBeingDisplayed ==
      {
        title: "Select a project.",
        description: "Project Description will be shown here.",
        tasks: [],
      } ||
    projectBeingDisplayed ==
      {
        title: "No Projects in task List",
        description: "Create a Project to add tasks under it.",
        tasks: [],
      }
  ) {
    addTask.classList.add("hidden");
  } else {
    addTask.classList.remove("hidden");
  }
  addTask.id = "addTaskBtn";
  addTask.addEventListener("click", () => {
    addNewTask(arg);
  });
  taskContainer.appendChild(addTask);
  for (let i = 0; i < arg.length; i++) {
    let currentTask = arg[i];
    // For individual container of each task.
    const individualContainer = document.createElement("div");
    individualContainer.classList.add("individualTaskContainer");
    individualContainer.id = `task${i}`;

    // Upper container of the task.
    const upperContainer = document.createElement("div");
    upperContainer.classList.add("flexStretch");
    upperContainer.id = `${i}`;
    // The name of task and edit and delete button are available in this part.
    const taskName = document.createElement("h2");
    taskName.innerText = `${currentTask.taskTitle}`;
    taskName.classList.add("taskName");
    // For edit Button.
    const editBtn = new Image();
    editBtn.src = edit;
    editBtn.id = `${i}`;
    editBtn.classList.add("enclosedIMG");
    editBtn.addEventListener("click", () => {
      editTaskDOM(i);
    });
    const theFlex = document.createElement("div");
    theFlex.classList.add("flexAround");

    // For Delete Button.
    const deleteBtn = new Image();
    deleteBtn.src = deleteIMG;
    deleteBtn.id = `${i};`;
    deleteBtn.classList.add("enclosedIMG");
    deleteBtn.addEventListener("click", () => {
      deleteTask(i);
    });
    const timeOfTask = document.createElement("div");
    timeOfTask.classList.add("time");
    timeOfTask.innerText = `${currentTask.time}`;

    const dateOfTask = document.createElement("div");
    dateOfTask.classList.add("date");
    dateOfTask.innerText = `${currentTask.date}`;

    // Appending date and time and buttons.
    theFlex.appendChild(timeOfTask);
    theFlex.appendChild(dateOfTask);
    theFlex.appendChild(editBtn);
    theFlex.appendChild(deleteBtn);

    upperContainer.appendChild(taskName);
    upperContainer.appendChild(theFlex);
    individualContainer.appendChild(upperContainer);
    // Append task detail.
    const para = document.createElement("p");
    para.innerText = `${currentTask.detail}`;
    para.classList.add("taskDetail");
    individualContainer.appendChild(para);

    taskContainer.appendChild(individualContainer);
  }
  return taskContainer;
}

function deleteTask(i) {
  finalArray[indexOfProjectDisplayed].tasks.splice(i, 1);
  DOMconstructor();
}
// Also used for addition of the task to project.
function editTaskDOM(i) {
  const currentEditTask = finalArray[indexOfProjectDisplayed].tasks[i];
  const individualContainer = document.getElementById(`task${i}`);
  individualContainer.innerHTML = "";
  individualContainer.classList.remove("individualTaskContainer");
  individualContainer.classList.add("editTaskContainer");
  const container = document.createElement("form");
  container.classList.add("editTaskContainer");
  container.id = `taskedit${i}`;

  // Upper container of the task.
  const upperContainer = document.createElement("div");
  upperContainer.classList.add("flexStretch");
  // The name of task and edit and delete button are available in this part.
  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("value", `${currentEditTask.taskTitle}`);
  taskName.classList.add("inputText");
  taskName.required = true;
  // For edit Button.
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  submitBtn.id = "taskSubmit";
  submitBtn.addEventListener("click", () => {
    if (
      taskName.value == "" ||
      para.value == "" ||
      timeOfTask.value == "" ||
      dateOfTask == ""
    ) {
    } else {
      // For Task Name edit
      finalArray[indexOfProjectDisplayed].tasks[i].taskTitle = taskName.value;
      finalArray[indexOfProjectDisplayed].tasks[i].date = dateOfTask.value;
      finalArray[indexOfProjectDisplayed].tasks[i].time = timeOfTask.value;
      finalArray[indexOfProjectDisplayed].tasks[i].detail = para.value;
      DOMconstructor();
    }
  });

  const theFlex = document.createElement("div");
  theFlex.classList.add("flexAround");

  const timeOfTask = document.createElement("input");
  timeOfTask.setAttribute("type", "time");
  timeOfTask.setAttribute("value", `${currentEditTask.time}`);
  timeOfTask.classList.add("time");
  timeOfTask.required = true;

  const dateOfTask = document.createElement("input");
  dateOfTask.setAttribute("type", "date");
  dateOfTask.setAttribute("value", `${currentEditTask.date}`);
  dateOfTask.classList.add("date");
  dateOfTask.required = true;

  // Appending date and time and buttons.
  theFlex.appendChild(timeOfTask);
  theFlex.appendChild(dateOfTask);
  theFlex.appendChild(submitBtn);

  upperContainer.appendChild(taskName);
  upperContainer.appendChild(theFlex);
  individualContainer.appendChild(upperContainer);
  // Append task detail.
  const para = document.createElement("input");
  para.setAttribute("type", "text");
  para.setAttribute("value", `${currentEditTask.detail}`);
  para.required = true;
  para.classList.add("taskDetail");
  container.appendChild(para);
  individualContainer.appendChild(container);
}
// Create deleteProject function.
function createProjectDOM(arg) {
  const list = document.createElement("div");
  list.classList.add("flexColumn");
  if (arg.length == 0) {
    return;
  } else {
    for (let i = 0; i < arg.length; i++) {
      let currentProject = arg[i];
      const project = document.createElement("div");
      project.classList.add("flexEnd");
      project.id = `project${i}`;
      const projectName = document.createElement("div");
      projectName.innerText = `${currentProject.title}`;
      const deleteBtn = new Image();
      deleteBtn.classList.add("enclosedIMG");
      deleteBtn.src = deleteIMG;
      deleteBtn.addEventListener("click", () => {
        event.stopPropagation();
        deleteProject(i);
      });
      if (projectBeingDisplayed == 0) {
        // By Default
        projectBeingDisplayed = arg[i];
        indexOfProjectDisplayed = i;
      }
      project.addEventListener("click", () => {
        projectBeingDisplayed = arg[i];
        indexOfProjectDisplayed = i;
        DOMconstructor();
      });
      project.appendChild(projectName);
      project.appendChild(deleteBtn);
      list.appendChild(project);
    }

    return list;
  }
}
function deleteProject(i) {
  finalArray.splice(i, 1);
  if (finalArray.length == 0) {
    addNewProject();
  } else {
    projectBeingDisplayed = {
      title: "Select a project.",
      description: "Project Description will be shown here.",
      tasks: [],
    };
    DOMconstructor();
  }
}
function addNewProject() {
  const layer = document.createElement("div");
  layer.classList.add("blurLayer");
  layer.addEventListener("click", () => {
    layer.remove();
    addLayer.remove();
  });
  const addLayer = document.createElement("div");
  addLayer.id = "addLayer";

  const sub = document.createElement("form");
  sub.classList.add("sub");

  const projTitle = document.createElement("input");
  projTitle.setAttribute("type", "text");
  projTitle.setAttribute("placeholder", "Name");
  projTitle.required = true;
  const projDescribe = document.createElement("input");
  projDescribe.required = true;
  projDescribe.setAttribute("type", "text");
  projDescribe.setAttribute("placeholder", "Describe the project");
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Add Project");
  submitBtn.addEventListener("click", () => {
    event.preventDefault();
    if (projTitle.value == "" || projDescribe.value == "") {
    } else {
      let newProject = new projectConstructor(
        projTitle.value,
        projDescribe.value
      );
      finalArray.push(newProject);
      layer.remove();
      addLayer.remove();
      DOMconstructor();
    }
  });

  sub.appendChild(projTitle);
  sub.appendChild(projDescribe);
  sub.appendChild(submitBtn);
  addLayer.appendChild(sub);
  const body = document.getElementsByTagName("BODY")[0];
  body.appendChild(layer);
  body.appendChild(addLayer);
}
function addNewTask(arg) {
  const aContainer = document.createElement("form");
  aContainer.id = `${arg.length}`;
  aContainer.classList.remove("individualTaskContainer");
  aContainer.classList.add("editTaskContainer");
  const container = document.createElement("form");
  container.classList.add("editTaskContainer");

  // Upper container of the task.
  const upperContainer = document.createElement("div");
  upperContainer.classList.add("flexStretch");
  // The name of task and edit and delete button are available in this part.
  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.setAttribute("placeholder", "Name of Task");
  taskName.classList.add("inputText");
  taskName.required = true;
  // For edit Button.
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("value", "Submit");
  submitBtn.id = "taskSubmit";
  submitBtn.addEventListener("click", () => {
    if (
      taskName.value == "" ||
      para.value == "" ||
      timeOfTask.value == "" ||
      dateOfTask.value == ""
    ) {
    } else {
      // For Task Name edit
      const newTask = new TaskConstructor(
        taskName.value,
        para.value,
        dateOfTask.value,
        dateOfTask.value
      );
      console.log(newTask);
      finalArray[indexOfProjectDisplayed].tasks.push(newTask);
      DOMconstructor();
    }
  });
  const cancelBtn = document.createElement("button");
  cancelBtn.innerText = "Cancel";
  cancelBtn.addEventListener("click", () => {
    aContainer.remove();
  });

  const theFlex = document.createElement("div");
  theFlex.classList.add("flexAround");

  const timeOfTask = document.createElement("input");
  timeOfTask.setAttribute("type", "time");
  timeOfTask.setAttribute("value", "hh:mm AM");
  timeOfTask.classList.add("time");
  timeOfTask.required = true;

  const dateOfTask = document.createElement("input");
  dateOfTask.setAttribute("type", "date");
  dateOfTask.setAttribute("value", "01/01/2021");
  dateOfTask.classList.add("date");
  dateOfTask.required = true;

  // Appending date and time and buttons.
  theFlex.appendChild(timeOfTask);
  theFlex.appendChild(dateOfTask);
  theFlex.appendChild(submitBtn);

  upperContainer.appendChild(taskName);
  upperContainer.appendChild(theFlex);
  aContainer.appendChild(upperContainer);
  // Append task detail.
  const para = document.createElement("input");
  para.setAttribute("type", "text");
  para.setAttribute("value", "Details of The Task");
  para.required = true;
  para.classList.add("taskDetail");
  para.style.width = "50%";
  container.appendChild(para);
  container.appendChild(cancelBtn);
  container.classList.add("flexAround");
  container.style.width = "90% !important";
  aContainer.appendChild(container);
  document.getElementById("taskContainer").appendChild(aContainer);
}
function editProject(i) {
  const layer = document.createElement("div");
  layer.classList.add("blurLayer");
  layer.addEventListener("click", () => {
    layer.classList.add("hidden");
    addLayer.classList.add("hidden");
  });
  const addLayer = document.createElement("div");
  addLayer.id = "addLayer";

  const sub = document.createElement("form");
  sub.classList.add("sub");

  const titleOfProject = document.createElement("input");
  titleOfProject.setAttribute("type", "text");
  titleOfProject.setAttribute("placeholder", `${finalArray[i].title}`);
  titleOfProject.required = true;
  const describe = document.createElement("input");
  describe.required = true;
  describe.setAttribute("type", "text");
  describe.setAttribute("placeholder", `${finalArray[i].description}`);
  const submitBtn = document.createElement("input");
  submitBtn.setAttribute("type", "submit");
  submitBtn.setAttribute("placeholder", "Edit Project");
  submitBtn.addEventListener("click", () => {
    event.preventDefault();
    if (titleOfProject.value === "" || describe.value === "") {
    } else {
      finalArray[i].title = titleOfProject.value;
      finalArray[i].description = describe.value;
      layer.remove();
      addLayer.remove();
      DOMconstructor();
    }
  });

  sub.appendChild(titleOfProject);
  sub.appendChild(describe);
  sub.appendChild(submitBtn);
  addLayer.appendChild(sub);
  const body = document.getElementsByTagName("BODY")[0];
  body.appendChild(layer);
  body.appendChild(addLayer);
}

export { DOMconstructor as staticDOM };
