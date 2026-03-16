import React from 'react';
import { useNavigate, Outlet, Link , useLocation  } from "react-router-dom";
import './Dashboard.css'; 

export default function DashboardAdmin() {
    const navigate = useNavigate(); 
    const {state} = useLocation();
    const user = state?.user || {};

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/dashboard-admin/create-survey' , {state: {user}});
        console.log("Navegando a crear encuesta...", user);
    };

    return (
        <div className="dashboard-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="logo-badge">
                        <img 
                            src="https://cms.amerins.com/uploads/compensar_8d5a969eb2.png" 
                            alt="Logo Compensar" 
                            className="brand-logo"
                        />
                    </div>
                </div>

                <div className="sidebar-content">
                    <button className="btn-create" onClick={handleSubmit}>
                        Crear nueva encuesta
                    </button>

                    <nav className="nav-menu">
                        <Link to="/dashboard-admin/seleccionar" className="nav-link">
                            <span className="icon">📋</span>
                            Seleccionar encuesta
                        </Link>
                        <div className="nav-link" onClick={() => navigate('/dashboard-admin/surveys', {state: {user}})}>
                            <span className="icon">📁</span>
                            Mis encuestas
                        </div>
                        <Link to="/dashboard-admin/plantillas" className="nav-link">
                            <span className="icon">📄</span>
                            Plantillas base
                        </Link>
                        <Link to="/dashboard-admin/analiticas" className="nav-link">
                            <span className="icon">📊</span>
                            Métricas y resultados
                        </Link>
                        <Link to="/dashboard-admin/configuracion" className="nav-link">
                            <span className="icon">⚙️</span>
                            Configuración
                        </Link>
                    </nav>

    
                    <div className="sidebar-footer">
                        <p className="footer-title">DETALLES DE CUOTA</p>
                        <div className="quota-info">
                            <span className="quota-label">Respuestas mensuales</span>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{ width: '65%' }}></div>
                            </div>
                            <span className="quota-text">6.500 de 10.000 usadas</span>
                        </div>
                        <a href="#upgrade" className="upgrade-link">Ampliar plan ↗</a>
                    </div>
                </div>
            </aside>


            <main className="main-content">
                <header className="main-header">
                    <h1>Dashboard de Administrador</h1>
                    <p>Bienvenido a tu panel de control. Aquí podrás gestionar tus encuestas, ver resultados y más.</p>
                </header>
                
   
                <div className="outlet-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}