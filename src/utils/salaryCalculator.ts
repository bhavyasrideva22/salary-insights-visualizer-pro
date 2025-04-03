
import { SalaryData } from "@/components/SalaryForm";
import { BenchmarkData } from "@/components/ResultsDisplay";

// Industry baseline salaries (in INR)
const INDUSTRY_BASELINES: Record<string, number> = {
  "Information Technology": 1200000,
  "Banking & Finance": 1000000,
  "Healthcare": 800000,
  "Manufacturing": 700000,
  "E-commerce": 900000,
  "Education": 600000,
  "Retail": 500000,
  "Consulting": 1100000,
  "Hospitality": 450000,
  "Telecom": 900000
};

// Role multipliers relative to industry baseline
const ROLE_MULTIPLIERS: Record<string, number> = {
  "Software Engineer": 1.2,
  "Product Manager": 1.5,
  "Sales Executive": 1.1,
  "Marketing Specialist": 1.0,
  "HR Manager": 0.9,
  "Financial Analyst": 1.3,
  "Data Scientist": 1.4,
  "Operations Manager": 1.1,
  "Customer Support": 0.7,
  "Administrative Assistant": 0.6
};

// Location cost of living adjustment
const LOCATION_FACTORS: Record<string, number> = {
  "Mumbai": 1.4,
  "Delhi": 1.2,
  "Bangalore": 1.3,
  "Hyderabad": 1.1,
  "Chennai": 1.0,
  "Pune": 1.0,
  "Kolkata": 0.9,
  "Ahmedabad": 0.8,
  "Gurgaon": 1.2,
  "Noida": 1.1
};

// Education level impact
const EDUCATION_IMPACTS: Record<string, number> = {
  "High School": 0.7,
  "Bachelor's Degree": 1.0,
  "Master's Degree": 1.3,
  "PhD": 1.5,
  "Professional Certification": 1.1,
  "Diploma": 0.8
};

export const calculateBenchmark = (data: SalaryData): BenchmarkData => {
  // Get baseline salary for the industry or use average if not found
  const industryBaseline = INDUSTRY_BASELINES[data.industry] || 800000;
  
  // Apply role multiplier
  const roleMultiplier = ROLE_MULTIPLIERS[data.jobRole] || 1.0;
  
  // Apply location factor
  const locationFactor = LOCATION_FACTORS[data.location] || 1.0;
  
  // Apply education impact
  const educationImpact = EDUCATION_IMPACTS[data.education] || 1.0;
  
  // Calculate experience multiplier (non-linear growth)
  // 0-2 years: minimal impact, 3-5: moderate, 6-10: significant, 10+: exponential
  const experienceMultiplier = data.experience <= 2 
    ? 0.8 + (data.experience * 0.1)
    : data.experience <= 5
    ? 1.0 + ((data.experience - 2) * 0.06)
    : data.experience <= 10
    ? 1.18 + ((data.experience - 5) * 0.05)
    : 1.43 + ((data.experience - 10) * 0.02);
  
  // Calculate benchmark salary
  const benchmarkSalary = Math.round(
    industryBaseline * 
    roleMultiplier * 
    locationFactor * 
    educationImpact * 
    experienceMultiplier
  );
  
  // Calculate market ranges (10th percentile, median, 90th percentile)
  const marketLow = Math.round(benchmarkSalary * 0.7);
  const marketMedian = benchmarkSalary;
  const marketHigh = Math.round(benchmarkSalary * 1.3);
  
  // Calculate potential growth (with 3 more years of experience)
  const futureExperienceMultiplier = (data.experience + 3) <= 2 
    ? 0.8 + ((data.experience + 3) * 0.1)
    : (data.experience + 3) <= 5
    ? 1.0 + (((data.experience + 3) - 2) * 0.06)
    : (data.experience + 3) <= 10
    ? 1.18 + (((data.experience + 3) - 5) * 0.05)
    : 1.43 + (((data.experience + 3) - 10) * 0.02);
  
  const potentialGrowth = Math.round(
    industryBaseline * 
    roleMultiplier * 
    locationFactor * 
    educationImpact * 
    futureExperienceMultiplier * 
    1.1 // Additional 10% for skill improvement
  );
  
  // Calculate percentile of current salary (simplified)
  let percentile = 50; // Default to median
  if (data.currentSalary > benchmarkSalary) {
    // For salaries above benchmark
    const aboveRatio = Math.min((data.currentSalary - benchmarkSalary) / (marketHigh - benchmarkSalary), 1);
    percentile = 50 + Math.round(aboveRatio * 40); // Map to 50-90 percentile range
  } else if (data.currentSalary < benchmarkSalary) {
    // For salaries below benchmark
    const belowRatio = Math.min((benchmarkSalary - data.currentSalary) / (benchmarkSalary - marketLow), 1);
    percentile = 50 - Math.round(belowRatio * 40); // Map to 10-50 percentile range
  }
  
  // Generate industry comparison data
  const industryComparison = Object.entries(INDUSTRY_BASELINES)
    .filter(([industry]) => industry !== data.industry) // Exclude current industry
    .slice(0, 5) // Take 5 industries
    .map(([industry, baseline]) => ({
      industry,
      salary: Math.round(baseline * ROLE_MULTIPLIERS[data.jobRole] || 1.0)
    }));
  
  // Generate role comparison data
  const roleComparison = Object.entries(ROLE_MULTIPLIERS)
    .filter(([role]) => role !== data.jobRole) // Exclude current role
    .slice(0, 5) // Take 5 roles
    .map(([role, multiplier]) => ({
      role,
      salary: Math.round(INDUSTRY_BASELINES[data.industry] * multiplier)
    }));
  
  return {
    benchmarkSalary,
    marketMedian,
    marketLow,
    marketHigh,
    potentialGrowth,
    percentile,
    industryComparison,
    roleComparison,
    locationFactor,
    educationImpact,
    experienceMultiplier
  };
};
