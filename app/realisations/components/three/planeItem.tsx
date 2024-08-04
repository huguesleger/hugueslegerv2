"use client";

import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import gsap from "gsap";
import { Color } from "three";

const Plane = ({ texture, width, height, active, ...props }: any) => {
  const $mesh = useRef<any>();
  const { viewport } = useThree();
  const tex: any = useTexture(texture);

  useEffect(() => {
    if ($mesh.current.material) {
      //  Setting the 'uZoomScale' uniform in the 'Plane' component to resize the texture proportionally to the dimensions of the viewport.
      $mesh.current.material.uniforms.uZoomScale.value.x =
        viewport.width / width;
      $mesh.current.material.uniforms.uZoomScale.value.y =
        viewport.height / height;

      gsap.to($mesh.current.material.uniforms.uProgress, {
        value: active ? 1 : 0,
      });

      gsap.to($mesh.current.material.uniforms.uRes.value, {
        x: active ? viewport.width : width,
        y: active ? viewport.height : height,
      });
    }
  }, [viewport, active]);

  const shaderArgs = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uShift: { value: 0 },
        uDistor: { value: 0.25 },
        zoom: { value: 1 },
        uZoomScale: { value: { x: 1, y: 1 } },
        uTex: { value: tex },
        uRes: { value: { x: 1, y: 1 } },
        uImageRes: {
          value: { x: tex.source.data.width, y: tex.source.data.height },
        },
        uPos: { value: { x: 0, y: 0 } },
        color: { value: new Color("white") },
        grayscale: { value: 1 },
        opacity: { value: 1 },
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec2 uZoomScale;
        uniform float uShift;
        uniform float uDistor;
        uniform vec2 uPos;

        void main() {
          vUv = uv;
          vec3 pos = position;
          float angle = uProgress * 3.14159265 / 2.;
          float wave = cos(angle);
          float c = sin(length(uv - .5) * 15. + uProgress * 12.) * .5 + .5;
          pos.x *= mix(1., uZoomScale.x + wave * c, uProgress);
          pos.y *= mix(1., uZoomScale.y + wave * c, uProgress);
          pos.x = pos.x + ((sin(uv.y * 3.1415926535897932384626433832795) * uShift * 5.0) * 0.125);
          pos.y = pos.y + ((sin(-uv.y * 3.1415926535897932384626433832795) * uDistor * 5.0) * 0.125);

          gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
        }
      `,
      fragmentShader: /* glsl */ `
      uniform sampler2D uTex;
      uniform vec2 uRes;
      uniform vec2 uZoomScale;
      uniform vec2 uImageRes;
      uniform float uShift;
      uniform float uDistor;
      uniform float zoom;
      uniform vec2 uPos;
      uniform vec3 color;
      uniform float grayscale;
      uniform float opacity;

        const vec3 luma = vec3(.299, 0.587, 0.114);
  vec4 toGrayscale(vec4 color, float intensity) {
    return vec4(mix(color.rgb, vec3(dot(color.rgb, luma)), intensity), color.a);
  }
      /*------------------------------
      Background Cover UV
      --------------------------------
      u = basic UV
      s = screensize
      i = image size
      ------------------------------*/
      vec2 CoverUV(vec2 u, vec2 s, vec2 i) {
        float rs = s.x / s.y; // Aspect screen size
        float ri = i.x / i.y; // Aspect image size
        vec2 st = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x); // New st
        vec2 o = (rs < ri ? vec2((st.x - s.x) / 2.0, 0.0) : vec2(0.0, (st.y - s.y) / 2.0)) / st; // Offset
        return u * s / st + o;
      }

      varying vec2 vUv;
        void main() {
          vec2 uv = CoverUV(vUv, uRes, uImageRes);
          vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);
          vec3 tex = texture2D(uTex, zUv).rgb;
          //gl_FragColor = vec4( tex, 1.0 );
          gl_FragColor = toGrayscale(texture2D(uTex, zUv) * vec4(color, opacity), grayscale);
        }
      `,
    }),
    [tex]
  );

  return (
    <mesh ref={$mesh} {...props}>
      <planeGeometry args={[width, height, 100, 100]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default Plane;
