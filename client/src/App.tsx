

import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SessionExpiredModal from './components/ui/SessionExpiredModal';
import Protected from './components/ui/Protected';
import ErrorBoundary from './components/ui/ErrorBoundary';


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
const CustomerHistory = lazy(() => import('./pages/customer/CustomerHistory'));

const SupplierPage = lazy(() => import('./pages/supplier/SupplierPage'));
const SupplierTable = lazy(() => import('./pages/supplier/SupplierTable'));
const ProductPage = lazy(() => import('./pages/product/ProductPage'));
const ProductTable = lazy(() => import('./pages/product/ProductTable'));
const DeliveryPage = lazy(() => import('./pages/delivery/DeliveryPage'));
const DeliveryTable = lazy(() => import('./pages/delivery/DeliveryTable'));
const EmployeePage = lazy(() => import('./pages/employee/EmployeePage'));
const EmployeeTable = lazy(() => import('./pages/employee/EmployeeTable'));
const NotificationPage = lazy(() => import('./pages/notification/NotificationPage'));
const PaymentPage = lazy(() => import('./pages/payment/PaymentPage'));
const Dashboard = lazy(() => import('./pages/dasboard/Dashboard'));
const InstallmentAccordion = lazy(() => import('./pages/installment/InstallmentAccordion'));

const App = () => {
  return <>
    <Suspense fallback={<Loader />}>
      <SessionExpiredModal />
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/send-otp" element={<SendOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />


        <Route path="/company-page" element={<Protected compo={<ErrorBoundary><CompanyPage /></ErrorBoundary>} />} />
        <Route path="/company-page/:id" element={<Protected compo={<ErrorBoundary><CompanyPage /></ErrorBoundary>} />} />
        <Route path="/company-table" element={<Protected compo={<ErrorBoundary><CompanyTable /></ErrorBoundary>} />} />

        <Route path="/customer-page" element={<Protected compo={<ErrorBoundary><CustomerPage /></ErrorBoundary>} />} />
        <Route path="/customer-page/:id" element={<Protected compo={<ErrorBoundary><CustomerPage /></ErrorBoundary>} />} />
        <Route path="/customer-table" element={<Protected compo={<ErrorBoundary><CustomerTable /></ErrorBoundary>} />} />
        <Route path="/customer-history/:customerId" element={<Protected compo={<ErrorBoundary><CustomerHistory customerId="" /></ErrorBoundary>} />} />

        <Route path="/supplier-page" element={<Protected compo={<ErrorBoundary><SupplierPage /></ErrorBoundary>} />} />
        <Route path="/supplier-page/:id" element={<Protected compo={<ErrorBoundary><SupplierPage /></ErrorBoundary>} />} />
        <Route path="/supplier-table" element={<Protected compo={<ErrorBoundary><SupplierTable /></ErrorBoundary>} />} />

        <Route path="/product-page" element={<Protected compo={<ErrorBoundary><ProductPage /></ErrorBoundary>} />} />
        <Route path="/product-page/:id" element={<Protected compo={<ErrorBoundary><ProductPage /></ErrorBoundary>} />} />
        <Route path="/product-table" element={<Protected compo={<ErrorBoundary><ProductTable /></ErrorBoundary>} />} />

        <Route path="/delivery-page" element={<Protected compo={<ErrorBoundary><DeliveryPage /></ErrorBoundary>} />} />
        <Route path="/delivery-table" element={<Protected compo={<ErrorBoundary><DeliveryTable /></ErrorBoundary>} />} />

        <Route path="/employee-page" element={<Protected compo={<ErrorBoundary><EmployeePage /></ErrorBoundary>} />} />
        <Route path="/employee-page/:id" element={<Protected compo={<ErrorBoundary><EmployeePage /></ErrorBoundary>} />} />
        <Route path="/employee-table" element={<Protected compo={<ErrorBoundary><EmployeeTable /></ErrorBoundary>} />} />

        <Route path="/notification-page" element={<Protected compo={<ErrorBoundary><NotificationPage /></ErrorBoundary>} />} />
        <Route path="/bill" element={<Protected compo={<ErrorBoundary><PaymentPage /></ErrorBoundary>} />} />
        <Route path="/dashboard" element={<Protected compo={<ErrorBoundary><Dashboard /></ErrorBoundary>} />} />
        <Route path="/installment" element={<Protected compo={<ErrorBoundary><InstallmentAccordion billNumber="" /></ErrorBoundary>} />} />


        <Route path="*" element={<p className="text-center mt-10 text-red-500">404 - Page Not Found</p>} />
      </Routes>
    </Suspense>

  </>
};

export default App;
