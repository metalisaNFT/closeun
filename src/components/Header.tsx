import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from './Logo';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { ButtonProps } from '@mui/material/Button';

// Remove the HeaderProps interface or omit the onMenuSelect prop
// interface HeaderProps {
//     // onMenuSelect: (page: 'home' | 'about' | 'faq') => void;
// }

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#1976d2',
    color: '#fff',
    padding: '10px 20px',
});

// Update StyledButton to accept both ButtonProps and LinkProps
const StyledButton = styled(Button)<ButtonProps & LinkProps>({
    marginLeft: '10px',
    color: '#fff',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});

// Update the Header component to not require props
const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <StyledToolbar>
                <Logo />
                <div>
                    <StyledButton component={RouterLink} to="/">
                        Home
                    </StyledButton>
                    <StyledButton component={RouterLink} to="/about">
                        About Us
                    </StyledButton>
                    <StyledButton component={RouterLink} to="/faq">
                        FAQ
                    </StyledButton>
                    <StyledButton component={RouterLink} to="/blog">
                        Blog
                    </StyledButton>
                </div>
            </StyledToolbar>
        </AppBar>
    );
};

export default Header;