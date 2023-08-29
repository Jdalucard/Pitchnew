import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { templateSelectors } from '../../redux/template';
import { getAllTemplates } from '../../redux/template';
import { userSelectors } from '../../redux/user';

import { Box, Card, CardContent, CardActions, Typography, Tabs, Tab } from '@mui/material';

import CustomTabPanel from './components/CustomTabPanel';


export function Templates() {


    const dispatch = useAppDispatch();

    const emailTemplates = useAppSelector(templateSelectors.emailTemplates);
    const userData = useAppSelector(userSelectors.userData);

    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    };
  

    useEffect(() => {
      const fetchTemplates = async () => {

        const userId = userData?._id;

        if(userId !== undefined) {

          //to delete
          console.log('USERID ', userId)
  
          await dispatch(getAllTemplates());
        }
      };
  
      fetchTemplates();
    }, [])
    
    useEffect(() => {
      //to delete
      console.log("TEMPLATES ", emailTemplates)

    }, [emailTemplates])
    

  
    return (
      <div className="col-lg-12 content-padding">
        <div className="row">
          <div className="col col-lg-10 offset-0 offset-lg-1">
            <div className="notes title">
              <div className="DisplayLabel display-title">
                <span className="">Email Templates</span>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="tb-card tb-style1">
                  <div className="tb-fade-tabs tb-tabs tb-style3">
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
                        {emailTemplates.map((item, index) => (
                          <div key={index} style={{ width: "100%" }}>
                            <Card className="card" key={index}>
                              <CardContent>
                                <Typography> {item.subject} </Typography>
                                <Typography> {item.content} </Typography>
                              </CardContent>

                              <CardActions className="actions">
                                <button
                                  type="button"
                                  className="action-button main-action use-template-btn"
                                  onClick={() => {
                                    console.log("CLIC ");
                                  }}
                                >
                                  Use This Template
                                </button>
                              </CardActions>
                            </Card>
                          </div>
                        ))}
                      </CustomTabPanel>

                      <CustomTabPanel value={activeTab} index={1}>
                        My Templates
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