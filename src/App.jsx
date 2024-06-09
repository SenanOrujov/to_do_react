import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Index from "./Pages/Index";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
