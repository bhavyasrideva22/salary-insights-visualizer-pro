
import { SalaryData } from "@/components/SalaryForm";
import { BenchmarkData } from "@/components/ResultsDisplay";

export const sendEmailReport = async (
  email: string, 
  salaryData: SalaryData, 
  benchmarkData: BenchmarkData
): Promise<void> => {
  // In a real-world application, you would connect to a backend API to send emails
  // For this demo, we'll simulate sending an email with a timeout
  
  return new Promise((resolve, reject) => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      reject(new Error("Invalid email format"));
      return;
    }
    
    // Simulate API call delay
    setTimeout(() => {
      console.log(`Email would be sent to: ${email}`);
      console.log("Salary data:", salaryData);
      console.log("Benchmark data:", benchmarkData);
      resolve();
    }, 1500);
  });
};
