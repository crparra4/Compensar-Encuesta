import { Routes, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import DashboardAdmin from "./pages/admin/Dashboard.Admin"
import DashboardUser from "./pages/user/Dashboard.User"
import Create from "./pages/admin/Create"
import Surveys from "./pages/admin/Surveys"
import AnswerSurvey from "./pages/user/AnswerSurvey"


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* RUTAS DEFINIDAS DE AUTH */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* RUTAS DEFINIDAS DE USUARIOS */}
      <Route path="/dashboard-user" element={<DashboardUser />} >
      </Route>
      <Route path="/encuesta/:id" element={<AnswerSurvey />} />   

      {/* RUTAS DEFINIDAS DE ADMINISTRADORES */}
      <Route path="/dashboard-admin" element={<DashboardAdmin />} >
        <Route path="create-survey" element={<Create />} />
        <Route path="surveys" element={<Surveys />} />
      </Route>
    </Routes>
  )
}

export default App