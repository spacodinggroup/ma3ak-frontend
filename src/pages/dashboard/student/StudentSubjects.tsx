import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { getStudentSubjects, generateStudyPlan } from '@/services/student';
import { useNavigate } from 'react-router-dom';

export default function StudentSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await getStudentSubjects();
        setSubjects(data);
      } catch (err) {
        console.error("Error loading student subjects", err);
      } finally {
        setLoading(false);
      }
    };
    loadSubjects();
  }, []);

  const handleGeneratePlan = async () => {
    setGenerating(true);
    try {
      await generateStudyPlan({});
      // Reload subjects after generating plan
      const data = await getStudentSubjects();
      setSubjects(data);
    } catch (err) {
      console.error("Error generating study plan", err);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-role-student" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Subjects & Courses</h1>
              <p className="text-muted-foreground">Track your learning progress</p>
            </div>
          </div>
          <Button className="bg-role-student hover:bg-role-student/80"
          variant='outline'
          onClick={handleGeneratePlan}
          disabled={generating}>
            <Plus className="w-4 h-4 mr-2" />
            {generating ? "Generating plan..." : "Generate Study Plan"}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">Loading subjects...</p>
            </div>
          ) : (
            subjects.map((subject, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 hover:border-role-student/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{subject.icon}</span>
                  <div>
                    <h3 className="font-semibold">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.completed}/{subject.topics} topics</p>
                  </div>
                </div>
                <Progress value={subject.progress} className="h-2 mb-2" />
                <p className="text-sm text-muted-foreground">{subject.progress}% complete</p>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
