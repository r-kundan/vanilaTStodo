import './style.css'

interface Todo {
  title: string,
  isCompleted: boolean,
  readonly id: string,
}
const todos: Todo[] = []
// const todos: Array.[]
const todosContainer = document.querySelector(".todoContainer") as HTMLDivElement
const todoInput = document.getElementsByName("title")[0] as HTMLInputElement
const myform = document.getElementById("myform") as HTMLFormElement;
myform.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)
  }
  todos.push(todo);
  todoInput.value = ""
  renderTodo(todos)
}

const generateTodoItem = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  // creating a checkboox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox")
  checkBox.className = "iscompleted";
  checkBox.checked = isCompleted
  checkBox.onchange=()=>{
    todos.find((item)=>{
      if(item.id === id)item.isCompleted = checkBox.checked
    })
    paragraph.className =checkBox.checked ? "textCut":"";
  };

  //creating p for title
  
  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.className =checkBox.checked ? "textCut":"";

  paragraph.innerText=title
  //creating delete button
  const btn: HTMLButtonElement = document.createElement("button");


  btn.innerText = "X"
  btn.className = "deletebtn"
  btn.onclick = ()=>{
    deleteTodo(id)
  }
  //append todo item
  todo.append(
    checkBox,paragraph, btn
  )
  todosContainer.append(todo)

}
const deleteTodo =(id:string)=>{
  const idx = todos.findIndex((item)=>item.id === id)
  todos.splice(idx,1)
  renderTodo(todos)
}

const renderTodo = (todos: Todo[]) => {
  todosContainer.innerText=""
  todos.forEach((item) => {
    generateTodoItem(item.title, item.isCompleted, item.id);
  })
}
