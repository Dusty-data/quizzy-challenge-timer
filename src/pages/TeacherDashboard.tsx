import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const TeacherDashboard = () => {
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const { toast } = useToast();

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to an API
    toast({
      title: "Question Added",
      description: "The question has been added to your section.",
    });
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Statistics</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Class Average</h3>
              <p className="text-2xl">75%</p>
            </div>
            <div>
              <h3 className="font-semibold">School Average</h3>
              <p className="text-2xl">72%</p>
            </div>
            <div>
              <h3 className="font-semibold">Questions Created</h3>
              <p className="text-2xl">24</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Question</h2>
          <form onSubmit={handleAddQuestion} className="space-y-4">
            <div>
              <Input
                placeholder="Question text"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                required
              />
            </div>
            {newQuestion.options.map((option, index) => (
              <div key={index}>
                <Input
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newQuestion.options];
                    newOptions[index] = e.target.value;
                    setNewQuestion({ ...newQuestion, options: newOptions });
                  }}
                  required
                />
              </div>
            ))}
            <div>
              <Input
                placeholder="Correct answer"
                value={newQuestion.correctAnswer}
                onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Add Question
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;