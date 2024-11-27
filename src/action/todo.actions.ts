"use server"

import axios from "axios";
import {Todo, TodoCreate} from "@/src/dto/todo.dtos";

export async function saveATodo(endpoint: string, todo: TodoCreate): Promise<Todo> {
    const response =  await axios
        .post(endpoint, todo)
        .then((result)=> {
            return result.data as Todo;
        }).catch((error)=>{
            console.error(error);
            throw error;
        });
    return response;
}

export async function findAllTodos(endpoint: string): Promise<Todo[]> {
    const response =  await axios
        .get(endpoint)
        .then((result)=> {
            return result.data as Todo[];
        }).catch((error)=>{
            console.error(error);
            throw error;
        });
    return response;
}

export async function findATodoById(endpoint: string,todoId:string): Promise<Todo> {
    const response =  await axios
        .get(endpoint+`/${todoId}`)
        .then((result)=> {
            return result.data as Todo;
        }).catch((error)=>{
            console.error(error);
            throw error;
        });
    return response;
}

export async function deleteATodoById(endpoint: string,todoId:string): Promise<Todo> {
    const response =  await axios
        .delete(endpoint+`/${todoId}`)
        .then((result)=> {
            return result.data as Todo;
        }).catch((error)=>{
            console.error(error);
            throw error;
        });
    return response;
}