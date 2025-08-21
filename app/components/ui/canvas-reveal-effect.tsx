"use client";

import { cn } from "../ui/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: [number, number, number][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <DotMatrix
        colors={colors}
        dotSize={dotSize}
        opacities={opacities}
        shader={`
          float animation_speed_factor = ${animationSpeed.toFixed(1)};
          float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
          opacity *= step(intro_offset, u_time * animation_speed_factor);
          opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
        `}
        center={["x", "y"]}
      />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: [number, number, number][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  
}) => {
  const uniforms = useMemo(() => {
    const colorsArray: [number, number, number][] = Array(6)
      .fill(colors[0])
      .map((c) => c);

    return {
      u_colors: {
        value: colorsArray.map((c) => new THREE.Vector3(c[0] / 255, c[1] / 255, c[2] / 255)),
      },
      u_opacities: { value: opacities },
      u_total_size: { value: totalSize },
      u_dot_size: { value: dotSize },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return <Shader source={shader} uniforms={uniforms} />;
};

interface ShaderUniforms {
  [key: string]: { value: number | number[] | THREE.Vector3[] };
}

interface ShaderProps {
  source: string;
  uniforms: ShaderUniforms;
  maxFps?: number;
}

const Shader: React.FC<ShaderProps> = ({ source, uniforms, maxFps = 60 }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
    </Canvas>
  );
};

interface ShaderMaterialProps {
  source: string;
  uniforms: ShaderUniforms;
  maxFps?: number;
}

const ShaderMaterial: React.FC<ShaderMaterialProps> = ({ source, uniforms, maxFps = 60 }) => {
  const ref = useRef<THREE.Mesh>(null);
  const { size } = useThree();
  let lastFrameTime = 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime < 1 / maxFps) return;
    lastFrameTime = timestamp;

    const material = ref.current.material as THREE.ShaderMaterial;
    if (material.uniforms.u_time) material.uniforms.u_time.value = timestamp;
  });

  const preparedUniforms: { [key: string]: THREE.IUniform } = useMemo(() => {
    const u: { [key: string]: THREE.IUniform } = {};
    for (const key in uniforms) {
      u[key] = { value: uniforms[key].value };
    }
    u.u_time = { value: 0 };
    u.u_resolution = { value: new THREE.Vector2(size.width * 2, size.height * 2) };
    return u;
  }, [uniforms, size.width, size.height]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 fragCoord;
          void main() {
            fragCoord = position.xy;
            gl_Position = vec4(position.xy, 0.0, 1.0);
          }
        `,
        fragmentShader: source,
        uniforms: preparedUniforms,
        glslVersion: THREE.GLSL3,
      }),
    [source, preparedUniforms]
  );

  return (
    <mesh ref={ref}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export default CanvasRevealEffect;
