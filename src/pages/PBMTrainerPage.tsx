import { useState } from 'react';
import { Link } from 'react-router';
import { Compass, Layers, ArrowLeft } from 'lucide-react';
import { DirectionalReasoning } from '../components/pbm/DirectionalReasoning';
import { DividedAttention } from '../components/pbm/DividedAttention';

const TABS = ['directional', 'divided'] as const;
type Tab = (typeof TABS)[number];

export function PBMTrainerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('directional');

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3">
        <Compass className="h-8 w-8 text-pink-500" />
        <div>
          <h1 className="text-3xl font-bold text-slate-800">PBM Trainer</h1>
          <p className="text-sm text-slate-500">
            Performance Based Measures concept exercises
          </p>
        </div>
      </div>

      {/* Info card */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm text-sm text-slate-500">
        <p>
          <span className="font-semibold text-slate-800">Performance Based Measures (PBM)</span> tests
          your multitasking ability, spatial orientation, and divided attention. While the real test
          uses a joystick and throttle, these exercises build the cognitive skills that matter.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('directional')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'directional'
              ? 'bg-slate-50 text-pink-500 ring-1 ring-pink-300/50'
              : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-100'
          }`}
        >
          <Compass className="h-4 w-4" />
          Directional Reasoning
        </button>
        <button
          onClick={() => setActiveTab('divided')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'divided'
              ? 'bg-slate-50 text-pink-500 ring-1 ring-pink-300/50'
              : 'bg-white text-slate-500 hover:text-slate-800 border border-slate-100'
          }`}
        >
          <Layers className="h-4 w-4" />
          Divided Attention
        </button>
      </div>

      {/* Active exercise */}
      {activeTab === 'directional' ? <DirectionalReasoning /> : <DividedAttention />}
    </div>
  );
}
