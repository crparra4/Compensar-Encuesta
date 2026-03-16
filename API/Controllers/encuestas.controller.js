import pool from '../db.js';


//funcion para crear encuesta 
export const createEncuesta = async (req, res) => {
    const {titulo , descripcion , estructura , usuario_id } = req.body;
    const activa = true;
    try{
        const result = await pool.query(
            'INSERT INTO encuestas (titulo , descripcion , estructura , activa , usuario_id ) values ($1 , $2 , $3 , $4 , $5) RETURNING *',
            [titulo , descripcion , JSON.stringify(estructura) , activa , usuario_id]
        )

        res.status(201).json({ message: 'Encuesta creada exitosamente', encuesta: result.rows[0] });

    }catch(error){
        console.error('Error al crear la encuesta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }

}

//funcion para lista de encuesta
export const listarEncuestasGeneral = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, titulo, descripcion, activa, creado_en , estructura
             FROM encuestas 
             WHERE activa = true
             ORDER BY creado_en DESC`
        );

        res.json({ encuestas: result.rows });

    } catch (error) {
        console.error('Error al listar encuestas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};


//funcion para lista de encuesta por ID usuario
export const listarEncuestas = async (req, res) => {
    const {id} = req.params;

    try {
        const result = await pool.query(
            `SELECT id, titulo, descripcion, activa, creado_en , estructura
             FROM encuestas 
             WHERE usuario_id = $1 
             ORDER BY creado_en DESC`
            , [id]
        );

        res.json({ encuestas: result.rows });

    } catch (error) {
        console.error('Error al listar encuestas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const encuestaEstrutura = async (req, res) => {
    const {id_encuesta} = req.params;

    try {
        const result = await pool.query(
            `SELECT  estructura
             FROM encuestas 
             WHERE id = $1::uuid 
             ORDER BY creado_en DESC`
            , [id_encuesta]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }
        
        res.json({ encuesta: result.rows });

    } catch (error) {
        console.error('Error al listar encuestas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

//funcion para eliminar encuesta
export const eliminarEncuesta = async (req, res) => {
    const { id } = req.params;

    try{
        const result = await pool.query(
            'DELETE FROM encuestas WHERE id = $1 RETURNING *',
            [id]
        );

        if(result.rows.length === 0){
            return res.status(404).json({ message: 'Encuesta no encontrada' });
        }

        res.json({message: 'Encuesta eliminada exitosamente'})

    }catch(error){
        console.error('Error al eliminar la encuesta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

//guardar la respuesta
export const guardarRespuesta = async (req, res) => {
    const { usuario_id, encuesta_id, respuesta } = req.body;

    try {

        const yaRespondio = await pool.query(
            `SELECT id FROM respuestas 
             WHERE usuario_id = $1 AND encuesta_id = $2`,
            [usuario_id, encuesta_id]
        );

        if (yaRespondio.rows.length > 0) {
            return res.status(409).json({ message: 'Ya respondiste esta encuesta' });
        }

        const result = await pool.query(
            `INSERT INTO respuestas (usuario_id, encuesta_id, respuesta)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [usuario_id, encuesta_id, JSON.stringify(respuesta)]
        );

        res.status(201).json({
            message: 'Respuesta guardada exitosamente',
            respuesta: result.rows[0]
        });

    } catch (error) {
        console.error('Error al guardar respuesta:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

