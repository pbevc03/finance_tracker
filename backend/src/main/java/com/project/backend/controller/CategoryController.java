package com.project.backend.controller;

import com.project.backend.dao.CategoryDAO;
import com.project.backend.dto.category.CategoryResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryDAO categoryDAO;

    @GetMapping
    public List<CategoryResponse> getCategories() {
        return categoryDAO
                .findAll()
                .stream()
                .map(category -> new CategoryResponse(category.getId(), category.getName()))
                .toList();
    }
}