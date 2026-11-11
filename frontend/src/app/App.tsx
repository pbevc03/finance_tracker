import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import LoginPage from "../features/pages/login_page"
import Dashboard from "../features/pages/dashboard";
import TransactionsPage from "../features/pages/transaction_page";
import SidebarMenuPreview from "../features/pages/sidebarMenuPreview";
import AppLayout from "../layouts/appLayout";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/sidebarPreview' element={<SidebarMenuPreview />} />

          <Route element={<AppLayout />}>
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/transactions' element={<TransactionsPage />}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )

}

export default App;