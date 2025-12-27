import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaChartBar,
} from "react-icons/fa";

const ResultCard = ({ result, loading, error }) => {
  const LABELS = ["Adenocarcinoma", "Benign", "Squamous Cell Carcinoma"];

  // 1. Loading State
  if (loading) {
    return (
      <div className="w-full max-w-md p-6 bg-slate-800 rounded-xl border border-slate-700 shadow-xl text-center">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
        <p className="text-slate-300 animate-pulse">
          Running VGG16 Inference...
        </p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="w-full max-w-md p-6 bg-red-900/20 border border-red-500/50 rounded-xl text-center">
        <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-red-400">Analysis Failed</h3>
        <p className="text-red-300 text-sm mt-1">{error}</p>
      </div>
    );
  }

  // 3. Empty State
  if (!result) return null;

  // 4. Success Logic
  const isBenign = result.class.toLowerCase() === "benign";
  const statusColor = isBenign ? "text-green-400" : "text-red-400";
  const borderColor = isBenign ? "border-green-500/30" : "border-red-500/30";
  const Icon = isBenign ? FaCheckCircle : FaExclamationTriangle;

  // Get the flat array of probabilities (Backend sends [[p1, p2, p3]])
  const probabilities = result.raw_probabilities[0];

  return (
    <div
      className={`w-full max-w-md bg-slate-800 rounded-xl border ${borderColor} shadow-2xl overflow-hidden transition-all duration-500`}
    >
      <div className="p-6 text-center border-b border-slate-700/50">
        <h2 className="text-slate-400 text-sm uppercase tracking-wider font-semibold">
          Diagnosis Result
        </h2>
      </div>

      <div className="p-8 text-center">
        <Icon className={`text-6xl mx-auto mb-6 ${statusColor}`} />
        <h3 className={`text-3xl font-bold mb-2 ${statusColor}`}>
          {result.class}
        </h3>
        <p className="text-slate-400 text-sm">
          Top Confidence:{" "}
          <span className="text-white font-mono">{result.confidence}</span>
        </p>
      </div>
      <div className="bg-slate-900/50 p-6 border-t border-slate-700/50">
        <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm font-semibold uppercase tracking-wide">
          <FaChartBar />
          <span>Model Confidence Breakdown</span>
        </div>

        <div className="space-y-3">
          {LABELS.map((label, index) => {
            const prob = probabilities[index];
            const percent = (prob * 100).toFixed(2);
            const barColor = label === "Benign" ? "bg-green-500" : "bg-red-500";

            return (
              <div key={label} className="text-sm">
                <div className="flex justify-between mb-1 text-slate-300">
                  <span>{label}</span>
                  <span className="font-mono text-xs text-slate-500">
                    {percent}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full ${barColor} transition-all duration-1000 ease-out`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-700/30">
          <details className="text-xs text-slate-600 font-mono cursor-pointer">
            <summary className="hover:text-slate-400 transition-colors">
              View Raw JSON
            </summary>
            <pre className="mt-2 p-2 bg-black rounded text-slate-500 overflow-x-auto">
              {JSON.stringify(result.raw_probabilities, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
