import React, { useState, useEffect } from 'react';
import './JogoDaVelha.css';

const JogoDaVelha = () => {
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(null));
  const [jogadorAtual, setJogadorAtual] = useState('X');
  const [vencedor, setVencedor] = useState(null);

  useEffect(() => {
    const ganhador = calcularGanhador(tabuleiro);
    if (ganhador) {
      setVencedor(ganhador);
      setTimeout(reiniciarJogo, 2000); // Reinicia o jogo após 2 segundos
    } else if (tabuleiro.every(valor => valor !== null)) {
      // Empate
      setTimeout(reiniciarJogo, 2000); // Reinicia o jogo após 2 segundos
    }
}, [tabuleiro]);

  const handleClick = (index) => {
    if (tabuleiro[index] || vencedor) return;

    const novoTabuleiro = tabuleiro.slice();
    novoTabuleiro[index] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    setJogadorAtual(jogadorAtual === 'X' ? 'O' : 'X');
  };

  const calcularGanhador = (tabuleiro) => {
    const combinacoesGanhas = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinacoesGanhas.length; i++) {
      const [a, b, c] = combinacoesGanhas[i];
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        return { jogador: tabuleiro[a], linha: [a, b, c] };
      }
    }
    return null;
  };

  const reiniciarJogo = () => {
    setTabuleiro(Array(9).fill(null));
    setJogadorAtual('X');
    setVencedor(null);
  };

  const vencedorInfo = vencedor ? `Vencedor: ${vencedor.jogador}` : `Jogador Atual: ${jogadorAtual}`;
  const linhaGanhadora = vencedor ? vencedor.linha : [];

  return (
    <div className="container">
      <div className="status">{vencedorInfo}</div>
      <div className="tabuleiro">
        {tabuleiro.map((valor, index) => (
          <button
            key={index}
            className={`quadrado ${linhaGanhadora.includes(index) ? 'vencedor' : ''}`}
            onClick={() => handleClick(index)}
          >
            {valor}
          </button>
        ))}
        {linhaGanhadora.length === 3 && (
          <svg className="linha">
            <line
              x1={(linhaGanhadora[0] % 3) * 100 + 50}
              y1={Math.floor(linhaGanhadora[0] / 3) * 100 + 50}
              x2={(linhaGanhadora[2] % 3) * 100 + 50}
              y2={Math.floor(linhaGanhadora[2] / 3) * 100 + 50}
              stroke="red"
              strokeWidth="5"
            />
          </svg>
        )}
         <div className='nomes'>Jogo by: Bruna Cardozo, Maria Eduarda, André Marques</div>
      </div>
    </div>
  );
};

export default JogoDaVelha;
