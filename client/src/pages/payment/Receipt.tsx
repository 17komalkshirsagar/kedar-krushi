


// import React, { useRef } from "react";
// import { Card, CardContent } from "../../components/ui/card";
// import { useSendReceiptEmailMutation } from "../../redux/apis/emailSendReceipt.api";

// const Receipt = ({
//     onClose,
//     payment,
// }: {
//     onClose?: () => void;
//     payment: any;
// }) => {
//     const printRef = useRef<HTMLDivElement>(null);
//     const [sendReceiptEmail] = useSendReceiptEmailMutation();

//     const handlePrint = async () => {
//         const printContents = printRef.current?.innerHTML;

//         if (!printContents) return;

//         try {
//             await sendReceiptEmail({
//                 to: payment?.customer?.email || "komalkshirsagar32009@gmail.com",
//                 subject: `Receipt - बिल नं ${payment?.billNumber ?? '-'}`,
//                 html: printContents,
//                 billNumber: payment?.billNumber || '',
//             }).unwrap();

//             alert("📧 Receipt email sent successfully");
//         } catch (error) {
//             console.error("failed to send receipt email", error);
//             alert("Failed to send email");
//         }

//         const originalContents = document.body.innerHTML;
//         document.body.innerHTML = printContents;
//         window.print();
//         document.body.innerHTML = originalContents;
//         window.location.reload();
//     };

//     return (
//         <div className="max-w-5xl mx-auto space-y-4">
//             <div className="text-right flex justify-end gap-2">
//                 {onClose && (
//                     <button
//                         onClick={onClose}
//                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 print:hidden"
//                     >
//                         Close
//                     </button>
//                 )}

//                 <button
//                     onClick={handlePrint}
//                     className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
//                 >
//                     Print Receipt
//                 </button>
//             </div>

//             <div ref={printRef}>
//                 <Card className="p-4 border border-gray-300 rounded-lg shadow-md">
//                     <CardContent>
//                         <div className="flex flex-col md:flex-row gap-4 items-start">
//                             <div style={{ textAlign: "center", marginBottom: "10px" }}>
//                                 <img
//                                     src="https://cdn.pixabay.com/photo/2018/04/20/12/45/divinity-3335905_1280.png"
//                                     alt="Lord Ganesha"
//                                     style={{
//                                         width: "150px",
//                                         height: "125px",
//                                         objectFit: "contain",
//                                         border: "1px solid #ccc",
//                                         borderRadius: "6px",
//                                     }}
//                                 />
//                             </div>

//                             <Card className="w-full md:w-3/7 border border-gray-400 shadow">
//                                 <CardContent className="text-center py-4 space-y-1">
//                                     <div className="flex justify-between text-sm">
//                                         <span>कन्नड न्यायालय अंतर्गत</span>
//                                         <span>कॅश क्रेडिट मेमो</span>
//                                     </div>
//                                     <h2 className="text-xl font-bold text-gray-800 mt-2">केदार कृषी सेवा केंद्र</h2>
//                                     <p className="text-sm text-gray-700">
//                                         जनावरांच्या दवाखान्यासमोर, चाळीसगाव रोड, कन्नड
//                                     </p>
//                                     <p className="text-sm text-gray-700">
//                                         जि. छ. संभाजीनगर, मो. नं. ९४२०२३०४२५
//                                     </p>
//                                 </CardContent>
//                             </Card>

//                             <CardContent className="w-full md:w-1/2 space-y-2">
//                                 <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
//                                     औषधी लॅ नं: LAID-15050447
//                                 </div>
//                                 <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
//                                     GST IN: 27CUUPK7153A1ZE
//                                 </div>
//                                 <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
//                                     बिल नं: {payment?.billNumber ?? "-"}
//                                 </div>
//                             </CardContent>
//                         </div>

//                         <hr className="my-2" />

//                         <div className="flex text-sm text-gray-800 px-1 justify-between">
//                             <span>श्री: {payment?.customer?.name}</span>
//                             <span>रा.: {payment?.customer?.address}</span>
//                             <span>दिनांक: {new Date().toLocaleDateString("hi-IN")}</span>
//                         </div>

