document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const tasksContainer = document.getElementById('tasks');

    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            // console.log(tasks);

            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <div >
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="task-name">${task.name}</span>
                </div>
                <div class= del>
                <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            taskElement.addEventListener('click', function (e) {
                // Check if the checkbox button was clicked
                if (e.target.type === 'checkbox') {
                    // console.log(index);
                    toggleTask(index);
                }
            });

            // Insert the task element at the top
            tasksContainer.insertBefore(taskElement, tasksContainer.firstChild);
        });
        // Save tasks to localStorage after rendering
        saveTasks();
    }

    // Function to add a new task
    function addTask(taskName) {
        const newTask = {
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        renderTasks();
    }

    // Function to toggle task completion status
    function toggleTask(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for task form submission
    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskName = taskInput.value.trim();
        if (taskName !== '') {
            addTask(taskName);
            taskInput.value = '';
        }
    });

    // Event delegation for delete buttons
    tasksContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.index;
            deleteTask(index);
        }
    });

    // Initial render
    renderTasks();
});
