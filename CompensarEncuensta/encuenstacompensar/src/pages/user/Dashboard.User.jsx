import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './Dashboard.user.css';
import { listaEncuestasServiceUser } from '../../services/user.dash.survey';

export default function DashboardUser() {
  const [encuestas, setEncuestas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();
  const usuario = localStorage.getItem('usuario_id')

  useEffect(() => {
    cargarEncuesta();
  }, []);

  const formatDate = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  const contarpreguntas = (estructura) => {
    return estructura?.preguntas?.length ?? 0;
  };

  const cargarEncuesta = async () => {
    setLoading(true);
    seterror(null);
    try {
      const data = await listaEncuestasServiceUser();
      setEncuestas(data.encuestas);
    } catch (error) {
      seterror('No pudieron cargar las encuestas');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* user-dashboard-root: scoping wrapper
       dashboard-layout: flex column que ocupa min-height 100vh */
    <div className="user-dashboard-root">
      <div className="dashboard-layout">

        <Header activeNav="Home" />

        <section className="dashboard-section">
          <h2>Encuestas disponibles</h2>
          <p className="section-sub">Selecciona una encuesta para responderla</p>

          {loading && <p className="user-loading">Cargando encuestas...</p>}
          {error   && <p className="user-error">{error}</p>}

          {!loading && encuestas.length === 0 && (
            <p className="user-empty">No hay encuestas disponibles por ahora.</p>
          )}

          {!loading && encuestas.length > 0 && (
            <div className="user-surveys-grid">
              {encuestas.map(encuesta => (
                <div key={encuesta.id} className="user-survey-card">
                  <h3>{encuesta.titulo}</h3>

                  {encuesta.descripcion && (
                    <p>{encuesta.descripcion}</p>
                  )}

                  <div className="user-card-meta">
                    <span>📋 {contarpreguntas(encuesta.estructura)} preguntas</span>
                    <span>📅 {formatDate(encuesta.creado_en)}</span>
                  </div>

                  <button
                    className="btn-responder"
                    onClick={() => navigate(`/encuesta/${encuesta.id}`, { state: { encuesta } })}
                  >
                    Responder encuesta
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}