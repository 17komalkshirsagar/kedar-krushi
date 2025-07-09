



import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "../../components/ui/accordion";
import { useGetInstallmentByBillNumberQuery } from "../../redux/apis/paymentInstallment.api";

const InstallmentAccordion = ({ billNumber }: { billNumber: string }) => {
    const { data, isLoading } = useGetInstallmentByBillNumberQuery(billNumber);

    if (isLoading) return <p>Loading installments...</p>;
    if (!data?.installments?.length) return <p>No installments found.</p>;

    const totalQuantity = data.products?.reduce(
        (acc: any, prod: any) => acc + (prod.quantity || 0), 0);

    return <>
        <Accordion type="single" collapsible defaultValue="installments">
            <AccordionItem value="installments">
                <AccordionTrigger>
                    Installments for Bill No: {data.billNumber}
                </AccordionTrigger>

                <AccordionContent>
                    <table className="w-full text-sm text-left border mt-2">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-2 py-1 border">Bill No</th>
                                <th className="px-2 py-1 border">Date</th>
                                <th className="px-2 py-1 border">Products</th>
                                <th className="px-2 py-1 border">Total (₹)</th>
                                <th className="px-2 py-1 border">Paid (₹)</th>
                                <th className="px-2 py-1 border">Pending (₹)</th>
                                <th className="px-2 py-1 border">Quantity</th>
                                <th className="px-2 py-1 border">Mode</th>
                                <th className="px-2 py-1 border">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.installments.map((inst: any) => (
                                <tr key={inst._id}>
                                    <td className="px-2 py-1 border">{data.billNumber}</td>
                                    <td className="px-2 py-1 border">
                                        {new Date(inst.paymentDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-2 py-1 border">
                                        {data.products.map((p: any) => p.product.name).join(", ")}
                                    </td>
                                    <td className="px-2 py-1 border">₹{data.totalAmount}</td>
                                    <td className="px-2 py-1 border">₹{inst.amount}</td>
                                    <td className="px-2 py-1 border">₹{data.pendingAmount}</td>
                                    <td className="px-2 py-1 border">{totalQuantity}</td>
                                    <td className="px-2 py-1 border">{inst.paymentMode}</td>
                                    <td className="px-2 py-1 border">{inst.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </>
};

export default InstallmentAccordion;
