const API_URL ="http://localhost:4000/encuestas";

//funcion para obtener encuestas de un usuario
export const listaEncuestasService = async (id_usuario) => {
    const response = await fetch(`${API_URL}/listar/${id_usuario}`);
    if(!response.ok){
        throw new Error(`Error al obtener las encuestas:`);
    };

    return await response.json();

}

export const eliminarEncuestaService = async(id_encuesta)=>{
    const response = await fetch(`${API_URL}/eliminar/${id_encuesta}` ,{
        method:'DELETE',
        headers:{
             'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        throw new Error(`Error al  eliminar la encuesta:`);
    };

    return await response.json();
}