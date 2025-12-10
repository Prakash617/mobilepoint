import React from "react";

type Props = {
  height?: number;
};

const HorizontalLine = ({ height = 1 }: Props) => {
  return (
    <hr
      className={`bg-background my-8 rounded-full`}
      style={{ height: `${height}px` }}
    />
  );
};

export default HorizontalLine;
