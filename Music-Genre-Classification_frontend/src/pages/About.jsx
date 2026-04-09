import { Database, Server, Cpu, Layers } from "lucide-react";

export default function About() {
  const sections = [
    {
      title: "The GTZAN Dataset",
      icon: <Database className="w-6 h-6 text-purple-400" />,
      content: "The GTZAN genre collection dataset is the most-used public dataset for evaluation in machine listening research for music genre recognition (MGR). It consists of 1000 audio tracks each 30 seconds long. It contains 10 genres, each represented by 100 tracks."
    },
    {
      title: "Audio Processing",
      icon: <Layers className="w-6 h-6 text-blue-400" />,
      content: "Raw audio data is converted into Mel Spectrogram images using the Librosa library. A Mel Spectrogram represents the acoustic time-frequency representation of the sound, allowing our Convolutional Neural Networks to process the audio like standard image classification."
    },
    {
      title: "Backend Architecture",
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      content: "The backend is powered by FastAPI, an incredibly fast Python web framework. It handles incoming audio multipart file uploads, processes them into spectrograms in real-time, and feeds them into the loaded PyTorch models for inference."
    },
    {
      title: "PyTorch Deep Learning",
      icon: <Cpu className="w-6 h-6 text-teal-400" />,
      content: "All AI models evaluated in this project (Standard CNN, Augmented CNN, and ResNet18) were designed, trained, and exported using PyTorch. Custom learning rate schedulers and regularization techniques were critical for pushing model accuracy beyond 90%."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            About the Project
          </h1>
          <p className="text-xl text-slate-300">
            Learn more about the technology stack and methodology behind this genre classification engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, idx) => (
            <div 
              key={idx} 
              className="bg-slate-800/40 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800/60 transition-colors shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-700 shadow-inner">
                   {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-300 leading-relaxed text-lg">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl border border-purple-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to test it out?</h3>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Head over to the predict page, upload an audio sample in .wav or .mp3 format, and see the deep learning models working in real-time.
          </p>
          <a href="/predict" className="inline-block bg-white text-slate-900 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-white/20 transition-all hover:-translate-y-1">
            Go to Predict Page
          </a>
        </div>
      </div>
    </div>
  );
}
