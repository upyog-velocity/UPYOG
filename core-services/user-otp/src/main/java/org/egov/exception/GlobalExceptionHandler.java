package org.egov.exception;

import org.egov.web.contract.OtpResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidHoldingIdException.class)
    public ResponseEntity<OtpResponse> handleInvalidHoldingIdException(InvalidHoldingIdException ex) {
        OtpResponse errorResponse = new OtpResponse(
                null,
                false,
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                false
        );
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
