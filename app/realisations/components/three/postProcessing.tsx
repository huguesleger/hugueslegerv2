import { MeshReflectorMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { forwardRef } from "react";

const PostProcessing = forwardRef((_, ref: any) => {
  const { viewport } = useThree();

  return (
    <mesh
      position={[0, -2.02, 1]}
      receiveShadow
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <planeGeometry args={[viewport.width * 2, viewport.height]} />
      <MeshReflectorMaterial
        blur={[300, 50]}
        resolution={1024}
        mixBlur={1}
        mixStrength={100}
        roughness={1}
        depthScale={2.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#171717"
        metalness={0.8}
        mirror={1}
      />
    </mesh>
  );
});

export default PostProcessing;
