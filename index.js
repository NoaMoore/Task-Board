let tasks = [];

function init() {
    const storageTasks = localStorage.getItem("tasks");
    if (storageTasks !== null) {
        tasks = JSON.parse(storageTasks);
    }

    generateContainerNotes();
}

const today = new Date().toISOString().split('T')[0];
document.getElementById("date").setAttribute("min", today);

function generateContainerNotes() {
    let tbodyContent = '';
    for (let i = 0; i < tasks.length; i++) {
        tbodyContent += `
        <div class="noteBg-container">
            <div class="delete-button"><button onclick="deleteNote(${i})"><i class="fa fa-trash" aria-hidden="true"></i>
            </button></div>
            <div class="output-text">${tasks[i].task}</div>
            <div class="output-date">${tasks[i].date}</div>
            <div class="output-time">${tasks[i].time}</div>
        </div>
        `;
    }
    document.querySelector("#output-container").innerHTML = tbodyContent;
}

function submitHandler() {
    const form = document.forms['loginForm'];

    const task = form["task"].value;
    const date = form["date"].value;
    const time = form["time"].value;

    tasks[tasks.length] = { task: task, date: date, time: time };
    localStorage.setItem('tasks', JSON.stringify(tasks));

    generateContainerNotes();
    animateFadeIn();
}

function deleteNote(noteIndex) {
    const newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
        if (i !== noteIndex) {
            newTasks[newTasks.length] = tasks[i];
        }
    }
    tasks = newTasks;

    generateContainerNotes();
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function animateFadeIn() {
    const newTaskElement = document.querySelector(".noteBg-container:last-child");
    newTaskElement.classList.add("fadeIn");
    setTimeout(() => {
        newTaskElement.classList.remove("fadeIn");
    }, 1000);
}

init();







