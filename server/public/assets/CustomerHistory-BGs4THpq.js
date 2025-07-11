import{at as U,au as F,r as m,j as e,I as O,B as A,a3 as H,av as _,w as Q,U as V}from"./index-Cl1SQMCp.js";import{C as D,d as M}from"./card-mR9xUq05.js";import{B as T}from"./badge-Duqbj1_E.js";import{D as L,a as k,u as K,b as E,c as B}from"./emailSendReceipt.api-LrsuY_7X.js";import{L as S}from"./label-DJCwXsjE.js";import{u as G,C as q,t as Y,o as Z,e as J,s as W}from"./zod-Cx2om5l9.js";import{t as C}from"./index-MnOYjBE-.js";import X from"./InstallmentAccordion-D9aMCyou.js";import"./index-7vMckiJz.js";import"./chevron-down-CZWChAHx.js";const ee=({open:u,onClose:s,payment:t,customerId:f,customer:w})=>{const[h,{isSuccess:g,isError:a,isLoading:r}]=U(),{refetch:v}=F(f),{register:p,handleSubmit:i,control:y,formState:{errors:c},reset:x}=G({defaultValues:{amount:(t==null?void 0:t.pendingAmount)||"",paymentMode:(t==null?void 0:t.paymentMode)||"Cash"}}),j=async l=>{try{await h({billNumber:t.billNumber,customerId:f,amount:Number(l.amount),paymentMode:l.paymentMode,paymentDate:new Date().toISOString(),paymentReference:""}).unwrap(),x(),await v(),s()}catch{console.log("Failed to create installment")}};return m.useEffect(()=>{g&&C.success("amount added successfully.")},[g]),m.useEffect(()=>{t&&x({amount:t.pendingAmount||"",paymentMode:t.paymentMode||"Cash"})},[t,x]),m.useEffect(()=>{a&&C.error("Failed to create installment")},[a]),m.useEffect(()=>{r&&C.info("Adding installment...")},[r]),e.jsx(L,{open:u,onOpenChange:s,children:e.jsxs(k,{className:"max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6",children:[e.jsx("h2",{className:"text-2xl font-semibold text-gray-800 border-b pb-3",children:"Add Installment"}),t&&e.jsxs("form",{onSubmit:i(j),className:"space-y-5",children:[e.jsxs("div",{className:"bg-gray-40 border border-gray-200 rounded-2xl p-6 shadow-md",children:[e.jsxs("h3",{className:"text-xl font-semibold text-gray-900 mb-4",children:["Installment Summary: ",w.name]}),e.jsx("hr",{}),e.jsxs("div",{className:"space-y-4 text-sm text-gray-700",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsxs("p",{className:"font-medium",children:["Bill No:"," ",e.jsx("span",{className:"text-gray-800",children:t.billNumber})]}),e.jsxs("p",{className:"font-medium",children:["Date:"," ",e.jsx("span",{className:"text-gray-800",children:new Date(t.createdAt).toLocaleDateString()})]})]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 text-center",children:[e.jsxs("div",{className:"bg-blue-100 p-3 rounded-md",children:[e.jsx("p",{className:"text-xs text-blue-700 uppercase",children:"Total"}),e.jsxs("p",{className:"text-base font-bold text-blue-900",children:["₹",t.totalAmount]})]}),e.jsxs("div",{className:"bg-green-100 p-3 rounded-md",children:[e.jsx("p",{className:"text-xs text-green-700 uppercase",children:"Paid"}),e.jsxs("p",{className:"text-base font-bold text-green-900",children:["₹",t.paidAmount]})]}),e.jsxs("div",{className:"bg-red-100 p-3 rounded-md",children:[e.jsx("p",{className:"text-xs text-red-700 uppercase",children:"Pending"}),e.jsxs("p",{className:"text-base font-bold text-red-900",children:["₹",t.pendingAmount]})]})]}),e.jsxs("div",{className:"flex justify-between items-center pt-4 gap-6",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-700",children:"Payment Mode:"}),e.jsx("span",{className:"inline-block bg-blue-200 text-blue-900 text-sm px-3 py-1 rounded-full font-semibold",children:t.paymentMode})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("p",{className:"text-sm font-semibold text-gray-700",children:"Status:"}),e.jsx("span",{className:`inline-block text-sm px-3 py-1 rounded-full font-semibold
                                            ${t.paymentStatus==="Paid"?"bg-green-200 text-green-800":t.paymentStatus==="Partial"?"bg-yellow-200 text-yellow-900":"bg-red-200 text-red-900"}`,children:t.paymentStatus})]})]})]})]}),e.jsxs("div",{children:[e.jsx(S,{htmlFor:"amount",className:"block text-sm font-medium text-gray-700 mb-1",children:"Installment Amount"}),e.jsxs("div",{className:"relative",children:[e.jsx("span",{className:"absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500",children:"₹"}),e.jsx(O,{id:"amount",type:"number",placeholder:"Enter amount",className:"pl-8",...p("amount",{required:"Amount is required"})})]}),c.amount&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:c.amount.message})]}),e.jsxs("div",{children:[e.jsx(S,{className:"block text-sm font-medium text-gray-700 mb-1",children:"Select Payment Mode"}),e.jsx(q,{name:"paymentMode",control:y,defaultValue:(t==null?void 0:t.paymentMode)||"Cash",rules:{required:"Select payment mode"},render:({field:l})=>e.jsx("div",{className:"flex items-center gap-4 mt-2 flex-wrap",children:["Cash","UPI","Bank Transfer","Credit","Other"].map(b=>e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"radio",value:b,checked:l.value===b,onChange:()=>l.onChange(b),className:"accent-blue-600"}),b]},b))})}),c.paymentMode&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:c.paymentMode.message})]}),e.jsxs("div",{className:"flex justify-end space-x-3 pt-4 border-t mt-4",children:[e.jsx(A,{type:"button",onClick:s,className:"bg-red-600 text-white hover:bg-red-700",children:"Cancel"}),e.jsx(A,{type:"submit",className:"bg-blue-600 hover:bg-blue-700 text-white",children:"Add Installment"})]})]})]})})},se=({onClose:u,payment:s})=>{var h,g,a;const t=m.useRef(null),[f]=K(),w=async()=>{var i,y,c,x,j;const r=(i=t.current)==null?void 0:i.innerHTML;if(!r)return;const v=((y=s==null?void 0:s.products)==null?void 0:y.map(l=>`
                <tr>
                  <td>${l.billNumber||l.product.billNumber||"N/A"}</td>
         <td>${new Date(l.createdAt||(s==null?void 0:s.createdAt)).toLocaleDateString("hi-IN")}</td>

                    <td>${l.product.name}</td>
                    <td>${l.product.category}</td>
                    <td>${l.product.batchNumber}</td>
                    <td>${new Date(l.product.expiryDate).toLocaleDateString("hi-IN")}</td>
                    <td>${l.product.unit}</td>
                    <td>${l.quantity}</td>
                    <td>${l.price}</td>
                    <td>${l.quantity*l.price}</td>
                </tr>
            `).join(""))||"";try{await f({to:((c=s==null?void 0:s.customer)==null?void 0:c.email)||"komalkshirsagar32009@gmail.com",subject:`Receipt - बिल नं ${(s==null?void 0:s.billNumber)??"-"}`,html:`<!DOCTYPE html>
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
    <div class="info-box">बिल नं: ${(s==null?void 0:s.billNumber)??"-"}</div>
  </div>
</div>

<div class="row">
  <span>श्री: ${((x=s==null?void 0:s.customer)==null?void 0:x.name)??"-"}</span>
  <span>रा.: ${((j=s==null?void 0:s.customer)==null?void 0:j.address)??"-"}</span>
  <span>दिनांक: ${new Date().toLocaleDateString("hi-IN")}</span>
</div>

<table>
  <thead>
    <tr>
    <th>बिल नं (खरेदी)</th>
      <th>दिनांक</th>
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
    ${v}
   <tr>
  <td colspan="8" style="font-size: 12px; border: 1px solid #999; padding: 6px;">
    Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017
  </td>
  <td style="border: 1px solid #999; padding: 6px; text-align: right; font-weight: bold;">एकूण</td>
  <td style="border: 1px solid #999; padding: 6px; font-weight: bold;">
    ₹${(s==null?void 0:s.totalAmount)??0}/-
  </td>
</tr>
<tr>
  <td colspan="9" style="border: 1px solid #999; padding: 6px; text-align: right; font-weight: bold; color: ${(s==null?void 0:s.pendingAmount)>0?"red":"green"};">
    बाकी
  </td>
  <td style="border: 1px solid #999; padding: 6px; font-weight: bold; color: ${(s==null?void 0:s.pendingAmount)>0?"red":"green"};">
    ₹${(s==null?void 0:s.pendingAmount)??0}/-
  </td>
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
</html>`,billNumber:(s==null?void 0:s.billNumber)||""}).unwrap(),alert("📧 Receipt email sent successfully")}catch(l){console.error("failed to send receipt email",l),alert("Failed to send email")}const p=document.body.innerHTML;document.body.innerHTML=r,window.print(),document.body.innerHTML=p,window.location.reload()};return e.jsxs("div",{className:"max-w-5xl mx-auto space-y-4",children:[e.jsxs("div",{className:"text-right flex justify-end gap-2",children:[u&&e.jsx("button",{onClick:u,className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 print:hidden",children:"Close"}),e.jsx("button",{onClick:w,className:"bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden",children:"Print Receipt"})]}),e.jsx("div",{ref:t,children:e.jsx(D,{className:"p-4 border border-gray-300 rounded-lg shadow-md",children:e.jsxs(M,{children:[e.jsxs("div",{className:"flex flex-col md:flex-row gap-4 items-start",children:[e.jsx("div",{style:{textAlign:"center",marginBottom:"10px"},children:e.jsx("img",{src:"https://cdn.pixabay.com/photo/2018/04/20/12/45/divinity-3335905_1280.png",alt:"Lord Ganesha",style:{width:"150px",height:"129px",objectFit:"contain",border:"1px solid #ccc",borderRadius:"6px"}})}),e.jsx(D,{className:"w-full md:w-3/7 border border-gray-400 shadow",children:e.jsxs(M,{className:"text-center py-4 space-y-1",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"कन्नड न्यायालय अंतर्गत"}),e.jsx("span",{children:"कॅश क्रेडिट मेमो"})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mt-2",children:"केदार कृषी सेवा केंद्र"}),e.jsx("p",{className:"text-sm text-gray-700",children:"जनावरांच्या दवाखान्यासमोर, चाळीसगाव रोड, कन्नड"}),e.jsx("p",{className:"text-sm text-gray-700",children:"जि. छ. संभाजीनगर, मो. नं. ९४२०२३०४२५"})]})}),e.jsxs(M,{className:"w-full md:w-1/2 space-y-2",children:[e.jsx("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:"औषधी लॅ नं: LAID-15050447"}),e.jsx("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:"GST IN: 27CUUPK7153A1ZE"}),e.jsxs("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:["बिल नं: ",(s==null?void 0:s.billNumber)??"-"]})]})]}),e.jsx("hr",{className:"my-2"}),e.jsxs("div",{className:"flex text-sm text-gray-800 px-1 justify-between",children:[e.jsxs("span",{children:["श्री: ",(h=s==null?void 0:s.customer)==null?void 0:h.name]}),e.jsxs("span",{children:["रा.: ",(g=s==null?void 0:s.customer)==null?void 0:g.address]}),e.jsxs("span",{children:["दिनांक: ",new Date().toLocaleDateString("hi-IN")]})]}),e.jsx("hr",{className:"my-2"}),e.jsx("div",{children:e.jsxs("table",{className:"w-full text-left border border-collapse border-gray-400",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 text-gray-800",children:[e.jsx("th",{className:"border border-gray-400 p-1",children:"बिल नं (खरेदी)"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"दिनांक"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"तपशील"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"उत्पादक"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"बॅच नं / लॉट नं"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"एक्स. डेट"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"पॅकिंग/वजन"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"नग"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"दर"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"रक्कम"})]})}),e.jsxs("tbody",{children:[(a=s==null?void 0:s.products)==null?void 0:a.map(r=>e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-400 p-1",children:r.billNumber||r.product.billNumber||"N/A"}),e.jsx("td",{className:"border border-gray-400 p-1",children:new Date(r.createdAt||(s==null?void 0:s.createdAt)).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.product.name}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.product.category}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.product.batchNumber}),e.jsx("td",{className:"border border-gray-400 p-1",children:new Date(r.product.expiryDate).toLocaleDateString("hi-IN")}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.product.unit}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.quantity}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.price}),e.jsx("td",{className:"border border-gray-400 p-1",children:r.quantity*r.price})]},r._id)),e.jsxs("tr",{children:[e.jsx("td",{colSpan:8,className:"border border-gray-400 p-1 text-xs",children:"Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017"}),e.jsx("td",{className:"border border-gray-400 p-1 text-right font-semibold",children:"एकूण"}),e.jsxs("td",{className:"border border-gray-400 p-1 font-semibold",children:["₹",(s==null?void 0:s.totalAmount)??0,"/-"]})]}),e.jsxs("tr",{children:[e.jsx("td",{colSpan:9,className:`border border-gray-400 p-1 text-right font-semibold ${(s==null?void 0:s.pendingAmount)>0?"text-red-600":"text-green-600"}`,children:"बाकी"}),e.jsxs("td",{className:`border border-gray-400 p-1 font-semibold ${(s==null?void 0:s.pendingAmount)>0?"text-red-600":"text-green-600"}`,children:["₹",(s==null?void 0:s.pendingAmount)??0,"/-"]})]})]})]})}),e.jsxs("div",{className:"mt-4 text-sm text-gray-700 space-y-1",children:[e.jsx("strong",{className:"text-red-600",children:"टीप:"}),e.jsx("p",{children:"1️⃣ एकदा विकलेला माल परत घेतला जाणार नाही."}),e.jsx("p",{children:"2️⃣ 'वरली सर्व' हे औषध विषारी असून केवळ शेती उपयोगासाठीच आहे."}),e.jsxs("div",{className:"flex flex-wrap justify-between gap-4 mt-4 font-semibold",children:[e.jsx("span",{children:"3️⃣ हलगर्जीपणामुळे झालेल्या नुकसानीस आम्ही जबाबदार राहणार नाही."}),e.jsx("span",{children:"धन्यवाद....."}),e.jsx("span",{children:"माल घेणाराची सही"}),e.jsx("span",{children:"करिता केदार कृषी सेवा केंद्र"})]})]})]})})})]})},te=Z({amount:W().min(1,"Amount is required"),paymentMode:J(["Cash","UPI","Bank Transfer","Credit","Other"])}),re=({customerId:u,customer:s,totals:t,refetch:f})=>{var R;const[w,h]=m.useState(!1),[g,a]=m.useState(!1),[r,v]=m.useState([]),{data:p}=H({}),[i,y]=m.useState(""),[c,{isSuccess:x,isError:j,isLoading:l}]=_(),b=((R=p==null?void 0:p.result)==null?void 0:R.flatMap(o=>o.products))||[];console.log("combinedProducts::",b);const{register:d,handleSubmit:N,control:I,formState:{errors:P},reset:$}=G({resolver:Y(te),defaultValues:{amount:String(t.pendingAmount),paymentMode:"Cash"}}),z=async o=>{try{const n=await c({customerId:u,totalPayAmount:+o.amount,paymentDate:new Date().toISOString(),paymentMode:o.paymentMode,paymentReference:"ALL-IN-ONE"}).unwrap();v(n.payments||[]),y(n.billNumber),h(!1),a(!0),await f(),$()}catch{console.log("Something went wrong.")}};return m.useEffect(()=>{x&&C.success("Pending Prdouct amount added successfully")},[x]),m.useEffect(()=>{j&&C.error("Failed to save product")},[j]),e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"mt-4 flex justify-end",children:e.jsx(A,{className:"bg-green-600 hover:bg-green-700 text-white",onClick:()=>{$({amount:String(t.pendingAmount),paymentMode:"Cash"}),h(!0)},children:"💸 Pay All Pending"})}),e.jsx(L,{open:w,onOpenChange:h,children:e.jsxs(k,{children:[e.jsxs(E,{className:"text-lg font-semibold",children:["Pay All Pending Amount – ",s.name]}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 mt-4",children:[e.jsxs("div",{className:"flex-1 bg-green-50 p-4 rounded-xl text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"✅ Paid Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-green-700",children:["₹",t.paidAmount]})]}),e.jsxs("div",{className:"flex-1 bg-yellow-50 p-4 rounded-xl text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"❌ Pending Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-yellow-700",children:["₹",t.pendingAmount]})]}),e.jsxs("div",{className:"flex-1 bg-blue-50 p-4 rounded-xl text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"💰 Total Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-blue-700",children:["₹",t.totalAmount]})]})]}),e.jsxs("div",{className:"mt-6",children:[e.jsx(S,{className:"mb-1 block text-sm text-gray-600",children:"Amount to Pay"}),e.jsx(O,{type:"number",placeholder:"Enter amount to pay",...d("amount")}),P.amount&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P.amount.message})]}),e.jsxs("div",{className:"mt-4",children:[e.jsx(S,{className:"text-sm font-medium text-gray-700 mb-1",children:"Select Payment Mode"}),e.jsx(q,{name:"paymentMode",control:I,rules:{required:"Select payment mode"},render:({field:o})=>e.jsx("div",{className:"flex flex-wrap gap-4 mt-2",children:["Cash","UPI","Bank Transfer","Credit","Other"].map(n=>e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"radio",id:n,value:n,checked:o.value===n,onChange:()=>o.onChange(n),className:"accent-blue-600"}),e.jsx(S,{htmlFor:n,className:"text-sm",children:n})]},n))})}),P.paymentMode&&e.jsx("p",{className:"text-red-500 text-sm mt-1",children:P.paymentMode.message})]}),e.jsxs(B,{className:"mt-6 flex justify-end gap-3",children:[e.jsx(A,{type:"button",variant:"outline",onClick:()=>h(!1),className:"bg-red-600 text-white hover:bg-red-700",children:"Cancel"}),e.jsx(A,{className:"bg-blue-600 hover:bg-blue-700 text-white",onClick:N(z),disabled:l,children:l?"Processing...":"Submit Payment"})]})]})}),g&&r.length>0&&e.jsx(L,{open:g,onOpenChange:a,children:e.jsxs(k,{className:"max-w-5xl max-h-[90vh] overflow-y-auto",children:[e.jsx(E,{children:"Receipt"}),e.jsx(se,{payment:{customer:s,createdAt:new Date().toISOString(),paymentMode:"Cash",paymentReference:"ALL-IN-ONE",billNumber:i,products:r.flatMap(o=>o.products.map(n=>({...n,billNumber:o.billNumber,createdAt:o.createdAt}))),totalAmount:r.reduce((o,n)=>o+n.totalAmount,0),pendingAmount:r.reduce((o,n)=>o+n.pendingAmount,0),paidAmount:r.reduce((o,n)=>o+n.paidAmount,0)},onClose:()=>a(!1)}),e.jsx(B,{children:e.jsx(A,{onClick:()=>a(!1),className:" text-white",children:"Close"})})]})})]})},ue=({customerId:u})=>{var j,l,b;if(!u)return e.jsx("p",{className:"text-red-500 text-center mt-10",children:"Invalid or missing customer ID."});const[s,t]=m.useState(!1),[f,w]=m.useState(null),[h,g]=m.useState(null),{data:a,isLoading:r,refetch:v}=F(u),{data:p}=Q({});if(r)return e.jsx("p",{className:"text-center text-gray-600 mt-10",children:"Loading..."});const i=(j=p==null?void 0:p.result)==null?void 0:j.find(d=>d._id===u),y=(a==null?void 0:a.result)||[];console.log("payments::",y);const c=(a==null?void 0:a.totals)||{totalAmount:0,paidAmount:0,pendingAmount:0},x=a==null?void 0:a.purchaseInfo;return e.jsxs("div",{className:"max-w-6xl mx-auto p-6 space-y-6",children:[i&&e.jsx(D,{className:"shadow-xl rounded-2xl bg-white border border-gray-200",children:e.jsxs(M,{className:"p-6 space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between border-b pb-4",children:[e.jsxs("h2",{className:"text-2xl font-semibold text-gray-800 flex items-center gap-2",children:[e.jsx("span",{className:"text-blue-500",children:"👤"})," Customer Information"]}),e.jsx(T,{className:`px-3 py-1 rounded-full text-xs font-medium tracking-wide ${i.status==="active"?"bg-green-100 text-green-700":"bg-red-100 text-red-700"}`,children:(l=i.status)==null?void 0:l.toUpperCase()})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-sm",children:[e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"🧾 Name:"})," ",i.name]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"🏠 Address:"})," ",i.address]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"📞 Mobile:"})," ",i.mobile]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"📧 Email:"})," ",i.email]})]}),e.jsx("div",{className:"mt-4",children:e.jsx(re,{customerId:i._id??"",customer:i,totals:c,refetch:v})}),e.jsxs("div",{className:"mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"bg-green-50 border border-green-100 rounded-xl p-4 shadow-sm text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"✅ Paid Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-green-700",children:["₹",c.paidAmount]})]}),e.jsxs("div",{className:"bg-yellow-50 border border-yellow-100 rounded-xl p-4 shadow-sm text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"❌ Pending Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-yellow-700",children:["₹",c.pendingAmount]})]}),e.jsxs("div",{className:"bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm text-center",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"💰 Total Amount"}),e.jsxs("p",{className:"text-lg font-semibold text-blue-700",children:["₹",c.totalAmount]})]})]}),x&&e.jsxs("div",{className:"mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm text-gray-600 space-y-2",children:[e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"🗓 Year Range:"})," ",x.yearRange]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"📅 First Purchase:"})," ",x.firstDate]}),e.jsxs("p",{children:[e.jsx("span",{className:"font-medium",children:"📅 Last Purchase:"})," ",x.lastDate]})]})]})}),e.jsx("div",{className:"overflow-auto rounded-lg shadow border border-gray-200",children:e.jsxs("table",{className:"min-w-full text-sm text-left",children:[e.jsx("thead",{className:"bg-blue-100 text-gray-700 tracking-wide text-xs font-semibold",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 border",children:"Bill No"}),e.jsx("th",{className:"px-4 py-3 border",children:"Date"}),e.jsx("th",{className:"px-4 py-3 border",children:"Products"}),e.jsx("th",{className:"px-4 py-3 border",children:"Total (₹)"}),e.jsx("th",{className:"px-4 py-3 border",children:"Paid (₹)"}),e.jsx("th",{className:"px-4 py-3 border",children:"Pending (₹)"}),e.jsx("th",{className:"px-4 py-3 border",children:"Quantity"}),e.jsx("th",{className:"px-4 py-3 border",children:"Mode"}),e.jsx("th",{className:"px-4 py-3 border",children:"Status"})]})}),e.jsx("tbody",{className:"bg-white divide-y",children:(b=a==null?void 0:a.result)==null?void 0:b.map(d=>e.jsxs(V.Fragment,{children:[e.jsxs("tr",{className:"hover:bg-gray-50 cursor-pointer",onClick:N=>{N.target.tagName.toLowerCase()!=="button"&&g(h===d.billNumber?null:d.billNumber)},children:[e.jsx("td",{className:"px-4 py-2 border",children:d.billNumber}),e.jsx("td",{className:"px-4 py-2 border",children:new Date(d.createdAt).toLocaleDateString("hi-IN")}),e.jsx("td",{className:"px-4 py-2 border",children:d.products.map(N=>N.product.name).join(", ")}),e.jsxs("td",{className:"px-4 py-2 border",children:["₹",d.totalAmount]}),e.jsxs("td",{className:"px-4 py-2 border",children:["₹",d.paidAmount]}),e.jsxs("td",{className:"px-4 py-2 border",children:["₹",d.pendingAmount]}),e.jsx("td",{className:"px-4 py-2 border",children:d.products.reduce((N,I)=>N+I.quantity,0)}),e.jsx("td",{className:"px-4 py-2 border",children:d.paymentMode}),e.jsxs("td",{className:"px-4 py-2 border flex items-center gap-2",children:[e.jsx(T,{className:d.paymentStatus==="Paid"?"bg-green-500 text-white":d.paymentStatus==="Partial"?"bg-yellow-500 text-white":"bg-red-500 text-white",children:d.paymentStatus}),d.pendingAmount>0&&e.jsx(A,{size:"sm",className:"bg-blue-600 text-white hover:bg-blue-500",onClick:N=>{N.stopPropagation(),w(d),t(!0)},children:"Pay"})]})]}),h===d.billNumber&&d.billNumber&&e.jsx("tr",{children:e.jsx("td",{colSpan:9,className:"bg-gray-50 border px-4 py-3",children:e.jsx(X,{billNumber:d.billNumber})})})]},d._id))})]})}),e.jsx(ee,{open:s,onClose:()=>t(!1),payment:f,customerId:u,customer:i})]})};export{ue as default};
