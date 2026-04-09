import { UploadCloud, Music, X, Loader2 } from "lucide-react";
import { useState, useRef } from "react";

export default function UploadAudio({ onFileSelect, onPredict, isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file) => {
    if (file && (file.type === "audio/wav" || file.type === "audio/mpeg" || file.name.endsWith(".wav") || file.name.endsWith(".mp3"))) {
      setSelectedFile(file);
      onFileSelect(file);
      
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    } else {
      alert("Please upload a .wav or .mp3 file");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Upload Audio</h2>
        <p className="text-slate-400">Select a .wav or .mp3 file to classify its genre</p>
      </div>

      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-all ${
            dragActive 
              ? "border-purple-500 bg-purple-500/10" 
              : "border-slate-600 hover:border-purple-400 hover:bg-slate-700/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept=".wav,.mp3,audio/wav,audio/mpeg"
            onChange={handleChange}
          />
          <div className="bg-slate-800 p-4 rounded-full mb-4 shadow-lg ring-1 ring-white/10">
            <UploadCloud className="w-8 h-8 text-purple-400" />
          </div>
          <p className="text-lg font-medium text-white mb-1">
            Drag & drop your audio here
          </p>
          <p className="text-sm text-slate-400">or click to browse</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-700 flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3 rounded-lg">
              <Music className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-400">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={clearFile}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {audioUrl && (
            <div className="w-full">
              <audio controls className="w-full h-12 rounded-lg" src={audioUrl}>
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={onPredict}
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${isLoading 
                  ? "bg-slate-700 cursor-not-allowed opacity-80" 
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 hover:shadow-purple-500/25 hover:-translate-y-0.5"
                }
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Audio...
                </>
              ) : (
                "Predict Genre"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
