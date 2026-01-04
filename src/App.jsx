import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ViewHotel from "./pages/ViewHotel";
import UserPage from "./pages/UserPage";
import Payment from "./pages/Payment";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userauth" element={<AuthPages />} />
          <Route path="/viewhotel" element={<ViewHotel />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}