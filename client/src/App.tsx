import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SupplierPage from './pages/supplier/SupplierPage';
import SupplierTable from './pages/supplier/SupplierTable';
import ProductTable from './pages/product/ProductTable';
import PaymentPage from './pages/payment/PaymentPage';
import Receipt from './pages/payment/Receipt';
import CustomerHistory from './pages/customer/CustomerHistory';

import Dashboard from './pages/dasboard/Dashboard';
import InstallmentAccordion from './pages/installment/InstallmentAccordion';


const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <p className="text-lg font-semibold text-gray-600">Loading...</p>
  </div>
);


const LoginPage = lazy(() => import('./auth/login/LoginPage'));
const RegisterPage = lazy(() => import('./auth/register/RegisterPage'));
const SendOtpPage = lazy(() => import('./auth/otp/SendOtpPage'));
const ForgotPasswordPage = lazy(() => import('./auth/forgotpassword/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./auth/forgotpassword/ResetPasswordPage'));
const CompanyPage = lazy(() => import('./pages/company/CompanyPage'));
const CompanyTable = lazy(() => import('./pages/company/CompanyTable'));
const CustomerPage = lazy(() => import('./pages/customer/CustomerPage'));
const CustomerTable = lazy(() => import('./pages/customer/CustomerTable'));
const DeliveryPage = lazy(() => import('./pages/delivery/DeliveryPage'));
const DeliveryTable = lazy(() => import('./pages/delivery/DeliveryTable'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeePage'));
const EmployeeTable = lazy(() => import('./pages/employee/EmployeeTable'));
const NotificationPage = lazy(() => import('./pages/notification/NotificationPage'));
const ProductPage = lazy(() => import('./pages/product/ProductPage'));

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/send-otp" element={<SendOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/company-page" element={<CompanyPage />} />
        <Route path="/company-page/:id" element={<CompanyPage />} />
        <Route path="/company-table" element={<CompanyTable />} />
        <Route path="/customer-page" element={<CustomerPage />} />
        <Route path="/customer-page/:id" element={<CustomerPage />} />
        <Route path="/customer-table" element={<CustomerTable />} />
        <Route path="/delivery-page" element={<DeliveryPage />} />
        <Route path="/delivery-table" element={<DeliveryTable />} />
        <Route path="/employee-page" element={<EmployeePage />} />
        <Route path="/employee-page/:id" element={<EmployeePage />} />
        <Route path="/employee-table" element={<EmployeeTable />} />
        <Route path="/notification-page" element={<NotificationPage />} />
        <Route path="/product-page" element={<ProductPage />} />
        <Route path="/product-page/:id" element={<ProductPage />} />
        <Route path="/product-table" element={<ProductTable />} />
        <Route path="/supplier-page" element={<SupplierPage />} />
        <Route path="/supplier-page/:id" element={<SupplierPage />} />
        <Route path="/supplier-table" element={<SupplierTable />} />
        <Route path="/bill" element={<PaymentPage />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/customer-history/:customerId" element={<CustomerHistory />} />
        <Route path="/dashboard" element={<Dashboard />} />


        <Route path="*" element={<p className="text-center mt-10 text-red-500">404 - Page Not Found</p>} />
      </Routes>
    </Suspense>
  );
};

export default App;

