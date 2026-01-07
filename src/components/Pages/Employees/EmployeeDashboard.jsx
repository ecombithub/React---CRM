import EmployeeLayout from "../EmployeeLayout";
import { useUser, useProjects, useEmployees } from "../../Use-auth";
import { useDateRange } from "../DateRangeContext";
import { UserRound, TableCellsSplit, Star, AlignStartVertical, EllipsisVertical, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, LabelList } from 'recharts';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function EmployeeDashboard() {
  const { start, end } = useDateRange();
  const { data: projects = [] } = useProjects();
  const { data: user } = useUser();

  // Filter projects in date range
  const filteredProjects = projects.filter(p => {
    const createdAt = new Date(p.createdAt);
    return createdAt >= start && createdAt <= end;
  });

  // Projects assigned to current employee
  const assignedProjects = filteredProjects.filter(project =>
    project.tasks?.some(task =>
      task.assignedEmployees?.some(emp =>
        emp.username === user.fullName || emp.username === user.username
      )
    )
  );

  const totalProjects = assignedProjects.length || 0;

  //  Total completedTasks Tasks
  const completedTasks = assignedProjects.reduce((sum, project) =>
    sum + (project.tasks?.filter(task =>
      task.status === "completed" &&
      task.assignedEmployees?.some(emp =>
        emp.username === user.username || emp.username === user.fullName
      )
    ).length || 0),
    0);

  //  Total Assigned Tasks
  const totalAssignedTasks = assignedProjects.reduce((sum, proj) =>
    sum +
    (proj.tasks?.filter(task =>
      task.assignedEmployees?.some(
        emp =>
          emp.username === user?.fullName ||
          emp.username === user?.username
      )
    ).length || 0),
    0
  );

  // Upcoming Tasks
  const upcomingTasks = assignedProjects.reduce((sum, project) =>
    sum +
    (project.tasks?.filter(task =>
      task.status === "upcoming" &&
      task.assignedEmployees?.some(
        emp =>
          emp.username === user?.username ||
          emp.username === user?.fullName
      )
    ).length || 0),
    0
  );

  const monthlyTasks = months.map((m, index) => {
    const taskCount = assignedProjects.reduce((sum, project) => {

      return sum + (project.tasks?.filter(task => {
        const created = new Date(task.createdAt || project.createdAt);

        return (
          created.getMonth() === index &&
          task.assignedEmployees?.some(emp =>
            emp.username === user?.username || emp.username === user?.fullName
          )
        );
      }).length || 0);

    }, 0);

    return { month: m, task: taskCount };
  });

  const payrollData = [
    { name: 'Salaries', value: 5000, color: '#0088FE' },
    { name: 'Bonuses', value: 2000, color: '#00C49F' },
    { name: 'Other', value: 1000, color: '#FFBB28' },
  ];

  return (
    <EmployeeLayout>
      <div className="h-[90vh] p-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Completed Tasks</p>
                <p className="text-3xl font-bold">{completedTasks}</p>
              </div>
              <UserRound className="w-12 h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Assigned Tasks</p>
                <p className="text-3xl font-bold">{totalAssignedTasks}</p>
              </div>
              <TableCellsSplit className="w-12 h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Total Projects</p>
                <p className="text-3xl font-bold">{totalProjects}</p>
              </div>
              <Star className="w-12 h-12 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Upcoming Tasks</p>
                <p className="text-3xl font-bold">{upcomingTasks}</p>
              </div>
              <AlignStartVertical className="w-12 h-12 opacity-80" />
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Monthly Tasks</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyTasks} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />

                <YAxis allowDecimals={false} interval={0} />

                <Tooltip />
                <Bar dataKey="task" fill="#22c55e">
                  <LabelList dataKey="task" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-xl text-gray-800 mb-4">Payroll Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={payrollData} cx="50%" cy="50%" outerRadius={60} dataKey="value" label>
                  {payrollData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </EmployeeLayout>
  );
}
