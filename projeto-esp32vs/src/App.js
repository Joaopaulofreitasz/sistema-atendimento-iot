import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { ref, onValue, set } from "firebase/database";
import './App.css';

function App() {
  // true = tem cliente chamando, false = tudo tranquilo
  const [chamando, setChamando] = useState(false);

  useEffect(() => {
    const statusRef = ref(db, 'andar_cima');

    // Fica escutando o Firebase em tempo real
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const data = snapshot.val();
      setChamando(data === true);
    });

    // Para de escutar quando o componente desmonta
    return () => unsubscribe();
  }, []);

  // Quando o garçom clica em "Já atendi", reseta para false no banco
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
    // Adiciona a classe 'alerta' no wrapper quando tem chamado — pisca o fundo
    <div className={`wrap ${chamando ? 'alerta' : ''}`}>

      {/* Cabeçalho com nome do restaurante e animação de vapor */}
      <div className="brand-row">
        <div className="steam" aria-hidden="true">
          <span /><span /><span />
        </div>
        <span className="brand-name">O Caseiríssimo</span>
      </div>

      {/* Card central — muda de aparência dependendo do estado */}
      <div className={`big-card ${chamando ? 'alert' : 'idle'}`}>

        {/* Estado tranquilo */}
        {!chamando ? (
          <div className="state-idle">
            <span className="big-icon" aria-hidden="true">☕</span>
            <p className="big-label idle">Garçom</p>
            <h1 className="big-title idle">Tudo tranquilo</h1>
            <p className="big-sub idle">Nenhum cliente chamando no momento.</p>
            <p className="idle-note">Aguardando chamados do andar de cima...</p>
          </div>

        ) : (

          /* Estado de alerta — cliente chamando */
          <div className="state-alert">
            <div className="floor-tag">
              ▲ Andar de cima
            </div>
            <span className="big-icon ring-anim" aria-hidden="true">🔔</span>
            <p className="big-label alert">Atenção!</p>
            <h1 className="big-title alert">Cliente chamando!</h1>
            <p className="big-sub alert">Vá até o andar de cima atender o cliente.</p>
            {/* Botão que reseta o chamado no Firebase */}
            <button className="btn-attend" onClick={marcarComoAtendido}>
              ✓ Já atendi!
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;