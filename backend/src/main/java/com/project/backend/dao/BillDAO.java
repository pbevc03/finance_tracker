package com.project.backend.dao;

import com.project.backend.model.Bill;
import com.project.backend.repository.BillRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
@AllArgsConstructor
public class BillDAO {

    private final BillRepository billRepository;

    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    public List<Bill> findAllByUserId(UUID userId) {
        return billRepository.findAllByUserIdOrderByDueDateAsc(userId);
    }
}