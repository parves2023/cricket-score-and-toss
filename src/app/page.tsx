"use client"; // Add this line at the top
import { useEffect, useState } from "react";
import TossModal from "./TossModal";
import NoBallModal from "./NoBallModal";
import Footer from "./Footer"; // Adjust the path as necessary
import CricketBarChart from "./CricketBarChart"; // Adjust the path as necessary

import html2canvas from "html2canvas";
import html2pdf from 'html2pdf.js';
import dynamic from "next/dynamic";



export default function Page() {
  const [totalScore, setTotalScore] = useState(0);
  const [ballCount, setBallCount] = useState(0);
  const [pdf, setpdf] = useState(false);
  const [overNumber, setOverNumber] = useState(1);
  const [currentOver, setCurrentOver] = useState<string[]>([]);
  const [currentOverScore, setCurrentOverScore] = useState(0);
  const [showTossModal, setShowTossModal] = useState(false);
  const [tossResult, setTossResult] = useState("");
  const [totalWickets, setTotalWickets] = useState(0); // Add this line

  const [overHistory, setOverHistory] = useState<string[][]>([]); // Stores completed overs
  const [detailedOverHistory, setDetailedOverHistory] = useState<
    { over: number; runs: number; wickets: number }[]
  >([]);

  const [isNoBallModalOpen, setIsNoBallModalOpen] = useState(false);

  useEffect(() => {
    if (ballCount === 6) {
      setCurrentOver([...currentOver, "Over Complete"]); // Optional: indicate that the over is complete
      const timer = setTimeout(() => {
        completeOver(); // Move to complete over
      }, 1000); // Delay for visual feedback
      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [ballCount]); // Dependency array includes ballCount

  const overColors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-red-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-teal-100",
  ];


  const handlePrint = () => {
    window.print();
  };


  useEffect(() => {
    if (pdf) {
      if (typeof window !== "undefined") {
        // Dynamically import html2pdf only on the client-side
        const html2pdf = require("html2pdf.js");
        const element = document.getElementById("pageContent");
        if (element) {
          html2pdf()
            .from(element)
            .set({
              margin: 1,
              filename: "cricket_score_counter.pdf",
              html2canvas: { scale: 2 },
              jsPDF: { orientation: "portrait" },
            })
            .save()
            .then(() => {
              setpdf(false); // Reset pdf state after download
            });
        }
      }
    }
  }, [pdf]);


  const handleSaveAsImage = () => {
    const element = document.getElementById("pageContent");
    html2canvas(element as HTMLElement)
      .then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "cricket_score_counter.png";
        link.click();
      })
      .catch((error) => {
        console.error("Error saving image:", error);
      });
  };

  function handeRemoveOver() {
    const newTotalScore = totalScore - currentOverScore;
    setTotalScore(newTotalScore);
    setBallCount(0);
    setCurrentOver([]); // Clear current over
  }

  function completeOver() {
    const newOver = {
      over: overNumber,
      runs: currentOverScore,
      wickets: currentOver.filter((action) => action.includes("Wicket")).length,
    };

    // Move current over details to detailed over history
    setDetailedOverHistory([...detailedOverHistory, newOver]);

    // Existing logic for over history
    setOverHistory([...overHistory, currentOver]);
    setOverNumber(overNumber + 1);
    setCurrentOver([]); // Clear current over
    setCurrentOverScore(0); // Reset current over score
    setBallCount(0); // Reset ball count
  }

  const openNoBallModal = () => {
    setIsNoBallModalOpen(true);
  };

  const closeNoBallModal = () => {
    setIsNoBallModalOpen(false);
  };

  const addNoBallRuns = (runs: number) => {
    const newTotalScore = totalScore + 1 + runs; // 1 run for No Ball + runs on No Ball
    const newCurrentOverScore = currentOverScore + 1 + runs;
    setTotalScore(newTotalScore);
    setCurrentOverScore(newCurrentOverScore);
    setCurrentOver([...currentOver, `No Ball + ${runs} runs`]);
    setIsNoBallModalOpen(false); // Close modal
  };

  const addNoBallWicket = () => {
    setCurrentOver([...currentOver, "Wicket on No Ball"]);
    setIsNoBallModalOpen(false); // Close modal
  };

  function addRun(run: number) {
    if (ballCount < 6) {
      setTotalScore(totalScore + run);
      setCurrentOverScore(currentOverScore + run);
      setBallCount(ballCount + 1);
      setCurrentOver([...currentOver, `${run} runs`]);
      updateDisplay();
    }
  }

  function addWide() {
    setTotalScore(totalScore + 1); // Add one run for wide
    setCurrentOver([...currentOver, "Wide"]);
    setCurrentOverScore(currentOverScore + 1); // Add wide run to the current over score
    updateDisplay();
  }

  function addWicket() {
    if (ballCount < 6) {
      setBallCount(ballCount + 1);
      setCurrentOver([...currentOver, "Wicket"]);
      setTotalWickets(totalWickets + 1); // Increment total wickets
      updateDisplay();
    }
  }

  function updateDisplay() {
    if (ballCount === 6) {
      setCurrentOver([...currentOver, "Over Complete"]); // Optional: indicate that the over is complete
      setTimeout(completeOver, 1000); // Auto-start a new over after 1 second
    }
  }

  function handleToss(choice: string) {
    const result = Math.random() < 0.5 ? "Heads" : "Tails"; // Randomly determine toss result
    setTossResult(`You chose ${choice}. Toss result is ${result}.`);
  }
  function ifBallisSix() {
    if (ballCount === 6) {
      completeOver();
      updateDisplay();
    }
  }

  return (
    <>
      <div  id="pageContent" onClick={() => ifBallisSix()} className="bg-gray-100 px-2 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center relative">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Cricket Score Counter
          </h1>

          <button
            onClick={() => setShowTossModal(true)}
            className="absolute top-1 right-1 text-xs bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
          >
            Toss
          </button>

          <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-700 mb-0">
              Total Score: <span>{`${totalScore}/${totalWickets}`}</span>{" "}
              {/* Updated line */}
            </h2>
            <p className="text-lg text-gray-600">
              Balls: <span>{ballCount}</span> / 6
            </p>
          </div>

          <div className="text-red-500 text-lg mb-4"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => addRun(0)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              Dot Ball
            </button>
            <button
              onClick={() => addRun(1)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              1 Run
            </button>
            <button
              onClick={() => addRun(2)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              2 Runs
            </button>
            <button
              onClick={() => addRun(3)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              3 Runs
            </button>
            <button
              onClick={() => addRun(4)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              4 Runs
            </button>
            <button
              onClick={() => addRun(6)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 hover:ring-4"
            >
              6 Runs
            </button>
            <button
              onClick={addWide}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-800 hover:ring-4"
            >
              Wide
            </button>
            <button
              onClick={openNoBallModal}
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-800 hover:ring-4"
            >
              No Ball
            </button>
            <button
              onClick={addWicket}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-800 hover:ring-4"
            >
              Wicket
            </button>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg text-left my-4 relative">
            <h3 className="text-lg font-semibold text-gray-700">This over</h3>
            <ul className="list-none mt-3 flex w-full flex-wrap gap-2">
              {currentOver.map((action, index) => (
                <li
                  className="border font-semibold bg-sky-300 p-1 rounded-md"
                  key={index}
                >
                  {action}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handeRemoveOver()}
              className="bg-red-500 text-white text-xs py-2 px-2 rounded hover:bg-red-800 hover:ring-4 absolute top-0 right-0"
            >
              Remove Over
            </button>
          </div>

        

          <div className="bg-gray-100 p-4 rounded-lg text-left">
            <h3 className="text-lg font-semibold text-gray-700">
              Over History
            </h3>
            <ul className="list-none mt-3">
              {overHistory.map((over, index) => (
                <li
                  className={`border ${
                    overColors[index % overColors.length]
                  } py-2 px-1 my-2 font-semibold rounded-md`}
                  key={index}
                >
                  {`Over ${index + 1}: ${over.join(" , ")}`}
                </li>
              ))}
            </ul>
          </div>
        </div>

       <div>
         {/* Display a message if there are no overs completed */}
         {detailedOverHistory.length === 0 ? (
          <h1 className="text-lg font-semibold text-gray-700 text-center my-5">
            Complete a over for graph.
          </h1>
        ) : (
          <CricketBarChart detailedOverHistory={detailedOverHistory} />
        )}
       </div>

        <TossModal
          isOpen={showTossModal}
          onClose={() => setShowTossModal(false)}
          onToss={handleToss}
          tossResult={tossResult}
        />

        {/* No Ball Modal */}
        <NoBallModal
          isOpen={isNoBallModalOpen}
          onClose={closeNoBallModal}
          addNoBallRuns={addNoBallRuns}
          addNoBallWicket={addNoBallWicket}
        />
      </div>
     <div className="flex text-sm gap-3 w-[95%] mx-auto items-center justify-center">
     <button
          onClick={handlePrint}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Print this page
        </button>
        <button
          onClick={handleSaveAsImage}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Save as Image
        </button>


        <button
        onClick={() => {
          if (!pdf) { // Only set pdf to true if it is currently false
            setpdf(true);
          }
        }}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        Download as PDF
      </button>


     </div>
      <Footer />
    </>
  );
}
