import * as React from "react";
import { Mesh } from "three";
import { Canvas, useFrame } from "react-three-fiber";

export const RotationCubePage: React.VFC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1000] }}>
      <RotationCube></RotationCube>
    </Canvas>
  );
};

export const RotationCube: React.VFC = () => {
  const ref = React.useRef<Mesh>();

  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry attach="geometry" args={[400, 400, 400]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};
