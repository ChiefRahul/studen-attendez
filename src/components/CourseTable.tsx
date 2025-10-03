import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface Course {
  courseName: string;
  present: number;
  total: number;
  percentage: number;
}

interface CourseTableProps {
  courses: Course[];
  studentName: string;
  studentId: string;
}

export const CourseTable = ({ courses, studentName, studentId }: CourseTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAttendanceBadgeColor = (percentage: number) => {
    if (percentage >= 95) return "bg-success text-success-foreground hover:bg-success/90";
    if (percentage >= 80) return "bg-warning text-warning-foreground hover:bg-warning/90";
    return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  };

  return (
    <Card className="p-6 shadow-lg border-0">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Course-wise Attendance</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, ID, or course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Student ID</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Name</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Course</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Present</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Total</th>
              <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course, index) => (
              <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                <td className="py-4 px-4 font-medium">{studentId}</td>
                <td className="py-4 px-4">{studentName}</td>
                <td className="py-4 px-4">{course.courseName}</td>
                <td className="py-4 px-4">{course.present}</td>
                <td className="py-4 px-4">{course.total}</td>
                <td className="py-4 px-4">
                  <Badge className={getAttendanceBadgeColor(course.percentage)}>
                    {course.percentage.toFixed(1)}%
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No courses found matching your search.
        </div>
      )}
    </Card>
  );
};
