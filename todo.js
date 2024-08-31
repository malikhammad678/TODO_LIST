const todoList = document.querySelector(".todoList");
const inputValue  = document.querySelector(".inputValue")
const AddBtn  = document.querySelector(".AddBtn");
let addMoreBtn = null;
const CallFunction = (value) => {
    if(value <=0) {
        alert("Please Enter Something in your to do");
        return false;
    }
    if(AddBtn.value === "Edit") {
        addMoreBtn.target.previousElementSibling.innerHTML = value;
        AddBtn.value = "Add"
        inputValue.value = "";
    }
    else{
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = value;
    li.appendChild(p);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn)
    
    const DelButton = document.createElement("button");
    DelButton.classList.add("delBtn");
    DelButton.innerText = "Remove";
    li.appendChild(DelButton)
    
    todoList.appendChild(li);
    inputValue.value = "";

    getLocalStorage(value);
    }
}
const getLocalStorage = (todo) => {
   let todos;
   if(localStorage.getItem("todos") === null){
    todos = [];
   }
   else {
    todos = JSON.parse(localStorage.getItem("todos"));
   }
   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}
AddBtn.addEventListener('click', () => {
    let inputValueTrim = inputValue.value.trim();
    CallFunction(inputValueTrim);
})
todoList.addEventListener('click', (e) => {
     if(e.target.innerHTML === "Remove"){
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodo(e.target.parentElement);
        inputValue.value = "";
     }
     if(e.target.innerHTML === "Edit") {
        inputValue.value = e.target.previousElementSibling.innerHTML;
        inputValue.focus();
        AddBtn.value = "Edit";
        addMoreBtn = e;
     }
})
document.addEventListener('DOMContentLoaded', () => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
       }
       else {
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = todo;
    li.appendChild(p);
    
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn)
    
    const DelButton = document.createElement("button");
    DelButton.classList.add("delBtn");
    DelButton.innerText = "Remove";
    li.appendChild(DelButton)
    
    todoList.appendChild(li);
        });
       }
})
const deleteLocalTodo = (todo) => {
    let todos;
   if(localStorage.getItem("todos") === null){
    todos = [];
   }
   else {
    todos = JSON.parse(localStorage.getItem("todos"));
   }
   let todoText = todo.children[0].innerHTML;
   let todoIndex = todos.indexOf(todoText);
   todos.splice(todoIndex, 1);
   localStorage.setItem("todos", JSON.stringify(todos));
}