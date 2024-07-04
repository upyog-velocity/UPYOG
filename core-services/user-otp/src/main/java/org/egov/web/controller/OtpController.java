package org.egov.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.domain.service.OtpService;
import org.egov.web.contract.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@RestController
@Slf4j
public class OtpController {

    private OtpService otpService;

    @Autowired
    public OtpController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/v1/_send")
    @ResponseStatus(HttpStatus.CREATED)
    public OtpResponse sendOtp(@RequestBody OtpRequest otpRequest) throws IOException {
        if (otpRequest.getOtp() != null) {
            if (otpRequest.getOtp().getHoldingId() != null && otpRequest.getOtp().isPropertyIdEnabled()) {
                log.info("Holding Id is :::: " + otpRequest.getOtp().getHoldingId());
                RestTemplate restTemplate = new RestTemplate();
                ObjectMapper objectMapper = new ObjectMapper();
                String holdingIdResourceURL
                        = "https://service.assamurban.in/api/propertytax/holdingdetails?holding_number=" + otpRequest.getOtp().getHoldingId();
                ResponseEntity<DataWrapper> holdingResponseData
                        = restTemplate.getForEntity(holdingIdResourceURL, DataWrapper.class);
                DataWrapper holdingDataWrapper = holdingResponseData.getBody();
                if (holdingDataWrapper != null) {
                    Object data = holdingDataWrapper.getData();
                    String holdingResponseDataStr = objectMapper.writeValueAsString(data);
                    if (!holdingResponseDataStr.equalsIgnoreCase("[]")) {
                        Data responseData = objectMapper.readValue(holdingResponseDataStr, Data.class);
                        if (holdingDataWrapper.getMessage().equalsIgnoreCase("success")) {
                            log.info("Holding setting up the mobile number :::: " + responseData.getMobileNumber());
                            otpRequest.getOtp().setMobileNumber(responseData.getMobileNumber());
                        }
                    }
                }
            }
        }
        otpService.sendOtp(otpRequest.toDomain());
        return OtpResponse.builder().
                responseInfo(null).successful(true).build();
    }

    @PostMapping("/holding/v1/_send")
    @ResponseStatus(HttpStatus.CREATED)
    public OtpResponse sendHoldingOtp(@RequestBody OtpRequest otpRequest) {
        Otp otp = new Otp();
        otp.setMobileNumber("9999999999");
        otp.setTenantId("pg");
        otp.setUserType("citizen");
        otp.setType("login");
        RequestInfo requestInfo = new RequestInfo();
        requestInfo.setApiId("");
        requestInfo.setMsgId("1708674014261|en_IN");
        otpRequest.setOtp(otp);
        otpRequest.setRequestInfo(requestInfo);
        otpService.sendOtp(otpRequest.toDomain());
        return OtpResponse.builder().
                responseInfo(null).successful(true).build();
    }

}
