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
    },
    toggleTodo: function(){
        todoList.todos.forEach(function(todo){
            todoUl.addEventListener("click", function(event){
                concole.log(event.target.id);
                if( event.target.className === "todoli" ){
                    todoList.toggleTodo(event.target.id)
                }
            })
        });
        view.displayTodos()
    }    
}


let view = {
    displayTodos: function(){
        let todoUl = document.getElementById('todolist');
        todoUl.innerHTML = '';
        todoList.todos.forEach(function(todo, position){
            let todoLi = document.createElement('li');
            todoLi.innerHTML = todo.todoText;
            todoLi.className = todo.completed;
            todoLi.id = position;
            todoLi.appendChild( this.createDeleteButton() );
            todoUl.appendChild( todoLi );
        }, this);
    },
    createDeleteButton : function(){
        let deleteButton = document.createElement('button');
        deleteButton.className = "delete-button";
        // deleteButton.innerText = "Delete";
        return deleteButton;
    }
}


let todoUl = document.getElementById('todolist');
todoUl.addEventListener('click', function(event){
    if( event.target.className === "delete-button" ){
        todoList.deleteTodo(event.target.parentNode.id);
    }    
})