package com.myvirtualspace.myvirtualspaceapplication.controllerAdvices;

import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.ErrorDetails;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NoAuthorizationException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.NotFoundException;
import com.myvirtualspace.myvirtualspaceapplication.context.exceptions.UnexpectedException;
import com.myvirtualspace.myvirtualspaceapplication.enumeration.ResponseMessageEnum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerError extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ControllerError.class);

    private void logExceptionStackTrace(Exception e, WebRequest request) {
        log.error("Exception occurred calling " + request.getDescription(false));
        log.error("##############################    Exception.printStackTrace()    ##############################");
        log.error("Exception details:", e);
        log.error("##############################  END Exception.printStackTrace()  ##############################");
    }

    private void logOnlyExceptionMessage(Exception e, WebRequest request) {
        log.error("##############################    Exception.message()    ##############################");
        log.error("Exception occurred calling " + request.getDescription(false));
        log.error(String.format("Exception message: %s", e.getMessage()));
        log.error("##############################  END Exception.message()  ##############################");
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorDetails> handleNotFoundException(NotFoundException e, WebRequest request) {
        logOnlyExceptionMessage(e, request);
        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UnexpectedException.class)
    public ResponseEntity<ErrorDetails> handleUnexpectedException(Exception e, WebRequest request) {
        logExceptionStackTrace(e, request);
        ErrorDetails errorDetails = new ErrorDetails(e.getMessage() == null ? ResponseMessageEnum.INTERNAL_SERVER_ERROR_MESSAGE.getValue() : e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<ErrorDetails> handleAccessDeniedException(Exception e, WebRequest request) {
//        logExceptionStackTrace(e, request);
//        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), request.getDescription(false));
//        return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
//    }

//    @ExceptionHandler(BadCredentialsException.class)
//    public ResponseEntity<ErrorDetails> handleBadCrendential(Exception e, WebRequest request) {
////        Viene già loggata grazie all'aspect che gira attorno al metodo nel controller, per questo qui non serve
////        logOnlyExceptionMessage(e, request);
//        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), request.getDescription(false));
//        return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
//    }

    @ExceptionHandler(NoAuthorizationException.class)
    public ResponseEntity<ErrorDetails> handleNoAuthorizationException(NoAuthorizationException e, WebRequest request) {
        logOnlyExceptionMessage(e, request);
        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGenericException(Exception e, WebRequest request) {
        logExceptionStackTrace(e, request);
        ErrorDetails errorDetails = new ErrorDetails(e.getMessage(), request.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
