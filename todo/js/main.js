import Todos from './todos.js';
import Helpers from './utilities.js';

// Todos class instantiated
const todos = new Todos('mainList');

// Setting handlre for form
Helpers.qs('#addItemForm').addEventListener('submit', function (ev) {
    // Calling functio to add task
    todos.addTodo();
    // prevent form submission
    ev.stopPropagation();
    ev.preventDefault();
})

const setSelection = (completed, buttonId) => {
    todos.filterList(completed);
    const button = Helpers.qs(buttonId);
    const filterButtons = button.parentNode.querySelectorAll("button");
    Array.from(filterButtons).forEach((el) => el.classList.remove("selected"))
    button.classList.add("selected")
};

// Adding handling for filters
Helpers.onTouch('#filterNone', () => setSelection(null, '#filterNone'))
Helpers.onTouch('#filterActive', () => setSelection(false, '#filterActive'))
Helpers.onTouch('#filterCompleted', () => setSelection(true, '#filterCompleted'))