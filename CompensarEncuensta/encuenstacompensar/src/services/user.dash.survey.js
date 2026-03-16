const API_URL ="http://localhost:4000/encuestas";



export const listaEncuestasServiceUser = async () => {
    const response = await fetch(`${API_URL}/listarGeneral`);
    if(!response.ok){
        throw new Error(`Error al obtener las encuestas:`);
    };

    return await response.json();

}

export const obtenerencuestaServices = async(id) =>{
    const response = await fetch(`${API_URL}/listarGeneral/${id}`);

    if(!response.ok) throw new Error('Error al obtener encuesta');

    return await response.json()
}

export const guardarRespuestaService = async({usuario_id , encuesta_id , respuesta }) =>{
    try{
        const response = await fetch(`${API_URL}/guardarRespuesta` , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({usuario_id , encuesta_id , respuesta })
        })

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        if(!response.ok){
            throw new Error(data.message);
        }

        return data
        
    }catch(error){
        console.error('Error en guardarRespuestaService:', error); // ⬅️ y esto
        throw error;
    }
}