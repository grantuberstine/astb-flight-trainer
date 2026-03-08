import { useState, useRef } from 'react';
import { Settings, Download, Upload, Trash2, Info } from 'lucide-react';
import { exportAllData, importAllData, resetAllData } from '../lib/export-import';

export function SettingsPage() {
  const [importStatus, setImportStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        <Settings className="h-8 w-8 text-gold-400" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      {/* Data Management */}
      <div className="rounded-lg bg-navy-800 p-6">
        <h2 className="mb-4 text-xl font-semibold">Data Management</h2>

        <div className="space-y-4">
          <div>
            <p className="mb-2 text-sm text-navy-300">
              Download a backup of all your progress, scores, and settings.
            </p>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-md bg-gold-500 px-4 py-2 font-medium text-navy-900 transition-colors hover:bg-gold-400"
            >
              <Download className="h-4 w-4" />
              Download Backup
            </button>
          </div>

          <div className="border-t border-navy-700 pt-4">
            <p className="mb-2 text-sm text-navy-300">
              Restore your data from a previously downloaded backup file.
            </p>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-navy-600 px-4 py-2 font-medium text-white transition-colors hover:bg-navy-700">
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
              className={`rounded-md p-3 text-sm ${
                importStatus.type === 'success'
                  ? 'bg-success/20 text-success'
                  : 'bg-danger/20 text-danger'
              }`}
            >
              {importStatus.message}
            </div>
          )}
        </div>
      </div>

      {/* About */}
      <div className="rounded-lg bg-navy-800 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Info className="h-5 w-5" />
          About
        </h2>
        <div className="space-y-1 text-sm text-navy-300">
          <p>
            <span className="font-medium text-white">ASTB Flight Trainer</span>{' '}
            v1.0.0
          </p>
          <p>A free, client-side study tool for the ASTB-E exam.</p>
          <p>All data is stored locally in your browser.</p>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-danger/30 bg-navy-800 p-6">
        <h2 className="mb-4 text-xl font-semibold text-danger">Danger Zone</h2>
        <p className="mb-3 text-sm text-navy-300">
          Permanently delete all your progress, scores, and settings. This
          cannot be undone.
        </p>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 rounded-md border border-danger px-4 py-2 font-medium text-danger transition-colors hover:bg-danger hover:text-white"
        >
          <Trash2 className="h-4 w-4" />
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
