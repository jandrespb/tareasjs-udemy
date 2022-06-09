
export class Todo {

    // Crear instancia que vengan del local storage
    static fromJson({id, tarea, completado, creado}){

        const tempTodo = new Todo(tarea);

        tempTodo.tarea_id = id;
        tempTodo.tarea_completada = completado;
        tempTodo.tarea_creacion = creado;

        return tempTodo;
    }

    constructor(tarea){

        this.tarea = tarea;

        this.tarea_id = new Date().getTime();
        this.tarea_completada = false;
        this.tarea_creacion = new Date(); 

    }

    imprimirClase(){
        console.log(`${this.tarea} - ${this.tarea_id}`);
    }
}

// getTime() se visualiza como un número 145423 úede funcionar como un id