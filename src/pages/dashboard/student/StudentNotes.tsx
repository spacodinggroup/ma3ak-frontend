import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { FileText, Upload } from 'lucide-react';
import { useState, useRef } from 'react';
import { uploadStudentNote } from '@/services/student';

export default function StudentNotes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
      setError(null);
    } else {
      setSelectedFile(null);
      setError('Please select a valid PDF file');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('pdf', selectedFile);

      const { notes: extractedNotes } = await uploadStudentNote(formData);

      if (Array.isArray(extractedNotes) && extractedNotes.length > 0) {
        setNotes(extractedNotes);
      } else {
        setNotes([]);
        setError('Unable to process PDF. The file may be empty or unreadable.');
      }

      // Clear file selection after successful upload
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err: any) {
      console.error('Upload error:', {
        message: err?.message,
        response: err?.response?.data,
        status: err?.response?.status
      });
      setError(err?.response?.data?.message || err?.message || 'Unable to process PDF. Please try again.');
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-role-student/20 flex items-center justify-center">
            <FileText className="w-6 h-6 text-role-student" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Notes Extractor</h1>
            <p className="text-muted-foreground">
              Upload a PDF to extract notes automatically
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold mb-4">Upload PDF</h2>

          <div className="space-y-4">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              />
            </div>

            {selectedFile && (
              <div className="bg-secondary/30 rounded-lg px-3 py-2">
                <p className="text-sm font-medium">Selected: {selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-role-student hover:bg-role-student/80 text-white h-10 px-4 w-full"
            >
              {loading ? (
                <>
                  <Upload className="w-4 h-4 animate-pulse" />
                  Processing PDF...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload and Extract Notes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
            <p className="text-sm text-destructive font-medium">{error}</p>
          </div>
        )}

        {/* Notes Display */}
        {Array.isArray(notes) && notes.length > 0 && (
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold mb-4">
              Extracted Notes ({notes.length})
            </h2>

            <ul className="space-y-2">
              {notes.map((note, index) => (
                <li
                  key={index}
                  className="bg-secondary/30 rounded-lg px-4 py-3 text-sm border border-border/50"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-role-student font-bold mt-0.5 shrink-0">
                      {index + 1}.
                    </span>
                    <span className="flex-1">{note}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Empty State */}
        {!loading && Array.isArray(notes) && notes.length === 0 && !error && (
          <div className="bg-card rounded-xl border border-border p-8 text-center">
            <FileText className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground">No notes extracted yet.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload a PDF to get started!
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
