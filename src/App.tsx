import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MarketplaceDirectory } from './components/MarketplaceDirectory';
import { CyberArcadeHub } from './components/CyberArcadeHub';
import { BusinessModelSection } from './components/BusinessModelSection';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { IntakeWizardModal } from './components/IntakeWizardModal';
import { FreelancerOnboardingModal } from './components/FreelancerOnboardingModal';
import { BookingModal } from './components/BookingModal';
import { INITIAL_EXPERTS, DEMO_PERSONAS } from './data/mockData';
import type { Expert, ActiveUser } from './types';

export function App() {
  // Directory specialists state (allows new experts to be registered dynamically)
  const [experts, setExperts] = useState<Expert[]>(INITIAL_EXPERTS);

  // Active simulated user persona
  const [currentUser] = useState<ActiveUser>(DEMO_PERSONAS[0]);

  // Modal states
  const [intakeWizardOpen, setIntakeWizardOpen] = useState<boolean>(false);
  const [initialIntakeNeed, setInitialIntakeNeed] = useState<string>('DPDP Act 2023 Compliance & Audit');
  const [freelancerModalOpen, setFreelancerModalOpen] = useState<boolean>(false);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingExpert, setBookingExpert] = useState<Expert | null>(null);
  const [bookingSessionType, setBookingSessionType] = useState<'consultation' | 'mentorship-class' | 'rapid-triage'>('consultation');

  // Handlers
  const handleOpenIntakeWizardWithNeed = (need: string) => {
    setInitialIntakeNeed(need);
    setIntakeWizardOpen(true);
  };

  const handleSelectExpertForBooking = (
    expert: Expert,
    sessionType: 'consultation' | 'mentorship-class' | 'rapid-triage'
  ) => {
    setBookingExpert(expert);
    setBookingSessionType(sessionType);
    setBookingModalOpen(true);
  };

  const handleRegisterExpert = (newExpert: Expert) => {
    setExperts([newExpert, ...experts]);
  };

  const handleScrollToMarketplace = () => {
    document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToArcade = () => {
    document.getElementById('arcade')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Executive Clean Navbar */}
      <Navbar
        onOpenIntakeWizard={() => handleOpenIntakeWizardWithNeed('DPDP Act 2023 Compliance & Audit')}
      />

      {/* Main Single-Page Presentation Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenIntakeWizard={() => handleOpenIntakeWizardWithNeed('DPDP Act 2023 Compliance & Audit')}
          onExploreLabs={handleScrollToArcade}
          onBrowseExperts={handleScrollToMarketplace}
        />

        {/* 1. Specialist Directory (#marketplace) */}
        <section id="marketplace">
          <MarketplaceDirectory
            experts={experts}
            onSelectExpert={handleSelectExpertForBooking}
            onOpenIntakeWizard={() => handleOpenIntakeWizardWithNeed('Vulnerability Assessment')}
          />
        </section>

        {/* 2. Interactive Labs / Cyber Arcade (#arcade) */}
        <section id="arcade" className="border-t border-slate-200">
          <CyberArcadeHub
            currentUser={currentUser}
            experts={experts}
            onBookTutor={(tutor) => handleSelectExpertForBooking(tutor, 'mentorship-class')}
          />
        </section>

        {/* 3. Pricing & Business Model Section (#business-model) */}
        <section id="business-model" className="border-t border-slate-200">
          <BusinessModelSection
            onOpenIntakeWizard={() => handleOpenIntakeWizardWithNeed('MSME Security Subscription')}
            onOpenFreelancerModal={() => setFreelancerModalOpen(true)}
          />
        </section>

        {/* 4. Team & Academic Leadership Section (#team) */}
        <section id="team" className="border-t border-slate-200">
          <TeamSection />
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenIntakeWizard={() => handleOpenIntakeWizardWithNeed('DPDP Act 2023 Compliance & Audit')}
        onOpenFreelancerModal={() => setFreelancerModalOpen(true)}
      />

      {/* Modals */}
      <IntakeWizardModal
        isOpen={intakeWizardOpen}
        onClose={() => setIntakeWizardOpen(false)}
        experts={experts}
        onSelectExpert={handleSelectExpertForBooking}
        initialNeed={initialIntakeNeed}
      />

      <FreelancerOnboardingModal
        isOpen={freelancerModalOpen}
        onClose={() => setFreelancerModalOpen(false)}
        onRegisterExpert={handleRegisterExpert}
      />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        expert={bookingExpert}
        initialSessionType={bookingSessionType}
      />
    </div>
  );
}

export default App;
