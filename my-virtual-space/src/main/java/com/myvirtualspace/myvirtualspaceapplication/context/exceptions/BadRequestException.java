package com.myvirtualspace.myvirtualspaceapplication.context.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Bruni Luca
 */
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message, Exception e) {
        super(message, e);
    }

    public BadRequestException(String message) {
        super(message);
    }

    public BadRequestException(Exception e) {
        super(e);
    }

    public BadRequestException() {

    }
}
