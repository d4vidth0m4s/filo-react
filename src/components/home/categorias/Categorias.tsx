
import './categorias.css'

const Categorias = () => {

const categorias = [
  { nombre: 'Restaurantes', icono: '../public/images/restaurantes.png' },
  { nombre: 'Tiendas', icono: '../public/images/tiendas.webp' },
  { nombre: 'Supermercados', icono: '../public/images/supermercados.png' },
  { nombre: 'Comidas Rápidas', icono: '../public/images/comidas-rapidas.png' },
  
]

  return (
    <div className="categorias">
           
    {categorias.map((categoria) => (

      <div className="categoria" key={categoria.nombre}>
        <div className="icono">
          <img className='ico'
            src={categoria.icono} 
           
          />
        </div>
        <span>{categoria.nombre}</span>
      </div>


    ))}
    </div>
  )
}

export default Categorias