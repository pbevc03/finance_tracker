package com.project.backend.dto.bill;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PayBillRequest(
        @NotNull(message = "Datum placila je obvezen.")
        LocalDate paymentDate
) {
}
