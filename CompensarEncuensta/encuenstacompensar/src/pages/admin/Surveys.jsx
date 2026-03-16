import { useState, useEffect } from 'react';
import {  useLocation  } from "react-router-dom";
import { listaEncuestasService  , eliminarEncuestaService} from '../../services/admin.dash.survey';
import SurveyDetail from './SurveyDetail.jsx';
import './Surveys.css';

export default function Surveys() {
    const {state} = useLocation();
    const user = state?.user || {};
    const [encuestas, setEncuestas] = useState([]);
    const [encuestaSeleccionado , setencuestaSeleccionado] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error , seterror] = useState(null);

    useEffect(() => {
        cargarEncuesta();
    }, []);


    
    const cargarEncuesta = async () => {
        setLoading(true);   
        seterror(null);
        console.log("Cargando encuestas para usuario ID:", user);
        try{
            const data = await listaEncuestasService(user);
            setEncuestas(data.encuestas);
        } catch (error) {
            seterror("No puedieron cargar las encuestas");
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async(id) => {
        if(!confirm('¿seguro que deseas eliminar encuesta?'))return;
        try{
            console.log("Esta es la id encuesta:" , id)
            await eliminarEncuestaService(id);
            setEncuestas(encuestas.filter(e=>e.id !== id))
        }catch{
            seterror('No se pudo eliminar la encuesta.')
        }
    }

    const formatDate = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    const contarpreguntas = (estructura) => {
        return estructura?.preguntas?.length ?? 0;
    }

    return (
        <div className="surveys-wrapper">
            <div className="surveys-header">
                <div>
                    <h1>Tus Encuestas</h1>
                    <p>Gestiona y analiza los datos recopilados en tiempo real.</p>
                </div>
                {/* Elemento decorativo futurista */}
                <div className="header-glow"></div>
            </div>

            {error && <div className="error-banner">{error}</div>}

            {loading && (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Sincronizando datos...</p>
                </div>
            )}

            {!loading && encuestas.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📭</div>
                    <p>No hay encuestas creadas aún.</p>
                    <span className="empty-subtext">Crea tu primera encuesta para empezar a recolectar datos.</span>
                </div>
            )}

            {!loading && encuestas.length > 0 && (
                <div className="surveys-grid">
                    {encuestas.map((encuesta, index) => (
                        <div 
                            key={encuesta.id} 
                            className="survey-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="card-top">
                                <h3 className="survey-title">{encuesta.titulo}</h3>
                                <span className={encuesta.activa ? 'badge badge-activa' : 'badge badge-inactiva'}>
                                    <span className="status-dot"></span>
                                    {encuesta.activa ? 'Activa' : 'Inactiva'}
                                </span>
                            </div>

                            <p className="survey-desc">
                                {encuesta.descripcion || "Sin descripción proporcionada para esta encuesta."}
                            </p>

                            <div className="survey-meta">
                                <div className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                    <span>{contarpreguntas(encuesta.estructura)} Preguntas</span>
                                </div>
                                <div className="meta-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                    <span>{formatDate(encuesta.creado_en)}</span>
                                </div>
                            </div>

                            <div className="card-actions">
                                <button className="btn-action btn-detail" onClick={() => setencuestaSeleccionado(encuesta)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    Detalle
                                </button>
                                <button className="btn-action btn-edit" onClick={() => alert(`Editar: ${encuesta.id}`)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                    Editar
                                </button>
                                <button className="btn-action btn-delete" onClick={() => handleEliminar(encuesta.id)}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {encuestaSeleccionado && (
                <SurveyDetail
                    encuesta={encuestaSeleccionado}
                    onClose={() => setencuestaSeleccionado(null)} 
                />
            )}
        </div>
    );
    
}