import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Upload, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { getStudentNotes } from '@/services/student';


export default function StudentNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await getStudentNotes();
        setNotes(data);
      } catch (err) {
        console.error('Error loading notes', err);
      } finally {
        setLoading(false);
      }
    };
    loadNotes();
  }, []);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-role-student" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Notes & PDFs</h1>
              <p className="text-muted-foreground">
                Your study materials organized
              </p>
            </div>
          </div>
          <Button className="bg-role-student hover:bg-role-student/80">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search notes..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {loading ? (
            <p className="text-muted-foreground">Loading notes...</p>
          ) : (
            filteredNotes.map((note, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border border-border p-4 hover:border-role-student/50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      note.type === 'pdf'
                        ? 'bg-red-500/20'
                        : 'bg-role-student/20'
                    }`}
                  >
                    <FileText
                      className={`w-5 h-5 ${
                        note.type === 'pdf'
                          ? 'text-red-400'
                          : 'text-role-student'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {note.subject}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

