export default function ModelTable() {
  const models = [
    {
      name: "CNN",
      accuracy: "77.36%",
      description: "Standard Convolutional Neural Network trained directly on Mel Spectrogram representations of audio tracks.",
      features: "Mel Spectrogram",
    },
    {
      name: "Augmented CNN",
      accuracy: "77.22%",
      description: "CNN trained on an augmented dataset including time-stretching, pitch-shifting, and background noise additions.",
      features: "Augmented Mel Spectrogram",
    },
    {
      name: "ResNet18",
      accuracy: "82.16%",
      description: "A deep residual network architecture adapted for 2D visual representations of audio, showing highest generalization.",
      features: "Mel Spectrogram",
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-700 shadow-xl bg-slate-800/50 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-900/80 text-xs uppercase text-slate-400 border-b border-slate-700">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold text-white">Model Architecture</th>
              <th scope="col" className="px-6 py-4 font-semibold text-white">Accuracy</th>
              <th scope="col" className="px-6 py-4 font-semibold text-white">Features Used</th>
              <th scope="col" className="px-6 py-4 font-semibold text-white">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {models.map((model, idx) => (
              <tr key={idx} className="hover:bg-slate-700/30 transition-colors">
                <td className="whitespace-nowrap px-6 py-4 font-medium text-white">
                  {model.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-1 text-xs font-medium text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    {model.accuracy}
                  </span>
                </td>
                <td className="px-6 py-4">{model.features}</td>
                <td className="px-6 py-4 leading-relaxed">{model.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
