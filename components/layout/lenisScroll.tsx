"use client";

import ReactLenis from "@studio-freight/react-lenis";
import React, { ReactNode, useRef } from "react";

type ScrollType = {
  children: ReactNode;
  root: boolean;
  options: any;
};

const LenisScroll = ({ children, root, options }: ScrollType): JSX.Element => {
  return (
    <ReactLenis root={root} options={{ ...options }}>
      <main>{children}</main>
    </ReactLenis>
  );
};

export default LenisScroll;
