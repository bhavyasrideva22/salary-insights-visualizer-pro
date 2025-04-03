
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SalaryData } from "./SalaryForm";
import { BenchmarkData } from "./ResultsDisplay";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartBarIcon } from "lucide-react";

interface SalaryVisualizationsProps {
  salaryData: SalaryData;
  benchmarkData: BenchmarkData;
}

const COLORS = ["#245e4f", "#7ac9a7", "#e9c46a", "#4a8fe7"];

export const SalaryVisualizations = ({ salaryData, benchmarkData }: SalaryVisualizationsProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Prepare data for charts
  const salaryComparisonData = [
    {
      name: "Your Salary",
      value: salaryData.currentSalary,
    },
    {
      name: "Benchmark",
      value: benchmarkData.benchmarkSalary,
    },
    {
      name: "Industry Avg",
      value: benchmarkData.industryComparison.reduce((sum, item) => sum + item.salary, 0) / 
        benchmarkData.industryComparison.length,
    },
  ];

  const factorsData = [
    {
      name: "Location",
      value: benchmarkData.locationFactor,
    },
    {
      name: "Education",
      value: benchmarkData.educationImpact,
    },
    {
      name: "Experience",
      value: benchmarkData.experienceMultiplier,
    },
  ];

  const salaryDistributionData = [
    { name: "10th Percentile", value: benchmarkData.marketLow },
    { name: "Median", value: benchmarkData.marketMedian },
    { name: "90th Percentile", value: benchmarkData.marketHigh },
    { name: "Your Salary", value: salaryData.currentSalary },
  ];

  const pieData = [
    { name: "Your Role", value: salaryData.currentSalary },
    { name: "Industry Average", value: benchmarkData.marketMedian },
    { name: "Growth Potential", value: benchmarkData.potentialGrowth },
  ];

  return (
    <Card className="calculator-card animated-element" ref={chartRef}>
      <CardContent className="pt-6">
        <div className="card-section">
          <h3 className="section-title flex items-center gap-2">
            <ChartBarIcon className="h-5 w-5 text-primary" />
            Salary Insights Visualization
          </h3>
          <Separator className="mb-4" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-80">
              <h4 className="text-lg font-medium mb-2">Salary Comparison</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryComparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                  <Legend />
                  <Bar dataKey="value" name="Salary" fill="#245e4f" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-80">
              <h4 className="text-lg font-medium mb-2">Salary Breakdown by Factors</h4>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-80">
              <h4 className="text-lg font-medium mb-2">Market Salary Distribution</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salaryDistributionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`} />
                  <Tooltip formatter={(value) => [formatCurrency(value as number), "Amount"]} />
                  <Legend />
                  <Bar dataKey="value" name="Salary" fill="#7ac9a7" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="h-80">
              <h4 className="text-lg font-medium mb-2">Impact Factors on Salary</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={factorsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${(value as number).toFixed(2)}x`, "Multiplier"]} />
                  <Legend />
                  <Bar dataKey="value" name="Impact Factor" fill="#e9c46a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
