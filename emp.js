document.addEventListener('DOMContentLoaded', function () {
    const taskForm=document.getElementById("taskForm")
    const taskInput=document.getElementById("taskInput")
    const tasksContainer=getElementById("tasks")
    
    let tasks=JSON.parse(localStorage.getItem("task"))||[];
    console.log(tasks);
})
