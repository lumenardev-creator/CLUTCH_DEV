import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AnimatedBackground } from './components/common/AnimatedBackground';
import { LandingView, AthletePortal, CoachPortal, PricingView, SignupView, LoginView, SuccessView } from './views';
import { UserProvider } from './hooks/useUser';

const LayoutWithBackground = ({ children, hideFooter = false }) => {
  return (
    <>
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0 bg-black">
        <AnimatedBackground />
      </div>
      <div className="fixed inset-0 z-10 pointer-events-none" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} />
      <div className="relative z-20 flex flex-col min-h-screen">
        <Navbar />
        {children}
        {!hideFooter && <Footer />}
      </div>
    </>
  );
};

// Component to handle layout conditions based on routes
const AppRoutes = () => {
  return (
    <div className="relative min-h-screen font-sans text-white fallback-bg selection:bg-blue-500/30">
      <Routes>
        <Route path="/" element={<LayoutWithBackground><LandingView /></LayoutWithBackground>} />
        <Route path="/signup" element={<LayoutWithBackground hideFooter={true}><SignupView /></LayoutWithBackground>} />
        <Route path="/login" element={<LayoutWithBackground hideFooter={true}><LoginView /></LayoutWithBackground>} />
        <Route path="/success" element={<LayoutWithBackground hideFooter={true}><SuccessView /></LayoutWithBackground>} />
        <Route path="/demo" element={
          <div className="relative z-20 flex flex-col min-h-screen">
            <AthletePortal />
          </div>
        } />
        <Route path="/coach" element={
          <div className="relative z-20 flex flex-col min-h-screen">
            <CoachPortal />
          </div>
        } />
        <Route path="/pricing" element={
          <div className="relative z-20 flex flex-col min-h-screen">
            <PricingView />
          </div>
        } />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
};

export default App;
