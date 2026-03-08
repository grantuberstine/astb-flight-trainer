import { get, set, del } from 'idb-keyval';
import { PERSISTED_STORE_KEYS } from './storage';

interface ExportMeta {
  version: number;
  exportedAt: string;
  app: string;
}

interface ExportData {
  meta: ExportMeta;
  stores: Record<string, unknown>;
}

export async function exportAllData(): Promise<void> {
  const stores: Record<string, unknown> = {};

  for (const key of PERSISTED_STORE_KEYS) {
    const value = await get(key);
    if (value !== undefined) {
      stores[key] = value;
    }
  }

  const data: ExportData = {
    meta: {
      version: 1,
      exportedAt: new Date().toISOString(),
      app: 'astb-flight-trainer',
    },
    stores,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });

  const date = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `astb-backup-${date}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function importAllData(file: File): Promise<void> {
  const text = await file.text();
  const data: ExportData = JSON.parse(text);

  if (!data.meta || data.meta.app !== 'astb-flight-trainer') {
    throw new Error(
      'Invalid backup file. This file was not exported from ASTB Flight Trainer.'
    );
  }

  for (const key of PERSISTED_STORE_KEYS) {
    if (key in data.stores) {
      await set(key, data.stores[key]);
    }
  }

  window.location.reload();
}

export async function resetAllData(): Promise<void> {
  for (const key of PERSISTED_STORE_KEYS) {
    await del(key);
  }

  window.location.reload();
}
