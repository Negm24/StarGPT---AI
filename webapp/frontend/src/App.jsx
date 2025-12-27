import { useState } from "react";
import { FaDna, FaMicroscope } from "react-icons/fa";
import DropZone from "./components/DropZone";
import ResultCard from "./components/ResultCard";
import { analyzeImage } from "./api/cliend";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaDna className="text-blue-500 text-2xl" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              StarGPT
            </h1>
          </div>
          <span className="text-xs font-mono text-slate-500">
            VGG16 MODEL • CPU MODE
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 flex flex-col items-center">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            StarLung Classifier
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            Upload a histopathology slide image (H&E stained) to detect
            Adenocarcinoma, Squamous Cell Carcinoma, or Benign tissue.
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-8">
          {result || loading || error ? (
            <div className="flex flex-col items-center w-full animate-fade-in-up">
              <ResultCard result={result} loading={loading} error={error} />

              {!loading && (
                <button
                  onClick={handleReset}
                  className="mt-8 px-6 py-2 text-sm text-slate-400 hover:text-white border border-slate-700 rounded-full hover:bg-slate-800 transition-all"
                >
                  Analyze Another Image
                </button>
              )}
            </div>
          ) : (
            <>
              <DropZone onFileSelected={setFile} />

              <button
                onClick={handleAnalyze}
                disabled={!file}
                className={`
                  flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform
                  ${
                    file
                      ? "bg-blue-600 hover:bg-blue-500 text-white translate-y-0 opacity-100"
                      : "bg-slate-800 text-slate-500 cursor-not-allowed translate-y-4 opacity-0 pointer-events-none"
                  }
                `}
              >
                <FaMicroscope className="text-xl" />
                Analyze Sample
              </button>
            </>
          )}
        </div>
      </main>

      <footer className="text-center py-8 text-slate-600 text-sm">
        <p>Built with Flask, React & TensorFlow</p>
      </footer>
    </div>
  );
}

export default App;
