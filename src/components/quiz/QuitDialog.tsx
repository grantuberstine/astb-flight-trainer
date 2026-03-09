interface QuitDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  answeredCount: number;
  totalCount: number;
}

export function QuitDialog({
  open,
  onConfirm,
  onCancel,
  answeredCount,
  totalCount,
}: QuitDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800">Leave Practice?</h2>
        <p className="mt-2 text-sm text-slate-500">
          You've answered {answeredCount} of {totalCount} questions. Your
          progress so far will be saved.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            Keep Practicing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-red-600"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
}
