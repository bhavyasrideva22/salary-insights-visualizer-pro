
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { SalaryData } from "./SalaryForm";
import { SalaryVisualizations } from "./SalaryVisualizations";
import { Mail, FileDown, BadgeIndianRupee } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import EmailForm from "./EmailForm";
import { generatePDF } from "@/utils/pdfGenerator";
import { toast } from "sonner";

interface ResultsDisplayProps {
  salaryData: SalaryData;
  benchmarkData: BenchmarkData;
}

export interface BenchmarkData {
  benchmarkSalary: number;
  marketMedian: number;
  marketLow: number;
  marketHigh: number;
  potentialGrowth: number;
  percentile: number;
  industryComparison: { industry: string; salary: number }[];
  roleComparison: { role: string; salary: number }[];
  locationFactor: number;
  educationImpact: number;
  experienceMultiplier: number;
}

const ResultsDisplay = ({ salaryData, benchmarkData }: ResultsDisplayProps) => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(salaryData, benchmarkData);
      toast.success("PDF generated successfully. Download started.");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getSalaryCategory = (benchmarkSalary: number, currentSalary: number) => {
    const diff = ((benchmarkSalary - currentSalary) / currentSalary) * 100;
    if (diff > 15) return "significantly below market rate";
    if (diff > 5) return "slightly below market rate";
    if (diff < -15) return "significantly above market rate";
    if (diff < -5) return "slightly above market rate";
    return "at market rate";
  };

  return (
    <div className="space-y-6 animated-element">
      <Card className="calculator-card">
        <CardContent className="pt-6">
          <div className="card-section">
            <h3 className="section-title flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5 text-primary" />
              Salary Benchmark Results
            </h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Your Current Salary</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(salaryData.currentSalary)}
                  </p>
                </div>
                
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Market Benchmark Salary</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(benchmarkData.benchmarkSalary)}
                  </p>
                  <p className="text-sm mt-1">
                    Your salary is {getSalaryCategory(benchmarkData.benchmarkSalary, salaryData.currentSalary)}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Salary Range for {salaryData.jobRole}</p>
                  <div className="flex justify-between mt-1">
                    <div>
                      <p className="text-sm">Low</p>
                      <p className="font-medium">{formatCurrency(benchmarkData.marketLow)}</p>
                    </div>
                    <div>
                      <p className="text-sm">Median</p>
                      <p className="font-medium">{formatCurrency(benchmarkData.marketMedian)}</p>
                    </div>
                    <div>
                      <p className="text-sm">High</p>
                      <p className="font-medium">{formatCurrency(benchmarkData.marketHigh)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">Market Percentile</p>
                  <p className="text-xl font-medium">{benchmarkData.percentile}%</p>
                  <p className="text-sm mt-1">
                    You earn more than {benchmarkData.percentile}% of professionals in your field
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-6">
            <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
              <DialogTrigger asChild>
                <Button className="secondary-button flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Results
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Email Your Salary Benchmark Results</DialogTitle>
                </DialogHeader>
                <EmailForm 
                  salaryData={salaryData} 
                  benchmarkData={benchmarkData} 
                  onSuccess={() => setIsEmailDialogOpen(false)} 
                />
              </DialogContent>
            </Dialog>
            
            <Button 
              className="primary-button flex items-center gap-2" 
              onClick={handleDownloadPDF}
            >
              <FileDown className="h-4 w-4" />
              Download PDF Report
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <SalaryVisualizations salaryData={salaryData} benchmarkData={benchmarkData} />
    </div>
  );
};

export default ResultsDisplay;
