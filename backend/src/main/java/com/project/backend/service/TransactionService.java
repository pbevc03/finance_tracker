package com.project.backend.service;

import com.project.backend.dao.CategoryDAO;
import com.project.backend.dao.TransactionDAO;
import com.project.backend.dto.transaction.CreateTransactionRequest;
import com.project.backend.dto.transaction.TransactionResponse;
import com.project.backend.dto.transaction.UpdateTransactionRequest;
import com.project.backend.exception.CategoryNotFoundException;
import com.project.backend.exception.ResourceNotFoundException;
import com.project.backend.model.Category;
import com.project.backend.model.Transaction;
import com.project.backend.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionDAO transactionDAO;
    private final CategoryDAO categoryDAO;
    private final TransactionRepository transactionRepository;

    @Transactional
    public TransactionResponse create(CreateTransactionRequest request, UUID userId) {
        Category category = categoryDAO
                .findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));

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

    @Transactional(readOnly = true)
    public List<TransactionResponse> findAllByUserId(UUID userId) {
        return transactionDAO.findAllByUserId(userId)
                .stream()
                .map(transaction -> new TransactionResponse(
                        transaction.getId(),
                        transaction.getAmount(),
                        transaction.getDate(),
                        transaction.getType(),
                        transaction.getDescription(),
                        transaction.getCategory().getId(),
                        transaction.getCreatedAt()
                ))
                .toList();
    }

    @Transactional
    public TransactionResponse editTransaction(UUID transactionId, UpdateTransactionRequest request, UUID userId) {
        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found with id: " + transactionId));
        Category category = categoryDAO
                .findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));

        if (!transaction.getUserId().equals(userId)) {
            throw new AccessDeniedException("You are not allowed to edit this transaction");
        }

        transaction.setAmount(request.amount());
        transaction.setDate(request.date());
        transaction.setCategory(category);
        transaction.setDescription(request.description());
        transaction.setType(request.type());

        Transaction saved =  transactionRepository.save(transaction);

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

    @Transactional
    public void deleteTransaction(UUID transactionId, UUID userId) {
        Transaction transaction = transactionRepository
                .findByIdAndUserId(transactionId, userId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Transaction not found with id: " + transactionId
                ));

        transactionRepository.delete(transaction);
    }
}