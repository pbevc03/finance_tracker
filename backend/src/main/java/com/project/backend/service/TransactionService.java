package com.project.backend.service;

import com.project.backend.dao.CategoryDAO;
import com.project.backend.dao.TransactionDAO;
import com.project.backend.dto.transaction.CreateTransactionRequest;
import com.project.backend.dto.transaction.TransactionResponse;
import com.project.backend.model.Category;
import com.project.backend.model.Transaction;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionDAO transactionDAO;
    private final CategoryDAO categoryDAO;

    @Transactional
    public TransactionResponse create(CreateTransactionRequest request, UUID userId) {
        Category category = categoryDAO.findById(request.categoryId()).orElseThrow(() -> new IllegalArgumentException("Category with this id doesn't exist."));

        Transaction transaction = new Transaction(
                userId,
                category,
                request.amount(),
                request.type(),
                request.date(),
                request.description()
        );

        Transaction saved = transactionDAO.save(transaction);

        return new TransactionResponse(
                saved.getId(),
                saved.getAmount(),
                saved.getDate(),
                saved.getType(),
                saved.getDescription(),
                saved.getCategory().getId(),
                saved.getCreatedAt()
        );
    }
}