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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="mx-4 w-full max-w-sm rounded-xl bg-navy-800 p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-white">Leave Practice?</h2>
        <p className="mt-2 text-sm text-navy-300">
          You've answered {answeredCount} of {totalCount} questions. Your
          progress so far will be saved.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-navy-500 px-4 py-2.5 font-medium text-navy-200 transition-colors hover:bg-navy-700"
          >
            Keep Practicing
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-red-700"
          >
            End Session
          </button>
        </div>
      </div>
    </div>
  );
}
