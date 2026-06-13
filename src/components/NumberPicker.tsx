interface NumberPickerProps {
  onFillValue: (value: number) => void;
}

export default function NumberPicker({ onFillValue }: NumberPickerProps) {
  return (
    <section className="mt-6 rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-lg flex flex-col items-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Fill a number</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: 9 }, (_, index) => index + 1).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onFillValue(value)}
            className="h-10 w-10 rounded-3xl bg-slate-100 text-base font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
}
