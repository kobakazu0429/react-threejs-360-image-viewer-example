import * as React from "react";
import {
  MathUtils,
  Mesh,
  PerspectiveCamera,
  TextureLoader,
  Vector3,
} from "three";
import { Canvas, useThree, useFrame, useLoader } from "react-three-fiber";

import room from "../../assets/360image/room.jpg";
// import pinkish from "../../assets/texture/pinkish.jpg";

export const Sphere: React.VFC = () => {
  const ref = React.useRef<Mesh>();
  // const texture = useLoader(TextureLoader, pinkish);
  const texture = useLoader(TextureLoader, room);
  const lonlat = React.useRef<{ lon: number; lat: number }>({ lon: 0, lat: 0 });

  const { scene, camera, setDefaultCamera } = useThree();

  // useFrame(() => {
  //   if (ref.current) {
  //     lonlat.current.lat = Math.max(-85, Math.min(85, lonlat.current.lat));
  //     const phi = MathUtils.degToRad(90 - lonlat.current.lat);
  //     const theta = MathUtils.degToRad(lonlat.current.lon);

  //     const x = 500 * Math.sin(phi) * Math.cos(theta);
  //     const y = 500 * Math.cos(phi);
  //     const z = 500 * Math.sin(phi) * Math.sin(theta);

  //     camera.lookAt(x, y, z);
  //   }
  // });

  console.log(texture);

  return (
    <mesh ref={ref} scale={[-1, 1, 1]}>
      <sphereGeometry attach="geometry" args={[500, 60, 40]} />
      {/* <planeBufferGeometry attach="geometry" args={[3, 3]} /> */}
      <meshBasicMaterial attach="material" map={texture} />
      {/* <meshStandardMaterial attach="material" map={texture} /> */}
    </mesh>
  );
};

// const Camera: React.VFC = () => {
//   const ref = React.useRef<PerspectiveCamera>();
//   const { setDefaultCamera } = useThree();

//   React.useEffect(() => {
//     if (!ref.current) return;
//     setDefaultCamera(ref.current);
//     ref.current.lookAt(new Vector3(-100, 0, 10));
//   }, [ref, setDefaultCamera]);

//   const fov = 75;

//   return (
//     <perspectiveCamera
//       position={[3, 3, 3]}
//       // args={[fov, window.innerWidth / window.innerHeight, 1, 1100]}
//       args={[90, window.innerWidth / window.innerHeight]}
//       ref={ref}
//     />
//   );
// };

export const SpherePage: React.VFC = () => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: window.innerWidth / window.innerHeight,
        near: 1,
        far: 1100,
        position: [0, 0, 0],
      }}
    >
      <React.Suspense fallback={null}>
        <Sphere></Sphere>
      </React.Suspense>
    </Canvas>
  );
};
