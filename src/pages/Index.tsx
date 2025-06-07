
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import PurposeSelection from '@/components/PurposeSelection';
import TimeSelection from '@/components/TimeSelection';
import ResultsScreen from '@/components/ResultsScreen';

export type UserRole = 'taker' | 'giver' | null;
export type Purpose = 'spark-ideas' | 'make-friends' | 'find-meaning' | null;
export type TimeSlot = '9am' | '2pm' | '7pm' | null;

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'purpose' | 'time' | 'results'>('landing');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Purpose>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSlot>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentScreen('purpose');
  };

  const handlePurposeSelect = (purpose: Purpose) => {
    setSelectedPurpose(purpose);
    setCurrentScreen('time');
  };

  const handleTimeSelect = (time: TimeSlot) => {
    setSelectedTime(time);
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    setCurrentScreen('landing');
    setUserRole(null);
    setSelectedPurpose(null);
    setSelectedTime(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingPage onRoleSelect={handleRoleSelect} />;
      case 'purpose':
        return <PurposeSelection onPurposeSelect={handlePurposeSelect} userRole={userRole} />;
      case 'time':
        return <TimeSelection onTimeSelect={handleTimeSelect} />;
      case 'results':
        return (
          <ResultsScreen 
            userRole={userRole}
            purpose={selectedPurpose}
            time={selectedTime}
            onRestart={handleRestart}
          />
        );
      default:
        return <LandingPage onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400">
      {renderScreen()}
    </div>
  );
};

export default Index;
