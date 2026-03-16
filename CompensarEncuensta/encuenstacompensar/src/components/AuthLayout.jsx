import './AuthLayout.css';
import personaje from '../assets/ImagenPersonajeC.png'; 
import { useNavigate ,  useLocation , Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="auth-container">
      
      {/* Columna Izquierda */}
      <div className="auth-left">
        <img 
          src="https://cms.amerins.com/uploads/compensar_8d5a969eb2.png" 
          alt="Logo Compensar" 
          className="auth-logo" 
        />
        
        <div className="auth-text-content">
          <h1 className="auth-title">Bienvenido</h1>
          <p className="auth-subtitle">Ingresa y disfruta</p>
          <p className="auth-register-text">
            {isRegisterPage 
          ? "¿Ya tienes una cuenta? " 
          : "Si aún no tienes una cuenta puedes "}
            <span 
            className="auth-register-link">
              <Link 
              to={isRegisterPage ? "/login" : "/register"} 
              className="auth-register-link"
            ></Link>
              {isRegisterPage
                ? "Inicia Sesión aqui!" 
                : "Registrarte aqui!"}
            </span>
          </p>
        </div>

        <div className="auth-image-container">
          <img 
            src={personaje}
            alt="Ilustración personaje" 
            className="auth-illustration" 
          />
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="auth-right">
        {children}
      </div>

    </div>
  )
}