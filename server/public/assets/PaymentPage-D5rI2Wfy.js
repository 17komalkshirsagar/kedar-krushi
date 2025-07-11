import{r as c,j as e,w as oe,O as ie,aF as le,aG as ne,aH as ce,I as L,B as _}from"./index-Cl1SQMCp.js";import{u as xe,t as ue,a as he,o as K,e as pe,n as V,b as me,s as Z}from"./zod-Cx2om5l9.js";import{t as Y}from"./index-MnOYjBE-.js";import{L as u}from"./label-DJCwXsjE.js";import{C as z,d as k,a as be,b as ge}from"./card-mR9xUq05.js";import{L as je}from"./Loader-BikfMRdt.js";import{u as fe,D as Ne,a as ye}from"./emailSendReceipt.api-LrsuY_7X.js";import{u as J}from"./useDebounce-CfTSEcaX.js";import"./index-BPJnJB5S.js";const ve=({onClose:b,payment:t})=>{var v,w,P;const S=c.useRef(null),[n]=fe(),$=async()=>{var p,j,m,i,x;const a=(p=S.current)==null?void 0:p.innerHTML;if(!a)return;const I=((j=t==null?void 0:t.products)==null?void 0:j.map(o=>`
                <tr>
                    <td>${o.product.name}</td>
                    <td>${o.product.category}</td>
                    <td>${o.product.batchNumber}</td>
                    <td>${new Date(o.product.expiryDate).toLocaleDateString("hi-IN")}</td>
                    <td>${o.product.unit}</td>
                    <td>${o.quantity}</td>
                    <td>${o.price}</td>
                    <td>${o.quantity*o.price}</td>
                </tr>
            `).join(""))||"";try{await n({to:((m=t==null?void 0:t.customer)==null?void 0:m.email)||"komalkshirsagar32009@gmail.com",subject:`Receipt - बिल नं ${(t==null?void 0:t.billNumber)??"-"}`,html:`<!DOCTYPE html>
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
    <div class="info-box">बिल नं: ${(t==null?void 0:t.billNumber)??"-"}</div>
  </div>
</div>

<div class="row">
  <span>श्री: ${((i=t==null?void 0:t.customer)==null?void 0:i.name)??"-"}</span>
  <span>रा.: ${((x=t==null?void 0:t.customer)==null?void 0:x.address)??"-"}</span>
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
    ${I}
    <tr>
      <td colspan="6" style="font-size: 12px;">Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017</td>
      <td style="font-weight: bold;">एकूण</td>
      <td style="font-weight: bold;">₹${(t==null?void 0:t.totalAmount)??0}/-</td>
    </tr>
    <tr>
  <td colspan="7" style="text-align: right; font-weight: bold; color: red;">बाकी</td>
  <td style="font-weight: bold; color: red;">₹${(t==null?void 0:t.pendingAmount)??0}/-</td>
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
</html>`,billNumber:(t==null?void 0:t.billNumber)||""}).unwrap(),alert("📧 Receipt email sent successfully")}catch(o){console.error("failed to send receipt email",o),alert("Failed to send email")}const g=document.body.innerHTML;document.body.innerHTML=a,window.print(),document.body.innerHTML=g,window.location.reload()};return e.jsxs("div",{className:"max-w-5xl mx-auto space-y-4",children:[e.jsxs("div",{className:"text-right flex justify-end gap-2",children:[b&&e.jsx("button",{onClick:b,className:"bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 print:hidden",children:"Close"}),e.jsx("button",{onClick:$,className:"bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 print:hidden",children:"Print Receipt"})]}),e.jsx("div",{ref:S,children:e.jsx(z,{className:"p-4 border border-gray-300 rounded-lg shadow-md",children:e.jsxs(k,{children:[e.jsxs("div",{className:"flex flex-col md:flex-row gap-4 items-start",children:[e.jsx("div",{style:{textAlign:"center",marginBottom:"10px"},children:e.jsx("img",{src:"https://cdn.pixabay.com/photo/2018/04/20/12/45/divinity-3335905_1280.png",alt:"Lord Ganesha",style:{width:"150px",height:"129px",objectFit:"contain",border:"1px solid #ccc",borderRadius:"6px"}})}),e.jsx(z,{className:"w-full md:w-3/7 border border-gray-400 shadow",children:e.jsxs(k,{className:"text-center py-4 space-y-1",children:[e.jsxs("div",{className:"flex justify-between text-sm",children:[e.jsx("span",{children:"कन्नड न्यायालय अंतर्गत"}),e.jsx("span",{children:"कॅश क्रेडिट मेमो"})]}),e.jsx("h2",{className:"text-xl font-bold text-gray-800 mt-2",children:"केदार कृषी सेवा केंद्र"}),e.jsx("p",{className:"text-sm text-gray-700",children:"जनावरांच्या दवाखान्यासमोर, चाळीसगाव रोड, कन्नड"}),e.jsx("p",{className:"text-sm text-gray-700",children:"जि. छ. संभाजीनगर, मो. नं. ९४२०२३०४२५"})]})}),e.jsxs(k,{className:"w-full md:w-1/2 space-y-2",children:[e.jsx("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:"औषधी लॅ नं: LAID-15050447"}),e.jsx("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:"GST IN: 27CUUPK7153A1ZE"}),e.jsxs("div",{className:"border border-gray-300 px-2 py-2 text-sm bg-white text-gray-800 rounded-md",children:["बिल नं: ",(t==null?void 0:t.billNumber)??"-"]})]})]}),e.jsx("hr",{className:"my-2"}),e.jsxs("div",{className:"flex text-sm text-gray-800 px-1 justify-between",children:[e.jsxs("span",{children:["श्री: ",(v=t==null?void 0:t.customer)==null?void 0:v.name]}),e.jsxs("span",{children:["रा.: ",(w=t==null?void 0:t.customer)==null?void 0:w.address]}),e.jsxs("span",{children:["दिनांक: ",new Date().toLocaleDateString("hi-IN")]})]}),e.jsx("hr",{className:"my-2"}),e.jsx("div",{children:e.jsxs("table",{className:"w-full text-left border border-collapse border-gray-400",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-100 text-gray-800",children:[e.jsx("th",{className:"border border-gray-400 p-1",children:"तपशील"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"उत्पादक"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"बॅच नं / लॉट नं"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"एक्स. डेट"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"पॅकिंग/वजन"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"नग"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"दर"}),e.jsx("th",{className:"border border-gray-400 p-1",children:"रक्कम"})]})}),e.jsxs("tbody",{children:[(P=t==null?void 0:t.products)==null?void 0:P.map(a=>e.jsxs("tr",{children:[e.jsx("td",{className:"border border-gray-400 p-1",children:a.product.name}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.product.category}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.product.batchNumber}),e.jsx("td",{className:"border border-gray-400 p-1",children:new Date(a.product.expiryDate).toLocaleDateString("hi-IN")}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.product.unit}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.quantity}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.price}),e.jsx("td",{className:"border border-gray-400 p-1",children:a.quantity*a.price})]},a._id)),e.jsxs("tr",{children:[e.jsx("td",{colSpan:6,className:"border border-gray-400 p-1 text-xs",children:"Deceleration - the Central Goods and Services Tax Act.2017 MHA-GST Act 2017"}),e.jsx("td",{className:"border border-gray-400 p-1 text-right font-semibold",children:"एकूण"}),e.jsxs("td",{className:"border border-gray-400 p-1 font-semibold",children:[t==null?void 0:t.totalAmount,"/-"]})]}),e.jsxs("tr",{children:[e.jsx("td",{colSpan:7,className:`border border-gray-400 p-1 text-right font-semibold ${(t==null?void 0:t.pendingAmount)>0?"text-red-600":"text-green-600"}`,children:"बाकी"}),e.jsxs("td",{className:`border border-gray-400 p-1 font-semibold ${(t==null?void 0:t.pendingAmount)>0?"text-red-600":"text-green-600"}`,children:["₹",(t==null?void 0:t.pendingAmount)??0,"/-"]})]})]})]})}),e.jsxs("div",{className:"mt-4 text-sm text-gray-700 space-y-1",children:[e.jsx("strong",{className:"text-red-600",children:"टीप:"}),e.jsx("p",{children:"1️⃣ एकदा विकलेला माल परत घेतला जाणार नाही."}),e.jsx("p",{children:"2️⃣ 'वरली सर्व' हे औषध विषारी असून केवळ शेती उपयोगासाठीच आहे."}),e.jsxs("div",{className:"flex flex-wrap justify-between gap-4 mt-4 font-semibold",children:[e.jsx("span",{children:"3️⃣ हलगर्जीपणामुळे झालेल्या नुकसानीस आम्ही जबाबदार राहणार नाही."}),e.jsx("span",{children:"धन्यवाद....."}),e.jsx("span",{children:"माल घेणाराची सही"}),e.jsx("span",{children:"करिता केदार कृषी सेवा केंद्र"})]})]})]})})})]})},we=K({customerId:Z().nonempty("Customer is required"),products:me(K({productId:Z().nonempty("Product is required"),quantity:V().min(1,"Quantity must be at least 1")})).min(1,"At least one product is required"),paidAmount:V().min(0,"Paid amount must be a positive number"),paymentMode:pe(["Cash","UPI","Bank Transfer","Credit","Other"])}),ke=()=>{var B,Q;const{data:b}=oe({}),[t,S]=c.useState(null),{data:n}=ie({}),[$,{isSuccess:v,isError:w,isLoading:P}]=le(),a=c.useRef(null),I=c.useRef(null),[g,p]=c.useState(""),[j,m]=c.useState(""),[i,x]=c.useState(null),o=J(g,400),E=J(j,400),[W,M]=c.useState(!1),{register:A,handleSubmit:X,watch:R,setValue:D,control:ee,reset:G,formState:{errors:f}}=xe({resolver:ue(we),defaultValues:{customerId:"",products:[],paidAmount:0,paymentMode:"Cash"}}),{fields:se,append:O,remove:te}=he({control:ee,name:"products"}),T=R("products"),q=R("paidAmount"),F=o.trim().toLowerCase(),h=((B=b==null?void 0:b.result)==null?void 0:B.filter(s=>{var r;return s.name.toLowerCase().includes(F.toLowerCase())||((r=s.mobile)==null?void 0:r.includes(F))}))||[],H=((Q=n==null?void 0:n.result)==null?void 0:Q.filter(s=>{var r;return s.name.toLowerCase().includes(E.toLowerCase())||((r=s.description)==null?void 0:r.toLowerCase().includes(E.toLowerCase()))}))||[],C=s=>{var r;return(r=n==null?void 0:n.result)==null?void 0:r.find(d=>d._id===s)},re=async s=>{const r=s.products.reduce((l,N)=>{const y=C(N.productId);return l+((y==null?void 0:y.price)||0)*N.quantity},0),d=r-s.paidAmount;try{const l=await $({customer:s.customerId,products:s.products.map(N=>{var y;return{product:N.productId,quantity:N.quantity,price:((y=C(N.productId))==null?void 0:y.price)||0}}),totalAmount:r.toString(),paidAmount:s.paidAmount.toString(),pendingAmount:d.toString(),paymentMode:s.paymentMode,paymentStatus:s.paidAmount===r?"Paid":s.paidAmount===0?"Unpaid":"Partial"}).unwrap();S(l.result),M(!0),G({customerId:"",products:[],paidAmount:0,paymentMode:"Cash"}),x(null),p(""),m("")}catch{console.log("Failed to save payment")}},U=T.reduce((s,r)=>{const d=C(r.productId);return s+((d==null?void 0:d.price)||0)*r.quantity},0),de=T.reduce((s,r)=>s+r.quantity,0),ae=U-q;return c.useEffect(()=>{if(h.length===1){const s=h[0];s._id!==(i==null?void 0:i._id)&&(D("customerId",s._id??""),x(s))}else i!==null&&(D("customerId",""),x(null))},[o,h]),c.useEffect(()=>{v&&(Y.success("Payment added successfully"),M(!0),G({customerId:"",products:[],paidAmount:0,paymentMode:"Cash"}),x(null),p(""),m(""))},[v]),c.useEffect(()=>{w&&Y.error("Failed to save payment")},[w]),P?e.jsx(je,{}):e.jsxs(z,{className:"max-w-4xl mx-auto mt-4 p-4",children:[e.jsx(be,{children:e.jsxs("div",{className:"flex justify-center items-center space-x-2 text-center",children:[e.jsx(ne,{className:"text-yellow-700",size:22}),e.jsx(ce,{className:"text-green-700",size:22}),e.jsx(ge,{children:" Product & Payment"})]})}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-center",children:[e.jsxs("div",{className:"border rounded p-3 shadow-sm bg-blue-50",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Total Products"}),e.jsx("p",{className:"font-semibold text-lg",children:de})]}),e.jsxs("div",{className:"border rounded p-3 shadow-sm bg-green-50",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Total Amount"}),e.jsxs("p",{className:"font-semibold text-lg",children:["₹",U]})]}),e.jsxs("div",{className:"border rounded p-3 shadow-sm bg-yellow-50",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Paid Amount"}),e.jsxs("p",{className:"font-semibold text-lg",children:["₹",q]})]}),e.jsxs("div",{className:"border rounded p-3 shadow-sm bg-red-50",children:[e.jsx("p",{className:"text-sm text-gray-500",children:"Pending Amount"}),e.jsxs("p",{className:"font-semibold text-lg",children:["₹",ae]})]})]}),e.jsxs(k,{children:[e.jsxs("form",{onSubmit:X(re),className:"space-y-5",children:[e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{className:"w-1/2",children:[e.jsx(u,{children:"Search by Name or Mobile"}),e.jsx(L,{value:g,onChange:s=>{p(s.target.value),x(null)},placeholder:"Enter name or mobile",ref:a,onKeyDown:s=>{var r;(s.key==="Enter"||s.key==="Tab")&&(s.preventDefault(),(r=I.current)==null||r.focus())}}),g&&h.length===0&&!i&&e.jsx("p",{className:"text-red-500 mt-1",children:"Customer not found"}),g&&h.length>0&&!i&&e.jsx("div",{className:"border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow  absolute w-full z-50",children:h.map(s=>e.jsxs("div",{className:"px-3 py-2 hover:bg-gray-100 cursor-pointer",onClick:()=>{x(s),D("customerId",s._id??""),p(s.name)},children:[s.name," (",s.mobile,")"]},s._id))})]}),e.jsxs("div",{className:"w-1/2",children:[e.jsx(u,{children:"Customer"}),e.jsxs("select",{...A("customerId"),className:"w-full border rounded px-2 py-1",onChange:s=>{const r=h.find(d=>d._id===s.target.value);x(r||null),D("customerId",s.target.value)},value:R("customerId"),children:[e.jsx("option",{value:"",children:"Select Customer"}),h.map(s=>e.jsxs("option",{value:s._id,children:[s.name," (",s.mobile,")"]},s._id))]}),f.customerId&&e.jsx("p",{className:"text-red-500",children:f.customerId.message})]})]}),i&&e.jsxs("div",{className:"border p-3 rounded bg-gray-50",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"Name:"})," ",i.name]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Mobile:"})," ",i.mobile]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Address:"})," ",i.address]})]}),e.jsxs("div",{children:[e.jsx(u,{children:"Search Product"}),e.jsx(L,{type:"text",placeholder:"Search by name or description",value:j,onChange:s=>m(s.target.value),ref:I}),j&&e.jsx("div",{className:"border rounded mt-2 max-h-40 overflow-y-auto bg-white shadow z-10",children:H.length>0?H.map(s=>{const r=s.stock===0;return e.jsxs("div",{className:`px-3 py-2 ${r?"text-gray-400 cursor-not-allowed":"hover:bg-gray-100 cursor-pointer"}`,onClick:()=>{r||(O({productId:s._id,quantity:1}),m(""))},children:[s.name," (₹",s.price,") Batch: ",s.batchNumber," Stock:",s.stock,r&&" - 🚫 Out of Stock"]},s._id)}):e.jsx("div",{className:"px-3 py-2 text-gray-500 italic",children:"🚫 No matching products found"})})]}),e.jsxs("div",{className:"space-y-4 mt-2",children:[se.map((s,r)=>{var d;return e.jsxs("div",{className:"flex gap-4 items-center",children:[e.jsxs("div",{className:"w-1/2",children:[e.jsx(u,{children:"Product"}),e.jsxs("select",{...A(`products.${r}.productId`),className:"w-full border rounded px-2 py-1",children:[e.jsx("option",{value:"",children:"Select Product"}),(d=n==null?void 0:n.result)==null?void 0:d.map(l=>e.jsxs("option",{value:l._id,children:[l.name," (₹",l.price,")"]},l._id))]})]}),e.jsxs("div",{children:[e.jsx(u,{children:"Qty"}),e.jsx(L,{type:"number",...A(`products.${r}.quantity`,{valueAsNumber:!0}),min:1})]}),e.jsx("div",{children:e.jsx(_,{className:"mt-5 bg-red-600 text-white",type:"button",variant:"destructive",onClick:()=>te(r),children:"Remove"})})]},s.id)}),e.jsx(_,{type:"button",onClick:()=>O({productId:"",quantity:1}),className:"mt-2 bg-blue-500 text-white",children:"+ Add Product"})]}),e.jsxs("div",{className:"flex gap-4 mt-4",children:[e.jsxs("div",{className:"w-1/3",children:[e.jsx(u,{children:"Paid Amount"}),e.jsx(L,{type:"number",...A("paidAmount",{valueAsNumber:!0})}),f.paidAmount&&e.jsx("p",{className:"text-red-500",children:f.paidAmount.message})]}),e.jsxs("div",{className:"w-1/3",children:[e.jsx(u,{children:"Total Amount"}),e.jsxs("p",{className:"border p-2 rounded",children:["₹",T.reduce((s,r)=>{const d=C(r.productId);return s+((d==null?void 0:d.price)||0)*r.quantity},0)]})]}),e.jsxs("div",{className:"w-1/3",children:[e.jsx(u,{children:"Pending Amount"}),e.jsxs("p",{className:"border p-2 rounded",children:["₹",T.reduce((r,d)=>{const l=C(d.productId);return r+((l==null?void 0:l.price)||0)*d.quantity},0)-q]})]})]}),e.jsxs("div",{children:[e.jsx(u,{children:"Payment Mode"}),e.jsxs("div",{className:"flex items-center gap-4 mt-2 flex-wrap",children:[["Cash","UPI","Bank Transfer","Credit","Other"].map(s=>e.jsxs("label",{className:"flex items-center gap-2",children:[e.jsx("input",{type:"radio",value:s,...A("paymentMode"),className:"accent-blue-600"}),s]},s)),e.jsx(_,{type:"submit",className:"bg-green-600 text-white ml-auto",children:"Submit Payment"})]}),f.paymentMode&&e.jsx("p",{className:"text-red-500 mt-1",children:f.paymentMode.message})]})]}),e.jsx(Ne,{open:W,onOpenChange:M,children:e.jsx(ye,{className:"max-w-5xl max-h-[90vh] overflow-y-auto",children:t&&e.jsx(ve,{onClose:()=>M(!1),payment:t})})})]})]})};export{ke as default};
