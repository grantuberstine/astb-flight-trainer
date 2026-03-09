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
        className="inline-flex items-center gap-1 text-sm text-navy-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex items-center gap-3">
        <Compass className="h-8 w-8 text-gold-400" />
        <div>
          <h1 className="text-3xl font-bold">PBM Trainer</h1>
          <p className="text-sm text-navy-300">
            Performance Based Measures concept exercises
          </p>
        </div>
      </div>

      {/* Info card */}
      <div className="rounded-lg border border-navy-700 bg-navy-800/50 p-4 text-sm text-navy-300">
        <p>
          <span className="font-semibold text-white">Performance Based Measures (PBM)</span> tests
          your multitasking ability, spatial orientation, and divided attention. While the real test
          uses a joystick and throttle, these exercises build the cognitive skills that matter.
        </p>
      </div>

      {/* Tab buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('directional')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'directional'
              ? 'bg-navy-700 text-gold-400 ring-1 ring-gold-400/50'
              : 'bg-navy-800 text-navy-300 hover:text-white'
          }`}
        >
          <Compass className="h-4 w-4" />
          Directional Reasoning
        </button>
        <button
          onClick={() => setActiveTab('divided')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeTab === 'divided'
              ? 'bg-navy-700 text-gold-400 ring-1 ring-gold-400/50'
              : 'bg-navy-800 text-navy-300 hover:text-white'
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
