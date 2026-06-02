export function Input({ label, name, value, setForm, type = 'text', required = true }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <input
        className="mt-1 w-full rounded border border-slate-300 px-3 py-2 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        name={name}
        onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))}
        required={required}
        type={type}
        value={value}
      />
    </label>
  )
}

export function Textarea({ label, value, onChange, placeholder, required = true, rows = 4 }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <textarea
        className="mt-1 w-full rounded border border-slate-300 px-3 py-2 outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={value}
      />
    </label>
  )
}
