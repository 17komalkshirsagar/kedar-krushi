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
import { useGetPaymentDashboardStatsQuery } from "../../redux/apis/payment.api";

const Dashboard = () => {
    const [type, setType] = useState("monthly");

    const { data: productData, isLoading: isProductLoading } = useGetProductDashbaordStatsQuery(type);
    const { data: paymentData, isLoading: isPaymentLoading } = useGetPaymentDashboardStatsQuery();

    return (
        <div className="p-4 space-y-4">
            <Tabs defaultValue="monthly" onValueChange={setType}>
                <TabsList>
                    <TabsTrigger value="daily">Daily</TabsTrigger>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="yearly">Yearly</TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Product Stats Chart */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Product Statistics ({type.toUpperCase()})</CardTitle>
                </CardHeader>
                <CardContent>
                    {isProductLoading ? (
                        <p className="text-gray-500">Loading product stats...</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={productData?.result || []}>
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

            {/* Payment Stats Chart */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle>Payment Mode Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                    {isPaymentLoading ? (
                        <p className="text-gray-500">Loading payment stats...</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={paymentData?.result.stats || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="totalAmount" fill="#6366f1" name="Total Amount" />
                                <Bar dataKey="totalPaid" fill="#10b981" name="Total Paid" />
                                <Bar dataKey="totalPending" fill="#f97316" name="Pending Amount" />
                            </BarChart>
                        </ResponsiveContainer>

                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Dashboard;
