import * as React from "react";

interface CircleXProps {
  fill?: string;
}

export const CircleX: React.FC<CircleXProps> = ({ fill = "black" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={fill}
    width="24px"
    height="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </svg>
);
