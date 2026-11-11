package com.project.backend.exception;

import java.util.UUID;

public class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(UUID categoryId) {
        super("Category with this id " + categoryId + " does not exist.");
    }
}