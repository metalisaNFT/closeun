import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import BlogPage from './components/BlogPage';
import BlogPostDisplay from './components/BlogPostDisplay';
import HumanRightsViolations from './components/HumanRightsViolations';
import UNRWAHamasConnection from './components/UNRWAHamasConnection';
import SecurityCouncilReformNeeds from './components/SecurityCouncilReformNeeds';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import PetitionPage from './components/PetitionPage';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
    },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <div className="content-padding" style={{ flex: 1, padding: '40px 0' }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/petition" element={<PetitionPage />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:postId" element={<BlogPostDisplay />} />
                            <Route path="/human-rights-violations" element={<HumanRightsViolations />} />
                            <Route path="/unrwa-hamas-connection" element={<UNRWAHamasConnection />} />
                            <Route path="/security-council-reform" element={<SecurityCouncilReformNeeds />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;