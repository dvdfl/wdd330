const CommentsStorageKey = "Comments";
function renderComment(comment) {
    const item = document.createElement("li");
    item.innerHTML = ` <h2>${comment.name}</h2>
          <p>${comment.date} - ${comment.content}</p>`;
    return item;
}

export default class Comments {
    constructor() {
        this.comments = this.loadComments(CommentsStorageKey);
    }

    addComment(inputId, hikeName) {
        const commentText = document.getElementById(inputId).value;
        const newComment = {
            name: hikeName,
            date: new Date(),
            content: commentText
        }
        this.comments.push(newComment);
        localStorage.setItem(CommentsStorageKey, JSON.stringify(this.comments))
    }
    loadComments(key) {
        const storedList = Storage.getData(key);
        const parsedList = storedList ? JSON.parse(storedList) : new Array();
        parsedList.forEach(c => c.date = new Date(c.date));
        return parsedList;
    }
    saveComments(task, key) {
        if (task) {
            this.comments.push(task)
        }
        Storage.setData(key, JSON.stringify(this.comments))
    }
    getAllComments() {
        return this.comments;
    }
    renderCommentList(parentEl, hikeName) {
        let comments = this.getAllComments();
        if (hikeName)
            comments = comments.filter(c => c.name === hikeName);

        parentEl.innerHTML = "";
        comments.forEach(comment => {
            parentEl.appendChild(renderComment(comment));
        });
    }
}

class Storage {
    /**
     * Returns data from local storage
     * @param {any} key
     */
    static getData(key) {
        return localStorage.getItem(key);
    }
    /**
     * Stores data in local storage
     * @param {String} name of data entry
     * @param {String} data (text or serialized object)
     */
    static setData(name, data) {
        return localStorage.setItem(name, data);
    }
}
