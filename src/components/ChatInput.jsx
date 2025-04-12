
import React, { useState } from 'react';
import axios from 'axios';

const ChatInput = () => {
  const [mensagem, setMensagem] = useState("");
  const [historico, setHistorico] = useState([]);
  const [resposta, setResposta] = useState("");

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;

    const novoHistorico = [...historico, mensagem];
    setHistorico(novoHistorico);
    setMensagem("");

    try {
      const res = await axios.post("http://localhost:3000/chat", {
        prompt: mensagem,
        historico: novoHistorico,
      });
      setResposta(res.data.resposta);
    } catch (err) {
      console.error("Erro ao conversar:", err);
      setResposta("Erro ao processar a mensagem.");
    }
  };

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl">
      <textarea
        className="w-full p-2 text-black rounded"
        rows="3"
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        placeholder="Digite sua pergunta..."
      />
      <button
        onClick={enviarMensagem}
        className="mt-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Enviar
      </button>
      {resposta && (
        <div className="mt-4 p-3 bg-gray-800 rounded">
          <strong>Resposta:</strong>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
};

export default ChatInput;
