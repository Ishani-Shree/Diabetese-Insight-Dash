import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const DataVisualization = () => {
  const dataStats = [
    {
      title: "Glucose Levels",
      mean: 120.9,
      median: 117,
      range: "0-199 mg/dL",
      color: "bg-primary",
      description: "Blood glucose concentration"
    },
    {
      title: "BMI",
      mean: 31.99,
      median: 32,
      range: "18.5-67.1",
      color: "bg-accent",
      description: "Body Mass Index"
    },
    {
      title: "Age Distribution",
      mean: 33.2,
      median: 29,
      range: "21-81 years",
      color: "bg-success",
      description: "Majority aged 20-30 years"
    },
    {
      title: "Blood Pressure",
      mean: 69.1,
      median: 72,
      range: "0-122 mmHg",
      color: "bg-warning",
      description: "Diastolic blood pressure"
    }
  ];

  const insights = [
    {
      title: "High Variance Parameters",
      items: ["Insulin levels", "Skin thickness"],
      description: "These parameters show significant variation and many zero values",
      type: "warning"
    },
    {
      title: "Key Risk Indicators",
      items: ["Higher BMI correlates with diabetes", "Glucose > 140 mg/dL indicates risk"],
      description: "Critical factors for diabetes prediction",
      type: "info"
    },
    {
      title: "Age Factor",
      items: ["Most patients are 20-30 years old", "Risk increases with age"],
      description: "Age distribution in the dataset",
      type: "success"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Dataset Statistics */}
      <Card className="bg-gradient-to-br from-card to-secondary/20 border-0 shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">Dataset Statistics</CardTitle>
          <CardDescription>Key statistical measures from the diabetes dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataStats.map((stat, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                <div className={`w-3 h-3 rounded-full ${stat.color} mb-3`}></div>
                <h4 className="font-semibold text-foreground mb-2">{stat.title}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mean:</span>
                    <span className="font-medium">{stat.mean}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Median:</span>
                    <span className="font-medium">{stat.median}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Range:</span>
                    <span className="font-medium text-xs">{stat.range}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Insights */}
      <Card className="bg-gradient-to-br from-card to-secondary/20 border-0 shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">Data Insights</CardTitle>
          <CardDescription>Key findings from the diabetes prediction dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-background/50 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-foreground">{insight.title}</h4>
                  <Badge 
                    variant={insight.type === 'warning' ? 'destructive' : insight.type === 'success' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {insight.type}
                  </Badge>
                </div>
                <ul className="space-y-1 text-sm mb-3">
                  {insight.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};