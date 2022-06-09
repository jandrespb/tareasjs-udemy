import { Todo } from "../classes";
import {todoList} from "../index"

// Referencias en el html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

// Métodos 
export const crearTodoHtml = (todo) => {

    const htmlTodo = `
     <li class="${(todo.tarea_completada)?'completed':''}" data-id="${todo.tarea_id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${(todo.tarea_completada)?'checked':''}>
					<label>${todo.tarea}</label>
					<button class="destroy"></button>
			</div>
				<input class="edit" value="Create a TodoMVC template">
		</li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);

    return div.firstElementChild;
}

// Eventos
// ev1
txtInput.addEventListener('keyup', (event) =>{
 
    if( event.keyCode === 13 && txtInput.value.length > 0){

        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        todoList.nuevoTodo(nuevoTodo);
        console.log(todoList);

        // agregar la tarea al html para que se visualice
        crearTodoHtml(nuevoTodo); 
        // limpiar los campos una vez escrito en el campo de texto (front)
        txtInput.value = '';

    }
});

// ev2
divTodoList.addEventListener('click', function(event){

    // Nos ayuda identificar el tipo de elemento en el navegador al seleccionar un txt, label, etc
    const nombreElemento = event.target.localName;
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id'); // obtenemos del index.html <li>

    console.log(nombreElemento);

  // Validación del check, si realizo o no la tarea
  if(nombreElemento.includes('input')){

      todoList.marcarEstadoCompletados(todoId);
      todoElemento.classList.toggle('completed');

  }else if(nombreElemento.includes('button')){
      // Hay que borrar el todo
      todoList.eliminarTodo(todoId);
      divTodoList.removeChild(todoElemento);
  }

  console.log(todoList);

});

// ev3
btnBorrarCompletados.addEventListener('click', () => {
    todoList.eliminarCompletados();

    // recorrido de las tareas pero desde el último del registro hasta el inicio
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        
        // Condicional si el elemento esta completado a traves de la clase
        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }

    }
});

// ev4
ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;

    // Condicional si el filtro contiene algo
    if(!filtro){return;}
    
    // limpiar elementos
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    // Cilo for
    for(const elemento of divTodoList.children){

        // remover la claase hidden del css del archivo styles.css
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
    

});



// label Traemos desde nuestro archivo todo.class.js ${todo.tarea}
// validación ternaria ${(todo.tarea_completada)?} la condicion viene de la clase todo.class.js
// ${todo.tarea_id} desde nuestro archivo todo.class.js

// first element child nos ayuda a que nuestro <li> aparezca primero, el orden 
// anterior ul, div, li, div como debe quedar: ul, li, div 

// keyup es lo que ingresamos por teclado en la página (front), cuando usamos esto tener en cuenta en consola
// navegador el value y el keycode