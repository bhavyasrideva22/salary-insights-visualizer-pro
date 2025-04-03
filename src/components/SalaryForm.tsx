
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BadgeIndianRupee } from "lucide-react";

interface SalaryFormProps {
  onCalculate: (data: SalaryData) => void;
}

export interface SalaryData {
  currentSalary: number;
  experience: number;
  industry: string;
  jobRole: string;
  location: string;
  education: string;
}

const INDUSTRIES = [
  "Information Technology",
  "Banking & Finance",
  "Healthcare",
  "Manufacturing",
  "E-commerce",
  "Education",
  "Retail",
  "Consulting",
  "Hospitality",
  "Telecom"
];

const JOB_ROLES = [
  "Software Engineer",
  "Product Manager",
  "Sales Executive",
  "Marketing Specialist",
  "HR Manager",
  "Financial Analyst",
  "Data Scientist",
  "Operations Manager",
  "Customer Support",
  "Administrative Assistant"
];

const LOCATIONS = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Gurgaon",
  "Noida"
];

const EDUCATION_LEVELS = [
  "High School",
  "Bachelor's Degree",
  "Master's Degree",
  "PhD",
  "Professional Certification",
  "Diploma"
];

const SalaryForm = ({ onCalculate }: SalaryFormProps) => {
  const [formData, setFormData] = useState<SalaryData>({
    currentSalary: 0,
    experience: 0,
    industry: "",
    jobRole: "",
    location: "",
    education: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "currentSalary" || name === "experience" ? Number(value) : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <Card className="calculator-card animated-element">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="card-section">
            <h3 className="section-title flex items-center gap-2">
              <BadgeIndianRupee className="h-5 w-5 text-primary" />
              Salary Information
            </h3>
            <Separator className="mb-4" />
            
            <div className="input-group">
              <Label htmlFor="currentSalary">Current Annual Salary (₹)</Label>
              <Input
                id="currentSalary"
                name="currentSalary"
                type="number"
                placeholder="Enter your current annual salary"
                value={formData.currentSalary || ""}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
            
            <div className="input-group">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                name="experience"
                type="number"
                placeholder="Enter years of experience"
                value={formData.experience || ""}
                onChange={handleInputChange}
                className="mt-1"
                required
              />
            </div>
          </div>
          
          <div className="card-section">
            <h3 className="section-title">Job Details</h3>
            <Separator className="mb-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="input-group">
                <Label htmlFor="industry">Industry</Label>
                <Select
                  value={formData.industry}
                  onValueChange={(value) => handleSelectChange("industry", value)}
                >
                  <SelectTrigger id="industry" className="mt-1">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="input-group">
                <Label htmlFor="jobRole">Job Role</Label>
                <Select
                  value={formData.jobRole}
                  onValueChange={(value) => handleSelectChange("jobRole", value)}
                >
                  <SelectTrigger id="jobRole" className="mt-1">
                    <SelectValue placeholder="Select job role" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_ROLES.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="input-group">
                <Label htmlFor="location">Location</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => handleSelectChange("location", value)}
                >
                  <SelectTrigger id="location" className="mt-1">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {LOCATIONS.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="input-group">
                <Label htmlFor="education">Education Level</Label>
                <Select
                  value={formData.education}
                  onValueChange={(value) => handleSelectChange("education", value)}
                >
                  <SelectTrigger id="education" className="mt-1">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    {EDUCATION_LEVELS.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button type="submit" className="cta-button w-full md:w-auto">Calculate Benchmark</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SalaryForm;
