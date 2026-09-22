import type { FieldDef, FieldKey } from "@/lib/checkout";

interface FieldInputProps {
  field: FieldDef;
  value: string;
  error?: string;
  onChange: (key: FieldKey, value: string) => void;
}

export default function FieldInput({
  field,
  value,
  error,
  onChange,
}: FieldInputProps) {
  const id = `checkout-${field.key}`;
  return (
    <div className={field.full ? "sm:col-span-2" : ""}>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[13px] font-semibold text-[#1C1C1A]"
      >
        {field.label}
        {field.optional && (
          <span className="ml-1 font-normal text-[#1C1C1A]/65">(optional)</span>
        )}
      </label>
      <input
        id={id}
        name={field.key}
        type={field.type}
        autoComplete={field.autoComplete}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(field.key, e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-[48px] w-full rounded-[8px] border bg-white px-4 text-[15px] text-[#1C1C1A] transition-colors outline-none placeholder:text-[#1C1C1A]/65 ${
          error
            ? "border-red-600 focus:border-red-600"
            : "border-[#1C1C1A]/50 focus:border-[#2F5D3A]"
        }`}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[13px] font-medium text-red-700"
        >
          {error}
        </p>
      )}
    </div>
  );
}
