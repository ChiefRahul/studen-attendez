import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Calendar, XCircle } from "lucide-react";

interface AttendanceStatsProps {
  overallPercentage: number;
  totalClasses: number;
  classesAttended: number;
  totalCourses: number;
}

export const AttendanceStats = ({
  overallPercentage,
  totalClasses,
  classesAttended,
  totalCourses,
}: AttendanceStatsProps) => {
  const absences = totalClasses - classesAttended;
  const isAboveMinimum = overallPercentage >= 80;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Overall Attendance</h3>
          <CheckCircle2 className={`h-5 w-5 ${isAboveMinimum ? 'text-success' : 'text-destructive'}`} />
        </div>
        <div className="space-y-3">
          <p className={`text-4xl font-bold ${isAboveMinimum ? 'text-success' : 'text-destructive'}`}>
            {overallPercentage.toFixed(1)}%
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className={isAboveMinimum ? 'text-success' : 'text-destructive'}>
              {isAboveMinimum ? '↑' : '↓'}
            </span>
            <span className="text-muted-foreground">
              {isAboveMinimum ? 'Above required minimum' : 'Below required minimum'}
            </span>
          </div>
          <Progress 
            value={overallPercentage} 
            className="h-2"
            indicatorClassName={isAboveMinimum ? 'bg-success' : 'bg-destructive'}
          />
        </div>
      </Card>

      <Card className="p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Total Classes</h3>
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          <p className="text-4xl font-bold text-foreground">{totalClasses}</p>
          <p className="text-sm text-muted-foreground">{totalCourses} courses</p>
        </div>
      </Card>

      <Card className="p-6 shadow-lg border-0 hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">Classes Attended</h3>
          <XCircle className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="space-y-3">
          <p className="text-4xl font-bold text-foreground">{classesAttended}</p>
          <p className="text-sm text-muted-foreground">{absences} absences</p>
        </div>
      </Card>
    </div>
  );
};
