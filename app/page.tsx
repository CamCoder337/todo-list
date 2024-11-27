'use client'

import { useState, useEffect } from 'react'
import {Todo, TodoCreate} from '@/src/dto/todo.dtos'
import { TodoItem } from '@/src/components/todo-item'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import {TodoService} from "@/src/service/TodoService";
import {TodoError} from "@/src/exception/todo.exceptions";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState({ title: '', description: '' })

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try{
      const response = await TodoService.getAllTodos();
      setTodos(response);
    }catch(e){
      const error = e as TodoError;
      console.error('Erreur lors de la récupération des todos:', error.message)
    }
  }

  const createTodo = async () => {
    try{
      const todoToCreate = { ...newTodo, status: 'TODO', priority: todos.length } as TodoCreate
      const createdTodo = await TodoService.createATodo(todoToCreate)
      setTodos([...todos, createdTodo])
      setNewTodo({ title: '', description: '' })
    }catch(e){
      const error = e as TodoError;
      console.error('Erreur lors de la création du todo:', error.message)
    }
  }

  const updateTodo = async (todoToUpdate: Todo) => {
    try {
      const updatedTodo = await TodoService.updateATodo(todoToUpdate);
      setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
    } catch (e) {
      const error = e as TodoError;
      console.error('Erreur lors de l update du todo:', error.message)
    }
  }

  const deleteTodo = async (id: string) => {
    try{
      await TodoService.deleteATodo(id);
      setTodos(todos.filter(todo => todo.id !== id))
    }catch(e){
      const error = e as TodoError;
      console.error('Erreur lors de la création du todo:', error.message)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Ma Liste de Tâches</h1>
      <div className="space-y-2">
        <Input
          placeholder="Titre"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <Textarea
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <Button onClick={createTodo}>Ajouter une tâche</Button>
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

