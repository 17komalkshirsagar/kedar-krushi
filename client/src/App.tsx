


import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import SessionExpiredModal from './components/ui/SessionExpiredModal';
import Protected from './components/ui/Protected';
import ErrorBoundary from './components/ui/ErrorBoundary';
import SuspenseWrapper from './components/ui/SuspenseWrapper';
import Layout from './pages/layout/Layout';
import AdminLayout from './pages/AdminLayout/AdminLayout';
import NotFoundPage from './pages/notification/NotFoundPage';
import LogoutPage from './auth/login/LogoutPage';




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
const Home = lazy(() => import('./pages/home/Home'));
const Contact = lazy(() => import('./pages/home/Contact'));
const About = lazy(() => import('./pages/home/About'));
const ProductDetail = lazy(() => import('./pages/home/ProductDetail'));
const Products = lazy(() => import('./pages/home/Products'));
const Reviews = lazy(() => import('./pages/home/Reviews'));


const withWrapper = (component: JSX.Element) => (
  <Protected compo={
    <ErrorBoundary>
      <SuspenseWrapper>
        {component}
      </SuspenseWrapper>
    </ErrorBoundary>
  } />
);

const App = () => {
  return (
    <>

      <SessionExpiredModal />
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<SuspenseWrapper><Home /></SuspenseWrapper>} />
          <Route path="contact" element={<SuspenseWrapper><Contact /></SuspenseWrapper>} />
          <Route path="about" element={<SuspenseWrapper><About /></SuspenseWrapper>} />
          <Route path="products/:id" element={<SuspenseWrapper><ProductDetail /></SuspenseWrapper>} />
          <Route path="products" element={<SuspenseWrapper><Products /></SuspenseWrapper>} />
          <Route path="reviews" element={<SuspenseWrapper><Reviews /></SuspenseWrapper>} />
        </Route>

        <Route path="/login" element={<SuspenseWrapper><LoginPage /></SuspenseWrapper>} />
        <Route path="/register" element={<SuspenseWrapper><RegisterPage /></SuspenseWrapper>} />
        <Route path="/send-otp" element={<SuspenseWrapper><SendOtpPage /></SuspenseWrapper>} />
        <Route path="/forgot-password" element={<SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>} />
        <Route path="/reset-password" element={<SuspenseWrapper><ResetPasswordPage /></SuspenseWrapper>} />
        <Route path="/logout" element={<SuspenseWrapper><LogoutPage /></SuspenseWrapper>} />


        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={withWrapper(<Dashboard />)} />
          <Route path="company" element={withWrapper(<CompanyPage />)} />
          <Route path="company/:id" element={withWrapper(<CompanyPage />)} />
          <Route path="company/table" element={withWrapper(<CompanyTable />)} />

          <Route path="customer" element={withWrapper(<CustomerPage />)} />
          <Route path="customer/:id" element={withWrapper(<CustomerPage />)} />
          <Route path="customer/table" element={withWrapper(<CustomerTable />)} />
          <Route path="customer/history/:customerId" element={withWrapper(<CustomerHistory customerId="" />)} />

          <Route path="supplier" element={withWrapper(<SupplierPage />)} />
          <Route path="supplier/:id" element={withWrapper(<SupplierPage />)} />
          <Route path="supplier/table" element={withWrapper(<SupplierTable />)} />

          <Route path="product" element={withWrapper(<ProductPage />)} />
          <Route path="product/:id" element={withWrapper(<ProductPage />)} />
          <Route path="product/table" element={withWrapper(<ProductTable />)} />

          <Route path="delivery" element={withWrapper(<DeliveryPage />)} />
          <Route path="delivery/table" element={withWrapper(<DeliveryTable />)} />

          <Route path="employee" element={withWrapper(<EmployeePage />)} />
          <Route path="employee/:id" element={withWrapper(<EmployeePage />)} />
          <Route path="employee/table" element={withWrapper(<EmployeeTable />)} />

          <Route path="notification-page" element={withWrapper(<NotificationPage />)} />
          <Route path="bill" element={withWrapper(<PaymentPage />)} />
          <Route path="installment" element={withWrapper(<InstallmentAccordion billNumber="" />)} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFoundPage />} />      </Routes>

    </>
  );
};

export default App;
