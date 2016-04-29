package org.egov.ptis.domain.service.property;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.egov.infra.admin.master.entity.User;
import org.egov.infra.admin.master.service.UserService;
import org.egov.infra.persistence.entity.Address;
import org.egov.infra.reporting.engine.ReportConstants.FileFormat;
import org.egov.infra.reporting.engine.ReportOutput;
import org.egov.infra.reporting.engine.ReportRequest;
import org.egov.infra.reporting.engine.ReportService;
import org.egov.infra.utils.EgovThreadLocals;
import org.egov.infstr.services.PersistenceService;
import org.egov.infra.utils.DateUtils;
import org.egov.portal.entity.Citizen;
import org.egov.ptis.client.util.PropertyTaxUtil;
import org.egov.ptis.domain.entity.property.BasicProperty;
import org.egov.ptis.domain.entity.property.Property;
import org.egov.ptis.domain.entity.property.PropertyImpl;
import org.egov.ptis.domain.entity.property.PropertyOwnerInfo;
import org.egov.ptis.report.bean.PropertyAckNoticeInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

public class PropertyPersistenceService extends PersistenceService<BasicProperty, Long> {

    private static final Logger LOGGER = Logger.getLogger(PropertyPersistenceService.class);
    private static final String CREATE_ACK_TEMPLATE = "createProperty_ack";
    @Autowired
    private UserService userService;
    @Autowired
    private PropertyTaxUtil propertyTaxUtil;
    @Autowired
    private ReportService reportService;

    @SuppressWarnings("unchecked")
    public void createOwners(final Property property, final BasicProperty basicProperty, final Address ownerAddress) {

        LOGGER.debug("createOwners for property: " + property + ", basicProperty: " + basicProperty
                + ", ownerAddress: " + ownerAddress);
        int orderNo = 0;
        basicProperty.getPropertyOwnerInfo().clear();
        for (final PropertyOwnerInfo ownerInfo : property.getBasicProperty().getPropertyOwnerInfoProxy()) {
            orderNo++;
            if (ownerInfo != null) {
                User user = null;
                if (StringUtils.isNotBlank(ownerInfo.getOwner().getAadhaarNumber()))
                    user = userService.getUserByAadhaarNumber(ownerInfo.getOwner().getAadhaarNumber());
                else
                    user = (User) find("From User where name = ? and mobileNumber = ? and gender = ? ", ownerInfo
                            .getOwner().getName(), ownerInfo.getOwner().getMobileNumber(), ownerInfo.getOwner()
                            .getGender());
                if (user == null) {
                    final Citizen newOwner = new Citizen();
                    newOwner.setAadhaarNumber(ownerInfo.getOwner().getAadhaarNumber());
                    newOwner.setMobileNumber(ownerInfo.getOwner().getMobileNumber());
                    newOwner.setEmailId(ownerInfo.getOwner().getEmailId());
                    newOwner.setGender(ownerInfo.getOwner().getGender());
                    newOwner.setGuardian(ownerInfo.getOwner().getGuardian());
                    newOwner.setGuardianRelation(ownerInfo.getOwner().getGuardianRelation());
                    newOwner.setName(ownerInfo.getOwner().getName());
                    newOwner.setSalutation(ownerInfo.getOwner().getSalutation());
                    newOwner.setPassword("NOT SET");
                    newOwner.setUsername(propertyTaxUtil.generateUserName(ownerInfo.getOwner().getName()));
                    userService.createUser(newOwner);
                    persistUponPaymentResponse(basicProperty);
                    ownerInfo.setBasicProperty(basicProperty);
                    ownerInfo.setOwner(newOwner);
                    ownerInfo.setOrderNo(orderNo);
                    LOGGER.debug("createOwners: OwnerAddress: " + ownerAddress);
                    ownerInfo.getOwner().addAddress(ownerAddress);
                } else {
                    // If existing user, then do not add correspondence address
                    user.setEmailId(ownerInfo.getOwner().getEmailId());
                    user.setGuardian(ownerInfo.getOwner().getGuardian());
                    user.setGuardianRelation(ownerInfo.getOwner().getGuardianRelation());
                    ownerInfo.setOwner(user);
                    ownerInfo.setOrderNo(orderNo);
                    ownerInfo.setBasicProperty(basicProperty);
                }
            }

            basicProperty.addPropertyOwners(ownerInfo);
        }
    }

    public BasicProperty persistUponPaymentResponse(BasicProperty basicProperty) {
        return basicProperty;
    }

    public BasicProperty createBasicProperty(BasicProperty basicProperty, HashMap meesevaParams) {
        return persist(basicProperty);
    }

    public ReportOutput propertyAcknowledgement(PropertyImpl property, String cityLogo, String cityName) {
        final Map<String, Object> reportParams = new HashMap<String, Object>();
        final PropertyAckNoticeInfo ackBean = new PropertyAckNoticeInfo();
        ackBean.setOwnerName(property.getBasicProperty().getFullOwnerName());
        ackBean.setOwnerAddress(property.getBasicProperty().getAddress().toString());
        ackBean.setApplicationDate(new SimpleDateFormat("dd/MM/yyyy").format(property.getBasicProperty()
                .getCreatedDate()));
        ackBean.setApplicationNo(property.getApplicationNo());
        ackBean.setApprovedDate(new SimpleDateFormat("dd/MM/yyyy").format(property.getState().getCreatedDate()));
        final Date tempNoticeDate = DateUtils.add(property.getState().getCreatedDate(), Calendar.DAY_OF_MONTH, 15);
        ackBean.setNoticeDueDate(tempNoticeDate);
        reportParams.put("logoPath", cityLogo);
        reportParams.put("cityName", cityName);
        reportParams.put("loggedInUsername", userService.getUserById(EgovThreadLocals.getUserId()).getName());
        final ReportRequest reportInput = new ReportRequest(CREATE_ACK_TEMPLATE, ackBean, reportParams);
        reportInput.setReportFormat(FileFormat.PDF);
        return reportService.createReport(reportInput);
    }

    public String updateOwners(Property property, BasicProperty basicProperty, String doorNumber,
            final BindingResult errors) {
        LOGGER.debug("Update Owner and door number for property: " + property + ", basicProperty: " + basicProperty
                + ", doorNumber: " + doorNumber);
        basicProperty.getAddress().setHouseNoBldgApt(doorNumber);
        StringBuilder errorMesg = new StringBuilder();
        for (final PropertyOwnerInfo ownerInfo : basicProperty.getPropertyOwnerInfo()) {
            if (ownerInfo != null) {
                User user = null;
                for (Address address : ownerInfo.getOwner().getAddress()) {
                    address.setHouseNoBldgApt(doorNumber);
                }
                if (StringUtils.isNotBlank(ownerInfo.getOwner().getAadhaarNumber()))
                    user = userService.getUserByAadhaarNumber(ownerInfo.getOwner().getAadhaarNumber());
                if (user == null || user.getId().equals(ownerInfo.getOwner().getId())) {
                    userService.updateUser(ownerInfo.getOwner());
                } else {
                    BasicProperty basicProp = find("select basicProperty from PropertyOwnerInfo where owner = ?",user.getId());
                    errorMesg.append("With entered aadhar number - ").append(ownerInfo.getOwner().getAadhaarNumber())
                            .append(" there is already owner present with owner name: ")
                            .append(user.getName()).append(" for assessment number : ")
                            .append(basicProp.getUpicNo());
                    break;
                }
            }
        }
        persist(basicProperty);
        LOGGER.debug("Exit from updateOwners");
        return errorMesg.toString();
    }
}
