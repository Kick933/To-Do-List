// Handles the construction of Page.
// No event handler used inside here.
import './style.css'
function projectPane(){
    const body = document.getElementsByTagName("BODY")[0];
    const container = document.createElement('div');
    container.id="wrapper"
    const pane = document.createElement("div");
    pane.id="leftPane";
    const head = document.createElement("h1");
    head.innerText ="Projects";
    pane.appendChild(head);
    // Projects cards
    const cards = document.createElement("div")
    cards.id="project-container";
    pane.appendChild(cards);
    // Add Project button.
    const addProject = document.createElement('button');
    addProject.id="addProject";
    addProject.innerText = "Add Project"; 
    // Appending to DOM    
    pane.appendChild(addProject);
    container.appendChild(pane);
    body.appendChild(container);

    // Adding eventListener to add project button.
}

export{ projectPane }