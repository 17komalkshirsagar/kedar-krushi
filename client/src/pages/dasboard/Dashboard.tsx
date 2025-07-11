import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { Tabs, TabsList, TabsTrigger } from "./../../components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "./../../components/ui/card";
import { useGetProductDashbaordStatsQuery } from "../../redux/apis/product.api";

const Dashboard = () => {
    const [type, setType] = useState("monthly");
    const { data, isLoading } = useGetProductDashbaordStatsQuery(type);

    return (
        <div className="p-4 space-y-3">

            <Tabs defaultValue="monthly" onValueChange={setType}>
                <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Chart Card */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Product Statistics ({type.toUpperCase()})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-gray-500">Loading chart...</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={data?.result || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalSoldQuantity" fill="#3b82f6" name="Sold Qty" />
                                <Bar dataKey="totalStock" fill="#10b981" name="Stock" />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
