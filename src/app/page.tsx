"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const startDate = new Date("2024-11-26T07:09:00"); // Data inicial de referência
    const cycleDuration = 15 * 24 * 60 * 60 * 1000; // 15 dias em milissegundos

    function updateCountdown() {
      const now = new Date();
      const elapsed = now - startDate;
      const remaining = cycleDuration - (elapsed % cycleDuration);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }

    // Atualiza o countdown a cada segundo
    const intervalId = setInterval(updateCountdown, 1000);

    // Chama a função imediatamente para evitar delay na primeira renderização
    updateCountdown();

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center space-y-4">
        <div className="flex space-x-4 text-3xl font-bold text-orange-500">
          <div className="flex flex-col items-center">
            <span className="text-5xl">{timeLeft.days}</span>
            <span className="text-sm text-gray-600">Dias</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl">{timeLeft.hours}</span>
            <span className="text-sm text-gray-600">Horas</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl">{timeLeft.minutes}</span>
            <span className="text-sm text-gray-600">Minutos</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-5xl">{timeLeft.seconds}</span>
            <span className="text-sm text-gray-600">Segundos</span>
          </div>
        </div>
      </div>
    </div>
  );
}
