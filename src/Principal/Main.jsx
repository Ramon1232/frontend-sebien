import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';
import fondoImage from '../images/logoFondo.jpeg';
import cuidandoImage from '../images/logoCuidando.jpeg';

function Main() {
    const [datos, setDatos] = useState({});
    const [curpInput, setCurpInput] = useState('');
    const [mostrarDatos, setMostrarDatos] = useState(false);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleCurpChange = (event) => {
        setCurpInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setCargando(true);

        try {
            const response = await axios.get(`https://backend-sebien.onrender.com/beneficiarios/curp/${curpInput}`);
            if (response.data && response.data.length > 0) {
                setDatos({
                    [response.data[0].beneficiarioId]: response.data[0]
                });
                setCurpInput('');
                setMostrarDatos(true);
                setError('');
            } else {
                setError('CURP no encontrada. Por favor, verifique e intente nuevamente.');
                setMostrarDatos(false);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setError('CURP no encontrada. Por favor, verifique e intente nuevamente.');
            setMostrarDatos(false);
        } finally {
            setCargando(false);
        }
    };

    const programa = Object.keys(datos).length > 0 ? datos[Object.keys(datos)[0]].programa : '';
    const estatus = Object.keys(datos).length > 0 ? datos[Object.keys(datos)[0]].estatus : '';

    return (
        <div className="container">
            <h2 className="title">Consulta tu estatus de solicitante</h2>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Ingresa tu CURP:
                    <input type="text" value={curpInput} onChange={handleCurpChange} className="input" />
                </label>
                <button type="submit" className="button">Revisar</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {cargando && (
                <div className="loading-container">
                    <div className="loading-message">Cargando... Esepera un momento</div>
                </div>
            )}
            {mostrarDatos && (
                <React.Fragment>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>CURP</th>
                                <th>Nombre completo</th>
                                <th>Estatus</th>
                                <th>Programa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(datos).map(beneficiarioId => (
                                <tr key={beneficiarioId}>
                                    <td>{datos[beneficiarioId].folio}</td>
                                    <td>{datos[beneficiarioId].curp}</td>
                                    <td>{datos[beneficiarioId].nombre}</td>
                                    <td>{datos[beneficiarioId].estatus}</td>
                                    <td>{datos[beneficiarioId].programa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='labelstatus'>
                        <h1 className='labelestado'>Estado: {estatus}</h1> 
                    </div>
                    {(programa === 'FONDO DE RECOMPENSA PARA EL BIENESTAR 2024' || programa === 'CUIDANDO TU BIENESTAR 2024') && (
                        <div className="program-info">
                            <h3>Programa: {programa}</h3>
                            <img className='program-image'
                            src={programa === 'FONDO DE RECOMPENSA PARA EL BIENESTAR 2024' ? fondoImage : cuidandoImage} alt={programa} />
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
}

export default Main;