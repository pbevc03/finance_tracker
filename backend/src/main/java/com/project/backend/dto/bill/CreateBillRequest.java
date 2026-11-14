package com.project.backend.dto.bill;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record CreateBillRequest(
        @NotBlank(message = "Izdajatelj je obvezen.")
        String issuer,

        @NotNull(message = "Znesek je obvezen.")
        @DecimalMin(value = "0", inclusive = false,
                message = "Znesek mora biti večji od 0.")
        @Digits(integer = 10, fraction = 2,
                message = "Znesek lahko vsebuje največ 2 decimalni mesti.")
        BigDecimal amount,

        @NotNull(message = "Datum izdaje je obvezen.")
        LocalDate issueDate,

        @NotNull(message = "Datum zapadlosti je obvezen.")
        LocalDate dueDate,

        UUID categoryId,
        String description
) {

}