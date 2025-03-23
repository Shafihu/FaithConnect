
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const growthData = [
  {
    month: "Jan",
    bibleStudies: 45,
    personalDevotions: 68,
    communityGroups: 32,
  },
  {
    month: "Feb",
    bibleStudies: 52,
    personalDevotions: 72,
    communityGroups: 35,
  },
  {
    month: "Mar",
    bibleStudies: 48,
    personalDevotions: 80,
    communityGroups: 40,
  },
  {
    month: "Apr",
    bibleStudies: 61,
    personalDevotions: 85,
    communityGroups: 45,
  },
  {
    month: "May",
    bibleStudies: 55,
    personalDevotions: 90,
    communityGroups: 48,
  },
  {
    month: "Jun",
    bibleStudies: 67,
    personalDevotions: 88,
    communityGroups: 52,
  },
];

const chartConfig = {
  bibleStudies: {
    label: "Bible Studies",
    color: "#9b87f5", // Purple
  },
  personalDevotions: {
    label: "Daily Devotions",
    color: "#F97316", // Orange
  },
  communityGroups: {
    label: "Community Groups",
    color: "#0EA5E9", // Blue
  }
};

export default function GrowthMetrics() {
  return (
    <Card className="border-faith-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-serif">Community Growth Metrics</CardTitle>
        <CardDescription>A snapshot of our congregation's spiritual growth journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer
            config={chartConfig}
          >
            <BarChart data={growthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    indicator="dot"
                  />
                }
              />
              <Legend />
              <Bar 
                dataKey="bibleStudies" 
                name="Bible Studies" 
                fill="var(--color-bibleStudies)" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="personalDevotions" 
                name="Daily Devotions" 
                fill="var(--color-personalDevotions)" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="communityGroups" 
                name="Community Groups" 
                fill="var(--color-communityGroups)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
