import { BookOpen, Plus, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';

interface Subject {
  id: string;
  name: string;
}

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [inputSubject, setInputSubject] = useState<string>('');
  const navigate = useNavigate();

  const handleAddSubject = () => {
    if (!inputSubject.trim()) return;

    const newSubject: Subject = {
      id: Date.now().toString(),
      name: inputSubject.trim()
    };

    setSubjects(prev => [...prev, newSubject]);
    setInputSubject('');
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleGeneratePlan = () => {
    if (subjects.length === 0) {
      alert('Please add at least one subject first');
      return;
    }

    // Navigate to plan page with subjects
    navigate(ROUTES.STUDENT.PLAN, {
      state: { subjects: subjects.map(s => s.name) }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSubject();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-role-student" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">My Subjects</h1>
          <p className="text-muted-foreground">Add subjects for your study plan</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="text-lg font-semibold mb-4">Add Your Subjects</h2>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={inputSubject}
            onChange={(e) => setInputSubject(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter subject name (e.g., Mathematics)"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          />
          <button
            onClick={handleAddSubject}
            disabled={!inputSubject.trim()}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-role-student hover:bg-role-student/80 text-white h-10 px-4"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>

        {subjects.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">
              Added Subjects ({subjects.length})
            </h3>
            <ul className="space-y-2">
              {Array.isArray(subjects) && subjects.map((subject) => (
                <li
                  key={subject.id}
                  className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2"
                >
                  <span className="text-sm font-medium">{subject.name}</span>
                  <button
                    onClick={() => handleRemoveSubject(subject.id)}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-destructive/10 hover:text-destructive h-8 w-8"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleGeneratePlan}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-role-student hover:bg-role-student/80 text-white h-10 px-4 w-full mt-4"
            >
              Generate Study Plan
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">No subjects added yet</p>
            <p className="text-xs mt-1">Add subjects above to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
