import React from 'react';

type Props = {
  text: string;
  bgColor: string;     // e.g., "bg-blue-500"
  textColor: string;   // e.g., "text-white"
  size ?: string
};

const Button = (props: Props) => {
  return (
    <button
      className={`px-6 ${props.bgColor} ${props.size} font-semibold ${props.textColor} py-2  rounded-lg`}
    >
      {props.text}
    </button>
  );
};

export default Button;
