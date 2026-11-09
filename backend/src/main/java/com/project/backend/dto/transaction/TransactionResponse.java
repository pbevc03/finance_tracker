package com.project.backend.dto.transaction;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

public record TransactionResponse(
        UUID id,
        BigDecimal amount,
        LocalDate date,
        String type,
        String description,
        UUID categoryId,
        LocalDateTime createdAt
) {
}
