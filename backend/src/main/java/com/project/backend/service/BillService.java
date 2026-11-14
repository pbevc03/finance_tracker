package com.project.backend.service;

import com.project.backend.dao.BillDAO;
import com.project.backend.dao.CategoryDAO;
import com.project.backend.dto.bill.BillResponse;
import com.project.backend.dto.bill.CreateBillRequest;
import com.project.backend.exception.CategoryNotFoundException;
import com.project.backend.model.Bill;
import com.project.backend.model.Category;
import com.project.backend.status.BillStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillDAO billDAO;
    private final CategoryDAO categoryDAO;

    @Transactional
    public BillResponse create(CreateBillRequest request, UUID userId) {
        if (request.dueDate().isBefore(request.issueDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Datum zapadlosti ne sme biti pred datumom izdaje."
            );
        }

        Category category = null;
        if (request.categoryId() != null) {
            category = categoryDAO
                    .findById(request.categoryId())
                    .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));
        }

        Bill bill = new Bill();
        bill.setUserId(userId);
        bill.setIssuer(request.issuer().trim());
        bill.setAmount(request.amount());
        bill.setIssueDate(request.issueDate());
        bill.setDueDate(request.dueDate());
        bill.setCategory(category);
        bill.setDescription(request.description());
        bill.setStatus(BillStatus.UNPAID);

        Bill saved = billDAO.save(bill);
        return toResponse(saved);
    }

    private BillResponse toResponse(Bill bill) {
        return new BillResponse(
                bill.getId(),
                bill.getIssuer(),
                bill.getAmount(),
                bill.getIssueDate(),
                bill.getDueDate(),
                bill.getStatus(),
                bill.getCategory() == null ? null : bill.getCategory().getId(),
                bill.getDescription(),
                bill.getTransaction() == null ? null : bill.getTransaction().getId()
        );
    }
}