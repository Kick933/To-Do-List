// Handles the construction of Page.
// No event handler used inside here.
import './style.css'
import drop from './Images/drop.png';
import add from './Images/add.png';
import edit from './Images/edit.png';
import deleteIMG from './Images/delete.png';
import { storeArray, getFromLocalStorage } from './storageHandler.js';
let projectBeingDisplayed = 0;
let indexOfProjectDisplayed;
let finalArray = [];
finalArray = getFromLocalStorage();

// Project object Constructor.
function projectConstructor(title,describe){
    this.title = title;
    this.describe = describe;
    this.tasks = [];
}
function DOMconstructor(){
    const body = document.getElementsByTagName("BODY")[0];
    // Creates Page Wrapper.
    const pageWrapper = document.createElement("div");
    pageWrapper.id = 'wrapper';


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
function leftPaneConstructor(projectArray){
     //Temporarily create variables
     let totalTask = 0;
     let dueToday = 0;
     let dueThisWeek = 0;
     let totalProjects = 0;
     /////////////////////////////
     // Creates left Pane.
     const leftPane = document.createElement("div");
     leftPane.id = 'leftPane';
     leftPane.innerHTML = "";
     
 
     //Creates home option.
     const home = document.createElement('div');
     home.classList.add("flexEnd");
     const homeText = document.createElement('div');
     homeText.innerText = "Home";
     const numHomeTask = document.createElement('div');
     numHomeTask.innerText = `${totalTask}`;
     home.appendChild(homeText);
     home.appendChild(numHomeTask);
     leftPane.appendChild(home);
 
     // Creates Today option.
     const taskDueToday = document.createElement('div');
     taskDueToday.classList.add('flexEnd');
     const textTaskDueToday = document.createElement('div');
     textTaskDueToday.innerText = 'Today';
     const numTaskDueToday = document.createElement('div');
     numTaskDueToday.innerText = `${dueToday}`;
     taskDueToday.appendChild(textTaskDueToday);
     taskDueToday.appendChild(numTaskDueToday);
     leftPane.appendChild(taskDueToday);
 
 
     // Creates This Week option.
     const dueWeek = document.createElement('div');
     dueWeek.classList.add('flexEnd');
     const textWeek = document.createElement('div');
     textWeek.innerText = "This Week";
     const numThisWeek = document.createElement('div');
     numThisWeek.innerText = `${dueThisWeek}`
     dueWeek.appendChild(textWeek);
     dueWeek.appendChild(numThisWeek);
     leftPane.appendChild(dueWeek);
     // Creates Proejcts flex for projects display.
     const displayProjects = document.createElement('div');
     displayProjects.classList.add('flexColumn');
     displayProjects.id = "projectDisplay";
     // Creates Projects option.
     const optionProject = document.createElement('div');
     optionProject.classList.add('flexEnd');
     const textProject = document.createElement('div');
     textProject.innerText = "Projects";
     const container1 = document.createElement('div');
     container1.classList.add('flexRow');
     const numProject = document.createElement('div');
     numProject.innerText = `${totalProjects}`;
     const dropdown = new Image();
     dropdown.src = drop;
     dropdown.addEventListener('click', ()=>{
         displayProjects.classList.toggle('hidden');
     })
     dropdown.classList.add('enclosedIMG');
     optionProject.appendChild(textProject);
     container1.appendChild(numProject);
     container1.appendChild(dropdown);
     optionProject.appendChild(container1);
     leftPane.appendChild(optionProject);
     // Create add button inside displayProjects.
     const addProject = document.createElement('div');
     addProject.addEventListener('click',()=>{
         addNewProject();
     })
     addProject.classList.add('flexEnd');
     const textAddProject = document.createElement('div');
     textAddProject.innerText = "Add Project";
     const addBtn = new Image();
     addBtn.src = add;
     addBtn.classList.add('enclosedIMG');
     addProject.appendChild(textAddProject);
     addProject.appendChild(addBtn);
     // Adds ProjectList to displayProjects.
     const projectList = createProjectDOM(projectArray)
     // Adds add Projects Button to displayProjects.
     displayProjects.appendChild(addProject);
     displayProjects.appendChild(projectList);
     leftPane.appendChild(displayProjects);
     return leftPane;
}
// Takes getFromLocalStorage as argument.
function rightPaneConstructor(project){
    const rightPane = document.createElement('div');
    console.log(project);
    rightPane.id='rightPane';
    rightPane.innerHTML = "";


    // To show details of each project.
    const projectDescription = document.createElement('div');
    projectDescription.classList.add('flexColumn')

    // Creating project name heading.
    const headingpart = document.createElement('div');
    headingpart.classList.add("flexStretch");
    const heading  = document.createElement('h1');
    heading.innerText = `${project.title}`;
    heading.id="projectTitle";
    headingpart.appendChild(heading);
    const editIMG = new Image();
    if(projectBeingDisplayed=={
        title : "Select a project.",
        description : "Project Description will be shown here.",
        tasks : []
     } || projectBeingDisplayed =={
        title : "No Projects in task List",
        description : "Create a Project to add tasks under it.",
        tasks : []
    }){
        editIMG.classList.add('hidden');
    }else{
        editIMG.classList.remove('hidden');
    }
    editIMG.src = edit
    editIMG.classList.add("enclosedIMG");
    headingpart.appendChild(editIMG);
    projectDescription.appendChild(headingpart);

    // Creating Description of Project.
    const describe = document.createElement('p');
    describe.innerText = `${project.description}`
    describe.id="projectDescription";
    projectDescription.appendChild(describe);
    rightPane.appendChild(projectDescription);
   

    // function to render tasks.
    const taskContainer = createTaskDOM(project.tasks);
    rightPane.appendChild(taskContainer);

    return rightPane;
}

function createTaskDOM(arg){
    // Creating The task container.
    const taskContainer = document.createElement('div');
    taskContainer.id = "taskContainer";

    const addTask = document.createElement('button');
    addTask.innerText = "Add Task";
    if(projectBeingDisplayed=={
        title : "Select a project.",
        description : "Project Description will be shown here.",
        tasks : []
     } || projectBeingDisplayed =={
        title : "No Projects in task List",
        description : "Create a Project to add tasks under it.",
        tasks : []
    }){
        addTask.classList.add('hidden');
    }else{
        addTask.classList.remove('hidden');
    }
    addTask.id="addTaskBtn";
    addTask.addEventListener('click', ()=>{
        addNewTask(arg);
    })
    taskContainer.appendChild(addTask);
    for(let i = 0; i< arg.length ; i++){
        let currentTask = arg[i];
        // For individual container of each task.
        const individualContainer = document.createElement('div');
        individualContainer.classList.add('individualTaskContainer');
        individualContainer.id=`task${i}`;

        // Upper container of the task.
        const upperContainer = document.createElement('div');
        upperContainer.classList.add('flexStretch');
        upperContainer.id=`${i}`;
        // The name of task and edit and delete button are available in this part.
        const taskName = document.createElement('h2');
        taskName.innerText = `${currentTask.title}`;
        taskName.classList.add('taskName');
        // For edit Button.
        const editBtn = new Image();
        editBtn.src  = edit;
        editBtn.id=`${i}`;
        editBtn.classList.add('enclosedIMG');
        editBtn.addEventListener('click', ()=>{
            editTaskDOM(i);
        })
        const theFlex = document.createElement('div');
        theFlex.classList.add('flexAround');
        
        // For Delete Button.
        const deleteBtn = new Image();
        deleteBtn.src = deleteIMG;
        deleteBtn.id=`${i};`
        deleteBtn.classList.add('enclosedIMG'); 
        deleteBtn.addEventListener('click',()=>{
            deleteTask(i);
        })
        const timeOfTask = document.createElement("div");
        timeOfTask.classList.add('time');
        timeOfTask.innerText = `${currentTask.time}`;

        const dateOfTask = document.createElement("div");
        dateOfTask.classList.add('date');
        dateOfTask.innerText = `${currentTask.date}`;

        // Appending date and time and buttons.
        theFlex.appendChild(timeOfTask);
        theFlex.appendChild(dateOfTask);
        theFlex.appendChild(editBtn);
        theFlex.appendChild(deleteBtn)

        upperContainer.appendChild(taskName);
        upperContainer.appendChild(theFlex);
        individualContainer.appendChild(upperContainer);
        // Append task detail.
        const para = document.createElement('p');
        para.innerText = `${currentTask.detail}`;
        para.classList.add('taskDetail');
        individualContainer.appendChild(para);

        taskContainer.appendChild(individualContainer);
    }
    return taskContainer;

}

function deleteTask(i){
    finalArray[indexOfProjectDisplayed].tasks.splice(i,1);
    DOMconstructor();
}
// Also used for addition of the task to project.
function editTaskDOM(i){
    const individualContainer =  document.getElementById(`task${i}`);
    individualContainer.innerHTML = "";
    individualContainer.classList.remove('individualTaskContainer');
    individualContainer.classList.add('editTaskContainer');
    const container = document.createElement('form');
    container.classList.add('editTaskContainer');
    container.id=`taskedit${i}`;

    // Upper container of the task.
    const upperContainer = document.createElement('div');
    upperContainer.classList.add('flexStretch');
    // The name of task and edit and delete button are available in this part.
    const taskName = document.createElement('input');
    taskName.setAttribute('type','text');
    taskName.setAttribute('placeholder','Task Name')
    taskName.classList.add('inputText');
    taskName.required = true;
    // For edit Button.
    const submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.id = "taskSubmit";
    submit.innerText = "Submit";
    submit.addEventListener('click',()=>{
        
    })
    
    const theFlex = document.createElement('div');
    theFlex.classList.add('flexAround');
    
    const timeOfTask = document.createElement("input");
    timeOfTask.setAttribute('type','time');
    timeOfTask.classList.add('time');
    timeOfTask.required = true;

    const dateOfTask = document.createElement("input");
    dateOfTask.setAttribute('type','date');
    dateOfTask.classList.add('date');
    dateOfTask.required = true;

    // Appending date and time and buttons.
    theFlex.appendChild(timeOfTask);
    theFlex.appendChild(dateOfTask);
    theFlex.appendChild(submit);

    upperContainer.appendChild(taskName);
    upperContainer.appendChild(theFlex);
    individualContainer.appendChild(upperContainer);
    // Append task detail.
    const para = document.createElement('input');
    para.setAttribute('type','text');
    para.required = true;
    para.classList.add('taskDetail');
    container.appendChild(para);
    individualContainer.appendChild(container);
}
// Create deleteProject function.
function createProjectDOM(arg){
    const list = document.createElement('div');
    list.classList.add('flexColumn');
    for(let i=0; i<arg.length ; i++){
        let currentProject = arg[i];
        const project = document.createElement('div');
        project.classList.add('flexEnd');
        project.id=`project${i}`;
        const projectName = document.createElement('div');
        projectName.innerText = `${currentProject.title}`
        const deleteBtn = new Image();
        deleteBtn.classList.add('enclosedIMG');
        deleteBtn.src = deleteIMG;
        deleteBtn.addEventListener('click',()=>{
            event.stopPropagation();
            deleteProject(i);
        });
        if(projectBeingDisplayed == 0){
            // By Default
            projectBeingDisplayed = arg[i];
            indexOfProjectDisplayed = i;
        }
        project.addEventListener('click',()=>{
            projectBeingDisplayed = arg[i];
            indexOfProjectDisplayed = i;
            DOMconstructor();
        })
        project.appendChild(projectName);
        project.appendChild(deleteBtn);
        list.appendChild(project);
    }
    return list;
}
function deleteProject(i){
    finalArray.splice(i,1);
    if(finalArray.length == 0){
        projectBeingDisplayed = {
            title : "No Projects in task List",
            description : "Create a Project to add tasks under it.",
            tasks : []
        }
    }else{
        projectBeingDisplayed = {
            title : "Select a project.",
            description : "Project Description will be shown here.",
            tasks : []
         }
    }
    DOMconstructor();
}
function addNewProject(){
    const layer = document.createElement('div');
    layer.classList.add("blurLayer");
    layer.addEventListener('click',()=>{
        layer.classList.add('hidden');
        addLayer.classList.add('hidden')
    })
    const addLayer = document.createElement('div');
    addLayer.id = "addLayer";
    const title = document.createElement('input');
    title.setAttribute('type','text');
    title.setAttribute('placeholder','Name');
    title.required = true;
    const describe = document.createElement('input');
    describe.required = true;
    describe.setAttribute('type','text');
    describe.setAttribute('placeholder','Describe the project')
    const submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('placeholder','Add Project');
    submit.style.cssText = "background-color: gold;"
    submit.addEventListener('click',()=>{
        event.preventDefault();
        if(title.value == "" || describe.value == ""){
        }else{
            let newProject = new projectConstructor(title.value,describe.value);
            finalArray.push(newProject);
            console.log(finalArray);
            layer.classList.add('hidden');
            addLayer.classList.add('hidden');
            DOMconstructor();
        }
    })
    const sub = document.createElement('form');
    sub.classList.add('sub');
    sub.appendChild(title);
    sub.appendChild(describe);
    sub.appendChild(submit);
    addLayer.appendChild(sub);
    const body = document.getElementsByTagName('BODY')[0];
    body.appendChild(layer);
    body.appendChild(addLayer);
}
function addNewTask(arg){
    
}

export{ DOMconstructor as staticDOM};