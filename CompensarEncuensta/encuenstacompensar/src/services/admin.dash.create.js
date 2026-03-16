const API_URL ="http://localhost:4000/encuestas";


//funcion para crear encuesta
export const crearEncuestaService = async (data) => {
    try{
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al crear la encuesta: ${response.statusText}`);
        }

          return await response.json()


    }catch(error){
        console.error("Error al crear la encuesta:", error);
        throw error;
    }  
}