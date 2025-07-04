import { configureStore } from "@reduxjs/toolkit";
import { companyApi } from "./apis/company.api";
import authSlice from "./slices/auth.slice"
import { paymentApi } from "./apis/payment.api";
import { supplierApi } from "./apis/supplier.api";
import { notificationLogApi } from "./apis/notificationLog.api";
import { employeeApi } from "./apis/employee.api";
import { deliveryApi } from "./apis/delivery.api";
import { customerApi } from "./apis/customer.api";
import { productApi } from "./apis/product.api";
import { authApi } from "./apis/auth.api";
import { batchApi } from "./apis/batch.api";
import { paymentInstallmentApi } from "./apis/paymentInstallment.api";





const reduxStore = configureStore({
  reducer: {
    [companyApi.reducerPath]: companyApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [supplierApi.reducerPath]: supplierApi.reducer,
    [notificationLogApi.reducerPath]: notificationLogApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [deliveryApi.reducerPath]: deliveryApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [batchApi.reducerPath]: batchApi.reducer,
    [paymentInstallmentApi.reducerPath]: paymentInstallmentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,

    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      notificationLogApi.middleware,
      employeeApi.middleware,
      deliveryApi.middleware,
      customerApi.middleware,
      paymentInstallmentApi.middleware,
      batchApi.middleware,
      productApi.middleware,
      supplierApi.middleware,
      paymentApi.middleware,
      companyApi.middleware,
      authApi.middleware,
    )
})


export type RootState = ReturnType<typeof reduxStore.getState>
export type AppDispatch = typeof reduxStore.dispatch

export default reduxStore

