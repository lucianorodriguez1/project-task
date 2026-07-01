import { type Task} from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import { Trash2, Edit3, CheckCircle, Clock } from 'lucide-react';

// Diccionario de estilos dinámicos de Tailwind según la prioridad
const PRIORITY_STYLES = {
  HIGH: 'bg-red-50 text-red-700 border-red-200',
  MEDIUM: 'bg-amber-50 text-amber-700 border-amber-200',
  LOW: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  // Traemos las acciones directamente desde el store de Zustand
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);

  const isCompleted = task.status === 'COMPLETED';

  return (
    <div className={`bg-white p-4 rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4 ${
      isCompleted ? 'border-slate-200 bg-slate-50/50 opacity-75' : 'border-slate-200'
    }`}>
      
      {/* Información de la tarea */}
      <div className="space-y-1.5 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Badge de Prioridad Autocambiable */}
          <span className={`px-2 py-0.5 rounded text-xs font-semibold border ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority}
          </span>
          
          {/* Título de la tarea (Se tacha si está completada) */}
          <h3 className={`font-semibold text-slate-800 tracking-tight ${isCompleted ? 'line-through text-slate-400' : ''}`}>
            {task.title}
          </h3>
        </div>

        {/* Descripción */}
        <p className={`text-sm ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
          {task.description}
        </p>

        {/* Fecha de vencimiento */}
        <div className="flex items-center gap-1 text-xs text-slate-400 pt-1">
          <Clock size={13} />
          <span>Vence: {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Botonera de Acciones (Lógica directa de Zustand) */}
      <div className="flex items-center gap-1.5 self-end md:self-center">
        {/* Botón Completar (Solo si no está completada) */}
        {!isCompleted && (
          <button
            onClick={() => updateTaskStatus(task.id, 'COMPLETED')}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
            title="Completar Tarea"
          >
            <CheckCircle size={18} />
          </button>
        )}

        {/* Botón Editar */}
        <button
          onClick={() => setEditingTask(task)}
          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          title="Editar Tarea"
        >
          <Edit3 size={18} />
        </button>

        {/* Botón Eliminar */}
        <button
          onClick={() => deleteTask(task.id)}
          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Eliminar Tarea"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}