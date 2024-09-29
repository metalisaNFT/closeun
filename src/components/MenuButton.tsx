import React from 'react';
import Button from '@mui/material/Button';

interface MenuButtonProps {
    onClick: () => void;
    label: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ onClick, label }) => {
    return (
        <Button color="inherit" onClick={onClick}>
            {label}
        </Button>
    );
};

export default MenuButton;