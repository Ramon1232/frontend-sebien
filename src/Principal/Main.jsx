import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';

function Main() {
    const [datos, setDatos] = useState([]);
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
                setDatos(response.data);
                console.log(response.data);
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
                    <div className="loading-message">Cargando... Espera un momento</div>
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
                            {datos.map((beneficiario) => (
                                <tr key={beneficiario.beneficiarioId}>
                                    <td>{beneficiario.folio}</td>
                                    <td>{beneficiario.curp}</td>
                                    <td>{beneficiario.nombre}</td>
                                    <td>{beneficiario.estatus}</td>
                                    <td>{beneficiario.programa}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </React.Fragment>
            )}
        </div>
    );
}

export default Main;