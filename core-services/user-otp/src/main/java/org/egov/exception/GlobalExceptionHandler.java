package org.egov.exception;

import org.egov.web.contract.ErrorWrapper;
import org.egov.web.contract.OtpErrorResponse;
import org.egov.web.contract.ResponseInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InvalidHoldingIdException.class)
    public ResponseEntity<ErrorWrapper> handleInvalidHoldingIdException(InvalidHoldingIdException ex) {
        OtpErrorResponse otpErrorResponse = new OtpErrorResponse(
                HttpStatus.BAD_REQUEST.value(),
                ex.getMessage(),
                false
        );
        ResponseInfo responseInfo = null; // You can set this to a proper ResponseInfo object if needed
        ErrorWrapper errorWrapper = new ErrorWrapper(responseInfo, otpErrorResponse);
        return new ResponseEntity<>(errorWrapper, HttpStatus.BAD_REQUEST);
    }
}
