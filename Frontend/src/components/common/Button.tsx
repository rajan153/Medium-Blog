interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return (
    <button
      className="bg-black text-white px-2 py-4 rounded-xl font-normal hover:bg-gray-900"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
