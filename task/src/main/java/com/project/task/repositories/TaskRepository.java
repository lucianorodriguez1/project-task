package com.project.task.repositories;

import com.project.task.models.Task;
import com.project.task.models.TaskPriority;
import com.project.task.models.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {
    // 1. Filtrar por estado
    List<Task> findByStatus(TaskStatus status);

    // 2. Filtrar por prioridad
    List<Task> findByPriority(TaskPriority priority);

    // 3. Buscar por título (ignorando mayúsculas/minúsculas)
    List<Task> findByTitleContainingIgnoreCase(String title);

    // 4. Ordenar por fecha de vencimiento (por defecto de forma ascendente)
    List<Task> findAllByOrderByDueDateAsc();
}

