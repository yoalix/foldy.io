import React from "react";

export const Moneybag = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="24" height="24" fill="url(#patternMoneybag)" />
      <defs>
        <pattern
          id="patternMoneybag"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#imageMoneybag" transform="scale(0.01)" />
        </pattern>
        <image
          id="imageMoneybag"
          width="100"
          height="100"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};
