import './App.css'
import {Navigate, Route, Routes} from "react-router";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar.tsx";
import HomePage from "./pages/Home/HomePage.tsx";
import Auth from "./components/Auth/Auth.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import {useAuthStore} from "./store/useAuthStore.ts";
import MyPage from "./pages/MyPage/MyPage.tsx";
import Analytics from "./pages/Analytics/Analytics.tsx";
import {useEffect} from "react";

function App() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const verifyUser = useAuthStore(state => state.verify);

    useEffect(() => {
        verifyUser();
    }, []);

  return (
    <main>
      {!isAuthenticated && (
          <Navbar />
      )}
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to={'/dashboard'}/> : <Auth />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to={'/dashboard'}/> : <Auth />} />
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} >
              <Route path=":userId" element={<MyPage />} />
              <Route path="analytics" element={<Analytics />} />
          </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App
