import { useState } from "react";
import { Timer } from "@/components/Timer";
import { Question } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock questions - in a real app, these would come from an API
  const sections = [
    { name: "Mathematics", questions: [] },
    { name: "Science", questions: [] },
    { name: "English", questions: [] },
    { name: "History", questions: [] },
  ];

  const handleTimeUp = () => {
    toast({
      title: "Time's up!",
      description: "Your answers have been automatically submitted.",
      variant: "destructive",
    });
    submitQuiz();
  };

  const submitQuiz = () => {
    // In a real app, we would submit answers to an API
    navigate("/results");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Timer duration={3600} onTimeUp={handleTimeUp} />
      
      <div className="mt-8">
        <div className="flex justify-between mb-4">
          {sections.map((section, index) => (
            <Button
              key={section.name}
              variant={currentSection === index ? "default" : "outline"}
              onClick={() => setCurrentSection(index)}
            >
              {section.name}
            </Button>
          ))}
        </div>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">{sections[currentSection].name}</h2>
          <p className="text-gray-600 mb-8">
            Question {currentQuestion + 1} of {sections[currentSection].questions.length}
          </p>
          
          {/* Placeholder for question content */}
          <div className="min-h-[200px] flex items-center justify-center text-gray-500">
            Questions will be loaded from the API
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                if (currentQuestion === sections[currentSection].questions.length - 1) {
                  if (currentSection === sections.length - 1) {
                    submitQuiz();
                  } else {
                    setCurrentSection(prev => prev + 1);
                    setCurrentQuestion(0);
                  }
                } else {
                  setCurrentQuestion(prev => prev + 1);
                }
              }}
            >
              {currentQuestion === sections[currentSection].questions.length - 1 
                ? currentSection === sections.length - 1 
                  ? "Submit Quiz" 
                  : "Next Section"
                : "Next Question"
              }
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;