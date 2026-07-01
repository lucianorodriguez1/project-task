package com.project.task.dto;

import com.project.task.models.TaskPriority;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record TaskRequestDTO(
        @NotBlank(message = "El título es obligatorio")
        String title,

        @NotBlank(message = "La descripción es obligatoria")
        String description,

        @NotNull(message = "La prioridad es obligatoria")
        TaskPriority priority,

        @FutureOrPresent(message = "La fecha de vencimiento debe ser actual o futura")
        LocalDateTime dueDate
) {}
