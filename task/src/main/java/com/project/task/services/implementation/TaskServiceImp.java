package com.project.task.services.implementation;

import com.project.task.dto.TaskRequestDTO;
import com.project.task.dto.TaskResponseDTO;
import com.project.task.exceptions.ResourceNotFoundException;
import com.project.task.models.Task;
import com.project.task.models.TaskStatus;
import com.project.task.repositories.TaskRepository;
import com.project.task.services.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImp implements TaskService {
    private final TaskRepository repository;

    public TaskServiceImp(TaskRepository repository) {
        this.repository = repository;
    }

    @Override
    public TaskResponseDTO createTask(TaskRequestDTO request) {

        Task task = new Task();

        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setPriority(request.priority());
        task.setDueDate(request.dueDate());

        // El estado (PENDING) y la fecha de creación se manejan solos por Task.java

        Task savedTask = repository.save(task);

        return mapToDTO(savedTask);
    }

    // Método auxiliar privado para transformar la Entidad en DTO de respuesta
    private TaskResponseDTO mapToDTO(Task task) {
        return new TaskResponseDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStatus(),
                task.getPriority(),
                task.getCreationDate(),
                task.getDueDate()
        );
    }

    @Override
    public List<TaskResponseDTO> getAllTasks() {
        return repository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO getTaskById(Long id) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));

        return mapToDTO(task);
    }

    @Override
    public TaskResponseDTO updateTask(Long id, TaskRequestDTO request) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));

        task.setTitle(request.title());
        task.setDescription(request.description());
        task.setPriority(request.priority());
        task.setDueDate(request.dueDate());

        Task updatedTask = repository.save(task);
        return mapToDTO(updatedTask);
    }

    @Override
    public TaskResponseDTO changeTaskStatus(Long id, TaskStatus status) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));

        task.setStatus(status);

        Task updatedTask = repository.save(task);
        return mapToDTO(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada con ID: " + id));

        repository.delete(task);
    }

}
