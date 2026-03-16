import { useState , useEffect } from "react";
import { useParams , useNavigate , useLocation} from "react-router-dom";
import {obtenerencuestaServices , guardarRespuestaService} from "../../services/user.dash.survey"
import "./AnswerSurvey.css"


export default function AnswerSurvey() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { state }    = useLocation();

  const [encuesta, setEncuesta]     = useState(state?.encuesta ?? null);
  const [loading, setLoading]       = useState(!state?.encuesta); 
  const [error, setError]           = useState(null);
  const [actual, setActual]         = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [enviado, setEnviado]       = useState(false);
  const usuarios_idLocal = Number(localStorage.getItem('usuario_id'))


  useEffect(() => {
    if (state?.encuesta) return;

    const cargar = async () => {
      try {
        const data = await obtenerencuestaServices(id);
        setEncuesta(data.encuesta);
      } catch {
        setError('No se pudo cargar la encuesta.');
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  if (loading) return <div className="answer-loading">Cargando encuesta...</div>;
  if (error)   return <div className="answer-error">{error}</div>;
  if (!encuesta) return <div className="answer-error">Encuesta no encontrada.</div>;

  const preguntas       = encuesta.estructura?.preguntas ?? [];
  const pregunta        = preguntas[actual];
  const total           = preguntas.length;
  const progreso        = Math.round(((actual + 1) / total) * 100);
  const respuestaActual = respuestas[pregunta?.id] ?? '';
  const tieneRespuesta  = respuestaActual !== '' && respuestaActual !== undefined;


  const guardarRespuesta = (valor) => {
    setRespuestas({ ...respuestas, [pregunta.id]: valor });
  };

  const handleSiguiente = () => {
    if (actual < total - 1) setActual(actual + 1);
    else handleEnviar();
  };

  const handleEnviar = async () => {
    try{
        console.log("Usuarios:" , usuarios_idLocal)
        const response  = await guardarRespuestaService({
            usuario_id: usuarios_idLocal,
            encuesta_id:id,
            respuesta:respuestas
        })  

        console.log('Status:', response.status);  
        console.log('Ok:', response.ok);  
        setEnviado(true); 
        console.log('Respuestas enviadas:', { encuesta_id: id, respuestas });
    }catch(err){
        console.error('Error al enviar:', err);
        setError(err?.message ?? 'Error al guardar la respuesta');
    }
  };

  if (enviado) {
    return (
      <div className="success-screen">
        <span className="success-icon">✅</span>
        <h2>¡Encuesta completada!</h2>
        <p>Gracias por responder <strong>{encuesta.titulo}</strong>.</p>
        <button className="btn-volver" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="answer-layout">

      {/* Panel izquierdo */}
      <div className="answer-main">
        <h1 className="answer-titulo">{encuesta.titulo}</h1>

        {/* Progreso */}
        <div className="progress-bar-wrapper">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progreso}%` }} />
          </div>
          <span className="progress-pct">{progreso}%</span>
        </div>

        {/* Pregunta */}
        <p className="question-label">Pregunta {actual + 1} / {total}</p>
        <p className="question-text">{pregunta.texto}</p>

        {/* Opción múltiple */}
        {pregunta.tipo === 'opcion_multiple' && (
          <div className="options-list">
            {pregunta.opciones.map((op, i) => (
              <button
                key={i}
                className={`option-btn ${respuestaActual === op ? 'selected' : ''}`}
                onClick={() => guardarRespuesta(op)}
              >
                {op}
              </button>
            ))}
          </div>
        )}

        {/* Sí / No */}
        {pregunta.tipo === 'si_no' && (
          <div className="options-list">
            {['Sí', 'No'].map(op => (
              <button
                key={op}
                className={`option-btn ${respuestaActual === op ? 'selected' : ''}`}
                onClick={() => guardarRespuesta(op)}
              >
                {op}
              </button>
            ))}
          </div>
        )}

        {/* Texto abierto */}
        {(pregunta.tipo === 'texto_abierto' || pregunta.tipo === 'abierta') && (
          <textarea
            className="open-textarea"
            placeholder="Escribe tu respuesta aquí..."
            value={respuestaActual}
            onChange={e => guardarRespuesta(e.target.value)}
          />
        )}

        {/* Navegación */}
        <div className="answer-nav">
          {actual > 0 && (
            <button className="btn-prev" onClick={() => setActual(actual - 1)}>
              Anterior
            </button>
          )}
          <button
            className="btn-next"
            onClick={handleSiguiente}
            disabled={!tieneRespuesta}
          >
            {actual === total - 1 ? 'Enviar' : 'Siguiente'}
          </button>
        </div>
      </div>

      {/* Sidebar derecho */}
      <div className="answer-sidebar">
        <p className="sidebar-title">Preguntas</p>
        {preguntas.map((p, i) => {
          const respondida = respuestas[p.id] !== undefined && respuestas[p.id] !== '';
          const esCurrent  = i === actual;

          return (
            <div
              key={p.id}
              className={`sidebar-item ${esCurrent ? 'current' : respondida ? 'respondida' : 'sin-resp'}`}
              onClick={() => setActual(i)}
            >
              <div className={`sidebar-icon ${esCurrent ? 'curr' : respondida ? 'ok' : 'pend'}`}>
                {respondida && !esCurrent ? '✓' : i + 1}
              </div>
              Pregunta {i + 1}
            </div>
          );
        })}
      </div>

    </div>
  );
}