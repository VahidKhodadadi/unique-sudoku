interface NumberPickerProps {
  onFillValue: (value: number) => void;
}

export default function NumberPicker({ onFillValue }: NumberPickerProps) {
  return (
    <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Fill a number</p>
      <div className="flex flex-wrap items-center gap-3">
        {Array.from({ length: 9 }, (_, index) => index + 1).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => onFillValue(value)}
            className="h-12 w-12 rounded-3xl bg-slate-100 text-lg font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            {value}
          </button>
        ))}
      </div>
    </section>
  );
}
