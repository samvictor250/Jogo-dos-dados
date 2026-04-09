"use client";

import { useState } from "react";
import Dado from "./Dado";

function sortear() {
  return Math.floor(Math.random() * 6) + 1;
}

export default function JogoDados() {
  const TOTAL = 5;

  const [rodada, setRodada] = useState(1);

  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);

  const [jogouA, setJogouA] = useState(false);
  const [jogouB, setJogouB] = useState(false);

  const [resultadoA, setResultadoA] = useState("");
  const [resultadoB, setResultadoB] = useState("");

  const [vitoriaA, setVitoriaA] = useState(0);
  const [vitoriaB, setVitoriaB] = useState(0);

  const [fim, setFim] = useState(false);
  const [finalMsg, setFinalMsg] = useState("");

  function jogarA() {
    const novo = [sortear(), sortear()];
    setDadosA(novo);
    setJogouA(true);
  }

  function jogarB() {
    const novo = [sortear(), sortear()];
    setDadosB(novo);
    setJogouB(true);

    const somaA = dadosA[0] + dadosA[1];
    const somaB = novo[0] + novo[1];

    if (somaA > somaB) {
      setResultadoA("Venceu");
      setResultadoB("Perdeu");
      setVitoriaA(v => v + 1);
    } else if (somaB > somaA) {
      setResultadoA("Perdeu");
      setResultadoB("Venceu");
      setVitoriaB(v => v + 1);
    } else {
      setResultadoA("Empatou");
      setResultadoB("Empatou");
    }

    if (rodada === TOTAL) {
      setFim(true);

      if (vitoriaA > vitoriaB) {
        setFinalMsg("Jogador A venceu!");
      } else if (vitoriaB > vitoriaA) {
        setFinalMsg("Jogador B venceu!");
      } else {
        setFinalMsg("Empate geral!");
      }

      return;
    }

    setTimeout(() => {
      setRodada(r => r + 1);
      setJogouA(false);
      setJogouB(false);
      setResultadoA("");
      setResultadoB("");
    }, 1000);
  }

  function resetar() {
    setRodada(1);
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setJogouA(false);
    setJogouB(false);
    setResultadoA("");
    setResultadoB("");
    setVitoriaA(0);
    setVitoriaB(0);
    setFim(false);
    setFinalMsg("");
  }

  return (
    <main className="container">
      <h1>Rodada {rodada}</h1>

      <div className="jogadores">
        <div>
          <div className="dados">
            <Dado valor={dadosA[0]} />
            <Dado valor={dadosA[1]} />
          </div>
          <p>A {resultadoA}</p>
          <button onClick={jogarA} disabled={jogouA || fim}>
            Jogar A
          </button>
        </div>

        <div>
          <div className="dados">
            <Dado valor={dadosB[0]} />
            <Dado valor={dadosB[1]} />
          </div>
          <p>B {resultadoB}</p>
          <button onClick={jogarB} disabled={!jogouA || jogouB || fim}>
            Jogar B
          </button>
        </div>
      </div>

      {fim && (
        <div>
          <h2>{finalMsg}</h2>
          <button onClick={resetar}>Jogar Novamente</button>
        </div>
      )}
    </main>
  );
}