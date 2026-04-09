import { Link } from "react-router-dom";
import { FileAudio, Activity, Cpu, Music, ArrowRight, ArrowDown } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-white">
          Music Genre <br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Classification
          </span>
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          An advanced deep learning system that analyzes audio tracks and classifies them into distinct musical genres using state-of-the-art convolutional neural networks (CNNs) and ResNet18 architectures on Mel Spectrogram representations.
        </p>
        <div className="pt-4">
          <Link
            to="/predict"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:from-purple-500 hover:to-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all hover:scale-105"
          >
            Try the Model
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Workflow Section */}
      <div className="max-w-4xl mx-auto mt-20">
        <h2 className="text-2xl font-bold text-center mb-10 text-white">System Workflow</h2>
        
        <div className="hidden md:flex items-center justify-between gap-4">
          <WorkflowStep 
            icon={<FileAudio className="w-8 h-8 text-purple-400" />}
            title="Audio Input"
            desc=".wav or .mp3"
          />
          <ArrowRight className="w-6 h-6 text-slate-500 flex-shrink-0" />
          <WorkflowStep 
            icon={<Activity className="w-8 h-8 text-blue-400" />}
            title="Mel Spectrogram"
            desc="Feature Extraction"
          />
          <ArrowRight className="w-6 h-6 text-slate-500 flex-shrink-0" />
          
          <div className="flex flex-col gap-3 relative">
            <WorkflowStep 
              icon={<Cpu className="w-6 h-6 text-emerald-400" />}
              title="CNN / Aug CNN"
              small
            />
            <WorkflowStep 
              icon={<Cpu className="w-6 h-6 text-teal-400" />}
              title="ResNet18"
              small
            />
          </div>
          
          <ArrowRight className="w-6 h-6 text-slate-500 flex-shrink-0" />
          <WorkflowStep 
            icon={<Music className="w-8 h-8 text-purple-400" />}
            title="Genre Prediction"
            desc="Output Class"
            glow
          />
        </div>

        {/* Mobile Workflow */}
        <div className="flex md:hidden flex-col items-center gap-4">
           <WorkflowStep 
            icon={<FileAudio className="w-8 h-8 text-purple-400" />}
            title="Audio Input"
          />
          <ArrowDown className="w-6 h-6 text-slate-500" />
          <WorkflowStep 
            icon={<Activity className="w-8 h-8 text-blue-400" />}
            title="Mel Spectrogram"
          />
           <ArrowDown className="w-6 h-6 text-slate-500" />
          <div className="flex gap-4">
             <WorkflowStep 
               icon={<Cpu className="w-6 h-6 text-emerald-400" />}
               title="CNNs"
               small
             />
             <WorkflowStep 
               icon={<Cpu className="w-6 h-6 text-teal-400" />}
               title="ResNet18"
               small
             />
          </div>
          <ArrowDown className="w-6 h-6 text-slate-500" />
          <WorkflowStep 
            icon={<Music className="w-8 h-8 text-purple-400" />}
            title="Genre Prediction"
            glow
          />
        </div>

      </div>
    </div>
  );
}

function WorkflowStep({ icon, title, desc, small = false, glow = false }) {
  return (
    <div className={`flex flex-col items-center p-4 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm transition-all hover:bg-slate-800 ${
      glow ? "shadow-[0_0_30px_rgba(168,85,247,0.2)] border-purple-500/30" : ""
    } ${small ? "w-32 py-3" : "w-40"}`}>
      <div className={`mb-3 p-3 rounded-lg bg-slate-900 shadow-inner ${
        glow ? "bg-gradient-to-br from-slate-900 to-purple-900/40" : ""
      }`}>
        {icon}
      </div>
      <h3 className={`font-semibold text-white text-center ${small ? "text-sm" : "text-base"}`}>{title}</h3>
      {desc && <p className="text-xs text-slate-400 mt-1 target-center text-center">{desc}</p>}
    </div>
  );
}
