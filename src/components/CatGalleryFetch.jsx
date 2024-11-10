import { useEffect, useState } from "react"

export const CatGalleryFetch = () => {

  // Estado para almacenar la imagenes de gatitos, se inicializa con un array vacío
  const [cats, setCats] = useState([]);

  //Estado para manejar posibles errores porque state no lo hace
  const [error, setError] = useState(null);

  //Método para realizar la petición a la api con fetch
  const fetchData = async () => {

    //https://api.thecatapi.com/v1/images/search?limit=10 es la url del api y el 10 representa que va a mostrar 10 imagen de gatos
    try{
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        //data guarda la respuesta del response y siempre se debe agregar
        const data = await response.json();
        // fetch no entrega en formato json solo entrega datos y el await es para peticiones asincronas debe esperar hasta traer todo son promesas
    
        // Setear la variable de estado cats a través de su metodo cats con los datos recibidos de la api
        setCats(data);
        //data almacena lainformación de api en formato json 
    } catch (error){
        // El console log nunca debe estar en producción 
        console.log('Error al realizar la solicitud', error);
        setError('Error al realizar la solicitud');
    }
  };
  
  // UseEffect ejecuta el metodo fetchData la primera vez que se monta el componente (hace la petición de la api) 
  useEffect(() => {
    fetchData();
  }, []);

  // si hay error mostramos el mensaje de error
  if (error){ // error variable del try catch
    return (
        <div className="alert alert-danger text-center" role="alert">
            {error}
        </div>
    );
  };

  return (
    <div className="container mt-5">
        <h2 className="text-center text-white mb-4">Galería de gatitos con Fetch</h2>
        {/* Agregamos un contenedor con scroll y altura fija */}
        <div className="row overflow-auto vh-80" style={{ maxHeight: '80vh', overflowY: "scroll"}}>
           
                {cats.map((cat, index) =>(
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100 d-flex flex-column">
                            <img src={cat.url} className="card-img-top img-fluid object-fit-cover" alt="Cat" />
                            <div className="card-body">
                                <h5 className="card-title">Gatito {index + 1}</h5>
                                <p className="card-text">¡un lindo gatito de nuestra galeria!</p>
                            </div>
                        </div>
                    </div>
                ))}

        </div>
    </div>
  )
}
