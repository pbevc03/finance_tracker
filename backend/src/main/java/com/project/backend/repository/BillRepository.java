package com.project.backend.repository;

import com.project.backend.model.Bill;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BillRepository extends JpaRepository<Bill, UUID> {
    List<Bill> findAllByUserIdOrderByDueDateAsc(UUID customerId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
    select b from Bill b
    left join fetch b.category
    where b.id = :billId and b.userId = :userId
    """)
    Optional<Bill> findByIdAndUserIdForUpdateDelete(
            @Param("billId") UUID billId,
            @Param("userId") UUID userId
    );
}
