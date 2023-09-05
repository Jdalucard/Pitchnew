import React, { useState, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { templateSelectors } from '../../redux/template';
import { getAllTemplates, addEmailTemplate, removeEmailTemplate, editEmailTemplate } from '../../redux/template';
import { userSelectors } from '../../redux/user';
import { warningAlert, openConfirmation } from '../../redux/alerts';

import styles from './Templates.module.css';
import { Box, Card, CardContent, Typography, Tabs, Tab, Button, Fab } from '@mui/material';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de react-quill

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import CustomTabPanel from './components/CustomTabPanel';

import swal from 'sweetalert';
import ReactQuill from 'react-quill';
import ReactMarkdown from 'react-markdown';
import turndown from 'turndown';

import { emailValidation } from '../../common/emailValidation';

import { crud } from '../../constants/crud';
import { ITemplate, IAddEmailTemplate, IEditEmailTemplate, ISendEmail } from '../../types';
import { sendEmail } from '../../redux/email';

export function Templates() {
  const dispatch = useAppDispatch();

  const emailTemplates = useAppSelector(templateSelectors.emailTemplates);
  const userData = useAppSelector(userSelectors.userData);

  const editorRef = useRef<ReactQuill>(null);

  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
    const fetchTemplates = async () => {
      const userId = userData?._id;

      if (userId !== undefined) {
        await dispatch(getAllTemplates());
      }
    };

    fetchTemplates();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAddTemplate = (params : IAddEmailTemplate) =>{

    dispatch(addEmailTemplate(params));
  }

  const handleEditTemplate = (params : IEditEmailTemplate) =>{

    dispatch(editEmailTemplate(params));
  }

  const handleSendEmail = (params : ISendEmail) =>{

    dispatch(sendEmail(params));
  }

  const handleDeleteTemplate = async (template: ITemplate) => {

    const isConfirmed = await dispatch(
      openConfirmation({
        message:
          "Are you sure you want to delete this Email Template? You won't be able to recover it after deletion is complete. ",
        title: "Confirm delete Email Template",
      })
    ).unwrap();

    if (isConfirmed) {
      
      const params = {
        userId: template.userId,
        templateId: template.emailtemplate[0]._id || '',
      };

      dispatch(removeEmailTemplate(params));
    }
  };

  /**
   * Function to convert form HTML to Markdown
   * @param content 
   * @returns 
   */
  const convertToMarkdown = (content : string) => {

    const turndownService = new turndown();
    const markdown = turndownService.turndown(content || "");

    return markdown;

  }


  //HANDLE OPEN EDITOR
  /**
   * Open editor
   * @param actionType type of action
   * @param template 
   */
  const handleOpenEditor = ( actionType: string, template?: ITemplate) => {

    //create the wrapper
    const contentNode = document.createElement("div");
    contentNode.style.display = "flex";
    contentNode.style.flexDirection = "column";

    const divElement = document.createElement("div");
    divElement.style.display = "flex";
    divElement.style.flexDirection = "column";
    divElement.style.width = "100%";
    divElement.style.marginBottom = "20px";

    //creating the input
    const inputElement = document.createElement("input");

    //if user will send an email, set the input
    if(actionType === crud.SEND){
      
      inputElement.id = "email";
      inputElement.name = "email";
      inputElement.placeholder = "Insert Email";
      inputElement.type = "email";
      inputElement.style.marginBottom = "20px";
      inputElement.style.padding = "10px";

      divElement.appendChild(inputElement);
      contentNode.appendChild(divElement);

    }else{ //if not, it will send or edit a template/email
      const reactQuillElement = React.createElement(ReactQuill, {
        value: actionType !== crud.ADD.toString() ? template?.emailtemplate[0].content || '' : '',
        ref: editorRef,
        className: "custom-quill",
        style: {
          display: 'flex',
          flexDirection: 'column',
          maxHeight: "40vh",
          height: "40vh",
          width: "100%",
          marginBottom: '20px'
        },
      });   
  
      ReactDOM.render(reactQuillElement, contentNode);

      inputElement.id = "subject";
      inputElement.name = "subject";
      inputElement.placeholder = "Subject";
      inputElement.style.marginBottom = "20px";
      inputElement.style.padding = "10px";
      inputElement.value = actionType !== crud.ADD.toString() ? template?.emailtemplate[0].subject || '' : '';
  
      contentNode.insertBefore(inputElement, contentNode.firstChild);

    }

    
    //open de modal
    swal({
      title: actionType === crud.ADD.toString() ? "Add Email Template" : actionType === crud.EDIT.toString() ? "Edit Email Template" : "Send Email",
      text: actionType === crud.ADD.toString() ? "You can add email template for use it when you send mail" : actionType === crud.EDIT.toString() ? "You can edit this email template for use it when you send mail" : "",
      content: { element: contentNode },
      buttons: actionType === crud.ADD.toString() ? ["Cancel", "Add"] : actionType === crud.EDIT.toString() ? ["Cancel", "Edit"] : ["Cancel", "Send"],
      className: "custom-modal",
    }).then((value) => {

      //if user select any option
      if (value) {

        //save subject and message
        const subjectInput = inputElement.value?.trim() || "";
        let editorContent = editorRef.current?.getEditor().root.innerHTML?.trim() || "";

        //IF CONTENT IS EMPTY. DELETE ANY INNERHTML
        if(editorRef.current?.getEditor().root.innerText.trim() === "") { 
          editorContent = '';
        }

        //IF CONTENT OR SUBJECT IS EMPTY. SHOW ERROR
        if (actionType !== crud.SEND && editorContent?.trim() === "") { 
          dispatch(
            warningAlert({
              title: "Empty Content",
              message: "The content of the template cannot be empty",
            })
          );
        } else if (actionType !== crud.SEND && subjectInput?.trim() === "") {
          dispatch(
            warningAlert({
              title: "Empty Subject",
              message: "The subject of the template cannot be empty",
            })
          );
        } else if(actionType === crud.SEND.toString()){
          
          //TO SEND AN EMAIL
          const emailDestination = subjectInput;  

          //VALIDATE IF EMAIL IS EMPTY OR NOT VALID
          if(subjectInput?.trim() === "" || !emailValidation(emailDestination)){ 
            dispatch(
              warningAlert({
                title: "Wrong Email",
                message: "Insert an Email Valid",
              })
            );
          }else {
            //IF CONTENT AND EMAIL DESTINATION ARE VALID SET PARAMS

            const params = {
              emailData : {
                emaiAccountdata: userData || undefined,
                emailval: emailDestination,
                message: template?.emailtemplate[0].content || '',
                subject: template?.emailtemplate[0].subject  || '',
              }
            };

            //SEND EMAIL
            handleSendEmail(params);
        
          }

          //IF USER WANTS TO EDIT OR CREATE
        }else if (editorContent.trim() !== "" && subjectInput !== "") {
          
          //TO EDIT A TEMPLATE
          if(actionType === crud.EDIT.toString()){  

            const params = {
              templateId: template?._id || '',
              template: {
                _id:  template?.emailtemplate[0]._id || '',
                subject: subjectInput,
                content: editorContent || "",
                date: template?.emailtemplate[0].date || new Date(),
                editDate: new Date()
              },
              userId: userData?._id || "",
            };

            handleEditTemplate(params);

          }else if(actionType === crud.ADD.toString()){

            const params = {
              userId: userData?._id || "",
              template: {
                id: '',
                subject: subjectInput,
                content: editorContent || "",
                date: new Date(),
              },
            };

            handleAddTemplate(params);
          }
        }
      }
    });
  };

  return (
    <div className={`${styles.row}`}>
      <div className={`${styles.notes} ${styles.title}`}>
        <div className={`${styles.displayTitle}`}>
          <Typography variant="h2"> Email Templates </Typography>
        </div>
      </div>

      <div className={`${styles.row}`}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Default Templates" />
              <Tab label="My Templates" />
            </Tabs>
          </Box>

          <CustomTabPanel value={activeTab} index={0}>
            {
              <Typography className={`${styles.h2Sub}`}>
                {" "}
                Default Templates{" "}
              </Typography>
            }
          </CustomTabPanel>

          <CustomTabPanel value={activeTab} index={1}>
            {emailTemplates.length === 0 ? (
              <div className={`${styles.panel}`}>
                <Card className={`${styles.card}`}>
                  <CardContent className={`${styles.cardContent}`}>
                    <Typography variant="h3">
                      You don't have templates yet
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      size="medium"
                      endIcon={<AddIcon />}
                      sx={{ float: "right" }}
                      onClick={() => {handleOpenEditor(crud.ADD.toString())}}
                      className={`action-button ${styles.actionButton} `}
                    >
                      Add New Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
                <Box className={`${styles.buttonCard}`}>
                  <Fab className={`${styles.addButton}`} onClick={() => {handleOpenEditor(crud.ADD.toString())}}>
                    <AddIcon style={{ color: "white" }} />
                  </Fab>
                </Box>
                {emailTemplates.map((item, index) => {

                  if (item.userId && item.emailtemplate.length > 0) {
                    return (
                      <div key={index} className={`${styles.panel}`}>
                        <Card className={`${styles.card}`} key={index}>
                          <CardContent>
                            <Typography className={`${styles.displaySubtitle}`}>
                              {item.emailtemplate[0].subject || ""}
                            </Typography>
                            <ReactMarkdown>
                              {convertToMarkdown(item.emailtemplate[0].content || "")}
                            </ReactMarkdown>
                          </CardContent>

                          <Box className={`${styles.buttonCard}`}>
                            <Fab
                              type="button"
                              onClick={() => {
                                handleDeleteTemplate(item);
                              }}
                            >
                              <DeleteIcon style={{ color: "black" }} />
                            </Fab>
                            <Fab
                              className={`${styles.addButton}`}
                              type="button"
                              onClick={() => {handleOpenEditor(crud.EDIT.toString(), item)}}
                            >
                              <EditIcon style={{ color: "white" }} />
                            </Fab>
                            <Fab
                              className={`${styles.addButton}`}
                              type="button"
                              onClick={() => { handleOpenEditor(crud.SEND.toString(), item) }}
                            >
                              <SendIcon style={{ color: "white" }} />
                            </Fab>
                          </Box>
                        </Card>
                      </div>
                    );
                  }
                  return <></>;
                })}
              </>
            )}
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
}