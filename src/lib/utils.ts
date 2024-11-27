import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {TodoStatus} from "@/src/dto/todo.dtos";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function todoStatusColor(status: TodoStatus): "to_do" | "progress" | "done" {
  switch (status) {
    case "TODO":
      return "to_do";
    case "IN_PROGRESS":
      return "progress";
    case "DONE":
      return "done";
  }
}

