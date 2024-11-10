import { useEffect, useState } from "react"

export const ApiCartoonFetch = () => {

  // Estado para almacenar la imagenes animadas, se inicializa con un array vacío
  const [cartoon, setCartoon] = useState([]);

  //Estado para manejar posibles errores porque state no lo hace
  const [error, setError] = useState(null);

  //Método para realizar la petición a la api con fetch
  const fetchData = async () => {

    //https://api.thecatapi.com/v1/images/search?limit=10 es la url del api y el 10 representa que va a mostrar 10 imagen de gatos
    try{
        const response = await fetch('https://api.sampleapis.com/cartoons/cartoons2D');
        //data guarda la respuesta del response y siempre se debe agregar
        const data = await response.json();
        // fetch no entrega en formato json solo entrega datos y el await es para peticiones asincronas debe esperar hasta traer todo son promesas
    
        // Setear la variable de estado cats a través de su metodo cats con los datos recibidos de la api
        setCartoon(data);
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
        <h2 className="text-center text-white mb-4">Galería de caricaturas con Fetch</h2>
        {/* Agregamos un contenedor con scroll y altura fija */}
        <div className="row overflow-auto vh-80" style={{ maxHeight: '80vh', overflowY: "scroll"}}>
           
                {cartoon.map((cartoons, index) =>(
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card h-100 d-flex flex-column">
                            <img src={cartoons.image} className="card-img-top img-fluid object-fit-cover" alt="Cartoons" />
                            <div className="card-body">
                                <h5 className="card-title">Caricatura {index + 1}</h5>
                            </div>
                        </div>
                    </div>
                ))}

        </div>
    </div>
  )
}
