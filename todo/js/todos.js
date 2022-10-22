import Storage from './ls.js';
import Helpers from './utilities.js';

const TodosStorageKey = "myTodoList"
/**
 * Creates Html list items
 * @param {Array} list
 * @param {HtmlElement} element
  */
function renderTodoList(list, element) {
    element.innerHTML = '';
    list.forEach((item, idx) => {
        element.innerHTML += `<li data-taskid="${item.id}"><label class="task-conent"><input type="checkbox" id="task${idx}" ${item.completed ? "checked": ""} />${item.content}</label><button type="button" id="RemoveTask${idx}">X</button></li>`;
    });
}
/**
 * Filters list of items
 * @param {Array} list
 * @param {Boolean} filter
 * @returns {Array} Filtered List
 */
function getFilteredList(list, filter) {
    if (filter !== null)
        return list.filter(item => item.completed === filter)
    else
        return list;
}

export default class Todos {
    constructor(listId) {
        this._listId = listId;
        this._filter = null;
        this.todoList = this.getTodos(TodosStorageKey);
        this.listTodos();
    }
    getTodos(key) {
        const storedList = Storage.getData(key);
        return storedList ? JSON.parse(storedList) : new Array();
    }
    /**
     * Saves List on local storage
     * @param {Task} task
     * @param {String} key
     */
    saveTodo(task, key) {
        if (task) {
            this.todoList.push(task)
        }
        Storage.setData(key, JSON.stringify(this.todoList))
    }

    addTodo() {
        // new task textbox element
        const newContentTbx = Helpers.qs('#newItem');
        // textbox value
        const newTodoContent = newContentTbx.value;
        // if empty exit function
        if (!newTodoContent.trim()) {
            return;
        }
        // creating new task object
        const todoItem = { id: new Date().toString(), content: newTodoContent, completed: false };
        //saving new item
        this.saveTodo(todoItem, TodosStorageKey);
        // updating UI
        newContentTbx.value = "";
        this.listTodos();
    }
    /**
     * Sets Task as completed, stores it and updates UI
     * @param {String} taskId
     * @param {HtmlElement} chbx
     */
    completeTodo(taskId, chbx) {
        // fiding task in list
        const task = this.todoList.find(task => task.id === taskId)
        // marking task completed
        task.completed = chbx.checked;
        // saving data
        this.saveTodo(null, TodosStorageKey);
    }
    /**
     * Removes Task from list
     * @param {any} taskId
     */
    removeTodo(taskId) {
        // fiding task in list
        const task = this.todoList.find(task => task.id === taskId)
        // removing item from list
        this.todoList.splice(this.todoList.indexOf(task), 1)
        //Saving data
        this.saveTodo(null, TodosStorageKey);
        //updating UI
        this.listTodos();
    }
    /**
     * Populates HTML list with filtered items 
     */
    listTodos() {
        // Filtering list
        const list = getFilteredList(this.todoList, this._filter);
        // populating HTML list
        renderTodoList(list, Helpers.qs('#' + this._listId));
        // Adding handlres for lis item elements
        Array.from(Helpers.qsa('#' + this._listId + '>li'))
            .forEach(item => {
                // Get Checkbox element
                const doneCbx = item.querySelector("input[type=checkbox]")
                // Adding handler for Checkbox
                Helpers.onChangeEl(doneCbx, () => { this.completeTodo(item.dataset.taskid, doneCbx) })
                // Get Button element
                const deleteBtn = item.querySelector("button")
                // Adding handler for Delete [X] button
                Helpers.onTouchEl(deleteBtn, () => { this.removeTodo(item.dataset.taskid) })
            });
        // Updating Task count text
        Helpers.qs("#TaskCount").innerText = this.todoList.filter(item => !item.completed).length;
    }
    /**
     * Updates list filter
     * @param {Bool} completed
     */
    filterList(completed) {
        // sets filter
        this._filter = completed;
        // Updates HTML list on page
        this.listTodos();
    }
}