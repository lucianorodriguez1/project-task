package com.project.task.services;

import com.project.task.dto.TaskRequestDTO;
import com.project.task.dto.TaskResponseDTO;
import com.project.task.models.TaskStatus;

import java.util.List;

public interface TaskService {
    TaskResponseDTO createTask(TaskRequestDTO request);
    List<TaskResponseDTO> getAllTasks();
    TaskResponseDTO getTaskById(Long id);
    TaskResponseDTO updateTask(Long id, TaskRequestDTO request);
    TaskResponseDTO changeTaskStatus(Long id, TaskStatus status);
    void deleteTask(Long id);
}
