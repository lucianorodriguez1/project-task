package com.project.task.dto;

import com.project.task.models.TaskPriority;
import com.project.task.models.TaskStatus;

import java.time.LocalDateTime;

public record TaskResponseDTO(
        Long id,
        String title,
        String description,
        TaskStatus status,
        TaskPriority priority,
        LocalDateTime createdAt,
        LocalDateTime dueDate
) {}