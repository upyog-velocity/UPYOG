package org.egov.web.notification.sms.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.jayway.jsonpath.*;
import lombok.extern.slf4j.*;
import org.apache.http.conn.ssl.*;
import org.apache.http.impl.client.*;
import org.egov.web.notification.sms.config.*;
import org.egov.web.notification.sms.models.*;
import org.springframework.asm.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.core.*;
import org.springframework.core.env.*;
import org.springframework.http.*;
import org.springframework.http.client.*;
import org.springframework.http.converter.*;
import org.springframework.http.converter.json.*;
import org.springframework.util.*;
import org.springframework.web.client.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.*;
import javax.net.ssl.*;
import java.io.*;
import java.lang.reflect.Type;
import java.net.*;
import java.security.*;
import java.util.*;

@Slf4j
abstract public class BaseSMSService implements SMSService, SMSBodyBuilder {

    private static final String SMS_RESPONSE_NOT_SUCCESSFUL = "Sms response not successful";

    @Autowired
    protected RestTemplate restTemplate;

    @Autowired
    protected SMSProperties smsProperties;

    @Autowired
    protected Environment env;

    @PostConstruct
    public void init() {
        List<HttpMessageConverter<?>> converters = restTemplate.getMessageConverters();
        converters.remove(converters.stream().filter(c -> c.getClass().equals(MappingJackson2HttpMessageConverter.class)).findFirst().get());
        converters.add(new MappingJackson2HttpMessageConverter() {
            @Override
            protected void writeInternal(Object object, Type type, HttpOutputMessage outputMessage) throws IOException, HttpMessageNotWritableException {
                if (object.getClass().equals(LinkedMultiValueMap.class)) {
                    LinkedMultiValueMap<?, ?> map = (LinkedMultiValueMap<?, ?>) object;
                    object = map.toSingleValueMap();
                }
                super.writeInternal(object, type, outputMessage);
            }
        });
    }

    @Override
    public void sendSMS(Sms sms) {
        log.info("sendSMS() start: "+sms);
        if (!sms.isValid()) {
            log.error(String.format("Sms %s is not valid", sms));
            return;
        }

        if (smsProperties.isNumberBlacklisted(sms.getMobileNumber())) {
            log.error(String.format("Sms to %s is blacklisted", sms.getMobileNumber()));
            return;
        }

        if (!smsProperties.isNumberWhitelisted(sms.getMobileNumber())) {
            log.error(String.format("Sms to %s is not in whitelist", sms.getMobileNumber()));
            return;
        }
        log.info("calling submitToExternalSmsService() method");
        submitToExternalSmsService(sms);
    }

    protected abstract void submitToExternalSmsService(Sms sms);

    protected <T> ResponseEntity<T> executeAPI(URI uri, HttpMethod method, HttpEntity<?> requestEntity, Class<T> type) {
        log.info("executeAPI() start");

        log.info("calling third party api with url: "+uri+"  method:"+method);
        @SuppressWarnings("unchecked")
        ResponseEntity<T> res = (ResponseEntity<T>) restTemplate.exchange(uri, method, requestEntity, String.class);
        log.info("third part api call done");

        String responseString = res.getBody().toString();

        boolean status = responseString.contains("SUBMIT_SUCCESS");
        //String dummyResponse = "Message Accepted For Request ID=1231457859641254687954~code=API00 & info=Sms platform accepted & Time = 2007/10/04/09/58";

        /*
         * if (!isResponseValidated(res)) { log.error("Response from API - " +
         * responseString); throw new RuntimeException(SMS_RESPONSE_NOT_SUCCESSFUL); }
         *
         * if (smsProperties.getSmsErrorCodes().size() > 0 &&
         * isResponseCodeInKnownErrorCodeList(res)) { throw new
         * RuntimeException(SMS_RESPONSE_NOT_SUCCESSFUL); }
         *
         * if (smsProperties.getSmsSuccessCodes().size() > 0 &&
         * !isResponseCodeInKnownSuccessCodeList(res)) { throw new
         * RuntimeException(SMS_RESPONSE_NOT_SUCCESSFUL); }
         */

       /* StringTokenizer tokenizer = new StringTokenizer(responseString, "&");
        HashMap<String,String> responseMap = new HashMap<String, String>();
        String pair = null, pname = null, pvalue = null;
        while (tokenizer.hasMoreTokens()) {
            pair = (String)tokenizer.nextToken();
            if(pair!=null) {
                StringTokenizer strTok = new StringTokenizer(pair, "=");
                pname = ""; pvalue = "";
                if(strTok.hasMoreTokens()) {
                    pname = (String)strTok.nextToken().trim();
                    if(strTok.hasMoreTokens())
                        pvalue=(String)strTok.nextToken().trim();
                    responseMap.put(pname, pvalue);
                }

            }
        }
        boolean status = responseString.contains("API000");
*/
        if(!status) {
            log.error("error response from third party api: info:");
            throw new RuntimeException();
        }

        log.info("executeAPI() end");
        return res;
    }