//                         <hr className="my-2" />
//                         <div>
//                             <table className="w-full text-left border border-collapse border-gray-400">
//                                 <thead>
//                                     <tr className="bg-gray-100 text-gray-800">
//                                         <th className="border border-gray-400 p-1">तपशील</th>
//                                         <th className="border border-gray-400 p-1">उत्पादक</th>
//                                         <th className="border border-gray-400 p-1">बॅच नं / लॉट नं</th>
//                                         <th className="border border-gray-400 p-1">एक्स. डेट</th>
//                                         <th className="border border-gray-400 p-1">पॅकिंग/वजन</th>
//                                         <th className="border border-gray-400 p-1">नग</th>
//                                         <th className="border border-gray-400 p-1">दर</th>
//                                         <th className="border border-gray-400 p-1">रक्कम</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {payment?.products?.map((item: any) => (
//                                         <tr key={item._id}>
//                                             <td className="border border-gray-400 p-1">{item.product.name}</td>
//                                             <td className="border border-gray-400 p-1">{item.product.category}</td>
//                                             <td className="border border-gray-400 p-1">{item.product.batchNumber}</td>
//                                             <td className="border border-gray-400 p-1">
//                                                 {new Date(item.product.expiryDate).toLocaleDateString("hi-IN")}
//                                             </td>
//                                             <td className="border border-gray-400 p-1">{item.product.unit}</td>
//                                             <td className="border border-gray-400 p-1">{item.quantity}</td>
//                                             <td className="border border-gray-400 p-1">{item.price}</td>
//                                             <td className="border border-gray-400 p-1">
//                                                 {item.quantity * item.price}
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     <tr>
//                                         <td colSpan={6} className="border border-gray-400 p-1 text-xs">
//                                             Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017
//                                         </td>
//                                         <td className="border border-gray-400 p-1 text-right font-semibold">एकूण</td>
//                                         <td className="border border-gray-400 p-1 font-semibold">
//                                             {payment?.totalAmount}/-
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td colSpan={7} className="border border-gray-400 p-1 text-right font-semibold text-red-600">बाकी</td>
//                                         <td className="border border-gray-400 p-1 font-semibold text-red-600">
//                                             {payment?.pendingAmount}/-
//                                         </td>
//                                     </tr>

//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="mt-4 text-sm text-gray-700 space-y-1">
//                             <strong className="text-red-600">टीप:</strong>
//                             <p>1️⃣ एकदा विकलेला माल परत घेतला जाणार नाही.</p>
//                             <p>2️⃣ 'वरली सर्व' हे औषध विषारी असून केवळ शेती उपयोगासाठीच आहे.</p>

//                             <div className="flex flex-wrap justify-between gap-4 mt-4 font-semibold">
//                                 <span>3️⃣ हलगर्जीपणामुळे झालेल्या नुकसानीस आम्ही जबाबदार राहणार नाही.</span>
//                                 <span>धन्यवाद.....</span>
//                                 <span>माल घेणाराची सही</span>
//                                 <span>करिता केदार कृषी सेवा केंद्र</span>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// };

// export default Receipt;





import React, { useRef } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { useSendReceiptEmailMutation } from "../../redux/apis/emailSendReceipt.api";

