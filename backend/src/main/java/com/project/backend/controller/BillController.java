package com.project.backend.controller;

import com.project.backend.dto.bill.BillResponse;
import com.project.backend.dto.bill.CreateBillRequest;
import com.project.backend.service.BillService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/bills")
@RequiredArgsConstructor
public class BillController {
    private final BillService billService;

    @PostMapping("/create")
    public ResponseEntity<BillResponse> create(
            @Valid @RequestBody CreateBillRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        UUID userId = UUID.fromString(jwt.getSubject());
        BillResponse response = billService.create(request, userId);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}