import React, { useState, useEffect } from 'react';
import { db } from './firebase'; 
import { ref, onValue, set } from "firebase/database";
import './App.css';

function App() {
  const [chamando, setChamando] = useState(false);

  useEffect(() => {
    // Referência ao nó do Realtime Database
    const statusRef = ref(db, 'andar_cima');

    // Listener em tempo real
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      
      // Update do estado local baseado no booleano do Firebase
      setChamando(data === true);
    });

    return () => unsubscribe();
  }, []);

  // Handler para resetar o status no banco
  const marcarComoAtendido = () => {
    const statusRef = ref(db, 'andar_cima');
    
    set(statusRef, false)
      .then(() => {
        console.log("Status resetado no Firebase");
      })
      .catch((error) => {
        console.error("Erro na escrita:", error);
      });
  };

  return (
    <div className={`App ${chamando ? 'alerta' : 'normal'}`}>
      <header className="App-header">
        <h1>Sistema de Chamada - Garçom</h1>
        
        <div className="status-container">
          {chamando ? (
            <div className="card-alerta">
              <h2>🚨 CHAMADO NO ANDAR DE CIMA! 🚨</h2>
              <button className="btn-atender" onClick={marcarComoAtendido}>
                MARCAR COMO ATENDIDO
              </button>
            </div>
          ) : (
            <div className="card-normal">
              <p>Nenhum chamado pendente no momento.</p>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;