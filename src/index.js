import './styles.css';
import {Todo, TodoList} from './classes'
import { crearTodoHtml } from './js/componentes';



export const todoList = new TodoList();

// Primera forma llamar procedimiento de los todos cuando creamos las tareas
// todoList.todos.forEach(todo => {
//     crearTodoHtml(todo);
// });
// Segunda forma de ejecutar
todoList.todos.forEach(crearTodoHtml);

console.log('todos', todoList.todos);