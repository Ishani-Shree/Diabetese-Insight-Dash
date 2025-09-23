import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Info } from "lucide-react";

interface PredictionResultProps {
  risk: 'low' | 'moderate' | 'high';
  confidence: number;
  factors: string[];
  onReset: () => void;
}

export const PredictionResult = ({ risk, confidence, factors, onReset }: PredictionResultProps) => {
  const getRiskConfig = () => {
    switch (risk) {
      case 'low':
        return {
          color: 'bg-success',
          textColor: 'text-success',
          borderColor: 'border-success/30',
          icon: CheckCircle,
          title: 'Low Risk',
          description: 'Your diabetes risk appears to be low based on the provided data.',
          bgGradient: 'from-success/10 to-success/5'
        };
      case 'moderate':
        return {
          color: 'bg-warning',
          textColor: 'text-warning',
          borderColor: 'border-warning/30',
          icon: Info,
          title: 'Moderate Risk',
          description: 'Some factors indicate a moderate risk. Consider lifestyle changes.',
          bgGradient: 'from-warning/10 to-warning/5'
        };
      case 'high':
        return {
          color: 'bg-destructive',
          textColor: 'text-destructive',
          borderColor: 'border-destructive/30',
          icon: AlertTriangle,
          title: 'High Risk',
          description: 'Multiple factors suggest elevated diabetes risk. Consult a healthcare provider.',
          bgGradient: 'from-destructive/10 to-destructive/5'
        };
    }
  };

  const config = getRiskConfig();
  const Icon = config.icon;

  const recommendations = {
    low: [
      "Maintain current healthy lifestyle",
      "Regular exercise and balanced diet",
      "Annual health checkups",
      "Monitor weight and blood pressure"
    ],
    moderate: [
      "Increase physical activity",
      "Reduce refined sugar intake",
      "Monitor blood glucose regularly",
      "Consult healthcare provider for prevention plan"
    ],
    high: [
      "Immediate consultation with healthcare provider",
      "Comprehensive metabolic testing",
      "Lifestyle modification program",
      "Regular monitoring and follow-up"
    ]
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto bg-gradient-to-br ${config.bgGradient} border-2 ${config.borderColor} shadow-[var(--shadow-medical)]`}>
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          <div className={`p-4 rounded-full ${config.color}/20`}>
            <Icon className={`w-8 h-8 ${config.textColor}`} />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Diabetes Risk Assessment Result
        </CardTitle>
        <div className="flex justify-center">
          <Badge variant="outline" className={`text-lg px-4 py-2 ${config.textColor} ${config.borderColor}`}>
            {config.title}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center">
          <CardDescription className="text-base mb-4">
            {config.description}
          </CardDescription>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm text-muted-foreground">Confidence Level:</span>
            <Badge variant="secondary" className="font-semibold">
              {confidence}%
            </Badge>
          </div>
        </div>

        {/* Risk Factors */}
        {factors.length > 0 && (
          <div className="bg-background/50 rounded-lg p-4 border border-border/30">
            <h4 className="font-semibold text-foreground mb-3">Key Risk Factors:</h4>
            <ul className="space-y-2">
              {factors.map((factor, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-sm text-foreground">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Recommendations */}
        <div className="bg-background/50 rounded-lg p-4 border border-border/30">
          <h4 className="font-semibold text-foreground mb-3">Recommendations:</h4>
          <ul className="space-y-2">
            {recommendations[risk].map((rec, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 text-success mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-sm text-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-muted/30 rounded-lg p-4 border border-border/20">
          <p className="text-xs text-muted-foreground text-center">
            <strong>Disclaimer:</strong> This assessment is for educational purposes only and should not replace professional medical advice. 
            Please consult with a healthcare provider for proper diagnosis and treatment.
          </p>
        </div>

        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full mt-6 border-primary/30 text-primary hover:bg-primary/5"
        >
          Perform New Assessment
        </Button>
      </CardContent>
    </Card>
  );
};