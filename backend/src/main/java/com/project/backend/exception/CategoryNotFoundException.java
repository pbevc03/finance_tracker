package com.project.backend.exception;

import java.util.UUID;

public class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(UUID categoryId) {
        super("Kategorija z ID-jem " + categoryId + " ne obstaja.");
    }
}