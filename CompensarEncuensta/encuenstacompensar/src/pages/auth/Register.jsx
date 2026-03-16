import AuthLayout from "../../components/AuthLayout"
import React, { useState  , useMemo } from 'react'
import { useNavigate } from "react-router-dom"
import '../../components/AuthLayout'; 
import {registerService} from '../../services/auth.services'
import {showAlert} from "../../services/alerts"
import {checkPasswordStrength} from "../../services/auth.services"



export default function Register() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const strength = useMemo(() => checkPasswordStrength(password), [password]);

    const getStrengthDetails = () => {
    if (password.length === 0) return { color: '#e0e0e0', label: '', width: '0%' };
    if (strength <= 1) return { color: '#ff4d4d', label: 'Débil', width: '25%' };
    if (strength === 2) return { color: '#ffd11a', label: 'Media', width: '50%' };
    if (strength === 3) return { color: '#26de81', label: 'Fuerte', width: '75%' };
    return { color: '#0fb9b1', label: 'Muy Segura', width: '100%' };
    };

    const {color ,label , width} = getStrengthDetails();


    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(!email || !username || !phone || !password || !confirmPassword){
            showAlert('Campos Incompletos', 'Por favor complete todos los campos', 'warning');
            return;
        }

        if(phone.length < 10){
            showAlert('Número de teléfono inválido', 'Por favor ingrese un número de teléfono válido', 'warning');
            return;
        }

        if(password !== confirmPassword){
            showAlert('Error de Contraseña', 'Las contraseñas no coinciden', 'error');
            return;
        }

        if(strength < 2){
            showAlert('Contraseña Débil', 'Por favor elija una contraseña más segura', 'warning');
            return;
        }


        try{
            const result = await registerService(email, username, phone, password);
            showAlert('¡Registro exitoso!', 'Tu cuenta ha sido creada', 'success');
            navigate('/login');
        }catch(error){
            showAlert('Error de registro', error.message, 'error');
        }finally{
            setEmail('');
            setUsername('');
            setPhone('');
            setPassword('');
            setConfirmPassword('');
        }
    }


    return (
        <AuthLayout>
            <div className="login-form-container">
                <h2 className="login-title">Registrarse</h2>
               
                <form className="login-form">
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nombre de Usuario"
                            className="login-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="number"
                            placeholder="Numero Celular"
                            className="login-input"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        <div style={{ height: '5px', width: '100%', backgroundColor: '#e0e0e0', marginTop: '5px', borderRadius: '5px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: width, backgroundColor: color, transition: 'width 0.3s ease' }}></div>
                        </div>
                    </div>

                    <div className="input-group password-group">
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            className="login-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span className="password-icon">👁️‍🗨️</span> 
                    </div>

                     <div className="forgot-password-container">
                        <span className="forgot-password-link">Olvide mi contraseña</span>
                    </div>

                    <button type="button" className="login-submit-btn"  onClick={handleSubmit}>
                        Registrarse
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