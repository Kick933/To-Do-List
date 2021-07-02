// Handles the storage of tasks and Projects.
// Update the localStorage Array on every updation.


// Checks for already stored Data.
function getFromLocalStorage(){
    if(storageAvailable('localStorage')){
        let project =  JSON.parse(localStorage.getItem('projectArray'));
        if(!project){
            return [
                {
                    title: "TheOdinProject",
                    description: "Learn Web Development",
                    tasks: [
                        {
                            title:"Create To-Do-List",
                            date: "dd/mm/yyyy",
                            detail: "Create using Javascript and Date-fns",
                            time: "13:01"
                        }
                    ]
                }
            ];
        }else{
            return project;
        }
    }else{
        return [
            {
                title: "TheOdinProject",
                description: "Learn Web Development",
                tasks: [
                    {
                        title:"Create To-Do-List",
                        date: "dd/mm/yyyy",
                        detail: "Create using Javascript and Date-fns",
                        time: "13:01"
                    }
                ]
            }
        ];
    }
}
function storeInLocalStorage(projectArray){
    localStorage.clear();
    localStorage.setItem('projectArray',JSON.stringify(projectArray));
}
// Stores task to Array and and push it to localStorage.
function storeArray(arg){
storeInLocalStorage(arg);
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

export { storeArray , getFromLocalStorage }