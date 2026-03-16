import './SurveyDetail.css';

const TIPO_LABEL = {
    texto_abierto:    { label: 'Texto abierto', icon: '📝', clase: 'tipo-abierta' },
    abierta:          { label: 'Texto abierto', icon: '📝', clase: 'tipo-abierta' },
    si_no:            { label: 'Sí / No',       icon: '⚖️', clase: 'tipo-sino' },
    opcion_multiple:  { label: 'Múltiple',      icon: '✅', clase: 'tipo-multiple' },
};

export default function SurveyDetail({ encuesta, onClose }) {
    if (!encuesta) return null;

    const preguntas = encuesta.estructura?.preguntas ?? [];

   
    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-box">
                
               
                <div className="modal-header">
                    <div className="modal-header-info">
                        <span className="modal-badge-status">
                            <span className="status-dot"></span>
                            Vista Previa de Estructura
                        </span>
                        <h2>{encuesta.titulo}</h2>
                        <p>{encuesta.descripcion || "No hay descripción disponible."}</p>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

           
                <div className="modal-body">
                    <div className="modal-stats">
                        <div className="stat-pill">
                            <span className="stat-icon">📋</span>
                            <strong>{preguntas.length}</strong> {preguntas.length === 1 ? 'pregunta' : 'preguntas'}
                        </div>
                    </div>

                    <div className="questions-container">
                        {preguntas.map((p, index) => {
                            const tipo = TIPO_LABEL[p.tipo] ?? { label: p.tipo, icon: '❓', clase: 'tipo-abierta' };

                            return (
                                <div key={p.id ?? index} className="detail-question-card">
                                    <div className="detail-question-top">
                                        <div className="question-number">
                                            <span>{index + 1}</span>
                                        </div>
                                        <div className="question-content">
                                            <span className={`detail-question-tipo ${tipo.clase}`}>
                                                <span className="tipo-icon">{tipo.icon}</span> {tipo.label}
                                            </span>
                                            <p className="detail-question-text">{p.texto}</p>
                                        </div>
                                    </div>

                                    <div className="detail-question-answer-zone">
                                       
                                        {p.tipo === 'opcion_multiple' && p.opciones?.length > 0 && (
                                            <div className="detail-options">
                                                {p.opciones.map((op, i) => (
                                                    <div key={i} className="detail-option-item">
                                                        <div className="detail-option-radio"></div>
                                                        <span>{op}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                      
                                        {p.tipo === 'si_no' && (
                                            <div className="sino-options">
                                                <div className="sino-pill sino-yes">
                                                    <span className="sino-check">✓</span> Sí
                                                </div>
                                                <div className="sino-pill sino-no">
                                                    <span className="sino-cross">✕</span> No
                                                </div>
                                            </div>
                                        )}

                                    
                                        {(p.tipo === 'texto_abierto' || p.tipo === 'abierta') && (
                                            <div className="text-area-preview">
                                                <span>El usuario escribirá su respuesta aquí...</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

               
                <div className="modal-footer">
                    <button className="btn-close-bottom" onClick={onClose}>Cerrar vista previa</button>
                </div>
            </div>
        </div>
    );
}