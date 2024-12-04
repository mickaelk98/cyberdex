"use client";


import { useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Home() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [showPlayer, setShowplayer] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [player1Choice, setPlayer1Choice] = useState("");
  const [player2Choice, setPlayer2Choice] = useState("");

  // coin
  const [result, setResult] = useState("pile");
  const [showResult, setShowResult] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef(null);

  // Chemins des images
  const pileImage = "/pile.png";
  const faceImage = "/face.png";

  function handleSubmit(e) {
    e.preventDefault();
    console.log(player1, player2);
    const randomName = Math.random() > 0.5 ? player1 : player2;
    setSelectedPlayer(randomName);
    setShowplayer(true);
  }

  function playerChoice(choice) {
    if (selectedPlayer === player1) {
      if (choice === "pile") {
        setPlayer1Choice("pile");
        setPlayer2Choice("face");
      } else {
        setPlayer1Choice("face");
        setPlayer2Choice("pile");
      }
    } else {
      if (choice === "pile") {
        setPlayer2Choice("pile");
        setPlayer1Choice("face");
      } else {
        setPlayer2Choice("face");
        setPlayer1Choice("pile");
      }
    }
  }

  const flipCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setShowResult(true);

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
    <div className="h-screen flex flex-col bg-[#020B1A]">
      <header className="text-white  max-w-7xl mx-auto py-5 h-[150px]">
        <Image src="/cyberdex.png" alt="Logo" width={150} height={150} />
      </header>
      <main className="flex-1 flex items-start justify-evenly w-full max-w-7xl mx-auto">
        <aside className="text-white w-96 p-2">
          <form onSubmit={handleSubmit} action="" className="max-w-96 text-white flex flex-col gap-4 mt-4">

            <input
              className="p-1 text-slate-500 rounded-md"
              placeholder="Joueur 1"
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              className="p-1 text-slate-500 rounded-md"
              placeholder="Joueur 2"
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button className="bg-blue-500 w-1/2 self-end text-white p-1 rounded-md ">Commencez</button>
          </form>

          {/* Informations affichées si les joueurs ont entré leur nom */}
          {showPlayer && (
            <ul className="flex gap-2 mt-8 items-center justify-between">
              <li className="w-1/2">
                <div className="flex flex-col bg-white rounded-md">
                  <h2 className="test-center bg-blue-500 p-1 rounded-tl-md rounded-tr-md text-center">Joueur 1</h2>
                  <small className="text-center text-xl text-slate-500 py-2">{player1}</small>
                </div>
              </li>
              <li className="w-1/2">
                <div className="flex flex-col bg-white rounded-md">
                  <h2 className="test-center bg-blue-500 p-1 rounded-tl-md rounded-tr-md text-center">Joueur 2</h2>
                  <small className="text-center text-xl text-slate-500 py-2">{player2}</small>
                </div>
              </li>
            </ul>
          )}

          {/* Choix entre Pile ou Face */}
          {selectedPlayer && (
            <ul className="mt-4 flex flex-col items-center justify-center">
              <p className="text-xl">{selectedPlayer} choisit entre pile ou face</p>
              <div className="flex gap-2">
                <Image className="cursor-pointer" src="/pile.png" alt="pile" width={150} height={150} onClick={() => playerChoice("pile")} />
                <Image className="cursor-pointer" src="/face.png" alt="face" width={150} height={150} onClick={() => playerChoice("face")} />
              </div>
            </ul>
          )}

          {(player1Choice || player2Choice) && (
            <>
              {selectedPlayer === player1
                ? <p className="text-center">{selectedPlayer} a choisit {player1Choice}, vous pouvez lancé la pièce</p>
                : <p className="text-center">{selectedPlayer} a choisit {player2Choice}, vous pouvez lancé la pièce</p>}
            </>
          )}

          {/* Resultat */}
          {showResult && isFlipping === false && <div className="flex items-center justify-evenly">
            <h3>Resultat : </h3>
            <div className="flex gap-2 flex-col items-center justify-center">
              <Image src={result === "pile" ? "/pile.png" : "/face.png"} alt="pile" width={150} height={150} />
              <p>{result === "pile" ? "Pile" : "Face"}</p>
            </div>
          </div>}
        </aside>

        {/* CoinFlip occupe tout l'espace restant */}
        <div className="">
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
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isFlipping || player1Choice === "" || player2Choice === "" ? "opacity-50" : ""}`}
              disabled={isFlipping || player1Choice === "" || player2Choice === ""}
            >
              {isFlipping ? "Lancer en cours..." : "Lancer la pièce !"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
