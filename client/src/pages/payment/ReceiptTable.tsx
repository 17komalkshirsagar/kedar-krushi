// import React, { useEffect } from "react";
// import { useReceipt } from "../../context/ReceiptContext";

// const ReceiptTable = () => {
//     const { receipt } = useReceipt();

//     useEffect(() => {
//         if (receipt) {
//             setTimeout(() => {
//                 localStorage.removeItem("receipt");
//             }, 5000);
//         }
//     }, [receipt]);

//     if (!receipt) return <p>No receipt data available.</p>;

//     return (
//         <div className="p-5">
//             <h2 className="text-xl font-semibold mb-4">Receipt</h2>

//             <p><strong>Name:</strong> {receipt.customer?.name}</p>
//             <p><strong>Mobile:</strong> {receipt.customer?.mobile}</p>
//             <p><strong>Address:</strong> {receipt.customer?.address}</p>

//             <p><strong>Payment Mode:</strong> {receipt.paymentMode}</p>
//             <p><strong>Payment Status:</strong> {receipt.paymentStatus}</p>


//             <p><strong>Total Products:</strong> {receipt.totalProductCount}</p>
//             <table className="w-full border mt-4">
//                 <thead className="bg-gray-100">
//                     <tr>
//                         <th className="border p-2">Product Name</th>
//                         <th className="border p-2">Quantity</th>
//                         <th className="border p-2">Price</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {receipt.products.map((item: any, index: any) => (
//                         <tr key={index}>
//                             <td className="border p-2">{item.product?.name}</td>
//                             <td className="border p-2">{item.quantity}</td>
//                             <td className="border p-2">₹{item.price}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             <div className="mt-4">
//                 <p><strong>Total Amount:</strong> ₹{receipt.totalAmount}</p>
//                 <p><strong>Paid Amount:</strong> ₹{receipt.paidAmount}</p>
//                 <p><strong>Pending Amount:</strong> ₹{receipt.pendingAmount}</p>
//             </div>
//         </div>
//     );
// };

// export default ReceiptTable;



{/* <Input
                                value={searchMobile}
                                onChange={(e) => setSearchMobile(e.target.value)}
                                placeholder="Enter name or mobile"
                                ref={searchMobileRef}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === 'Tab') {
                                        e.preventDefault();
                                        searchProductRef.current?.focus();
                                    }
                                }}
                            />
                            {searchMobile && filteredCustomers.length === 0 && (
                                <p className="text-red-500 mt-1">Customer not found</p>
                            )}

                            {searchMobile && filteredCustomers.length > 0 && (
                                <div className="border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow z-10 absolute w-full z-50">
                                    {filteredCustomers.map((cust) => (
                                        <div
                                            key={cust._id}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedCustomer(cust);
                                                setValue('customerId', cust._id ?? '');
                                                setSearchMobile(cust.name);
                                                // setSearchMobile('');

                                            }}
                                        >
                                            {cust.name} ({cust.mobile})
                                        </div>
                                    ))}
                                </div>
                            )} */}