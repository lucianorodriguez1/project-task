import { useTaskStore } from '../store/useTaskStore';
import { useEffect } from 'react';
import { TaskCard } from '../components/TaskCard';
import {TaskForm} from '../components/TaskForm';

function Dashboard() {
  const { tasks, loading, error, fetchTasks, editingTask } = useTaskStore();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (

    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">


      {/* Header */}
      <header className="bg-slate-900 text-white shadow-md px-6 py-4">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          Gestión de tareas
        </h1>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 space-y-4">

        {/* Banner de Error (si Docker se cae o falla la API) */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm">
            <div className="flex">
              <span className="text-red-500 font-bold mr-2">Error Técnico:</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

         {/* Columna Izquierda: Formulario (Ocupa 1 de 3 columnas) */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 lg:sticky lg:top-6">
            {/* 3. TÍTULO DINÁMICO Y COMPONENTE REAL INSERTADO */}
            <h2 className="text-base font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-100">
              {editingTask ? 'Editar tarea' : 'Registrar tarea'}
            </h2>
            <TaskForm />
          </div>


          <div className="lg:col-span-2 space-y-4">

            {/* Listado de Tareas */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider px-1">
                Lista de tareas ({tasks.length})
              </h2>

              {loading ? (
                // Spinner de carga simple con Tailwind
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : tasks.length === 0 ? (
                // Estado vacío
                <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center text-slate-400">
                  No hay tareas técnicas registradas en el sistema.
                </div>
              ) : (
                // Mapeo provisorio de títulos
                tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard