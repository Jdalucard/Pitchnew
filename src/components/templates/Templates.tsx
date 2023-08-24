import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import TemplatesPanel from '../components/templates-panel';
import addTemplateapi from '../../../api/routes/add-template-api';
import activityApi from '../../../api/routes/activity-api';
import async from 'async';
import swalApi from '../../../api/util/swal-api';
import InputBox from '../../../common/general/components/input-box';
import addUserimageapi from '../../../api/routes/add-userimage-api';
import emailAccountsApi from '../../../api/routes/email-accounts-api';
import * as Showdown from "showdown";


import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import { 
  fetchEmailTemplates,
  getEmaildata,
  addEmailtemplate,
  editEmailtemplate,
  removeEmailtemplate,
  sendEmailtemplate,
} from '../../redux/template';

export function Templates() {
  

    const dispatch = useDispatch();

    const [subject, setSubject] = useState('');
    const [editorData, setEditorData] = useState('');

    const { templates } = useSelector((state: RootState) => state.emailTemplates);

    useEffect(() => {
        dispatch(fetchEmailTemplates());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchEmailTemplates());
    }, [dispatch]);

    const handleSubjectChange = (e) => {
      setSubject(e.target.value);
    };

    const handleEditorChange = (content) => {
      setEditorData(content);
    };

    const addEmailTemplateHandler = () => {
      dispatch(
        addEmailtemplate({
          subject,
          content: editorData,
        })
      );
    };

    const editEmailTemplateHandler = (template) => {
      dispatch(
        editEmailtemplate({
          ...template,
          subject,
          content: editorData,
        })
      );
    };

    const removeEmailTemplateHandler = (template) => {
      dispatch(removeEmailtemplate(template));
    };

    const sendEmailTemplateHandler = (template) => {
        dispatch(sendEmailtemplate(template));
      };


    return (
        <TemplatesPanel
            templates={templates}
            subject={subject}
            editorData={editorData}
            onSubjectChange={handleSubjectChange}
            onEditorChange={handleEditorChange}
            onAddTemplate={addEmailTemplateHandler}
            onEditTemplate={editEmailTemplateHandler} 
            onRemoveTemplate={removeEmailTemplateHandler}
        />
    )
}