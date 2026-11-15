package com.project.backend.service;

import com.project.backend.dao.BillDAO;
import com.project.backend.dao.CategoryDAO;
import com.project.backend.dao.TransactionDAO;
import com.project.backend.dto.bill.BillResponse;
import com.project.backend.dto.bill.CreateBillRequest;
import com.project.backend.dto.bill.PayBillRequest;
import com.project.backend.exception.CategoryNotFoundException;
import com.project.backend.model.Bill;
import com.project.backend.model.Category;
import com.project.backend.model.Transaction;
import com.project.backend.status.BillStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BillService {
    private final BillDAO billDAO;
    private final CategoryDAO categoryDAO;
    private final TransactionDAO transactionDAO;

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
            category = categoryDAO.findById(request.categoryId())
                    .orElseThrow(() ->
                            new CategoryNotFoundException(request.categoryId()));
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

        return toResponse(billDAO.save(bill));
    }

    @Transactional(readOnly = true)
    public List<BillResponse> findAllByUserId(UUID userId) {
        return billDAO.findAllByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public BillResponse markAsPaid(
            UUID billId,
            PayBillRequest request,
            UUID userId
    ) {
        Bill bill = billDAO.findByIdAndUserIdForUpdate(billId, userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Račun ni bil najden."
                ));

        if (bill.getStatus() == BillStatus.PAID) {
            return toResponse(bill);
        }

        if (bill.getStatus() != BillStatus.UNPAID) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Plačati je mogoče samo neplačan račun."
            );
        }

        if (bill.getCategory() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Računu pred plačilom določite kategorijo."
            );
        }

        if (request.paymentDate().isBefore(bill.getIssueDate())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Datum plačila ne sme biti pred datumom izdaje."
            );
        }

        Transaction transaction = new Transaction(
                userId,
                bill.getCategory(),
                bill.getAmount(),
                "EXPENSE",
                request.paymentDate(),
                "Plačilo računa: " + bill.getIssuer()
        );

        Transaction savedTransaction = transactionDAO.save(transaction);

        bill.setStatus(BillStatus.PAID);
        bill.setPaymentDate(request.paymentDate());
        bill.setTransaction(savedTransaction);

        return toResponse(billDAO.save(bill));
    }

    private BillResponse toResponse(Bill bill) {
        return new BillResponse(
                bill.getId(),
                bill.getIssuer(),
                bill.getAmount(),
                bill.getIssueDate(),
                bill.getDueDate(),
                bill.getPaymentDate(),
                bill.getStatus(),
                bill.getCategory() == null ? null : bill.getCategory().getId(),
                bill.getDescription(),
                bill.getTransaction() == null ? null : bill.getTransaction().getId()
        );
    }
}