package com.myvirtualspace.myvirtualspaceapplication.context.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Bruni Luca
 */
@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException {
    public NotFoundException() {
    }

    public NotFoundException(String message, Exception e) {
        super(message, e);
    }

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Exception e) {
        super(e);
    }
}
