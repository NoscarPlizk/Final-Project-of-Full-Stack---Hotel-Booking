import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookedList } from "./content/hotelContent"; 
import { useLocation } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ViewHotel from "./pages/ViewHotel";
import UserPage from "./pages/UserPage";
import Payment from "./pages/payments/Payment";
import AllBookedList from "./pages/AllBookedList";

function AppRoute() {
  const { state } = useLocation();
  let token = state?.token; // from AuthPages.jsx
  
  return (
    <BookedList.Provider value={{ token }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/userauth" element={<AuthPages />} />
          <Route path="/viewhotel" element={<ViewHotel />} />
          <Route path="/userpage" element={<UserPage />} />
          <Route path="/allbookedlist" element={<AllBookedList />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </BookedList.Provider>
  );
}

export default function App() {
  const [ booked, setBooked ] = useLocalStorage('data', []);
  
  return (
    <BookedList.Provider value={{ booked, setBooked }}>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </BookedList.Provider>
  );
}