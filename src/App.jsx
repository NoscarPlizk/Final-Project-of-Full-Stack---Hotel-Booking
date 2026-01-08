import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookedList } from "./content/hotelContent"; 
import useLocalStorage from "use-local-storage";
import AuthPages from "./pages/AuthPages";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import ViewHotel from "./pages/ViewHotel";
import UserPage from "./pages/UserPage";
import Payment from "./pages/payments/Payment";
import AllBookedList from "./pages/AllBookedList";

export default function App() {
  const [ token, setToken ] = useLocalStorage('token', '');
  const [ booked, setBooked ] = useLocalStorage('data', []);
  
  return (
    <BookedList.Provider value={{ token, setToken, booked, setBooked }}>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="userauth" element={<AuthPages />} />
              <Route path="viewhotel" element={<ViewHotel />} />
              <Route path="userpage" element={<UserPage />} />
              <Route path="allbookedlist" element={<AllBookedList />} />
              <Route path="payment" element={<Payment />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </BookedList.Provider>
  );
}