const Receipt = ({
    onClose,
    payment,
}: {
    onClose?: () => void;
    payment: any;
}) => {
    const printRef = useRef<HTMLDivElement>(null);
    const [sendReceiptEmail] = useSendReceiptEmailMutation();

    const handlePrint = async () => {
        const printContents = printRef.current?.innerHTML;
        if (!printContents) return;

        const productRows = payment?.products?.map((item: any) => {
            return `
                <tr>
                    <td>${item.product.name}</td>
                    <td>${item.product.category}</td>
                    <td>${item.product.batchNumber}</td>
                    <td>${new Date(item.product.expiryDate).toLocaleDateString("hi-IN")}</td>
                    <td>${item.product.unit}</td>
                    <td>${item.quantity}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity * item.price}</td>
                </tr>
            `;
        }).join('') || '';

        try {
            await sendReceiptEmail({
                to: payment?.customer?.email || "komalkshirsagar32009@gmail.com",
                subject: `Receipt - बिल नं ${payment?.billNumber ?? '-'}`,
                html: `<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="UTF-8" />
  <title>Receipt</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; }
    body {
      font-family: 'Noto Sans Devanagari', sans-serif;
      padding: 20px;
      font-size: 14px;
      color: #222;
    }
    .container {
      border: 1px solid #ccc;
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 0 4px rgba(0,0,0,0.1);
    }
    .header-img {
      width: 150px;
      height: 130px;
      object-fit: contain;
      border: 1px solid #ccc;
      border-radius: 6px;
      margin: auto;
      display: block;
    }
    .title {
      text-align: center;
      font-weight: bold;
      font-size: 18px;
      margin-top: 10px;
    }
    .info-section {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      gap: 16px;
    }
    .left-card {
      flex: 1;
      border: 1px solid #999;
      padding: 12px;
      text-align: center;
    }
    .right-card {
      flex: 1;
      padding: 8px;
    }
    .info-box {
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 4px;
      margin-bottom: 6px;
      background-color: #fff;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      font-size: 14px;
    }
    table {
      width: 100%;
      margin-top: 12px;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #999;
      padding: 6px;
      text-align: left;
      font-size: 13px;
    }
    thead {
      background-color: #f3f3f3;
    }
    .note {
      margin-top: 12px;
      font-size: 13px;
    }
    .note p {
      margin-bottom: 4px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      font-weight: bold;
      font-size: 13px;
    }
  </style>
</head>
<body>
 <div class="flex-container" style="display: flex; gap: 16px; align-items: flex-start; flex-wrap: wrap; margin-top: 20px;">
  <img
    src="https://cdn.pixabay.com/photo/2018/04/20/12/45/divinity-3335905_1280.png"
    alt="Lord Ganesha"
    class="ganesha-img"
    style="width: 150px; height: 132px; object-fit: contain; border: 1px solid #ccc; border-radius: 6px;"
  />

  <div class="left-card"
     style="flex: 1 1 35%; border: 1px solid #999; padding: 12px; text-align: center; min-height: 108px; border-radius: 6px">
    <div style="display: flex; justify-content: space-between; font-size: 13px;">
      <span>कन्नड न्यायालय अंतर्गत</span>
      <span>कॅश क्रेडिट मेमो</span>
    </div>
    <div class="title" style="font-size: 18px; font-weight: bold; margin-top: 8px;">केदार कृषी सेवा केंद्र</div>
    <p>जनावरांच्या दवाखान्यासमोर, चाळीसगाव रोड, कन्नड</p>
    <p>जि. छ. संभाजीनगर, मो. नं. ९४२०२३०४२५</p>
  </div>

  <div class="right-card" style="flex: 1 1 27%; padding: 8px;">
    <div class="info-box">औषधी लॅ नं: LAID-15050447</div>
    <div class="info-box">GST IN: 27CUUPK7153A1ZE</div>
    <div class="info-box">बिल नं: ${payment?.billNumber ?? '-'}</div>
  </div>
</div>

<div class="row">
  <span>श्री: ${payment?.customer?.name ?? "-"}</span>
  <span>रा.: ${payment?.customer?.address ?? "-"}</span>
  <span>दिनांक: ${new Date().toLocaleDateString("hi-IN")}</span>
</div>

<table>
  <thead>
    <tr>
      <th>तपशील</th>
      <th>उत्पादक</th>
      <th>बॅच नं / लॉट नं</th>
      <th>एक्स. डेट</th>
      <th>पॅकिंग/वजन</th>
      <th>नग</th>
      <th>दर</th>
      <th>रक्कम</th>
    </tr>
  </thead>
  <tbody>
    ${productRows}
    <tr>
      <td colspan="6" style="font-size: 12px;">Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017</td>
      <td style="font-weight: bold;">एकूण</td>
      <td style="font-weight: bold;">₹${payment?.totalAmount ?? 0}/-</td>
    </tr>
    <tr>
  <td colspan="7" style="text-align: right; font-weight: bold; color: red;">बाकी</td>
  <td style="font-weight: bold; color: red;">₹${payment?.pendingAmount ?? 0}/-</td>
</tr>
  </tbody>
</table>

<div class="note">
  <strong style="color: red;">टीप:</strong>
  <p>1️⃣ एकदा विकलेला माल परत घेतला जाणार नाही.</p>
  <p>2️⃣ 'वरली सर्व' हे औषध विषारी असून केवळ शेती उपयोगासाठीच आहे.</p>
</div>

<div class="footer">
  <span>3️⃣ हलगर्जीपणामुळे झालेल्या नुकसानीस आम्ही जबाबदार राहणार नाही.</span>
  <span>धन्यवाद.....</span>
  <span>माल घेणाराची सही</span>
  <span>करिता केदार कृषी सेवा केंद्र</span>
</div>
</body>
</html>`,
                billNumber: payment?.billNumber || '',
            }).unwrap();

            alert("📧 Receipt email sent successfully");
        } catch (error) {
            console.error("failed to send receipt email", error);
            alert("Failed to send email");
        }

        const originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        window.location.reload();
    };

    return (
        <div className="max-w-5xl mx-auto space-y-4">
            <div className="text-right flex justify-end gap-2">
                {onClose && (
                    <button
                        onClick={onClose}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 print:hidden"
                    >
                        Close
                    </button>
                )}

                <button
                    onClick={handlePrint}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden"
                >
                    Print Receipt
                </button>
            </div>
            <div ref={printRef}>
                <Card className="p-4 border border-gray-300 rounded-lg shadow-md">
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                            <div style={{ textAlign: "center", marginBottom: "10px" }}>
                                <img
                                    src="https://cdn.pixabay.com/photo/2018/04/20/12/45/divinity-3335905_1280.png"
                                    alt="Lord Ganesha"
                                    style={{
                                        width: "150px",
                                        height: "125px",
                                        objectFit: "contain",
                                        border: "1px solid #ccc",
                                        borderRadius: "6px",
                                    }}
                                />
                            </div>

                            <Card className="w-full md:w-3/7 border border-gray-400 shadow">
                                <CardContent className="text-center py-4 space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>कन्नड न्यायालय अंतर्गत</span>
                                        <span>कॅश क्रेडिट मेमो</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-800 mt-2">केदार कृषी सेवा केंद्र</h2>
                                    <p className="text-sm text-gray-700">
                                        जनावरांच्या दवाखान्यासमोर, चाळीसगाव रोड, कन्नड
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        जि. छ. संभाजीनगर, मो. नं. ९४२०२३०४२५
                                    </p>
                                </CardContent>
                            </Card>

                            <CardContent className="w-full md:w-1/2 space-y-2">
                                <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
                                    औषधी लॅ नं: LAID-15050447
                                </div>
                                <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
                                    GST IN: 27CUUPK7153A1ZE
                                </div>
                                <div className="border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md">
                                    बिल नं: {payment?.billNumber ?? "-"}
                                </div>
                            </CardContent>
                        </div>

                        <hr className="my-2" />

                        <div className="flex text-sm text-gray-800 px-1 justify-between">
                            <span>श्री: {payment?.customer?.name}</span>
                            <span>रा.: {payment?.customer?.address}</span>
                            <span>दिनांक: {new Date().toLocaleDateString("hi-IN")}</span>
                        </div>

                        <hr className="my-2" />
                        <div>
                            <table className="w-full text-left border border-collapse border-gray-400">
                                <thead>
                                    <tr className="bg-gray-100 text-gray-800">
                                        <th className="border border-gray-400 p-1">तपशील</th>
                                        <th className="border border-gray-400 p-1">उत्पादक</th>
                                        <th className="border border-gray-400 p-1">बॅच नं / लॉट नं</th>
                                        <th className="border border-gray-400 p-1">एक्स. डेट</th>
                                        <th className="border border-gray-400 p-1">पॅकिंग/वजन</th>
                                        <th className="border border-gray-400 p-1">नग</th>
                                        <th className="border border-gray-400 p-1">दर</th>
                                        <th className="border border-gray-400 p-1">रक्कम</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payment?.products?.map((item: any) => (
                                        <tr key={item._id}>
                                            <td className="border border-gray-400 p-1">{item.product.name}</td>
                                            <td className="border border-gray-400 p-1">{item.product.category}</td>
                                            <td className="border border-gray-400 p-1">{item.product.batchNumber}</td>
                                            <td className="border border-gray-400 p-1">
                                                {new Date(item.product.expiryDate).toLocaleDateString("hi-IN")}
                                            </td>
                                            <td className="border border-gray-400 p-1">{item.product.unit}</td>
                                            <td className="border border-gray-400 p-1">{item.quantity}</td>
                                            <td className="border border-gray-400 p-1">{item.price}</td>
                                            <td className="border border-gray-400 p-1">
                                                {item.quantity * item.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan={6} className="border border-gray-400 p-1 text-xs">
                                            Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017
                                        </td>
                                        <td className="border border-gray-400 p-1 text-right font-semibold">एकूण</td>
                                        <td className="border border-gray-400 p-1 font-semibold">
                                            {payment?.totalAmount}/-
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={7} className="border border-gray-400 p-1 text-right font-semibold text-red-600">बाकी</td>
                                        <td className="border border-gray-400 p-1 font-semibold text-red-600">
                                            {payment?.pendingAmount}/-
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 text-sm text-gray-700 space-y-1">
                            <strong className="text-red-600">टीप:</strong>
                            <p>1️⃣ एकदा विकलेला माल परत घेतला जाणार नाही.</p>
                            <p>2️⃣ 'वरली सर्व' हे औषध विषारी असून केवळ शेती उपयोगासाठीच आहे.</p>

                            <div className="flex flex-wrap justify-between gap-4 mt-4 font-semibold">
                                <span>3️⃣ हलगर्जीपणामुळे झालेल्या नुकसानीस आम्ही जबाबदार राहणार नाही.</span>
                                <span>धन्यवाद.....</span>
                                <span>माल घेणाराची सही</span>
                                <span>करिता केदार कृषी सेवा केंद्र</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Receipt;


