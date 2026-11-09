package com.project.backend.dao;

import com.project.backend.model.Transaction;
import com.project.backend.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class TransactionDAO {
    private final TransactionRepository transactionRepository;

    public Transaction save(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public List<Transaction> findAllByUserId(UUID userId) {
        return transactionRepository.findAllByUserIdOrderByDateDesc(userId);
    }

    public List<Transaction> findAllByUserIdAndCategoryId(UUID userId, UUID categoryId) {
        return transactionRepository.findAllByUserIdAndCategoryIdOrderByDateDesc(userId, categoryId);
    }

    public Optional<Transaction> findByIdAndUserId(UUID id, UUID userId) {
        return transactionRepository.findByIdAndUserId(id, userId);
    }

    public void delete(Transaction transaction) {
        transactionRepository.delete(transaction);
    }
}