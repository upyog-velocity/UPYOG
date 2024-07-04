package org.egov.web.contract;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class OtpErrorResponse {

    private int code;
    private String message;

    @JsonProperty("isHoldingID")
    private boolean isHoldingId;
}



