import {AxiosError} from "axios";
import {Todo, TodoCreate} from "@/src/dto/todo.dtos";
import {deleteATodoById, findAllTodos, findATodoById, saveATodo} from "@/src/action/todo.actions";
import {TodoError} from "@/src/exception/todo.exceptions";
import {APIException} from "@/src/exception/api.exception";

const service_endpoint:string = process.env.api_url + "/v1/todos"
export const  TodoService = {
    createATodo: async function(todo:TodoCreate) : Promise<Todo|TodoError> {
        try{
            return await saveATodo(service_endpoint, todo);
        }catch(e){
            if(e instanceof AxiosError){
                return e as APIException;
            }
            return e as TodoError
        }
    },

    getAllTodos: async function(): Promise<Todo[]|TodoError> {
        try{
            return  await findAllTodos(service_endpoint);
        }catch(e){
            if(e instanceof AxiosError){
                return e as APIException;
            }
            return e as TodoError
        }
    },
    getATodo: async function(todoId:string): Promise<Todo|TodoError> {
        try{
            return await findATodoById(service_endpoint, todoId);
        }catch(e){
            if(e instanceof AxiosError){
                return e as APIException;
            }
            return e as TodoError
        }
    },

    async deleteATodo(todoId:string) : Promise<void|TodoError> {
        try{
            await deleteATodoById(service_endpoint, todoId);
        }catch(e){
            if(e instanceof AxiosError){
                return e as APIException;
            }
            return e as TodoError
        }
    }
}