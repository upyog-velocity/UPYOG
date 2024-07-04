package org.egov.web.contract;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ErrorWrapper {
    private ResponseInfo responseInfo;

    @JsonProperty("error")
    private OtpErrorResponse otpErrorResponse;
}
