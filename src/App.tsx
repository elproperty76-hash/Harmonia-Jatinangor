import { useState } from 'react';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { LegalitySection } from './components/LegalitySection';
import { LocationAndSiteplanSection } from './components/LocationAndSiteplanSection';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Navbar } from './components/Navbar';
import { RealtimeNotificationDrawer } from './components/RealtimeNotificationDrawer';
import { RegistrationSection } from './components/RegistrationSection';
import { RoiAndSpecsSection } from './components/RoiAndSpecsSection';
import { UnitShowcaseSection } from './components/UnitShowcaseSection';
import { UNIT_TYPES, type UnitType } from './data/harmoniaData';
import { useRealtimeNotifications } from './hooks/useRealtimeNotifications';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const [selectedUnit, setSelectedUnit] = useState<UnitType>(UNIT_TYPES[0]);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [phonePreviewMode, setPhonePreviewMode] = useState(false);

  const {
    inquiries,
    unreadCount,
    connected,
    toasts,
    dismissToast,
    updateStatus,
    markAllRead,
  } = useRealtimeNotifications();

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleConsultUnit = (unit: UnitType) => {
    setSelectedUnit(unit);
    scrollToSection('daftar');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0B111E] dark:text-slate-100 transition-colors duration-200">
      <div
        className={
          phonePreviewMode
            ? 'max-w-[430px] mx-auto my-0 lg:my-6 lg:rounded-[36px] lg:border lg:border-slate-300 dark:lg:border-slate-700 lg:shadow-2xl lg:overflow-hidden bg-slate-50 dark:bg-[#0B111E]'
            : ''
        }
      >
        <Navbar onSelectSection={scrollToSection} />

        <main>
          <HeroSection
            theme={theme}
            onToggleTheme={toggleTheme}
            unreadCount={unreadCount}
            onOpenNotifications={() => setNotificationsOpen(true)}
            onGoToForm={() => scrollToSection('daftar')}
            onGoToUnits={() => scrollToSection('unit')}
            phonePreviewMode={phonePreviewMode}
            onTogglePhonePreview={() => setPhonePreviewMode((prev) => !prev)}
          />

          <UnitShowcaseSection
            selectedUnitId={selectedUnit.id}
            onSelectUnit={setSelectedUnit}
            onConsultUnit={handleConsultUnit}
            phonePreviewMode={phonePreviewMode}
          />

          <LocationAndSiteplanSection phonePreviewMode={phonePreviewMode} />

          <RoiAndSpecsSection
            selectedUnitId={selectedUnit.id}
            phonePreviewMode={phonePreviewMode}
          />

          <LegalitySection phonePreviewMode={phonePreviewMode} />

          <RegistrationSection
            preferredUnitName={selectedUnit.name}
            inquiries={inquiries}
            wsConnected={connected}
            onOpenNotifications={() => setNotificationsOpen(true)}
            phonePreviewMode={phonePreviewMode}
          />
        </main>

        <Footer />
      </div>

      <MobileBottomBar
        onSelectSection={scrollToSection}
        onOpenNotifications={() => setNotificationsOpen(true)}
        unreadCount={unreadCount}
      />

      <RealtimeNotificationDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        inquiries={inquiries}
        connected={connected}
        toasts={toasts}
        onDismissToast={dismissToast}
        onUpdateStatus={updateStatus}
        onMarkAllRead={markAllRead}
      />
    </div>
  );
}
