
import { Purpose, UserRole } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface PurposeSelectionProps {
  onPurposeSelect: (purpose: Purpose) => void;
  userRole: UserRole;
}

const PurposeSelection = ({ onPurposeSelect, userRole }: PurposeSelectionProps) => {
  const purposes = [
    {
      id: 'spark-ideas' as Purpose,
      icon: '💡',
      title: 'Spark Ideas',
      description: userRole === 'taker' 
        ? 'Get inspired by fresh perspectives and creative thoughts'
        : 'Share your insights and inspire someone new'
    },
    {
      id: 'make-friends' as Purpose,
      icon: '🤝',
      title: 'Make Friends',
      description: userRole === 'taker'
        ? 'Open your heart to a genuine new connection'
        : 'Offer friendship and warm conversation'
    },
    {
      id: 'find-meaning' as Purpose,
      icon: '🌟',
      title: 'Find Meaning',
      description: userRole === 'taker'
        ? 'Discover deeper purpose through shared wisdom'
        : 'Share something that brings meaning to life'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-in slide-in-from-right-5 duration-500">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">
            What are you seeking?
          </h1>
          <p className="text-white/90">
            Choose your intention for this meeting
          </p>
        </div>

        <div className="space-y-4">
          {purposes.map((purpose) => (
            <Card 
              key={purpose.id}
              className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => onPurposeSelect(purpose.id)}
            >
              <div className="flex items-start space-x-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {purpose.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {purpose.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {purpose.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurposeSelection;
