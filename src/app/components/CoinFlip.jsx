"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function CoinFlip() {
  const [result, setResult] = useState("pile");
  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef(null);

  // Chemins des images
  const pileImage = "/pile.png";
  const faceImage = "/face.png";

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    // Animation GSAP pour le lancer de pièce
    gsap.fromTo(
      coinRef.current,
      { rotateY: 0 },
      {
        rotateY: 3600,
        duration: 2,
        ease: "power4.out",
        onComplete: () => {
          // Déterminer le résultat après le lancer
          const outcome = Math.random() > 0.5 ? "pile" : "face";
          setResult(outcome);
          setIsFlipping(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-6">Lancer de Pièce</h1>

      <div
        ref={coinRef}
        className="w-32 h-32 bg- rounded-full flex items-center justify-center mb-6 relative"
      >
        {result === "pile" && (
          <Image
            src={pileImage}
            width={400}
            height={400}
            alt="Pile"
            className="w-full h-full object-cover"
          />
        )}
        {result === "face" && (
          <Image
            src={faceImage}
            width={400}
            height={400}
            alt="Face"
            className="w-full h-full object-cover"
          />
        )}
        {!result && <span className="text-xl font-bold">?</span>}
      </div>

      <button
        onClick={flipCoin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isFlipping}
      >
        {isFlipping ? "Lancer en cours..." : "Lancer la pièce"}
      </button>
    </div>
  );
}
