import React from 'react';

type Props = {
  text: string;
  bgColor: string;     // e.g., "bg-blue-500"
  textColor: string;   // e.g., "text-white"
};

const Button = (props: Props) => {
  return (
    <button
      className={`w-full ${props.bgColor} font-semibold ${props.textColor} py-3 rounded-lg`}
    >
      {props.text}
    </button>
  );
};

export default Button;
