import React from 'react'
import './categorias.css'

const Categorias = () => {

const categorias = [
  { nombre: 'Restaurantes', icono: 'https://png.pngtree.com/png-clipart/20250111/original/pngtree-pan-of-chinese-fried-rice-on-transparent-background-png-image_19048184.png' },
  { nombre: 'Tiendas', icono: 'https://variedadesjired.com/wp-content/uploads/2022/03/variedades-jired-hero.webp' },
  { nombre: 'Supermercados', icono: 'https://png.pngtree.com/png-vector/20241108/ourmid/pngtree-supermarket-shopping-cart-with-fresh-groceries-png-image_14304601.png' },
  { nombre: 'Comidas Rápidas', icono: 'https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png' },
  
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