package com.project.backend.repository;

import com.project.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    List<Transaction> findAllByUserIdOrderByDateDesc(UUID userId);
    List<Transaction> findAllByUserIdAndCategoryIdOrderByDateDesc(UUID userId, UUID categoryId);
    Optional<Transaction> findByIdAndUserId(UUID id, UUID userId);
}