import React, { useState, useEffect, useRef } from 'react';

import ReactDOM from 'react-dom';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { templateSelectors } from '../../redux/template';
import { getAllTemplates, addEmailTemplate } from '../../redux/template';
import { userSelectors } from '../../redux/user';
import { warningAlert } from '../../redux/alerts';

import styles from './Templates.module.css';
import { Box, Card, CardContent, CardActions, Typography, Tabs, Tab, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import swal from 'sweetalert';

import CustomTabPanel from './components/CustomTabPanel';

import ReactQuill from 'react-quill';
import ReactMarkdown from 'react-markdown';
import 'react-quill/dist/quill.snow.css'; // Importa los estilos CSS de react-quill
import turndown from 'turndown';

export function Templates() {


    const dispatch = useAppDispatch();

    const emailTemplates = useAppSelector(templateSelectors.emailTemplates);
    const userData = useAppSelector(userSelectors.userData);

    const editorRef = useRef<ReactQuill>(null);
    

    const [activeTab, setActiveTab] = useState(0);

    const [templateContent, setTemplateContent] = useState('');
    const [templateSubject, setTemplateSubject] = useState('');

    useEffect(() => {
      const fetchTemplates = async () => {

        const userId = userData?._id;

        if(userId !== undefined) {
          await dispatch(getAllTemplates());
        }
      };
  
      fetchTemplates();
    }, [])
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    };
    

    const handleButtonClick = () => {

      const contentNode = document.createElement('div');
      contentNode.style.display = 'flex'
      contentNode.style.flexDirection = 'column'
      contentNode.style.width = '700px !important'

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
      inputElement.style.marginBottom = '20px';
      inputElement.style.padding = '10px';

      inputElement.value = templateSubject;
      inputElement.onchange = (e) => setTemplateSubject(e.target.value || '');
      contentNode.insertBefore(inputElement, contentNode.firstChild);
      
      swal({
        title: "Add Email Template",
        text: "You can add email template for use it when you send mail",
        content: {element: contentNode},
        buttons: ["Cancel", "Add"],
        className: 'custom-modal',
      }).then((value) => {
        if (value) {
        
          const subjectTitle = inputElement.value?.trim() || '';
          const editorContent = editorRef.current?.getEditor().root.innerHTML?.trim() || '';

          const turndownService = new turndown();
          const markdown = turndownService.turndown(editorContent || '');

          if(markdown?.trim() === ''){
            dispatch(warningAlert({
              title: 'Empty Content',
              message: "The content of the template cannot be empty",
            }))
          }else if(subjectTitle === ''){
            dispatch(warningAlert({
              title: 'Empty Subject',
              message: "The subject of the template cannot be empty",
            }))
          }else if(markdown !== '' && subjectTitle !== ''){
            
            const params = {
              id: userData?._id || "1",
              template: {
                subject: subjectTitle,
                content: markdown || "",
                date: new Date()
              }
            };
  
            dispatch(addEmailTemplate(params))
          }
        }
      });
    };

    return (
      <div >
        <div className={`${styles.row}`}>
          <div >
            <div className={`${styles.notes} ${styles.title}`}>
              <div className={`${styles.displayTitle}`}>
                <h2> Email Templates </h2>
              </div>
            </div>

            <div className={`${styles.row}`}>
              <div>
                <div>
                  <div>
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
                          <h2 className={`${styles.h2Sub}`}>
                            {" "}
                            Default Templates{" "}
                          </h2>

                          // *todo* : convertir en componente y validar caso vacio
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
                                  onClick={handleButtonClick}
                                  className={`action-button ${styles.actionButton} `}
                                >
                                  Add New Template
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        ) : (
                          <>
                            <h2 className={`${styles.h2Sub}`}>My Templates</h2>
                            {emailTemplates.map((item, index) => {

                              if (item.userId) {
                                return (
                                  <div
                                    key={index}
                                    className={`${styles.panel}`}
                                  >
                                    <Card
                                      className={`${styles.card}`}
                                      key={index}
                                    >
                                      <CardContent>
                                        <Typography
                                          className={`${styles.displaySubtitle}`}
                                        >
                                          {item.emailtemplate[0].subject}
                                        </Typography>
                                        <ReactMarkdown>
                                          {(item.emailtemplate[0].content)}
                                        </ReactMarkdown>
                                      </CardContent>

                                      <CardActions
                                        className={`${styles.actions}`}
                                      >
                                        <button
                                          type="button"
                                          className={`action-button ${styles.actionButton} `}
                                          onClick={() => {
                                            handleButtonClick();
                                          }}
                                        >
                                          Use This Template
                                        </button>
                                      </CardActions>
                                    </Card>
                                  </div>
                                );
                              }
                              return null;
                            })}
                          </>
                        )}
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