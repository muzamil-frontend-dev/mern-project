import { configureStore } from "@reduxjs/toolkit";
import productListSlice from "./products/productList";
import productDetailSlice from "./products/productDetail";
import cartSlice from "./cart/cartSlice";
import loginSlice from "./auth/loginSlice";
import registerSlice from "./auth/registerSlice";
import orderCreateSlice from "./order/orderCreateSlice";
import orderDetailSlice from "./order/orderDetailSlice";
import orderPaySlice from "./order/orderPaySlice";
import adminProductListSlice from "./admin/products/adminProductListSlice";
import adminCreateProductSlice from "./admin/products/adminCreateProductSlice";
import adminProductDetailSlice from "./admin/products/adminProductDetailSlice";
import adminOrdersListSlice from "./admin/orders/adminOrderList";
import adminUsersListSlice from "./admin/users/adminUsersList";
import updateProfileSlice from "./auth/updateProfile";
import ordersListSlice from "./order/ordersListSlice";
import adminOrderDeliverSlice from "./admin/orders/adminDeliverOrder";
import adminDeleteProductSlice from "./admin/products/adminDeleteProductSlice";
import makeAdminUserSlice from "./admin/users/makeAdminUser";
import adminDashboardSlice from "./admin/adminDashboard";

const store = configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    cart: cartSlice,
    login: loginSlice,
    register: registerSlice,
    updateProfile: updateProfileSlice,
    ordersList: ordersListSlice,
    orderCreate: orderCreateSlice,
    orderDetail: orderDetailSlice,
    orderPay: orderPaySlice,
    adminDashboard: adminDashboardSlice,
    adminProductsList: adminProductListSlice,
    adminCreateProduct: adminCreateProductSlice,
    adminProductDetail: adminProductDetailSlice,
    adminDeleteProduct: adminDeleteProductSlice,
    adminOrdersList: adminOrdersListSlice,
    adminOrderDeliver: adminOrderDeliverSlice,
    adminUsersList: adminUsersListSlice,
    makeAdminUser: makeAdminUserSlice,
  },
});

export default store;
