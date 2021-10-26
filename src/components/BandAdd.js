import React, { useState } from 'react'

export const BandAdd = ({ addBanda}) => {

    const [valor, setValor] = useState('');


    const onSubmit = (ev) => {
        ev.preventDefault();
        if( valor.trim().length > 0) {
            addBanda(valor);
        }    
    }
    return (
        <>
            <h3>Agregar banda</h3>  
            <form onSubmit={ onSubmit }>
                <input 
                    className ="form-control"
                    placeholder="nuevo nombre de la banda"
                    value={ valor }
                    onChange={(ev) => setValor( ev.target.value )}
                />
            </form>
        </>
    )
}
