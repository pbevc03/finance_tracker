import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../features/pages/login_page"
import Dashboard from "../features/pages/dashboard";
import TransactionsPage from "../features/pages/transaction_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/transactions' element={<TransactionsPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;