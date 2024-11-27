import {AxiosError} from "axios";
import {Todo, TodoCreate} from "@/src/dto/todo.dtos";
import {deleteATodoById, findAllTodos, findATodoById, saveATodo, updateATodo} from "@/src/action/todo.actions";
import {TodoError} from "@/src/exception/todo.exceptions";
import {APIException} from "@/src/exception/api.exception";

const service_endpoint:string = "http://localhost:8081/api" + "/v1/todos"
export const  TodoService = {
    createATodo: async function(todo:TodoCreate) : Promise<Todo> {
        try{
            return await saveATodo(service_endpoint, todo);
        }catch(e){
            if(e instanceof AxiosError){
                throw e as APIException;
            }
            throw e as TodoError
        }
    },

    getAllTodos: async function(): Promise<Todo[]> {
        try{
            return  await findAllTodos(service_endpoint);
        }catch(e){
            if(e instanceof AxiosError){
                throw e as APIException;
            }
            throw e as TodoError
        }
    },
    getATodo: async function(todoId:string): Promise<Todo> {
        try{
            return await findATodoById(service_endpoint, todoId);
        }catch(e){
            if(e instanceof AxiosError){
                throw e as APIException;
            }
            throw e as TodoError
        }
    },

    updateATodo: async function(updatedTodo:Todo) : Promise<Todo> {
        try{
            return await updateATodo(service_endpoint, updatedTodo);
        }catch (e){
            if(e instanceof AxiosError){
                throw e as APIException;
            }
            throw e as TodoError
        }
    },

    async deleteATodo(todoId:string) : Promise<void> {
        try{
            await deleteATodoById(service_endpoint, todoId);
        }catch(e){
            if(e instanceof AxiosError){
                throw e as APIException;
            }
            throw e as TodoError
        }
    }
}