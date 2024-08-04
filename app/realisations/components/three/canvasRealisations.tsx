"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Carousel from "./carousel";

const CanvasRealisations = ({ props }: any) => {
  return (
    <div className="container-canvas">
      <Canvas className="wrapper-canvas">
        <Suspense fallback={null}>
          <color attach="background" args={["#171717"]} />
          <Carousel projets={props} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasRealisations;
