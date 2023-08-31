import React, { useState, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { templateSelectors } from '../../redux/template';
import { getAllTemplates, addEmailTemplate } from '../../redux/template';
import { userSelectors } from '../../redux/user';

import styles from './Templates.module.css';
import { Box, Card, CardContent, CardActions, Typography, Tabs, Tab, Button } from '@mui/material';

import swal from 'sweetalert';

import CustomTabPanel from './components/CustomTabPanel';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de react-quill

export function Templates() {


    const dispatch = useAppDispatch();

    const emailTemplates = useAppSelector(templateSelectors.emailTemplates);
    const userData = useAppSelector(userSelectors.userData);

    const editorRef = useRef<ReactQuill>(null);
    

    const [activeTab, setActiveTab] = useState(0);

    const [templateContent, setTemplateContent] = useState('');
    const [templateSubject, setTemplateSubject] = useState('');


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    };


    const handleButtonClick = () => {

      const contentNode = document.createElement('div');

      const reactQuillElement = React.createElement(ReactQuill, {
        value: templateContent,
        onChange: setTemplateContent,
        ref: editorRef,
        className: 'custom-quill',
      });

      ReactDOM.render(reactQuillElement, contentNode);

      const inputElement = document.createElement('input');

      inputElement.id = 'subject';
      inputElement.name = 'subject';
      inputElement.placeholder = 'Subject';
      inputElement.className = 'custom-input';
      inputElement.value = templateSubject;
      inputElement.onchange = (e) => setTemplateSubject(e.target.value);
      contentNode.insertBefore(inputElement, contentNode.firstChild);
      
      swal({
        title: "Add Email Template",
        text: "You can add email template for use it when you send mail",
        content: {element: contentNode},
        buttons: ["Cancel", "Add"],
        className: 'custom-modal',
      }).then((value) => {
        if (value) {
        
          const editorContent = editorRef.current?.getEditor().root.innerHTML;

          const params = {
            id: userData?._id,
            template: {
              subject: inputElement.value,
              content: editorContent,
              date: new Date()
            }
          };

          //to delete
          console.log('params ', params);

          dispatch(addEmailTemplate(params))
        }
      });
    };
  

    useEffect(() => {
      const fetchTemplates = async () => {

        const userId = userData?._id;

        if(userId !== undefined) {

          //to delete
          //console.log('USERID ', userId)
  
          await dispatch(getAllTemplates());
        }
      };
  
      fetchTemplates();
    }, [])
    
    useEffect(() => {
      //to delete
      //console.log("TEMPLATES ", emailTemplates)

    }, [emailTemplates])
    

  
    return (
      <div className="col-lg-12 content-padding">
        <div className="row">
          <div className="col col-lg-10 offset-0 offset-lg-1">
            <div className={`${styles.notes} ${styles.title}`}>
              <div className={`${styles.displayTitle}`}>
                <h2> Email Templates </h2>
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div className="col-lg-12">
                <div className="tb-card tb-style1">
                  <div className="tb-fade-tabs tb-tabs tb-style3">
                    <Box sx={{ width: "100%"}}>
                      <Box sx={{ borderBottom: 1, borderColor: "divider"}}>
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
                          <h2 className={`${styles.h2Sub}`}> Default Templates </h2>

                          // *todo* : convertir en componente y validar caso vacio
                        }
                        
                      </CustomTabPanel>

                      <CustomTabPanel value={activeTab} index={1}>
                        <h2 className={`${styles.h2Sub}`}> My Templates </h2>
                        {emailTemplates.map((item, index) => {

                          if (emailTemplates.length === 0) {
                            return (
                              <Card sx={{ width: '100%' }}>
                                <CardContent>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ float: 'right' }}
                                    onClick={() => console.log('Botón presionado')}
                                  >
                                    Presionar
                                  </Button>
                                </CardContent>
                              </Card>
                            );
                          }

                          if(item.userId){
                              return(
                              <div key={index} className={`${styles.panel}`}>
                                <Card className={`${styles.card}`} key={index}>
                                  <CardContent>
                                    <Typography className={`${styles.displaySubtitle}`}> {item.emailtemplate[0].subject} </Typography>
                                    <Typography> {item.emailtemplate[0].content} </Typography>
                                  </CardContent>
    
                                  <CardActions className={`${styles.actions}`}>
                                    <button
                                      type="button"
                                      className={`action-button ${styles.actionButton} `}
                                      onClick={() => { handleButtonClick() }}
                                    >
                                      Use This Template
                                    </button>
                                  </CardActions>
                                </Card>
                              </div>
                            )
                          }
                        }
                        )
                      }
                      </CustomTabPanel>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}