import React, { useMemo } from "react";
import { PageBasedInput, Loader, RadioButtons, CardHeader } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const LanguageSelection = () => {
  const { t } = useTranslation();
  const history = useHistory();

  const { data: { languages, stateInfo } = {}, isLoading } = Digit.Hooks.useStore.getInitData();
  const selectedLanguage = Digit.StoreData.getCurrentLanguage();

  const texts = useMemo(
    () => ({
      header: t("CS_COMMON_CHOOSE_LANGUAGE"),
      submitBarLabel: t("CORE_COMMON_CONTINUE"),
    }),
    [t]
  );

  const RadioButtonProps = useMemo(
    () => ({
      options: languages,
      optionsKey: "label",
      additionalWrapperClass: "reverse-radio-selection-wrapper",
      onSelect: (language) => Digit.LocalizationService.changeLanguage(language.value, stateInfo.code),
      selectedOption: languages?.filter((i) => i.value === selectedLanguage)[0],
    }),
    [selectedLanguage, languages]
  );

  function onSubmit() {
    history.push(`/digit-ui/citizen/select-location`);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="selection-card-wrapper">
      <div className="main-banner-image"  style={window.innerWidth <= 565 ? {marginBottom: "30px"} : {float:"left",width:"80%"}}>
        <img
            className="city"
            id="topbar-logo" 
            src={window.innerWidth <= 565 ? "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/mobile_banner_3.png" : "https://velocity-upyog-assets.s3.ap-south-1.amazonaws.com/desktop_banner_2.png" || "https://in-egov-assets.s3.ap-south-1.amazonaws.com/images/Upyog-logo.png"}
            alt="unicef"
            style={{width:"100%"}}
          />
      </div>
      <div className="left-side_content" style={window.innerWidth <= 565 ? {} : {float:"right",marginRight:"-200px",width:"35%"}}>
        <PageBasedInput texts={texts} onSubmit={onSubmit}>
          <CardHeader>{t("CS_COMMON_CHOOSE_LANGUAGE")}</CardHeader>
          <RadioButtons {...RadioButtonProps} />
        </PageBasedInput>
      </div>
    </div>
  );
};

export default LanguageSelection;
