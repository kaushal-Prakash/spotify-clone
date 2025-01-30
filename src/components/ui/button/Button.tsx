interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-white bg-spotify-medium-gray transition-all duration-300 rounded-lg hover:bg-spotify-green focus:outline-none ${className}`}
    >
      {children}
    </button>
  );
};

