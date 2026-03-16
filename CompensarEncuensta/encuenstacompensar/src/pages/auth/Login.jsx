import AuthLayout from "../../components/AuthLayout"
import { useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import {loginService} from '../../services/auth.services'
import {showAlert} from "../../services/alerts"
import '../../components/AuthLayout'; 

export default function Login() {
   const navigate = useNavigate();
   const [identification, setIdentification] = useState('');
   const [password, setPassword] = useState('');

    const handleSubmit = async(e) =>{
      e.preventDefault(); 

      if(!identification || !password){
        showAlert('Campos Incompletos', 'Por favor ingrese su usuario y contraseña', 'warning');
        return;
      }
      
      try{
          const result = await loginService(identification, password);
          showAlert('¡Bienvenido!', 'Inicio de sesión correcto', 'success');
          console.log("Usuario autenticado:", result);

          
          if(result.rol === 'admin'){
            localStorage.setItem('usuario_id' ,  result.user_id)
            navigate('/dashboard-admin', {state: {user: result.user_id}});
          }else{
            localStorage.setItem('usuario_id' , result.user_id)
            navigate('/dashboard-user' , {state :  {user : result.user_id}});
          }

      }catch(error){
        showAlert('Error de autenticación', error.message, 'error');
      }finally{
        setIdentification('');
        setPassword('');
      }
    }


  return (
    <AuthLayout>
      <div className="login-form-container">
        
        <h2 className="login-title">Iniciar sesión</h2>

        <form className="login-form">
          
          <div className="input-group">
            <input
              type="text"
              placeholder="Email o nombre de usuario"
              className="login-input"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
          </div>

          <div className="input-group password-group">
            <input
              type="password"
              placeholder="Contraseña"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="password-icon">👁️‍🗨️</span> 
          </div>

          <div className="forgot-password-container">
            <span className="forgot-password-link">Olvide mi contraseña</span>
          </div>

          <button type="button" className="login-submit-btn" onClick={handleSubmit}>
            Iniciar sesión
          </button>

          <div className="divider">
            <span className="divider-line"></span>
            <span className="divider-text">o continúa con</span>
            <span className="divider-line"></span>
          </div>

            <div className="social-login">
                <button type="button" className="social-btn">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    alt="Facebook"
                    />
                </button>

                <button type="button" className="social-btn">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/0/747.png"
                    alt="Apple"
                    />
                </button>

                <button type="button" className="social-btn">
                    <img 
                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                    alt="Google"
                    />
                </button>
            </div>

        </form>

      </div>
    </AuthLayout>
  )
}