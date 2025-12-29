import React from "react";

type Props = {
  text: string;
  color?: "success" | "danger" | "warning" | "primary";
  bgColor?: string; // hex or any CSS color
};

const textColorMap = {
  success: "text-success",
  danger: "text-danger",
  warning: "text-yellow-600",
  primary: "text-primary",
};

const FreeAdvertizemantCard = ({
  text,
  color = "success",
  bgColor,
}: Props) => {
  return (
    <button
      className={`capitalize px-3 cursor-pointer rounded-xs py-1 text-[12px] ${
        textColorMap[color]
      }`}
      style={{
        backgroundColor: bgColor ?? "#fcf3fd",
      }}
    >
      {text}
    </button>
  );
};

export default FreeAdvertizemantCard;
