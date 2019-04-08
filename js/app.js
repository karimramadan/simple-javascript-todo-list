let todoList = {
    todos: [],
    addTodo: function(todoText){
        this.todos.push({
            todoText: todoText,
            completed: false
        });
        view.displayTodos()
    },
    editTodo: function(position, newText){
        newText = prompt("What is in your mind?");
        this.todos[position].todoText = newText;
        view.displayTodos()
    },
    deleteTodo: function(position){
        this.todos.splice(position, 1);
        view.displayTodos()
    },
    toggleTodo: function(position){
        this.todos[position].completed = !this.todos[position].completed;
        view.displayTodos()
    },
    toggleAll: function(){
        let counter = 0;
        todoList.todos.forEach(function(todo){
            if( todo.completed === true ){
                counter++;
            }
        });
        todoList.todos.forEach(function(todo){
            if( counter === todoList.todos.length ){
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
        view.displayTodos()
    }
}

let handlers = {
    addTodo: function(){
        todoList.addTodo( document.getElementById("todo_input").value );
        document.getElementById("todo_input").value = "";
    }
}


let view = {
    displayTodos: function(){
        let todoUl = document.getElementById('todolist');
        todoUl.innerHTML = '';
        todoList.todos.forEach(function(todo, position){
            let todoLi = document.createElement('li');
            let todoText = document.createElement('span');
            todoText.innerHTML = todo.todoText;
            todoLi.appendChild( todoText );
            todoLi.className = todo.completed;
            todoLi.id = position;
            let buttonsHolder = document.createElement('div');
            buttonsHolder.className = "buttons-holder";
            todoLi.appendChild( buttonsHolder );
            buttonsHolder.appendChild( this.createUpButton() );
            buttonsHolder.appendChild( this.createDownButton() );
            buttonsHolder.appendChild( this.createToggleButton() );
            buttonsHolder.appendChild( this.createDeleteButton() );
            buttonsHolder.appendChild( this.createEditButton() );
            todoUl.appendChild( todoLi );
        }, this);
    },   
    createEditButton : function(){
        let editButton = document.createElement('button');
        editButton.className = "edit-button";
        return editButton;
    },
    createDeleteButton : function(){
        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        return deleteButton;
    },
    createToggleButton : function(){
        let toggleButton = document.createElement('button');
        toggleButton.className = "toggle-button";
        return toggleButton;
    },
    createUpButton : function(){
        let upButton = document.createElement('button');
        upButton.className = "up-button";
        return upButton;
    },
    createDownButton : function(){
        let downButton = document.createElement('button');
        downButton.className = "down-button";
        return downButton;
    }    
}


let container = document.getElementById("box");
container.addEventListener('click', function(event){
    if( event.target.id === "add-todo" ){
        handlers.addTodo();
    }
    if( event.target.className === "up-button" ){
        let li = event.target.parentNode.parentNode;
        let prevLi = li.previousElementSibling;
        let ul = li.parentNode;
        if (prevLi) {
            ul.insertBefore(li, prevLi);
        }
    }
    if( event.target.className === "down-button" ){
        let li = event.target.parentNode.parentNode;
        let nextLi = li.nextElementSibling;
        let ul = li.parentNode;
        if (nextLi) {
            ul.insertBefore(nextLi, li);
        }
    }
    if( event.target.id === "toggle-all" ){
        todoList.toggleAll();
    }
    if( event.target.className === "delete-button" ){
        todoList.deleteTodo(event.target.parentNode.parentNode.id);
    }
    if( event.target.className === "edit-button" ){
        todoList.editTodo(event.target.parentNode.parentNode.id);
    }
    if( event.target.className === "toggle-button" ){
        todoList.toggleTodo(event.target.parentNode.parentNode.id);
    }
})
