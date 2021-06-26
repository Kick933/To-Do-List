import './style.css';
import Icon from './icon.png';
import Menu from './menu.png';
import Add from './add.png';
import { showAddPane } from './sidePane'
// Creates the Top bar.
function createTopBar(){
    // Takes Body Element reference
const body = document.getElementsByTagName("BODY")[0];
//Creates the fixed bar.
const bar = document.createElement("div");
bar.id="topBar";
// TWO different flex items to correctly align elements.
const partOne = document.createElement("div");
partOne.classList.add("rowFlex");
const partTwo = document.createElement("div");
partTwo.classList.add("rowFlex");
// Icon for the App.
const iconIMG = new Image();
iconIMG.src = Icon;
iconIMG.classList.add("navBarChild");
partOne.appendChild(iconIMG);
// Text Heading
const heading = document.createElement("h1");
heading.innerText ="To-Do-List";
// Add Button
const addIMG = new Image();
addIMG.src = Add;
addIMG.classList.add("navBarChild");
addIMG.id="addBtn";
partTwo.appendChild(addIMG);
addIMG.addEventListener('click', showAddPane);
//Menu Button
const menuIMG = new Image();
menuIMG.src = Menu;
menuIMG.classList.add("navBarChild");
menuIMG.id="menuBtn";
partTwo.appendChild(menuIMG);
bar.appendChild(partOne);
bar.appendChild(heading);
bar.appendChild(partTwo);
body.appendChild(bar);
const container = document.createElement("div");
container.id="pageWrapper";
body.appendChild(container);
}

export { createTopBar }