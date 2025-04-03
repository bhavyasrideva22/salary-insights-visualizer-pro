
import { useState } from "react";
import SalaryForm, { SalaryData } from "@/components/SalaryForm";
import ResultsDisplay, { BenchmarkData } from "@/components/ResultsDisplay";
import ExplanatoryContent from "@/components/ExplanatoryContent";
import { calculateBenchmark } from "@/utils/salaryCalculator";
import { Separator } from "@/components/ui/separator";
import { BadgeIndianRupee, BarChart4 } from "lucide-react";

const Index = () => {
  const [calculatedData, setCalculatedData] = useState<{
    salaryData: SalaryData;
    benchmarkData: BenchmarkData;
  } | null>(null);

  const handleCalculate = (data: SalaryData) => {
    const benchmarkData = calculateBenchmark(data);
    setCalculatedData({ salaryData: data, benchmarkData });
    
    // Scroll to results after calculation
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("results")?.offsetTop || 0,
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-primary text-white py-10 md:py-16">
        <div className="calculator-container">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-3">
              <BadgeIndianRupee className="h-8 w-8" />
              <BarChart4 className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Salary Benchmarking Calculator
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Discover your true market value and how your compensation compares to industry standards
            </p>
          </div>
        </div>
      </header>
      
      <main className="calculator-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <SalaryForm onCalculate={handleCalculate} />
          </div>
          
          <div className="lg:col-span-7" id="results">
            {calculatedData ? (
              <ResultsDisplay
                salaryData={calculatedData.salaryData}
                benchmarkData={calculatedData.benchmarkData}
              />
            ) : (
              <div className="calculator-card h-full flex flex-col justify-center items-center py-16 animated-element">
                <BarChart4 className="h-16 w-16 text-secondary mb-6" />
                <h2 className="text-2xl font-semibold text-primary mb-3">
                  Your Salary Insights Await
                </h2>
                <p className="text-center text-muted-foreground max-w-md">
                  Fill out the form with your information to see how your salary compares to industry benchmarks and discover your true market value.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <Separator className="my-10" />
        
        <ExplanatoryContent />
      </main>
      
      <footer className="bg-primary text-white py-8">
        <div className="calculator-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BadgeIndianRupee className="h-5 w-5" />
              <span className="font-semibold">Salary Insights Visualizer Pro</span>
            </div>
            
            <div className="text-sm text-primary-foreground/80">
              © {new Date().getFullYear()} Salary Insights Visualizer Pro. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
