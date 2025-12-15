// --- Task 04: To-Do App Logic ---

const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');

// Utility function to format the datetime-local string for display
function formatDateTime(dateTimeString) {
    if (!dateTimeString) return '';
    try {
        const date = new Date(dateTimeString);
        // Formats to local date and time (e.g., 12/15/2025 07:27 PM)
        return ` (Due: ${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`;
    } catch (e) {
        return '';
    }
}

/**
 * Handles saving the task after editing is complete.
 */
function handleSave(listItem, newText, newDateTime) {
    const taskTextSpan = listItem.querySelector('.task-text');
    
    // 1. Update the displayed text and date/time
    const displayContent = newText + formatDateTime(newDateTime);
    taskTextSpan.textContent = displayContent;
    
    // 2. Clear temporary inputs (they were created in handleEdit)
    taskTextSpan.innerHTML = '';
    taskTextSpan.textContent = displayContent;

    // 3. Restore Edit button to 'Edit' and update its handler with new data
    const editBtn = listItem.querySelector('.edit-btn');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => handleEdit(listItem, newText, newDateTime); 

    // 4. Re-enable other buttons
    listItem.querySelectorAll('button').forEach(btn => btn.disabled = false);
}

/**
 * Initiates the editing process by replacing task text with input fields.
 */
function handleEdit(listItem, originalText, originalDateTime) {
    const taskTextSpan = listItem.querySelector('.task-text');
    
    // 1. Create and configure input fields
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = originalText;
    editInput.classList.add('edit-active-input');

    const editDateTime = document.createElement('input');
    editDateTime.type = 'datetime-local';
    editDateTime.value = originalDateTime;
    editDateTime.classList.add('edit-active-input');

    // 2. Replace the task text span content with the input fields
    taskTextSpan.innerHTML = '';
    taskTextSpan.appendChild(editInput);
    taskTextSpan.appendChild(editDateTime);
    
    // 3. Change Edit button to Save and assign new handler
    const editBtn = listItem.querySelector('.edit-btn');
    editBtn.textContent = 'Save';
    editBtn.onclick = () => handleSave(listItem, editInput.value, editDateTime.value);

    // 4. Temporarily disable other buttons while editing
    listItem.querySelectorAll('button').forEach(btn => {
        if (btn !== editBtn) btn.disabled = true;
    });
}


/**
 * Creates the HTML list item element for a new task and adds event listeners.
 */
function renderTask(taskText, dateTime) {
    const listItem = document.createElement('li');
    
    // Task Text Span (initial display)
    const taskTextSpan = document.createElement('span');
    taskTextSpan.classList.add('task-text');
    taskTextSpan.textContent = taskText + formatDateTime(dateTime);
    listItem.appendChild(taskTextSpan);

    // Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Complete';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => {
        listItem.classList.toggle('completed'); 
    });
    listItem.appendChild(completeBtn);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');
    // We pass the initial text/date to the edit handler
    editBtn.addEventListener('click', () => handleEdit(listItem, taskText, dateTime));
    listItem.appendChild(editBtn);
    
    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        listItem.remove(); // Remove the element from the DOM
    });
    listItem.appendChild(deleteBtn);

    taskList.appendChild(listItem);
}

// Form Submission Handler
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const dateTime = taskDatetime.value;

    if (taskText === '') return; 

    // Create the new task element
    renderTask(taskText, dateTime);

    // Clear inputs for next entry
    taskInput.value = '';
    taskDatetime.value = '';
});