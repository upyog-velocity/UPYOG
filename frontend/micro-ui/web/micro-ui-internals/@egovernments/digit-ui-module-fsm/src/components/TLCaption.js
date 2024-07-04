import React from "react";
import { useTranslation } from "react-i18next";
import { TelePhone } from "@egovernments/digit-ui-react-components";
import Reason from "./Reason";
import Username from "./Username";

const TLCaption = ({ data }) => {
  const { t } = useTranslation();
  return (
    <div>
      {data.date && <p>{data.date}</p>}
      <Username assigner={data.name} />
      {data.mobileNumber && <TelePhone mobile={data.mobileNumber} />}
      {data.source && <p>{t("ES_APPLICATION_DETAILS_APPLICATION_CHANNEL_" + data.source.toUpperCase())}</p>}
      {data.comment && <Reason otherComment={data?.otherComment} headComment={data?.comment}></Reason>}
    </div>
  );
};

export default TLCaption;
