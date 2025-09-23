import { useState } from "react";
import { PredictionForm } from "@/components/PredictionForm";
import { DataVisualization } from "@/components/DataVisualization";
import { PredictionResult } from "@/components/PredictionResult";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Shield } from "lucide-react";

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

const Index = () => {
  const [currentView, setCurrentView] = useState<'form' | 'result'>('form');
  const [predictionResult, setPredictionResult] = useState<{
    risk: 'low' | 'moderate' | 'high';
    confidence: number;
    factors: string[];
  } | null>(null);

  const handlePredict = (data: PredictionData) => {
    // Simulate prediction logic (in real app, this would call an API)
    let riskScore = 0;
    const factors: string[] = [];

    // Simple risk calculation based on thresholds
    if (data.glucose > 140) {
      riskScore += 30;
      factors.push(`High glucose level (${data.glucose} mg/dL)`);
    }
    
    if (data.bmi > 30) {
      riskScore += 25;
      factors.push(`High BMI (${data.bmi})`);
    }
    
    if (data.age > 45) {
      riskScore += 20;
      factors.push(`Advanced age (${data.age} years)`);
    }
    
    if (data.bloodPressure > 80) {
      riskScore += 15;
      factors.push(`Elevated blood pressure (${data.bloodPressure} mmHg)`);
    }
    
    if (data.pregnancies > 3) {
      riskScore += 10;
      factors.push(`Multiple pregnancies (${data.pregnancies})`);
    }

    if (data.dpf > 0.8) {
      riskScore += 15;
      factors.push(`High diabetes pedigree function (${data.dpf})`);
    }

    // Determine risk level
    let risk: 'low' | 'moderate' | 'high';
    if (riskScore < 30) risk = 'low';
    else if (riskScore < 60) risk = 'moderate';
    else risk = 'high';

    const confidence = Math.min(95, Math.max(65, 85 + (riskScore > 50 ? 10 : 0)));

    setPredictionResult({ risk, confidence, factors });
    setCurrentView('result');
  };

  const handleReset = () => {
    setCurrentView('form');
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary to-accent rounded-lg">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Diabetes Prediction System
            </h1>
          </div>
          <p className="text-center text-muted-foreground mt-2 max-w-2xl mx-auto">
            Advanced machine learning-based diabetes risk assessment using clinical parameters
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-primary/5 border-0 shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Comprehensive evaluation using 8 key health parameters for accurate diabetes risk prediction
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-accent/5 border-0 shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-accent/10 rounded-full w-fit">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-lg">Data Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Statistical analysis and insights derived from comprehensive diabetes research datasets
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-success/5 border-0 shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-success/10 rounded-full w-fit">
                <Activity className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-lg">Health Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Personalized recommendations and insights for diabetes prevention and management
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        {currentView === 'form' ? (
          <div className="space-y-8">
            <PredictionForm onPredict={handlePredict} />
            <DataVisualization />
          </div>
        ) : (
          predictionResult && (
            <PredictionResult
              risk={predictionResult.risk}
              confidence={predictionResult.confidence}
              factors={predictionResult.factors}
              onReset={handleReset}
            />
          )
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-primary/5 to-accent/5 border-t border-border/30 mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Diabetes Prediction System • For Educational Purposes Only • Consult Healthcare Professionals
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
