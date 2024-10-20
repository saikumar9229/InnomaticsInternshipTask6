document.addEventListener('DOMContentLoaded', loadTasks);

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');

taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskClick);
document.getElementById('filter-all').addEventListener('click', loadTasks);
document.getElementById('filter-completed').addEventListener('click', filterTasks.bind(null, true));
document.getElementById('filter-pending').addEventListener('click', filterTasks.bind(null, false));

function addTask(e) {
    e.preventDefault();
    
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;
    
    const tasks = getTasksFromLocalStorage();
    const task = { text: taskText, completed: false, dueDate, category, priority };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    taskInput.value = '';
    dueDateInput.value = '';
    categoryInput.value = '';
    priorityInput.value = '';
    
    loadTasks();
}

function loadTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate || 'N/A'}, Category: ${task.category || 'None'}, Priority: ${task.priority || 'None'})`;
        if (task.completed) li.classList.add('completed');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.dataset.index = index;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.dataset.index = index;

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function handleTaskClick(e) {
    const index = e.target.dataset.index;
    const tasks = getTasksFromLocalStorage();
    
    if (e.target.textContent === 'Complete' || e.target.textContent === 'Undo') {
        tasks[index].completed = !tasks[index].completed;
    } else if (e.target.textContent === 'Delete') {
        tasks.splice(index, 1);
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function filterTasks(completed) {
    const tasks = getTasksFromLocalStorage();
    const filteredTasks = tasks.filter(task => task.completed === completed);
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.text} (Due: ${task.dueDate || 'N/A'}, Category: ${task.category || 'None'}, Priority: ${task.priority || 'None'})`;
        if (task.completed) li.classList.add('completed');

        const completeBtn = document.createElement('button');
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.dataset.index = index;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.dataset.index = index;

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}
