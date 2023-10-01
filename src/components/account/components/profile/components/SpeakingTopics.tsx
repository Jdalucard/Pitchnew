import { useEffect } from 'react';
import { Typography, FormControlLabel, Checkbox, FormGroup, TextField } from '@mui/material';
import { Genre, IProfileData } from '../../../../../types';
import { MultiSelector } from '.';
import styles from '../../../Account.module.css';

interface IProps {
  data: IProfileData | null;
  handleSetProfileData: (name: string, value: string | boolean | Genre[]) => void;
}

export const SpeakingTopics: React.FC<IProps> = ({ data, handleSetProfileData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    handleSetProfileData(name, value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;

    handleSetProfileData(name, checked);
  };

  return (
    <div className={styles.speakingContainer}>
      <div className={styles.opportunitiesWrapper}>
        <Typography variant="body1" color="text.secondary" fontWeight="bold">
          Opportunities
        </Typography>
        <div>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={data?.podcasts} onChange={handleCheckboxChange} />}
              name="podcasts"
              label="Podcast"
            />
            <FormControlLabel
              control={<Checkbox checked={data?.free_speaking} onChange={handleCheckboxChange} />}
              name="free_speaking"
              label="Free speaking"
            />
            <FormControlLabel
              control={<Checkbox checked={data?.paid_speaking} onChange={handleCheckboxChange} />}
              name="paid_speaking"
              label="Paid speaking"
            />
            <FormControlLabel
              control={<Checkbox checked={data?.virtual} onChange={handleCheckboxChange} />}
              name="virtual"
              label="Virtual"
            />
            <FormControlLabel
              control={<Checkbox checked={data?.conferences} onChange={handleCheckboxChange} />}
              name="conferences"
              label="Conferences"
            />
          </FormGroup>
        </div>
      </div>
      <div className={styles.speakingTopicsFieldsWrapper}>
        <MultiSelector handleSetProfileData={handleSetProfileData} />
        <TextField
          multiline
          rows={4}
          placeholder="Short Bio"
          name="shortbio"
          label="Short Bio"
          value={data?.shortbio}
          onChange={handleInputChange}
        />
        <TextField
          multiline
          rows={4}
          placeholder="Topics"
          name="topics"
          label="Topics"
          value={data?.topics}
          onChange={handleInputChange}
        />
        <TextField
          multiline
          rows={4}
          placeholder="Detailed Profile"
          name="detailedprofile"
          label="Detailed Profile"
          value={data?.detailedprofile}
          onChange={handleInputChange}
        />
        <TextField
          multiline
          rows={4}
          placeholder="Qualification"
          name="qualification"
          label="Qualification"
          value={data?.qualification}
          onChange={handleInputChange}
        />
        <TextField
          placeholder="Audience"
          name="audience"
          label="Audience"
          multiline
          rows={4}
          value={data?.audience}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};
