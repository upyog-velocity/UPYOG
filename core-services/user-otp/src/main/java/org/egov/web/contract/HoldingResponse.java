package org.egov.web.contract;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class HoldingResponse {
    private String message;
    private Data data;

}
