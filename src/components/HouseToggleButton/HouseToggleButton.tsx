import React from 'react';
import { ToggleButton, ToggleButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

interface HouseToggleButtonProps extends ToggleButtonProps {
  value: string;
}

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '&.Mui-selected:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const HouseToggleButton: React.FC<HouseToggleButtonProps> = (props) => {
  return <StyledToggleButton {...props} />;
};

export default HouseToggleButton;