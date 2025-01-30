interface InputProps {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  accept?: string;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
  accept,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={type === "file" ? undefined : value} // Prevents file input error
      onChange={onChange}
      required={required}
      accept={accept}
      className="w-full p-2 border text-spotify-light-gray bg-spotify-black rounded-md focus:outline-none focus:ring-2 focus:ring-spotify-green"
    />
  );
};
