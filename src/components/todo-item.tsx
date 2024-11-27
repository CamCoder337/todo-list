import { useState } from 'react'
import { Todo, TodoStatus } from '@/src/dto/todo.dtos'
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Textarea } from "@/src/components/ui/textarea"
import { Badge } from "@/src/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import {todoStatusColor} from "@/src/lib/utils";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (updatedTodo: Todo) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleUpdate = () => {
    onUpdate(editedTodo);
    setIsEditing(false);
  };

  const handleStatusChange = (status: TodoStatus) => {
    setEditedTodo({ ...editedTodo, status });
  };

  if (isEditing) {
    return (
      <div className="space-y-2 p-4 border rounded-lg">
        <Input
          value={editedTodo.title}
          onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
          placeholder="Titre"
        />
        <Textarea
          value={editedTodo.description}
          onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
          placeholder="Description"
        />
        <Select onValueChange={(value: TodoStatus) => handleStatusChange(value)} defaultValue={editedTodo.status}>
          <SelectTrigger>
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">À faire</SelectItem>
            <SelectItem value="IN_PROGRESS">En cours</SelectItem>
            <SelectItem value="DONE">Terminé</SelectItem>
          </SelectContent>
        </Select>
        <div className="space-x-2">
          <Button onClick={handleUpdate}>Sauvegarder</Button>
          <Button variant="outline" onClick={() => setIsEditing(false)}>Annuler</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center p-4 border rounded-lg">
      <div>
        <h3 className="font-bold">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.description}</p>
          <Badge variant={todoStatusColor(todo.status)}>{todo.status}</Badge>
      </div>
      <div className="space-x-2">
        <Button onClick={() => setIsEditing(true)}>Modifier</Button>
        <Button variant="destructive" onClick={() => onDelete(todo.id)}>Supprimer</Button>
      </div>
    </div>
  );
}

