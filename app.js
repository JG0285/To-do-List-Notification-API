// app.js
$(document).ready(function () {
    const taskList = $('#task-list');
    const taskForm = $('#task-form');
    let editingTask = null;

    taskForm.submit(function (e) {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const title = $('#task-title').val();
        const description = $('#task-description').val();
        const dueDate = $('#task-due-date').val();
        const priority = $('#task-priority').val();

        const task = {
            title: title,
            description: description,
            dueDate: dueDate,
            priority: priority
        };

        if (editingTask) {
            // If editingTask is set, update the existing task
            editingTask.find('.title').text(title);
            editingTask.find('.description').text(description);
            editingTask.find('.due-date').text(dueDate);
            editingTask.find('.priority').text(priority);
            editingTask = null; // Reset editingTask
        } else {
            // Add task to the list
            taskList.append(`<li class="list-group-item" data-priority="${priority}">
                <span class="title">${title}</span> - <span class="description">${description}</span> - <span class="due-date">${dueDate}</span> - <span class="priority">${priority}</span>
                <button class="btn btn-warning btn-sm float-right edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
                </li>`);
        }

        // Clear the form fields
        taskForm[0].reset();

        // Save tasks to local storage
        saveTasksToLocalStorage();

        // Enable Autocomplete for task titles
        enableAutocomplete();

        // Set a reminder if due date is approaching
        setReminder(task);
    }

    // Enable jQuery UI Autocomplete for task titles
    function enableAutocomplete() {
        // You need to populate this array with existing task titles from local storage
        const taskTitles = ["Task 1", "Task 2", "Task 3"];

        $('#task-title').autocomplete({
            source: taskTitles
        });
    }

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        // Fetch existing tasks from local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Add the new task
        tasks.push({
            title: $('#task-title').val(),
            description: $('#task-description').val(),
            dueDate: $('#task-due-date').val(),
            priority: $('#task-priority').val()
        });

        // Save tasks back to local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Set a reminder using Notification API
    function setReminder(task) {
        // Implement reminder logic here
        // Check if the due date is approaching and send a notification
        // You may need to request permission to show notifications using Notification.requestPermission()
    }

    // Load tasks from local storage on page load
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Render tasks in the list
        tasks.forEach(function (task) {
            taskList.append(`<li class="list-group-item" data-priority="${task.priority}">
                ${task.title} - ${task.description} - ${task.dueDate} - ${task.priority}
                <button class="btn btn-warning btn-sm float-right edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm float-right delete-btn">Delete</button>
                </li>`);
        });
    }

    // Delete task when the delete button is clicked
    taskList.on('click', '.delete-btn', function () {
        $(this).closest('li').remove();
        saveTasksToLocalStorage();
    });

    taskList.on('click', '.edit-btn', function () {
        // Populate the task details into the form for editing
        editingTask = $(this).closest('li');
        const title = editingTask.find('.title').text();
        const description = editingTask.find('.description').text();
        const dueDate = editingTask.find('.due-date').text();
        const priority = editingTask.find('.priority').text();

        // Set the form fields with task details
        $('#task-title').val(title);
        $('#task-description').val(description);
        $('#task-due-date').val(dueDate);
        $('#task-priority').val(priority);
    });

    // Load tasks from local storage on page load
    loadTasksFromLocalStorage();
});
