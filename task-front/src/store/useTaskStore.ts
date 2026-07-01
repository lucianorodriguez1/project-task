import { create } from 'zustand';
import { type Task, type TaskStatus } from '../types/task';
import { type TaskRequest } from '../types/task-request';
import { taskService } from '../api/taskService';

interface TaskState {
  // Estado
  tasks: Task[];
  loading: boolean;
  error: string | null;
  editingTask: Task | null;
  
  // Acciones
  fetchTasks: () => Promise<void>;
  createTask: (task: TaskRequest) => Promise<void>;
  updateTask: (id: number, task: Task) => Promise<void>;
  updateTaskStatus: (id: number, status: TaskStatus) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setEditingTask: (task: Task | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,
  editingTask: null,

  // Setea qué tarea va al formulario. Si es null, el formulario limpia sus campos para "Crear"
  setEditingTask: (task) => set({ editingTask: task }),

  // Carga inicial desde el backend
  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const data = await taskService.getAll();
      set({ tasks: data, loading: false });
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'No se pudo conectar al servidor';
      set({ error: errorMessage, loading: false });
    }
  },

  createTask: async (taskRequest) => {
    set({ loading: true, error: null });
    try {
      const newTask = await taskService.create(taskRequest);
      set((state) => ({ 
        tasks: [...state.tasks, newTask], 
        loading: false 
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo crear la tarea';
      set({ error: errorMessage, loading: false });
    }
  },

  updateTask: async (id, taskData) => {
    set({ loading: true, error: null });
    try {
      const updatedTask = await taskService.update(id, taskData);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
        editingTask: null, // Limpiamos el modo edición automáticamente
        loading: false
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo actualizar la tarea';
      set({ error: errorMessage, loading: false });
    }
  },

  updateTaskStatus: async (id, status) => {
    try {
      const updatedTask = await taskService.updateStatus(id, status);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo cambiar el estado de la tarea';
      set({ error: errorMessage });
    }
  },

  deleteTask: async (id) => {
    try {
      await taskService.delete(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'No se pudo eliminar la tarea';
      set({ error: errorMessage });
    }
  },
}));