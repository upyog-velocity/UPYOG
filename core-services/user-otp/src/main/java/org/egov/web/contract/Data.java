package org.egov.web.contract;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Builder
public class Data {

    private String propertyTaxHoldingNumber;
    private String ownerName;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String state;
    private String pincode;
    private String longitude;
    private String latitude;
    private String mobileNumber;

}
