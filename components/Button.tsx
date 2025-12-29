import React from "react";

type Props = {
  text: string;
  bgColor?: string;     // Tailwind background class, e.g., "bg-blue-500"
  textColor?: string;   // Tailwind text color class, e.g., "text-white"
  size?: "sm" | "md" | "lg";  // predefined sizes
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;  // optional: make button full width
  rounded?: boolean;    // optional: rounded corners
};

const Button: React.FC<Props> = ({
  text,
  bgColor = "bg-black",
  textColor = "text-white",
  size = "md",
  disabled = false,
  onClick,
  fullWidth = false,
  rounded = true,
}) => {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${bgColor} ${textColor} 
        ${sizeClasses[size]} 
        ${rounded ? "rounded-lg" : ""} 
        ${fullWidth ? "w-full" : "w-auto"}
        font-semibold 
        cursor-pointer 
        disabled:opacity-50 disabled:cursor-not-allowed 
        hover:brightness-90 
        transition
      `}
    >
      {text}
    </button>
  );
};

export default Button;
