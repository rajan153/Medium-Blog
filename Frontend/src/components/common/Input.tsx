interface inputInterface {
  label: string;
  placeholder: string;
  type: string;
  onChange: any;
}

function Input({ type, label, placeholder, onChange }: inputInterface) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="border p-2 border-slate-300 rounded-lg"
        onChange={onChange}
      />
    </div>
  );
}

export default Input;
