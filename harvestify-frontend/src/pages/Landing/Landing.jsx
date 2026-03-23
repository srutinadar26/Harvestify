import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import GovernmentInfo from './GovernmentInfo';

const Landing = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <GovernmentInfo />
      <Footer />
    </div>
  );
};

export default Landing;