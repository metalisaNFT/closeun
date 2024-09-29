import React from 'react';
import { Box } from '@mui/material';

const Logo: React.FC = () => {
    return (
        <Box>
            <img 
                src="/logo.svg" 
                alt="Logo" 
                style={{ 
                    height: '40px',
                    filter: 'brightness(0) invert(1)'
                }} 
            />
        </Box>
    );
};

export default Logo;