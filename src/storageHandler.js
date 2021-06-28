// Handles the storage of tasks and Projects.
// Update the localStorage Array on every updation.


// Checks for already stored Data.
function taskInLocalStorage(){
    let localStorage = function(){return (storageAvailable('localStorage') ? 1 : 0);};
    if(localStorage == 1){
        let projectArray =  JSON.parse(localStorage.getItem('projectArray'));
        return projectArray;
    }else{
        return [];
    }
}
function storeInLocalStorage(arg){
    localStorage.clear();
    localStorage.setItem('projectArray',JSON.stringify(projectArray));
    console.log(projectArray);
}
// Stores task to Array and and push it to localStorage.
function storeArray(arg){
let projectArray = taskInLocalStorage();
projectArray.push(arg);
storeInLocalStorage(projectArray);
}
//To check for local storage availability.
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
// Use storeArray function to push new object to the array.
// USe taskInLocalStorage to get Data to render in DOM.

export { storeArray , taskInLocalStorage }