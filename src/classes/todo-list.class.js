import { Todo } from "./todo.class";


export class TodoList {

    constructor(){

        //this.todos = [];
        this.cargarLocalStorage();
    }

    // recibir una tarea y insertar en el arreglo todos
    nuevoTodo(todo){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    // borrar tareas
    eliminarTodo(id){

        // callback
        this.todos = this.todos.filter(todo => todo.tarea_id != id);
        this.guardarLocalStorage();

    }

    // Cambiar estados del tod, si esta completado o no
    marcarEstadoCompletados(id){
   
        // barrer el arreglo
        for(const todo of this.todos){
            
            console.log(todo.tarea_id , id);

            // Condicional en caso de que el id sea igual al id del arreglo
            if(todo.tarea_id == id){
                todo.tarea_completada = !todo.tarea_completada;
                this.guardarLocalStorage();
                break;
            }
        }

    }

    eliminarCompletados(id){
         // callback
         this.todos = this.todos.filter(todo => !todo.tarea_completada);
         this.guardarLocalStorage();
    }

    guardarLocalStorage(){

        // almacenar to do 
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }

    cargarLocalStorage(){

        // verificar si el objeto existe del to do del localstorage

        // Primera posibilidad de hacer esta validación
        // if(localStorage.getItem('todo')){

            
        //     this.todos = JSON.parse(localStorage.getItem('todo'));
        //     // Observar en consola que pasa en el localstorage
        //     console.log('cargarLocal: ', this.todos);
        //     //verificar que tip es
        //     console.log(typeof(this.todos));

        // }else {
        //     // en caso que no exista el objeto
        //     this.todos = [];
        // }
         // Segunda forma
         this.todos = (localStorage.getItem('todo')) ?
              JSON.parse(localStorage.getItem('todo')): 
              this.todos = [];

    
        // primera opcion callback obj
        //this.todos = this.todos.map(obj => Todo.fromJson(obj));
        // segunda opcion
        this.todos = this.todos.map(Todo.fromJson);


    }

}