import { HeartPulse, Stethoscope, CalendarCheck, Pill, Activity, Users } from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import CardSpotlight from "./ui/card-spotlight";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-12 md:p-24 
      bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700"
    >
      {/* BentoGrid with health-focused items */}
      <CardSpotlight>
      <BentoGrid className="gap-6 max-w-6xl">
        <BentoGridItem
          title="24/7 Medical Support"
          description="Access reliable healthcare professionals anytime you need help."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#3b82f6] transition-all duration-300"
        />
        <BentoGridItem
          title="Wellness Tracking"
          description="Monitor your daily activity, sleep, and vital signs with ease."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#10b981] transition-all duration-300"
        />
        <BentoGridItem
          title="Medication Reminders"
          description="Never miss a dose with smart notifications and reminders."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-purple-100">
              <Pill className="w-6 h-6 text-purple-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#8b5cf6] transition-all duration-300"
        />
        <BentoGridItem
          title="Heart Health Monitoring"
          description="Track your heart rate and get instant alerts for irregularities."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-red-100">
              <HeartPulse className="w-6 h-6 text-red-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#ef4444] transition-all duration-300"
        />
        <BentoGridItem
          title="Easy Appointments"
          description="Book and manage doctor visits with a simple, hassle-free calendar."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-orange-100">
              <CalendarCheck className="w-6 h-6 text-orange-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#f97316] transition-all duration-300"
        />
        <BentoGridItem
          title="Community Support"
          description="Connect with health experts and support groups for better care."
          icon={
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-100">
              <Users className="w-6 h-6 text-pink-600" />
            </div>
          }
          className="bg-white/90 shadow-lg rounded-2xl hover:scale-105 hover:shadow-[0_0_20px_#ec4899] transition-all duration-300"
        />
      </BentoGrid>
      </CardSpotlight>
      
      {/* Additional content can go here */}
    </main>
  );
}
