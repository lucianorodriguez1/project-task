import { useState, useEffect, startTransition } from 'react';
import { useTaskStore } from '../store/useTaskStore';
import { type TaskRequest } from '../types/task-request';
import { PlusCircle, Save, XCircle } from 'lucide-react';

export function TaskForm() {
  const editingTask = useTaskStore((state) => state.editingTask);
  const createTask = useTaskStore((state) => state.createTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const loading = useTaskStore((state) => state.loading);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [dueDate, setDueDate] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPriority('MEDIUM');
    setDueDate('');
    if (editingTask) setEditingTask(null);
  };

  // Usamos startTransition para marcar los setState como transiciones de baja prioridad
  // Esto evita el bloqueo síncrono y los renders en cascada dañinos.
  useEffect(() => {
    startTransition(() => {
      if (editingTask) {
        setTitle(editingTask.title);
        setDescription(editingTask.description);
        setPriority(editingTask.priority);
        const formattedDate = new Date(editingTask.dueDate).toISOString().split('T')[0];
        setDueDate(formattedDate);
      } else {
        setTitle('');
        setDescription('');
        setPriority('MEDIUM');
        setDueDate('');
      }
    });
  }, [editingTask]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !dueDate) return;

    const taskData: TaskRequest = {
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate: new Date(dueDate).toISOString(),
    };

    if (editingTask) {
      await updateTask(editingTask.id, {
        ...editingTask,
        ...taskData
      });
    } else {
      await createTask(taskData);
    }
    resetForm();
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Título de la tarea</label>
        <input
          type="text"
          required
          placeholder="Ej: Registrar nueva caída de red"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
        />
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Descripción</label>
        <textarea
          required
          rows={3}
          placeholder="Detalles del inconveniente técnico..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Prioridad</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'LOW' | 'MEDIUM' | 'HIGH')}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Fecha Límite</label>
          <input
            type="date"
            required
            min={todayStr}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm transition-colors ${
            editingTask 
              ? 'bg-amber-600 hover:bg-amber-700' 
              : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-50`}
        >
          {editingTask ? (
            <>
              <Save size={16} />
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </>
          ) : (
            <>
              <PlusCircle size={16} />
              {loading ? 'Creando...' : 'Crear Tarea'}
            </>
          )
        })
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
          >
            <XCircle size={16} />
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}