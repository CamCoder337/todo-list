"use server"

import axios from "axios";
import {Todo, TodoCreate} from "@/src/dto/todo.dtos";

export async function saveATodo(endpoint: string, todo: TodoCreate): Promise<Todo> {
    return await axios
        .post(endpoint, todo)
        .then((result) => {
            return result.data as Todo;
        }).catch((error) => {
            console.error(error);
            throw error;
        });
}

export async function findAllTodos(endpoint: string): Promise<Todo[]> {
    return await axios
        .get(endpoint)
        .then((result) => {
            return result.data as Todo[];
        }).catch((error) => {
            console.error(error);
            throw error;
        });
}

export async function updateATodo(endpoint:string, todoToUpdate:Todo) : Promise<Todo> {
    return await axios
        .put(endpoint +`/${todoToUpdate.id}`, todoToUpdate)
        .then((result)=>{
            return result.data as Todo;
        }).catch((error)=>{
            console.error(error);
            throw error
        })
}

export async function findATodoById(endpoint: string,todoId:string): Promise<Todo> {
    return await axios
        .get(endpoint + `/${todoId}`)
        .then((result) => {
            return result.data as Todo;
        }).catch((error) => {
            console.error(error);
            throw error;
        });
}

export async function deleteATodoById(endpoint: string,todoId:string): Promise<Todo> {
    return await axios
        .delete(endpoint + `/${todoId}`)
        .then((result) => {
            return result.data as Todo;
        }).catch((error) => {
            console.error(error);
            throw error;
        });
}