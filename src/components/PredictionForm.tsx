import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PredictionData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  dpf: number;
  age: number;
}

interface PredictionFormProps {
  onPredict: (data: PredictionData) => void;
  isLoading?: boolean;
}

export const PredictionForm = ({ onPredict, isLoading = false }: PredictionFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<PredictionData>({
    pregnancies: 0,
    glucose: 120,
    bloodPressure: 70,
    skinThickness: 20,
    insulin: 80,
    bmi: 32,
    dpf: 0.5,
    age: 25,
  });

  const handleInputChange = (field: keyof PredictionData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.glucose < 0 || formData.glucose > 300) {
      toast({
        title: "Invalid Input",
        description: "Glucose levels should be between 0-300 mg/dL",
        variant: "destructive",
      });
      return;
    }

    if (formData.bmi < 10 || formData.bmi > 70) {
      toast({
        title: "Invalid Input", 
        description: "BMI should be between 10-70",
        variant: "destructive",
      });
      return;
    }

    onPredict(formData);
  };

  const inputFields = [
    { key: 'pregnancies' as keyof PredictionData, label: 'Number of Pregnancies', min: 0, max: 20, step: 1 },
    { key: 'glucose' as keyof PredictionData, label: 'Glucose Level (mg/dL)', min: 0, max: 300, step: 1 },
    { key: 'bloodPressure' as keyof PredictionData, label: 'Blood Pressure (mmHg)', min: 0, max: 200, step: 1 },
    { key: 'skinThickness' as keyof PredictionData, label: 'Skin Thickness (mm)', min: 0, max: 100, step: 1 },
    { key: 'insulin' as keyof PredictionData, label: 'Insulin Level (μU/mL)', min: 0, max: 900, step: 1 },
    { key: 'bmi' as keyof PredictionData, label: 'BMI', min: 10, max: 70, step: 0.1 },
    { key: 'dpf' as keyof PredictionData, label: 'Diabetes Pedigree Function', min: 0, max: 3, step: 0.01 },
    { key: 'age' as keyof PredictionData, label: 'Age (years)', min: 18, max: 120, step: 1 },
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card to-secondary/30 shadow-[var(--shadow-card)] border-0">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Diabetes Risk Assessment
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Enter your health parameters to assess diabetes risk
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map(({ key, label, min, max, step }) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="text-sm font-medium text-foreground">
                  {label}
                </Label>
                <Input
                  id={key}
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  value={formData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="border-border/50 focus:ring-primary/20 transition-all duration-200"
                  required
                />
              </div>
            ))}
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-[var(--shadow-medical)]"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Predict Diabetes Risk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};