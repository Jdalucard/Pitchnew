
import React, { useState, useEffect } from "react";
import { dragScroll } from "../../common/Util/drag-scroll";
import { getPrimary } from "../../redux/email/email.thunks";

interface IProps {
  // props necesarias
  changeLoadingMessage: (message?: string) => void;
  finishLoading: (error: boolean, errorMessage: string) => void;
}

interface OutreachSequencesmailState {
  //propiedades del estado
  primaryAccount: string | null;
}
export const SequencesMail: React.FC<IProps> = (props) => {
  const [primaryAccount, setPrimaryAccount] =
    useState<OutreachSequencesmailState>(null);

  useEffect(() => {
    const fetchData = async () => {
      let outreachPanel = new dragScroll();
      outreachPanel.init({
        id: "outreach-panel",
        draggable: true,
        wait: false,
      });

      try {
        props.changeLoadingMessage("Loading Sequences");
        const primaryResponse = await getPrimary();

        if (primaryResponse.data) {
          setPrimaryAccount(primaryResponse.data);
          await loadOutreachSequences();
        } else {
          setPrimaryAccount({ primaryAccount: "none" });
        }

        props.changeLoadingMessage();
      } catch (error) {
        setPrimaryAccount({ primaryAccount: "none" });
        props.finishLoading(
          true,
          "An error has occurred loading your email data"
        );
        getemailsignature();
        loadListsItmes();
      }
    };

    fetchData();
  }, []);

  const loadOutreachSequences = async () => {
    try {
      const response = await outreachSequencesApi.getAll();
      setState(response.data);
    } catch (error) {
      props.finishLoading(
        true,
        "An error has occurred loading your outreach sequences"
      );
    }
  };

  return <>SequencesMail</>;
};
