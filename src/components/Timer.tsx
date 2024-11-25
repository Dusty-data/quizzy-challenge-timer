import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
}

export const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const progress = (timeLeft / duration) * 100;

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Time Remaining</span>
        <span>{formatTime(timeLeft)}</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};