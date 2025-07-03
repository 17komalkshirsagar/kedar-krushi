import { useState } from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../../components/ui/card";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "../../components/ui/tabs";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    LabelList,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useGetProductStatsQuery } from "../../redux/apis/product.api";


const monthMap: { [key: number]: string } = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
};

const Dashboard = () => {
    const [type, setType] = useState("monthly");
    const { data, isLoading } = useGetProductStatsQuery(type);


    const chartData =
        data?.result?.map((item: any) => ({
            ...item,
            month: monthMap[item._id] || item._id,
        })) || [];

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Product Sales</CardTitle>
                <CardDescription>
                    Stats for {type.charAt(0).toUpperCase() + type.slice(1)}
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Tabs defaultValue="monthly" onValueChange={setType} className="mb-4">
                    <TabsList>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="yearly">Yearly</TabsTrigger>
                    </TabsList>
                </Tabs>

                {isLoading ? (
                    <p>Loading chart...</p>
                ) : (
                    <div className="w-full h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{ top: 10, right: 20, left: 20, bottom: 10 }}
                            >
                                <CartesianGrid horizontal={false} strokeDasharray="3 3" />
                                <YAxis
                                    dataKey="month"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12 }}
                                />
                                <XAxis
                                    type="number"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12 }}
                                />
                                <Tooltip />
                                <Bar dataKey="totalSoldQuantity" fill="#6366f1" radius={4}>
                                    <LabelList
                                        dataKey="totalSoldQuantity"
                                        position="right"
                                        offset={8}
                                        fill="#1e293b"
                                        fontSize={12}
                                    />
                                </Bar>
                                <Bar dataKey="totalStock" fill="#10b981" radius={4}>
                                    <LabelList
                                        dataKey="totalStock"
                                        position="right"
                                        offset={8}
                                        fill="#1e293b"
                                        fontSize={12}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Compare Sold vs Stock ({type})
                </div>
            </CardFooter>
        </Card>
    );
};

export default Dashboard;

