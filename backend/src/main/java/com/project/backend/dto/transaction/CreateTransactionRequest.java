package com.project.backend.dto.transaction;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record CreateTransactionRequest(
        @NotNull(message = "Znesek je obvezen.")
        @DecimalMin(value = "0.00", inclusive = false, message = "Znesek mora biti večji od 0.")
        BigDecimal amount,

        @NotNull(message = "Datum je obvezen.")
        LocalDate date,

        @NotBlank(message = "Vrsta transakcije je obvezna.")
        String type,

        String description,

        @NotNull(message = "Kategorija je obvezna.")
        UUID categoryId
) {
}
