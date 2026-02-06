import React from 'react'
//import './tiendasPerfil.css'  

export const TiendasPerfil: React.FC = () => {
    return (
        <main>
            <section>
                <header className='perfil-tiendas'>
                    <div className="banner-tienda">
                        <img src="/imgs/banner.png" alt="" />
                    </div>
                    <div className="photo-tienda">
                        <img src="/imgs/userPhoto.jpg" alt="" />
                    </div>
                </header>
                <section>
                    <div className="info-tienda">
                        <h3>Nombre de la tienda</h3>
                        <p>Descripción de la tienda</p>
                    </div>
                </section>
            </section>
        </main>
    )
}
export default TiendasPerfil


