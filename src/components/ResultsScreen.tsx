
import { UserRole, Purpose, TimeSlot } from '@/pages/Index';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useMatching } from '@/hooks/useMatching';
import { useToast } from '@/hooks/use-toast';

interface ResultsScreenProps {
  userRole: UserRole;
  purpose: Purpose;
  time: TimeSlot;
  onRestart: () => void;
}

const ResultsScreen = ({ userRole, purpose, time, onRestart }: ResultsScreenProps) => {
  const [isMatched, setIsMatched] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { submitMatchingRequest, listenForMatch, isMatching, error } = useMatching();
  const { toast } = useToast();

  useEffect(() => {
    const handleMatching = async () => {
      if (!userRole || !purpose || !time) {
        setLoading(false);
        return;
      }

      try {
        const result = await submitMatchingRequest(userRole, purpose, time);
        
        if (result) {
          if (result.matched) {
            // Immediate match found
            setIsMatched(true);
            setLoading(false);
          } else {
            // No immediate match, wait for real-time updates
            const cleanup = listenForMatch(result.request_id, (matchData) => {
              console.log('Match found via realtime:', matchData);
              setIsMatched(true);
              setLoading(false);
              toast({
                title: "Match found!",
                description: "You've been matched with someone special!",
              });
            });

            // Set a timeout to stop waiting after 30 seconds
            const timeout = setTimeout(() => {
              setIsMatched(false);
              setLoading(false);
              cleanup();
            }, 30000);

            return () => {
              cleanup();
              clearTimeout(timeout);
            };
          }
        } else {
          setIsMatched(false);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error in matching process:', err);
        setIsMatched(false);
        setLoading(false);
        toast({
          title: "Connection error",
          description: "There was an issue connecting to the matching service. Please try again.",
          variant: "destructive",
        });
      }
    };

    handleMatching();
  }, [userRole, purpose, time, submitMatchingRequest, listenForMatch, toast]);

  const getTimeDisplay = (timeSlot: TimeSlot) => {
    switch (timeSlot) {
      case '9am': return '9:00 AM';
      case '2pm': return '2:00 PM';
      case '7pm': return '7:00 PM';
      default: return '';
    }
  };

  if (loading || isMatching) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 animate-in fade-in-50 duration-500">
          <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
          <h2 className="text-2xl font-semibold text-white">
            Finding your serendipity...
          </h2>
          <p className="text-white/80">
            The universe is working its magic
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-center space-y-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Connection Issue
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            There was an issue connecting to our matching service. Please try again.
          </p>
          <Button 
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-in zoom-in-50 duration-700">
        {isMatched ? (
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-center space-y-6">
            <div className="text-6xl mb-4">✨</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              It's meant to be!
            </h1>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4">
                <p className="text-lg font-semibold text-gray-800">
                  You're meeting today at {getTimeDisplay(time)}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 font-medium mb-2">📍 Meeting Location</p>
                <p className="text-sm text-gray-600">
                  SCU Dining Hall<br />
                  Main entrance area
                </p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Look for someone who shares your energy. Trust the moment when you find each other.
              </p>
            </div>
            <Button 
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Create Another Connection
            </Button>
          </Card>
        ) : (
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl text-center space-y-6">
            <div className="text-6xl mb-4">🌙</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              No match for now
            </h1>
            <p className="text-gray-600 leading-relaxed mb-6">
              If it's meant to be, it will be. Sometimes the universe asks us to wait for the perfect moment.
            </p>
            <Button 
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Try Again
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;
