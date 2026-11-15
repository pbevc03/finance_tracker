package com.project.backend.dto.bill;

import com.project.backend.status.BillStatus;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

public record BillResponse(
        UUID id,
        String issuer,
        BigDecimal amount,
        LocalDate issueDate,
        LocalDate dueDate,
        LocalDate paymentDate,
        BillStatus status,
        UUID categoryId,
        String description,
        UUID transactionId
) {

}