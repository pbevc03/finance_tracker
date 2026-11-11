import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import LoginPage from "../features/pages/login_page"
// import Dashboard from "../features/pages/dashboard";
import TransactionsPage from "../features/pages/transaction_page";
import AppLayout from "../layouts/appLayout";
import ComingSoonPage from "../features/pages/comingSoon_page";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route element={<AppLayout />}>
            <Route path='/dashboard' element={<ComingSoonPage title='Dashboard' />}/>
            <Route path='/transactions' element={<TransactionsPage />}/>
            <Route path='/bills' element={<ComingSoonPage title='Bills' />}/>
            <Route path='/budget' element={<ComingSoonPage title='Budget' />}/>
            <Route path='/statistics' element={<ComingSoonPage title='Statistics' />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )

}

export default App;