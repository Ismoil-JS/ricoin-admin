import { Routes, Route } from "react-router-dom"
import  Dashboard  from "./pages/dashboard/Dashboard"
import  Auth  from "./pages/auth/Auth";
import User from "./pages/dashboard/user/User";
import Event from "./pages/dashboard/event/Event";
import Orders from "./pages/dashboard/orders/Orders";
import Product from "./pages/dashboard/product/Product";
import PendingOrders from "./pages/dashboard/orders/pending/PendingOrders";
import FinishedOrders from "./pages/dashboard/orders/finished/FinishedOrders";
import CreateProduct from "./pages/dashboard/product/create/CreateProduct";
import PatchProduct from "./pages/dashboard/product/patch/PatchProduct";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/event" element={<Event />}></ Route>
          <Route path="/dashboard/orders" element={<Orders />}>
            <Route path="/dashboard/orders/pending" element={<PendingOrders />}></ Route>  
            <Route path="/dashboard/orders/finished" element={<FinishedOrders />}></ Route>  
          </ Route>
          <Route path="/dashboard/product" element={<Product />}>
            <Route path="/dashboard/product/create" element={<CreateProduct />}></ Route>
            <Route path="/dashboard/product/change" element={<PatchProduct />}></ Route>
          </ Route>
          <Route path="/dashboard/user" element={<User />}></ Route>
        </ Route>
      </Routes>
    </>
  );
}

export default App;
