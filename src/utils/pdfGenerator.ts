
import { SalaryData } from "@/components/SalaryForm";
import { BenchmarkData } from "@/components/ResultsDisplay";

export const generatePDF = async (salaryData: SalaryData, benchmarkData: BenchmarkData): Promise<void> => {
  // In a real-world application, you would use a library like jspdf or pdfmake
  // For this demo, we'll simulate PDF generation with a timeout
  
  // This is a placeholder implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      // Create a blob that represents a PDF file
      const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
          maximumFractionDigits: 0
        }).format(amount);
      };
      
      // HTML content for the PDF
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Salary Benchmark Report</title>
          <style>
            body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; }
            .container { max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { background-color: #245e4f; color: white; padding: 20px; text-align: center; }
            .section { margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
            th { background-color: #f8f8f8; }
            .highlight { background-color: #7ac9a7; padding: 10px; border-radius: 5px; display: inline-block; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Salary Insights Benchmarking Report</h1>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>

            <div class="section">
              <h2>Your Profile</h2>
              <table>
                <tr>
                  <th>Industry:</th>
                  <td>${salaryData.industry}</td>
                </tr>
                <tr>
                  <th>Job Role:</th>
                  <td>${salaryData.jobRole}</td>
                </tr>
                <tr>
                  <th>Location:</th>
                  <td>${salaryData.location}</td>
                </tr>
                <tr>
                  <th>Experience:</th>
                  <td>${salaryData.experience} years</td>
                </tr>
                <tr>
                  <th>Education:</th>
                  <td>${salaryData.education}</td>
                </tr>
                <tr>
                  <th>Current Salary:</th>
                  <td>${formatCurrency(salaryData.currentSalary)}</td>
                </tr>
              </table>
            </div>

            <div class="section">
              <h2>Salary Benchmark Results</h2>
              <p>Based on your profile and current market trends, your benchmark salary is: 
                <span class="highlight">${formatCurrency(benchmarkData.benchmarkSalary)}</span>
              </p>
              
              <h3>Market Salary Range</h3>
              <table>
                <tr>
                  <th>10th Percentile (Low):</th>
                  <td>${formatCurrency(benchmarkData.marketLow)}</td>
                </tr>
                <tr>
                  <th>Market Median:</th>
                  <td>${formatCurrency(benchmarkData.marketMedian)}</td>
                </tr>
                <tr>
                  <th>90th Percentile (High):</th>
                  <td>${formatCurrency(benchmarkData.marketHigh)}</td>
                </tr>
              </table>
              
              <p>Your current salary puts you at the <strong>${benchmarkData.percentile}th percentile</strong> of the market.</p>
            </div>

            <div class="section">
              <h2>Insights and Recommendations</h2>
              <p>Based on our analysis, here are some key insights about your salary position:</p>
              <ul>
                <li>Your salary is ${
                  salaryData.currentSalary > benchmarkData.benchmarkSalary 
                    ? "above" 
                    : salaryData.currentSalary < benchmarkData.benchmarkSalary 
                      ? "below" 
                      : "at"
                } the market benchmark for your role and experience.</li>
                <li>The location factor for ${salaryData.location} is ${benchmarkData.locationFactor.toFixed(2)}x the baseline.</li>
                <li>Your education level (${salaryData.education}) has an impact factor of ${benchmarkData.educationImpact.toFixed(2)}x on the salary.</li>
                <li>Your years of experience (${salaryData.experience}) contribute a multiplier of ${benchmarkData.experienceMultiplier.toFixed(2)}x to your salary potential.</li>
              </ul>
              
              <h3>Growth Potential</h3>
              <p>With continued career development, you could potentially reach a salary of ${formatCurrency(benchmarkData.potentialGrowth)} in the next few years.</p>
            </div>

            <div class="footer">
              <p>© ${new Date().getFullYear()} Salary Insights Visualizer Pro. All rights reserved.</p>
              <p>This report is based on current market data and statistical models. Individual results may vary based on company policies, market conditions, and other factors.</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      // Create a Blob with the HTML content
      const blob = new Blob([content], { type: 'text/html' });
      
      // Create a download link and trigger the download
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `Salary_Benchmark_Report_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      resolve();
    }, 1000);
  });
};
