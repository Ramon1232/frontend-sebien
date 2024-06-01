import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';

function Main() {
    const [datos, setDatos] = useState({});
    const [curpInput, setCurpInput] = useState('');
    const [mostrarDatos, setMostrarDatos] = useState(false);
    const [error, setError] = useState('');

    const handleCurpChange = (event) => {
        setCurpInput(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/beneficiarios/curp/${curpInput}`);
            if (response.data && response.data.length > 0) {
                setDatos({
                    [response.data[0].beneficiarioId]: response.data[0]
                });
                setCurpInput('');
                setMostrarDatos(true);
                setError(''); // Clear any previous error
            } else {
                setError('CURP no encontrada. Por favor, verifique e intente nuevamente.');
                setMostrarDatos(false);
            }
        } catch (error) {
            console.error('Error al obtener datos:', error);
            setError('CURP no encontrada. Por favor, verifique e intente nuevamente.');
            setMostrarDatos(false);
        }
    };

    const estatus = Object.keys(datos).length > 0 ? datos[Object.keys(datos)[0]].estatus : '';

    return (
        <div className="container">
            <h2 className="title">Revisión de CURP</h2>
            <form onSubmit={handleSubmit}>
                <label className="label">
                    Ingrese CURP:
                    <input type="text" value={curpInput} onChange={handleCurpChange} className="input" />
                </label>
                <button type="submit" className="button">Revisar</button>
            </form>
            {error && <div className="error-message">{error}</div>} {/* Mostrar mensaje de error */}
            {mostrarDatos && (
                <React.Fragment>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>CURP</th>
                                <th>Nombre completo</th>
                                <th>Estatus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(datos).map(beneficiarioId => (
                                <tr key={beneficiarioId}>
                                    <td>{datos[beneficiarioId].folio}</td>
                                    <td>{datos[beneficiarioId].curp}</td>
                                    <td>{datos[beneficiarioId].nombre}</td>
                                    <td>{datos[beneficiarioId].estatus}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3>Estado: {estatus}</h3> {/* Mostrar el estado debajo de la tabla */}
                </React.Fragment>
            )}
        </div>
    );
}

export default Main;
