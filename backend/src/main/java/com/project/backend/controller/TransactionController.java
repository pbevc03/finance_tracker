package com.project.backend.controller;

import com.project.backend.dto.transaction.CreateTransactionRequest;
import com.project.backend.dto.transaction.TransactionResponse;
import com.project.backend.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping
    public List<TransactionResponse> getTransactions(@AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        return transactionService.findAllByUserId(userId);
    }

    @PostMapping("/create")
    public ResponseEntity<TransactionResponse> create(@Valid @RequestBody CreateTransactionRequest request, @AuthenticationPrincipal Jwt jwt) {
        UUID userId = UUID.fromString(jwt.getSubject());
        TransactionResponse response = transactionService.create(request, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}