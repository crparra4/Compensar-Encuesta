
import { useState } from "react"
import './CreateSurvey.css';
import {  useLocation  } from "react-router-dom";
import {crearEncuestaService} from "../../services/admin.dash.create"


const PreguntasVacias = () => ({
    id: Date.now(),
    texto: '',
    tipo: 'abierta',
    opciones: []
})


export default function Create() {
    const {state} = useLocation();
    const user = state?.user || {};

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [preguntas, setPreguntas] = useState([PreguntasVacias()]);
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    //* Funcionar para manejo de preguntas 

    const agregarPregunta = () =>{
        setPreguntas([...preguntas, PreguntasVacias()]);
    }

    const eliminarPregunta = (id) => {
        setPreguntas(preguntas.filter(p => p.id !== id));
    }

    const actualizarPregunta = (id, campo, valor) => {
        setPreguntas(preguntas.map(p => p.id === id ? {...p, [campo]: valor} : p));
    }

    //*Funcion para manejo de opciones multiples 

    const agregarOpcion = (id) => {
        setPreguntas(preguntas.map(p =>
            p.id === id ? { ...p, opciones: [...p.opciones, ''] } : p
        ));
    };

    const actualizarOpcion = (preguntaId, index, valor) => {
        setPreguntas(preguntas.map(p => {
            if (p.id !== preguntaId) return p;
            const nuevas = [...p.opciones];
            nuevas[index] = valor;
            return { ...p, opciones: nuevas };
        }));
    };

    const eliminarOpcion = (preguntasID , index) => {
        setPreguntas(preguntas.map(p => {
            if(p.id !== preguntasID) return p;
            return {...p , opciones: p.opciones.filter((_, i) => i !== index)};
        }))
    }

    //* Funcion para manejo de envio de encuesta
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        setMensaje(null);

        try{
            await crearEncuestaService({titulo, descripcion, estructura: {preguntas}, usuario_id:user});

            setMensaje({ tipo: 'success', texto: 'Encuesta creada exitosamente!' });
            setTitulo('');
            setDescripcion('');
            setPreguntas([PreguntasVacias()]);
        }catch(error){
            setMensaje({ tipo: 'error', texto: 'Error al crear la encuesta. Intenta nuevamente.' });
        }finally{
            setLoading(false);
        }
    }

    return (
        <div className="create-wrapper">
            <header className="create-header">
                <div className="title-section">
                    <span className="badge">Nueva Encuesta</span>
                    <h1>Diseña tu experiencia</h1>
                    <div className="accent-line"></div>
                </div>
            </header>

            {mensaje && (
                <div className={`status-banner ${mensaje.tipo}`}>
                    {mensaje.texto}
                </div>
            )}

            <form className="glass-form" onSubmit={handleSubmit}>
                <section className="form-main-info">
                    <input
                        className="input-minimal title-input"
                        placeholder="Dale un nombre a tu encuesta..."
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                        required
                    />
                    <textarea
                        className="input-minimal desc-input"
                        placeholder="Agrega una descripción breve o instrucciones"
                        value={descripcion}
                        onChange={e => setDescripcion(e.target.value)}
                    />
                </section>

                <div className="questions-feed">
                    {preguntas.map((p, index) => (
                        <div key={p.id} className="modern-card">
                            <div className="card-indicator">{index + 1}</div>
                            
                            <div className="card-body">
                                <div className="card-row">
                                    <input
                                        className="input-card-title"
                                        placeholder="Pregunta sin título"
                                        value={p.texto}
                                        onChange={e => actualizarPregunta(p.id, 'texto', e.target.value)}
                                        required
                                    />
                                    <select
                                        className="select-minimal"
                                        value={p.tipo}
                                        onChange={e => actualizarPregunta(p.id, 'tipo', e.target.value)}
                                    >
                                        <option value="texto_abierto">Texto abierto</option>
                                        <option value="si_no">Sí / No</option>
                                        <option value="opcion_multiple">Opción múltiple</option>
                                    </select>
                                </div>

                                {p.tipo === 'opcion_multiple' && (
                                    <div className="options-zone">
                                        {p.opciones.map((op, i) => (
                                            <div key={i} className="option-item">
                                                <div className="bullet"></div>
                                                <input
                                                    className="input-option"
                                                    placeholder={`Opción ${i + 1}`}
                                                    value={op}
                                                    onChange={e => actualizarOpcion(p.id, i, e.target.value)}
                                                />
                                                <button type="button" className="btn-icon-del" onClick={() => eliminarOpcion(p.id, i)}>×</button>
                                            </div>
                                        ))}
                                        <button type="button" className="btn-add-opt" onClick={() => agregarOpcion(p.id)}>
                                            <span>+</span> Añadir otra opción
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="card-actions">
                                {preguntas.length > 1 && (
                                    <button type="button" className="action-del" onClick={() => eliminarPregunta(p.id)}>
                                        Quitar pregunta
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="form-footer">
                    <button type="button" className="btn-secondary-modern" onClick={agregarPregunta}>
                        Añadir Pregunta
                    </button>
                    <button type="submit" className="btn-primary-modern" disabled={loading}>
                        {loading ? 'Publicando...' : 'Finalizar y Crear'}
                    </button>
                </div>
            </form>
        </div>
    );
}

