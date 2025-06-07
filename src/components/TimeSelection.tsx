
import { TimeSlot } from '@/pages/Index';
import { Card } from '@/components/ui/card';

interface TimeSelectionProps {
  onTimeSelect: (time: TimeSlot) => void;
}

const TimeSelection = ({ onTimeSelect }: TimeSelectionProps) => {
  const timeSlots = [
    {
      id: '9am' as TimeSlot,
      time: '9:00 AM',
      description: 'Morning energy, fresh start'
    },
    {
      id: '2pm' as TimeSlot,
      time: '2:00 PM',
      description: 'Afternoon wisdom, perfect timing'
    },
    {
      id: '7pm' as TimeSlot,
      time: '7:00 PM',
      description: 'Evening magic, golden hour'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 animate-in slide-in-from-right-5 duration-500">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold text-white">
            When feels right?
          </h1>
          <p className="text-white/90">
            Choose your perfect meeting time
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-4">
            <p className="text-white text-sm">
              📍 SCU Dining Hall
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {timeSlots.map((slot) => (
            <Card 
              key={slot.id}
              className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => onTimeSelect(slot.id)}
            >
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {slot.time}
                </h3>
                <p className="text-gray-600 text-sm">
                  {slot.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSelection;
