
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SalaryData } from "./SalaryForm";
import { BenchmarkData } from "./ResultsDisplay";
import { sendEmailReport } from "@/utils/emailSender";
import { toast } from "sonner";

interface EmailFormProps {
  salaryData: SalaryData;
  benchmarkData: BenchmarkData;
  onSuccess: () => void;
}

const EmailForm = ({ salaryData, benchmarkData, onSuccess }: EmailFormProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await sendEmailReport(email, salaryData, benchmarkData);
      toast.success("Salary benchmark report sent to your email!");
      onSuccess();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-3">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>
      
      <div className="pt-2">
        <Button type="submit" className="w-full primary-button" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Report"}
        </Button>
      </div>
    </form>
  );
};

export default EmailForm;
