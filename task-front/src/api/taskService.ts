import { type Task, type TaskStatus } from '../types/task';
import { type TaskRequest } from '../types/task-request';


const API_BASE_URL = import.meta.env.VITE_API_URL + '/tasks';

export const taskService = {
  getAll: async (): Promise<Task[]> => {
    const res = await fetch(API_BASE_URL);
    if (!res.ok) throw new Error('Error al obtener la lista de tareas');
    return res.json();
  },

  getById: async (id: number): Promise<Task> => {
    const res = await fetch(`${API_BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Error al obtener la tarea con ID ${id}`);
    return res.json();
  },

  create: async (task: TaskRequest): Promise<Task> => {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Error al crear la tarea. ');
    return res.json();
  },

  update: async (id: number, task: TaskRequest): Promise<Task> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error(`Error al actualizar la tarea con ID ${id}`);
    return res.json();
  },


  updateStatus: async (id: number, status: TaskStatus): Promise<Task> => {
    const res = await fetch(`${API_BASE_URL}/${id}/status?status=${status}`, {
      method: 'PATCH',
    });
    if (!res.ok) throw new Error('Error al cambiar el estado de la tarea');
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error(`Error al eliminar la tarea con ID ${id}`);
  }
};