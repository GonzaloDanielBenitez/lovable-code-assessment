
import { UserRole } from '@/pages/Index';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface LandingPageProps {
  onRoleSelect: (role: UserRole) => void;
}

const LandingPage = ({ onRoleSelect }: LandingPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in-50 duration-700">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
            Serendipity
          </h1>
          <p className="text-xl text-white/90 font-light">
            Where meant-to-be moments happen
          </p>
          <div className="w-16 h-1 bg-white/40 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => onRoleSelect('taker')}>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">✨</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Make a Wish</h2>
              <p className="text-gray-600 leading-relaxed">
                Ready to receive something beautiful from a stranger?
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                onClick={() => onRoleSelect('giver')}>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎁</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Grant a Wish</h2>
              <p className="text-gray-600 leading-relaxed">
                Ready to give something meaningful to a stranger?
              </p>
            </div>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-white/80 text-sm">
            Meet in person • No accounts • Free forever
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
