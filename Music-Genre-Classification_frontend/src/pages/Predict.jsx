import { useState } from "react";
import UploadAudio from "../components/UploadAudio";
import PredictionCard from "../components/PredictionCard";
import { predictGenre } from "../services/api";
import { AlertCircle } from "lucide-react";

export default function Predict() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const data = await predictGenre(file);
      setResults(data);
    } catch (err) {
      console.error(err);
      // For demonstration purposes, if the backend is not running,
      // provide mock data so the UI can still be evaluated.
      if (err.message === "Network Error" || err.code === "ERR_NETWORK") {
        setError(
          "Cannot connect to backend. Showing mock results for demonstration.",
        );
        setTimeout(() => {
          setResults({
            cnn_model: { genre: "rock", probability: 0.72 },
            augmented_cnn: { genre: "rock", probability: 0.81 },
            resnet18: { genre: "metal", probability: 0.69 },
          });
        }, 1000);
      } else {
        setError("An error occurred during prediction. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Genre Predictor
          </h1>
          <p className="text-slate-300 text-lg">
            Upload an audio track and let our deep learning models analyze and
            predict its musical genre.
          </p>
        </div>

        <UploadAudio
          onFileSelect={setFile}
          onPredict={handlePredict}
          isLoading={isLoading}
        />

        {error && (
          <div className="mt-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3 max-w-2xl mx-auto">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-16 animate-in slide-in-from-bottom-8 duration-500 fade-in">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Prediction Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
              <PredictionCard
                title="CNN Model"
                genre={results.cnn_prediction?.genre || "Unknown"}
                probability={results.cnn_prediction?.probability || 0}
                delay={1}
              />
              <PredictionCard
                title="Augmented CNN"
                genre={results.augmented_cnn_prediction?.genre || "Unknown"}
                probability={results.augmented_cnn_prediction?.probability || 0}
                delay={2}
              />
              {/* <PredictionCard
                title="ResNet18"
                genre={results.resnet18_prediction?.genre || "Unknown"}
                probability={results.resnet18_prediction?.probability || 0}
                delay={3}
              /> */}
            </div>

            <div className="mt-12 text-center">
              <p className="text-slate-400">
                Want to learn more about how these models perform?
              </p>
              <a
                href="/analysis"
                className="mt-4 inline-block text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                View Model Analysis &rarr;
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
