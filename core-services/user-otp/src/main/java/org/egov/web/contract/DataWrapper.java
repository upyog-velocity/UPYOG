package org.egov.web.contract;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class DataWrapper {
    private String message;
    private Object data;

}

