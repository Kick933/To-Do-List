import './style.css';
import Icon from './icon.png';
// Creates the Top bar.
function createTopBar(){
const body = document.getElementsByTagName("BODY")[0];
const bar = document.createElement("div");
bar.id="topBar";
const iconImg = new Image();
iconImg.src = Icon;
iconImg.classList.add("navBarChild");
bar.appendChild(iconImg);
const heading = document.createElement("h1");
heading.innerText ="To-Do-List";
heading.classList.add = "navBarChild";
bar.appendChild(heading);
body.appendChild(bar);
}

export { createTopBar }