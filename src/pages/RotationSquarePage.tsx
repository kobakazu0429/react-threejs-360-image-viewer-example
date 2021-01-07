import * as React from "react";
import { Mesh } from "three";
import { Canvas, useFrame } from "react-three-fiber";

export const RotationSquarePage: React.VFC = () => {
  return (
    <Canvas>
      <RotationSquare></RotationSquare>
    </Canvas>
  );
};

export const RotationSquare: React.VFC = () => {
  const ref = React.useRef<Mesh>();

  useFrame(() => {
    if (ref.current) ref.current.rotation.z += 0.01;
  });

  return (
    <mesh
      ref={ref}
      onClick={(e) => console.log("click")}
      onPointerOver={(e) => console.log("hover")}
      onPointerOut={(e) => console.log("unhover")}
    >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial
        attach="material"
        color="hotpink"
        opacity={0.5}
        transparent
      />
    </mesh>
  );
};
