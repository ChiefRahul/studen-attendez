import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AttendanceStats } from "@/components/AttendanceStats";
import { CourseTable } from "@/components/CourseTable";
import { RefreshCw, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CourseData {
  courseName: string;
  present: number;
  total: number;
  percentage: number;
}

interface AttendanceData {
  studentName: string;
  studentId: string;
  overallPercentage: number;
  totalClasses: number;
  classesAttended: number;
  courses: CourseData[];
  lastUpdated: string;
}

const Index = () => {
  const [studentName, setStudentName] = useState("");
  const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAttendance = async () => {
    if (!studentName.trim()) {
      toast({
        title: "Please enter your name",
        description: "Student name is required to fetch attendance data",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://janvikela.app.n8n.cloud/webhook-test/3cbd135d-1d95-4ce5-b2da-15c0eccca3fd",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentName: studentName.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attendance data");
      }

      const data = await response.json();
      setAttendanceData(data);
      
      toast({
        title: "Attendance data loaded",
        description: `Successfully loaded data for ${data.studentName}`,
      });
    } catch (error) {
      console.error("Error fetching attendance:", error);
      toast({
        title: "Error loading attendance",
        description: "Could not fetch attendance data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchAttendance();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Mesa School of Business</h1>
                <p className="text-sm text-muted-foreground">Attendance Tracker</p>
              </div>
            </div>
            {attendanceData && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RefreshCw className="h-4 w-4" />
                <span>Last updated: {attendanceData.lastUpdated}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <Card className="p-6 mb-8 shadow-lg border-0">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter your name..."
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-12 text-lg"
              />
            </div>
            <Button
              onClick={fetchAttendance}
              disabled={loading}
              size="lg"
              className="h-12 px-8"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Get Attendance
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Attendance Display */}
        {attendanceData && (
          <div className="animate-fade-in">
            <AttendanceStats
              overallPercentage={attendanceData.overallPercentage}
              totalClasses={attendanceData.totalClasses}
              classesAttended={attendanceData.classesAttended}
              totalCourses={attendanceData.courses.length}
            />
            <CourseTable
              courses={attendanceData.courses}
              studentName={attendanceData.studentName}
              studentId={attendanceData.studentId}
            />
          </div>
        )}

        {/* Empty State */}
        {!attendanceData && !loading && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Welcome to Attendance Tracker</h2>
            <p className="text-muted-foreground">
              Enter your name above to view your attendance statistics
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