    protected boolean isResponseValidated(ResponseEntity<?> response) {
        String responseString = response.getBody().toString();
        if (smsProperties.isVerifyResponse() && !responseString.contains(smsProperties.getVerifyResponseContains())) {
            return false;
        }
        return true;
    }

    protected boolean isResponseCodeInKnownErrorCodeList(ResponseEntity<?> response) {
        final String responseCode = Integer.toString(response.getStatusCodeValue());
        return smsProperties.getSmsErrorCodes().stream().anyMatch(errorCode -> errorCode.equals(responseCode));
    }

    protected boolean isResponseCodeInKnownSuccessCodeList(ResponseEntity<?> response) {
        final String responseCode = Integer.toString(response.getStatusCodeValue());
        return smsProperties.getSmsSuccessCodes().stream().anyMatch(successCode -> successCode.equals(responseCode));
    }

    public MultiValueMap<String, String> getSmsRequestBody(Sms sms) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        for (String key : smsProperties.getConfigMap().keySet()) {
            String value = smsProperties.getConfigMap().get(key);
            if (value.startsWith("$")) {
                switch (value) {
                    case "$username":
                        map.add(key, /*smsProperties.getUsername()*/"pbdwss.sms");
                        break;
                    case "$password":
                        map.add(key, /*smsProperties.getPassword()*/"Nkyf%403254");
                        break;
                    case "$senderid":
                        map.add(key, smsProperties.getSenderid());
                        break;
                    case "$mobileno":
                        map.add(key, smsProperties.getMobileNumberPrefix() + sms.getMobileNumber());
                        break;
                    case "$message":
                        map.add(key, sms.getMessage());
                        break;
                    default:
                        if (env.containsProperty(value.substring(1))) {
                            map.add(key, env.getProperty(value.substring(1)));
                        } else if (smsProperties.getExtraConfigMap().containsKey(value.substring(1))) {
                            map.add(key, smsProperties.getExtraConfigMap().get(value.substring(1)));
                        } else if (smsProperties.getCategoryMap().containsKey(value.substring(1))) {
                            Map<String, Map<String, String>> categoryMap = smsProperties.getCategoryMap();
                            Map<String, String> categoryValue = categoryMap.get(value.substring(1));
                            if (sms.getCategory() == null && categoryValue.containsKey('*')) {
                                map.add(key, categoryValue.get('*'));
                            } else if (sms.getCategory() != null) {
                                if (categoryValue.containsKey(sms.getCategory().toString())) {
                                    map.add(key, categoryValue.get(sms.getCategory().toString()));
                                } else if (categoryValue.containsKey('*')) {
                                    map.add(key, categoryValue.get('*'));
                                }
                            }
                        } else {
                            map.add(key, value);
                        }
                        break;
                }
            } else {
                map.add(key, value);
            }

        }

        return map;
    }

    public MultiValueMap<String, String> getExternalSmsRequestBody(Sms sms) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("apikey", "sdciSVe9db94fd57de01fc34");
        map.add("sender", "PROWTX");
        map.add("type", "TEXT");
        map.add("mobile", sms.getMobileNumber());
        map.add("PEID", "1101468910000013829");
        map.add("TemplateId", "1207163214105988151");
        map.add("message", sms.getMessage());

        return map;
    }

    protected HttpEntity<MultiValueMap<String, String>> getRequest(Sms sms) {
        final MultiValueMap<String, String> requestBody = getSmsRequestBody(sms);
        return new HttpEntity<>(requestBody, getHttpHeaders());
    }

    protected HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.valueOf(smsProperties.getContentType()));
        return headers;
    }

    @PostConstruct
    protected void setupSSL() {
        if (!smsProperties.isVerifySSL()) {

            SSLContext ctx = null;
            try {

                ctx =  SSLContext.getInstance("SSL");
                ctx.init(null, null, SecureRandom.getInstance("SHA1PRNG"));

            } catch (NoSuchAlgorithmException e) {
                e.printStackTrace();
            } catch (KeyManagementException e) {
                e.printStackTrace();
            }
            SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(ctx, new NoopHostnameVerifier());
            CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();
            HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
            requestFactory.setHttpClient(httpClient);
            restTemplate.setRequestFactory(requestFactory);
        }
    }

}