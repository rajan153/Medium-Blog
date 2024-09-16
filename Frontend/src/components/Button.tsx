interface button {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export function Button({ label, onClick }: button) {
  return (
    <button
      onClick={onClick}
      className="rounded-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 me-2 mb-2"
    >
      {label}
    </button>
  );
}
