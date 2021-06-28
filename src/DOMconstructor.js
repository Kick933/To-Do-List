// Handles the construction of Page.
// No event handler used inside here.
import './style.css'
import drop from './Images/drop.png';

function staticDOMconstructor(){
    const body = document.getElementsByTagName("BODY")[0];


    // Creates Page Wrapper.
    const pageWrapper = document.createElement("div");
    pageWrapper.id = 'wrapper';

    //Temporarily create variables
    let totalTask = 0;
    let dueToday = 0;
    let dueThisWeek = 0;
    let totalProjects = 0;
    /////////////////////////////
    // Creates left Pane.
    const leftPane = document.createElement("div");
    leftPane.id = 'leftPane';
    

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

    // Creates Projects option.
    const optionProject = document.createElement('div');
    optionProject.classList.add('flexEnd');
    const textProject = document.createElement('div');
    textProject.innerText = "Projects";
    const container1 = document.createElement('div');
    container1.classList.add('flex');
    const numProject = document.createElement('div');
    numProject.innerText = `${totalProjects}`;
    const dropdown = new Image();
    dropdown.src = drop;
    dropdown.classList.add('enclosedIMG');
    optionProject.appendChild(textProject);
    container1.appendChild(numProject);
    container1.appendChild(dropdown);
    optionProject.appendChild(container1)
    leftPane.appendChild(optionProject);
    

    // Creates Right Pane.
    const rightPane = document.createElement("div");
    rightPane.id = 'rightPane';



    //Append Panes to pageWrapper.
    pageWrapper.appendChild(leftPane);
    pageWrapper.appendChild(rightPane);

    //Append pageWrapper to body;
    body.appendChild(pageWrapper);
}

export{ staticDOMconstructor as staticDOM};