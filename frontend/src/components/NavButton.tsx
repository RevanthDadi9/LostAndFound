import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface NavButtonProps extends ButtonProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ to, children, onClick, ...rest }) => {
  return (
    <Button
      component={RouterLink}
      to={to}
      onClick={onClick}
      sx={{
        my: 2,
        color: 'white',
        display: 'block',
        textTransform: 'uppercase',
        fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
        fontSize: '1rem',
        letterSpacing: '.15rem',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          color: 'rgb(8, 103, 176)',
          transform: 'scale(1.05)',
        },
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default NavButton;
