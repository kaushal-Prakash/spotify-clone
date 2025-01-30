interface TextAreaProps {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea: React.FC<TextAreaProps> = ({
  id,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded-md focus:outline-none bg-spotify-black text-spotify-light-gray focus:ring-2 focus:ring-spotify-green"
    />
  );
};
