import React, { useEffect } from 'react';
import Main from './Principal/Main';

function App() {
  useEffect(() => {
    document.title = "Consulta estatus";
  }, []);

  return (
    <div className="App">
      <main>
        <Main />
      </main>
    </div>
  );
}

export default App;

