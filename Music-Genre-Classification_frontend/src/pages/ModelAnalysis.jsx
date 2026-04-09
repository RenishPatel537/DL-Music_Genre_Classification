import { Link } from "react-router-dom";
import LineChart from "../components/LineChart";
import ModelTable from "../components/ModelTable";
import ConfusionMatrix from "../components/ConfusionMatrix";
import { ArrowLeft } from "lucide-react";

export default function ModelAnalysis() {
  const labels = [
    "blues",
    "classical",
    "country",
    "disco",
    "hiphop",
    "jazz",
    "metal",
    "pop",
    "reggae",
    "rock",
  ];
  const cnn_matrix = [
    [226, 0, 23, 1, 0, 19, 0, 0, 1, 15],
    [0, 244, 4, 0, 0, 27, 0, 2, 0, 7],
    [8, 5, 221, 3, 1, 18, 0, 5, 2, 22],
    [1, 6, 8, 156, 43, 5, 3, 45, 1, 17],
    [3, 0, 1, 19, 231, 0, 12, 8, 4, 7],
    [8, 4, 12, 0, 0, 259, 0, 2, 0, 0],
    [6, 0, 1, 1, 2, 0, 253, 0, 2, 20],
    [0, 0, 19, 3, 8, 0, 0, 245, 5, 5],
    [5, 0, 1, 15, 8, 0, 2, 16, 227, 11],
    [11, 6, 37, 7, 1, 17, 14, 35, 15, 142],
  ];

  const res_matrix = [
    [254, 0, 4, 4, 0, 1, 1, 0, 5, 16],
    [0, 280, 0, 0, 0, 2, 0, 0, 2, 0],
    [4, 0, 230, 6, 0, 16, 0, 0, 3, 26],
    [1, 11, 10, 168, 27, 1, 5, 47, 14, 1],
    [3, 0, 0, 16, 217, 7, 24, 13, 2, 3],
    [0, 0, 8, 0, 0, 277, 0, 0, 0, 0],
    [6, 0, 0, 2, 0, 0, 260, 0, 0, 17],
    [0, 0, 17, 2, 0, 0, 0, 252, 12, 2],
    [6, 10, 4, 9, 0, 16, 3, 3, 219, 15],
    [8, 2, 32, 3, 0, 9, 7, 35, 5, 184],
  ];

  // Mock Data for charts since real image/data is not available
  const epochs = Array.from({ length: 30 }, (_, i) => i + 1);

  const cnnTrainAcc = [
    40.46, 51.48, 58.66, 62.13, 65.66, 69.61, 71.35, 73.88, 75.63, 77.08, 78.45,
    78.89, 80.42, 81.29, 81.65,
  ];
  const cnnValAcc = [
    57.16, 49.86, 60.91, 67.51, 69.93, 70.74, 70.63, 72.98, 71.89, 75.44, 72.6,
    72.49, 69.33, 70.77, 80.28,
  ];

  const augTrainAcc = [
    32.27, 41.56, 45.16, 47.05, 50.15, 52.31, 53.9, 56.22, 58.63, 59.28, 60.5,
    62.24, 61.51, 63.22, 64.77, 64.87, 66.61, 68.18, 68.17, 69.58, 69.7, 72.29,
    74.5, 76.6, 77.77, 79.62, 80.13, 82.41, 82.69, 84.12,
  ];
  const augValAcc = [
    37.4, 41.51, 46.46, 59.23, 62.18, 67.26, 62.42, 39.89, 70.04, 58.98, 69.4,
    71.89, 62.7, 73.26, 67.47, 66.39, 74.84, 61.16, 68.39, 69.82, 72.42, 75.54,
    75.61, 72.67, 72.98, 77.4, 71.54, 75.51, 75.4, 77.79,
  ];

  const resTrainAcc = [
    81.89, 97.23, 98.62, 98.76, 98.89, 98.84, 99.03, 98.92, 98.79, 99.25, 99.5,
    99.69, 99.0, 99.25, 98.97, 99.04, 99.58, 99.64, 99.66, 99.01,
  ];
  const resValAcc = [
    81.51, 79.16, 81.09, 80.21, 80.32, 81.75, 81.86, 80.04, 80.63, 81.65, 82.18,
    83.58, 83.02, 79.93, 79.37, 79.89, 83.3, 83.65, 79.89, 81.79,
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-purple-400 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <div className="max-w-5xl mx-auto space-y-16">
        <header className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Model Analysis & Metrics
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Detailed performance breakdown of the deep learning architectures
            evaluated in this pipeline.
          </p>
        </header>

        {/* --- Model Comparison Table --- */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              1
            </span>
            Architecture Comparison
          </h2>
          <ModelTable />
        </section>

        {/* --- Standard CNN --- */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Standard CNN Model
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            The baseline sequential Convolutional Neural Network uses
            alternating Conv2D and MaxPooling layers to extract features from
            the Mel Spectrogram. It provides a solid foundation but struggles
            slightly with minority classes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <LineChart
                labels={epochs}
                trainData={cnnTrainAcc}
                valData={cnnValAcc}
                title="Accuracy over Epochs"
              />
            </div>
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              <ConfusionMatrix
                title="CNN Confusion Matrix"
                labels={labels}
                matrix={cnn_matrix}
              />
            </div>
          </div>
        </section>

        {/* --- Augmented CNN --- */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Augmented CNN</h2>
          <div className="prose prose-invert max-w-none text-slate-300 mb-8 leading-relaxed">
            <p className="mb-4">
              To mitigate overfitting, this model is trained on a synthetic
              dataset augmented with standard audio perturbations.
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-4 text-purple-200">
              <li>
                <strong>Time-stretching:</strong> Modifying tempo without
                altering pitch.
              </li>
              <li>
                <strong>Pitch-shifting:</strong> Altering pitch without altering
                tempo.
              </li>
              <li>
                <strong>Gaussian Noise:</strong> Simulating varying recording
                conditions.
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <LineChart
                labels={epochs}
                trainData={augTrainAcc}
                valData={augValAcc}
                title="Accuracy (Augmented)"
              />
            </div>
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              <ConfusionMatrix
                title="Augmented CNN Confusion Matrix"
                labels={labels}
                matrix={cnn_matrix}
              />
            </div>
          </div>
        </section>

        {/* --- ResNet18 --- */}
        <section className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            ResNet18 Architecture
          </h2>
          <p className="text-slate-300 mb-8 leading-relaxed">
            Adapting the ResNet18 image classification model via Transfer
            Learning. By treating Mel Spectrograms as 3-channel visual inputs,
            this deep residual network leverages pre-trained weights to achieve
            state-of-the-art accuracy, bypassing the vanishing gradient problem
            inherent in deep sequential models.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700">
              <LineChart
                labels={epochs}
                trainData={resTrainAcc}
                valData={resValAcc}
                title="Accuracy (ResNet18)"
              />
            </div>
            <div className="h-[400px] bg-slate-900/50 rounded-xl p-4 border border-slate-700 flex flex-col items-center justify-center overflow-hidden">
              <ConfusionMatrix
                title="ResNet18 Confusion Matrix"
                labels={labels}
                matrix={res_matrix}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
