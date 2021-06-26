function createAddPane(){
    
}
function showAddPane(){
    const form = document.createElement('form');
    form.innerHTML = `
    <input type="text" placeholder = "Task Name" id="taskName">
    <input type ="date" placeholder ="dd/mm/yyyy" id="taskDate">`
}
// Temporarily giving value to the variables
let numberOfProjects = 0;
let dueThisWeek = 0;
let dueToday = 0
let dueNextDay = 0;
//
function createSidePane(){
    const container = document.getElementById('pageWrapper');
    const pane = document.createElement("div");
    pane.id="sidePane";
    const project = document.createElement('h1');
    project.innerText = `Projects : ${numberOfProjects}`;
    const today = document.createElement('h2');
    today.innerText = `Due Today : ${dueToday}`;
    const nextDay = document.createElement('h2');
    nextDay.innerText = `Due Tomorrow : ${dueNextDay}`;
    const withinWeek = document.createElement('h2');
    withinWeek.innerText = `Due This Week : ${dueThisWeek}`;
    pane.appendChild(project);
    pane.appendChild(today) ;
    pane.appendChild(nextDay);
    pane.appendChild(withinWeek);
    container.appendChild(pane);
}

export { createSidePane, showAddPane }