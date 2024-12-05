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
  const [result, setResult] = useState("tails");
  const [showResult, setShowResult] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef(null);
  // Chemins des images
  const tailsImage = "/tails.png";
  const headsImage = "/heads.png";
  function handleSubmit(e) {
    e.preventDefault();
    console.log(player1, player2);
    const randomName = Math.random() > 0.5 ? player1 : player2;
    setSelectedPlayer(randomName);
    setShowplayer(true);
  }
  function playerChoice(choice) {
    if (selectedPlayer === player1) {
      if (choice === "tails") {
        setPlayer1Choice("tails");
        setPlayer2Choice("heads");
      } else {
        setPlayer1Choice("heads");
        setPlayer2Choice("tails");
      }
    } else {
      if (choice === "tails") {
        setPlayer2Choice("tails");
        setPlayer1Choice("heads");
      } else {
        setPlayer2Choice("heads");
        setPlayer1Choice("tails");
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
          const outcome = Math.random() > 0.5 ? "tails" : "heads";
          setResult(outcome);
          setIsFlipping(false);
        },
      }
    );
  };
  return (
    <div className="h-screen flex flex-col bg-[#020B1A]">
      <header className="text-white  max-w-7xl mx-auto py-5 mb-5">
        <Image src="/cyberdex.png" alt="Logo" width={300} height={300} />
      </header>
      <main className="flex-1 flex flex-col-reverse items-center justify-end w-full max-w-7xl md:flex-row md:justify-evenly">
        <aside className="text-white w-full p-2 flex flex-col items-center justify-center md:w-1/2 md:self-start">
          <form onSubmit={handleSubmit} action="" className=" w-80 max-w-96 text-white flex flex-col gap-4 mt-4">
            <input
              className="p-1 text-slate-500 rounded-md"
              placeholder="Player 1"
              type="text"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
            />
            <input
              className="p-1 text-slate-500 rounded-md"
              placeholder="Player 2"
              type="text"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
            />
            <button className="bg-blue-500 w-1/2 mx-auto text-white p-1 rounded-md ">Start</button>
          </form>
          {showPlayer && (
            <ul className="flex gap-2 mt-8 w-80 max-w-96 items-center justify-between">
              <li className="w-1/2">
                <div className="flex flex-col bg-white rounded-md">
                  <h2 className="test-center bg-blue-500 p-1 rounded-tl-md rounded-tr-md text-center">Player 1</h2>
                  <small className="text-center text-xl text-slate-500 py-2">{player1}</small>
                </div>
              </li>
              <li className="w-1/2">
                <div className="flex flex-col bg-white rounded-md">
                  <h2 className="test-center bg-blue-500 p-1 rounded-tl-md rounded-tr-md text-center">Player 2</h2>
                  <small className="text-center text-xl text-slate-500 py-2">{player2}</small>
                </div>
              </li>
            </ul>
          )}
          {selectedPlayer && (
            <ul className="mt-4 flex flex-col items-center justify-center">
              <p className="text-xl">{selectedPlayer} chooses between heads or tails</p>
              <div className="flex gap-2">
                <Image className="cursor-pointer" src="/tails.png" alt="heads" width={150} height={150} onClick={() => playerChoice("tails")} />
                <Image className="cursor-pointer" src="/heads.png" alt="tails" width={150} height={150} onClick={() => playerChoice("heads")} />
              </div>
            </ul>
          )}
          {(player1Choice || player2Choice) && (
            <>
              {selectedPlayer === player1
                ? <p className="text-center text-xl">{selectedPlayer} chose {player1Choice}, you can flip the coin</p>
                : <p className="text-center text-xl">{selectedPlayer} chose {player2Choice}, you can flip the coin</p>}
            </>
          )}
        </aside>
        <div className="flex flex-col items-start justify-center gap-4 md:self-start">
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-5xl font-bold mb-6">Coin Toss</h1>
            <div
              ref={coinRef}
              className="w-[150px] h-[150px] bg- rounded-full flex items-center justify-center mb-6 relative"
            >
              {result === "tails" && (
                <Image
                  src={tailsImage}
                  width={150}
                  height={150}
                  alt="Heads"
                  className="w-full h-full object-cover"
                />
              )}
              {result === "heads" && (
                <Image
                  src={headsImage}
                  width={150}
                  height={150}
                  alt="Tails"
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
              {isFlipping ? "Flipping..." : "Flip the coin!"}
            </button>
          </div>
          {showResult && isFlipping === false && <div className="flex flex-col items-center justify-center w-full">
            <h3>Result:</h3>
            <div className="flex gap-2 flex-col items-center justify-center">
              <Image src={result === "tails" ? "/tails.png" : "/heads.png"} alt="heads" width={150} height={150} />
              <p>{result === "tails" ? "Heads" : "Tails"}</p>
            </div>
          </div>}
        </div>
      </main>
    </div>
  );
}