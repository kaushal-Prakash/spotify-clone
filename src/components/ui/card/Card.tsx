interface CardProps{
    children:React.ReactNode;
    className?:string;
};

interface CardContentProps{
    children:React.ReactNode;
    className?:string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`bg-spotify-dark-gray rounded-2xl shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
}

export const CardContent : React.FC<CardContentProps> = ({ children, className }) => {
  return <div className={`space-y-4 ${className}`}>{children}</div>;
}
