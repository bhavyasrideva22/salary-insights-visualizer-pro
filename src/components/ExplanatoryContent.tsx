
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ExplanatoryContent = () => {
  return (
    <Card className="calculator-card mt-8 animated-element">
      <CardContent className="pt-6">
        <h2 className="text-2xl font-bold text-primary mb-4">Understanding Your Salary Benchmark</h2>
        <Separator className="mb-6" />
        
        <div className="space-y-6 text-left">
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">What is Salary Benchmarking?</h3>
            <p className="text-charcoal mb-3">
              Salary benchmarking is the process of comparing your compensation package with what similar professionals 
              earn in your industry, role, and location. This powerful tool helps you understand your market value and 
              make informed career decisions.
            </p>
            <p className="text-charcoal">
              Our salary benchmarking calculator uses comprehensive data analysis and advanced algorithms to provide you 
              with accurate, up-to-date salary insights tailored to your unique profile.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">Why Benchmark Your Salary?</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Negotiate better compensation:</strong> Armed with market data, you can confidently discuss 
                salary during interviews or performance reviews.
              </li>
              <li>
                <strong>Plan your career progression:</strong> Understand how factors like experience, education, and 
                location impact earning potential in your field.
              </li>
              <li>
                <strong>Evaluate job offers:</strong> Determine if compensation packages truly reflect market rates and 
                your worth.
              </li>
              <li>
                <strong>Budget effectively:</strong> Make informed financial decisions based on industry standards and 
                your position within the salary range.
              </li>
              <li>
                <strong>Identify skill gaps:</strong> Discover which qualifications and skills command higher salaries 
                in your industry.
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">Factors That Influence Your Salary</h3>
            <p className="text-charcoal mb-3">
              Our calculator takes into account multiple variables that impact compensation:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Industry</h4>
                <p className="text-sm">
                  Compensation varies significantly across sectors. Technology and finance typically offer higher 
                  salaries than education or retail for similar experience levels.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Job Role</h4>
                <p className="text-sm">
                  Specialized roles often command premium compensation. Technical and management positions typically 
                  earn more than support or administrative functions.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Location</h4>
                <p className="text-sm">
                  Geographic location significantly impacts salary due to cost of living differences. Metropolitan 
                  areas generally offer higher compensation than smaller cities.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Experience</h4>
                <p className="text-sm">
                  Years of relevant experience typically correlate with higher earnings, though this relationship is 
                  often non-linear and plateaus at senior levels.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Education</h4>
                <p className="text-sm">
                  Advanced degrees and specialized certifications can enhance earning potential, particularly in fields 
                  like medicine, law, and engineering.
                </p>
              </div>
              
              <div className="bg-secondary/10 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Market Demand</h4>
                <p className="text-sm">
                  Skills in high demand with limited supply command premium salaries. Technology skills like AI, 
                  data science, and cybersecurity currently enjoy strong market premiums.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">How to Use This Calculator</h3>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <p className="text-charcoal">
                  <strong>Enter your current compensation details</strong> - Include your annual salary in Indian Rupees.
                </p>
              </li>
              <li>
                <p className="text-charcoal">
                  <strong>Provide job information</strong> - Select your industry, job role, location, years of experience, 
                  and education level.
                </p>
              </li>
              <li>
                <p className="text-charcoal">
                  <strong>Review your personalized results</strong> - Examine how your current salary compares to market 
                  benchmarks through our detailed visualizations.
                </p>
              </li>
              <li>
                <p className="text-charcoal">
                  <strong>Save or share your insights</strong> - Download your personalized benchmark report or email it 
                  for future reference.
                </p>
              </li>
            </ol>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">Interpreting Your Results</h3>
            <p className="text-charcoal mb-3">
              Our benchmark analysis provides several key insights:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Benchmark Salary:</strong> The expected compensation for someone with your profile in the current market.
              </li>
              <li>
                <strong>Market Range:</strong> The typical salary range (10th to 90th percentile) for your position.
              </li>
              <li>
                <strong>Salary Percentile:</strong> Where your current salary falls within the market distribution.
              </li>
              <li>
                <strong>Growth Potential:</strong> Projected salary growth based on career progression.
              </li>
              <li>
                <strong>Factor Analysis:</strong> How specific elements like location and education impact your compensation.
              </li>
            </ul>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold text-primary mb-2">Making the Most of Your Salary Insights</h3>
            <p className="text-charcoal mb-3">
              Once you have your benchmark results, consider these strategies:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>If you're underpaid:</strong> Prepare for a salary negotiation with specific market data, 
                highlighting your contributions and the market rate for your skills.
              </li>
              <li>
                <strong>If you're fairly compensated:</strong> Focus on skill development and career progression to 
                move toward the higher end of your salary range.
              </li>
              <li>
                <strong>If you're above market rate:</strong> Ensure you're delivering exceptional value and developing 
                new skills to justify your premium compensation.
              </li>
            </ul>
          </section>
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20 mt-6">
            <h3 className="text-xl font-semibold text-primary mb-3">Take Control of Your Career Today</h3>
            <p className="text-charcoal mb-4">
              Salary transparency empowers professionals to make informed career decisions. Our comprehensive salary 
              benchmarking calculator provides you with the insights you need to understand your market value and 
              take control of your professional journey.
            </p>
            <p className="text-charcoal">
              Use this tool regularly to stay informed about market trends and ensure your compensation keeps pace 
              with your growing skills and experience. Download or email your personalized report to reference during 
              your next performance review or job search.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExplanatoryContent;
