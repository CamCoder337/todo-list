'use client'

import {useState, useEffect, useTransition} from 'react'
import {Todo, TodoCreate} from '@/src/dto/todo.dtos'
import { TodoItem } from '@/src/components/todo-item'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import {TodoService} from "@/src/service/todo.service";
import {TodoError} from "@/src/exception/todo.exceptions";
import {toast} from "@/src/hooks/use-toast";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });
  const [loading, setLoading] = useTransition();

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = () => {
    setLoading(
        async ()=>{
          try{
            const response = await TodoService.getAllTodos();
            setTodos(response);
            toast({
              title: "Success",
              description: "Your todos has been gathered successfully.",
            });
          }catch(e){
            const error = e as TodoError;
            console.error('Erreur lors de la récupération des todos:', error.message)
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        }
    );

  }

  const createTodo = async () => {
    setLoading(
        async ()=>{
          try{
            const todoToCreate = { ...newTodo, status: 'TODO', priority: todos.length } as TodoCreate
            const createdTodo = await TodoService.createATodo(todoToCreate)
            setTodos([...todos, createdTodo])
            setNewTodo({ title: '', description: '' });
            toast({
              title: "Success",
              description: "Your todo has been created successfully.",
            });
          }catch(e){
            const error = e as TodoError;
            console.error('Erreur lors de la création du todo:', error.message);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        }
    );
  }

  const updateTodo = async (todoToUpdate: Todo) => {
    setLoading(
        async ()=>{
          try {
            const updatedTodo = await TodoService.updateATodo(todoToUpdate);
            setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo));
            toast({
              title: "Success",
              description: "Your todo has been updated successfully.",
            });
          } catch (e) {
            const error = e as TodoError;
            console.error('Erreur lors de l update du todo:', error.message);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        }
    );

  }

  const deleteTodo = async (id: string) => {
    setLoading(
        async ()=>{
          try{
            await TodoService.deleteATodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
            toast({
              title: "Success",
              description: "Your todo has been deleted successfully.",
            });
          }catch(e){
            const error = e as TodoError;
            console.error('Erreur lors de la création du todo:', error.message);
            toast({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
          }
        }
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">To do list</h1>
      <div className="space-y-2">
        <Input
          placeholder="Titre"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          disabled={loading}
        />
        <Textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          disabled={loading}
        />
        <Button onClick={createTodo} disabled={loading}>Ajouter une tâche</Button>
      </div>
      <div className="space-y-4">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </div>
  )
}

