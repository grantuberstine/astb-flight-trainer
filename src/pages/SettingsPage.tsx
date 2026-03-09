import { useState, useRef } from 'react';
import { Settings, Download, Upload, Trash2, Info, Zap } from 'lucide-react';
import { exportAllData, importAllData, resetAllData } from '../lib/export-import';
import { useAdaptiveStore } from '../stores/adaptive-store';

export function SettingsPage() {
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const adaptiveMode = useAdaptiveStore((s) => s.adaptiveMode);
  const setAdaptiveMode = useAdaptiveStore((s) => s.setAdaptiveMode);
  const resetAdaptive = useAdaptiveStore((s) => s.resetAdaptive);
  const lastDiagnosticAt = useAdaptiveStore((s) => s.lastDiagnosticAt);

  async function handleExport() {
    try {
      await exportAllData();
    } catch {
      setImportStatus({
        type: 'error',
        message: 'Failed to export data. Please try again.',
      });
    }
  }

  async function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      'This will replace all your current data. Continue?'
    );
    if (!confirmed) {
      // Reset file input so the same file can be selected again
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    try {
      await importAllData(file);
      // Page will reload on success, so this won't be seen
      setImportStatus({ type: 'success', message: 'Data restored successfully!' });
    } catch (err) {
      setImportStatus({
        type: 'error',
        message:
          err instanceof Error ? err.message : 'Failed to import data.',
      });
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  function handleReset() {
    const confirmed = window.confirm(
      'This will permanently delete ALL your progress, scores, and settings. This cannot be undone. Continue?'
    );
    if (!confirmed) return;

    const doubleConfirm = window.confirm(
      'Are you absolutely sure? All data will be lost.'
    );
    if (!doubleConfirm) return;

    resetAllData();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-pink-500" />
        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
      </div>

      {/* Data Management */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-4 text-xl font-semibold text-slate-800">Data Management</h2>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-slate-500">
              Download a backup of all your progress, scores, and settings.
            </p>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-xl bg-pink-400 px-4 py-2 font-medium text-white transition-colors hover:bg-pink-500 shadow-sm"
            >
              <Download className="h-4 w-4" />
              Download Backup
            </button>
          </div>

          <div className="border-t border-slate-200 pt-4">
            <p className="mb-2 text-sm text-slate-500">
              Restore your data from a previously downloaded backup file.
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Upload className="h-4 w-4" />
              Restore Backup
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>

          {importStatus && (
            <div
              className={`rounded-xl p-3 text-sm ${
                importStatus.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-red-50 text-red-600'
              }`}
            >
              {importStatus.message}
            </div>
          )}
        </div>
      </div>

      {/* Adaptive Learning */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-800">
          <Zap className="h-5 w-5 text-pink-500" />
          Adaptive Learning
        </h2>

        <div className="space-y-4">
          {/* Adaptive mode toggle */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Adaptive Mode</p>
              <p className="text-xs text-slate-500">
                Prioritizes weak areas and review cards in practice sessions
              </p>
            </div>
            <button
              onClick={() => setAdaptiveMode(!adaptiveMode)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                adaptiveMode ? 'bg-pink-400' : 'bg-slate-200'
              }`}
              aria-label={adaptiveMode ? 'Disable adaptive mode' : 'Enable adaptive mode'}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  adaptiveMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Last diagnostic date */}
          {lastDiagnosticAt && (
            <div className="text-sm text-slate-500">
              Last diagnostic:{' '}
              <span className="text-slate-800">
                {new Date(lastDiagnosticAt).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Reset adaptive data */}
          <div className="border-t border-slate-200 pt-4">
            <p className="mb-2 text-sm text-slate-500">
              Clear all spaced repetition cards, diagnostic results, and study plan data.
            </p>
            <button
              onClick={() => {
                const confirmed = window.confirm(
                  'Reset all adaptive learning data? This will clear SR cards, diagnostics, and your study plan.'
                );
                if (confirmed) resetAdaptive();
              }}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100"
            >
              <Trash2 className="h-4 w-4" />
              Reset Adaptive Data
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-slate-800">
          <Info className="h-5 w-5" />
          About
        </h2>
        <div className="space-y-1 text-sm text-slate-500">
          <p>
            <span className="font-medium text-slate-800">ASTB Flight Trainer</span>{' '}
            v1.0.0
          </p>
          <p>A free, client-side study tool for the ASTB-E exam.</p>
          <p>All data is stored locally in your browser.</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold text-red-600">Danger Zone</h2>
        <p className="mb-3 text-sm text-slate-500">
          Permanently delete all your progress, scores, and settings. This
          cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
