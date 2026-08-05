import React from "react";

type Props = {
  className: string;
  path: string;
};

const Svg = ({ className, path, ...rest }: Props) => (
  <svg className={className} viewBox="0 0 24 24" {...rest}>
    <path fill="currentColor" d={path} />
  </svg>
);

export default Svg;
