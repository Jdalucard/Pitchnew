import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box, Select, SelectChangeEvent } from '@mui/material';
import { ISelectInputOptionNumeric } from '../types';

interface IProps {
  inputLabel: string;
  inputWidth: string;
  options: ISelectInputOptionNumeric[];
  selectedOptions: ISelectInputOptionNumeric[];
  handleChange: (options: ISelectInputOptionNumeric[]) => void;
}

export const MultiSelectInput: React.FC<IProps> = ({
  inputLabel,
  inputWidth,
  options,
  selectedOptions,
  handleChange,
}) => {
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 500,
        width: 250,
      },
    },
  };

  const handleInputChange = (event: SelectChangeEvent<string[] | null>) => {
    const values = event.target.value;

    if (values) {
      let selectedValues: string[];
      if (typeof values == 'string' || typeof values == 'number') {
        selectedValues = [values.toString()];
      } else {
        selectedValues = values.map((value) => value.toString());
      }

      // Convert string to proper IOption
      const selectedOptions: ISelectInputOptionNumeric[] = [];

      if (options.length) {
        options.map((option) => {
          selectedValues.map((selected) => {
            if (option.value.toString() == selected) {
              selectedOptions.push(option);
            }
          });
        });
      }

      handleChange(selectedOptions);
    }
  };

  const handleDelete = (erasingItemValue: number) => {
    const newSelectedOnesAfterDelete = selectedOptions.filter(
      (option) => option.value !== erasingItemValue,
    );

    handleChange(newSelectedOnesAfterDelete);
  };

  return (
    <FormControl>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        multiple
        value={selectedOptions.map((option) => option.value.toString())}
        onChange={handleInputChange}
        input={<OutlinedInput label={inputLabel} sx={{ width: inputWidth }} />}
        MenuProps={menuProps}
        renderValue={() => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selectedOptions.map((option, index) => (
              <Chip
                key={index}
                label={option.label}
                onDelete={() => handleDelete(option.value)}
                onMouseDown={(event) => event.stopPropagation()}
              />
            ))}
          </Box>
        )}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value.toString()}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
