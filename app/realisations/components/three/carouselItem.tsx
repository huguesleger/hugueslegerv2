"use client";

import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import PlaneItem from "./planeItem";
import { easing } from "maath";

const CarouselItem = ({
  index,
  width,
  height,
  setActivePlane,
  activePlane,
  item,
}: any) => {
  const $root = useRef<any>();
  const [hover, setHover] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isCloseActive, setCloseActive] = useState(false);
  const { viewport } = useThree();
  const timeoutID = useRef<any>();

  useEffect(() => {
    if (activePlane === index) {
      setIsActive(activePlane === index);
      setCloseActive(true);
    } else {
      setIsActive(false);
    }
  }, [activePlane]);

  useEffect(() => {
    gsap.killTweensOf($root.current.position);
    gsap.to($root.current.position, {
      z: isActive ? 0 : -0.01,
      duration: 0.2,
      ease: "power3.out",
      delay: isActive ? 0 : 2,
    });
  }, [isActive]);

  /*------------------------------
  Hover effect
  ------------------------------*/
  useEffect(() => {
    const hoverScale = hover && !isActive ? 1.1 : 1;
    if (!$root.current?.children) return;
    const groupHover: any = $root.current.children[0];
    gsap.to(groupHover.material.uniforms.zoom, {
      value: hoverScale,
      duration: 0.5,
      ease: "power3.out",
    });

    gsap.to($root.current.children[0].material.uniforms.grayscale, {
      value: hover || isActive ? 0 : 1,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hover, isActive]);

  const handleClose = (e: any) => {
    e.stopPropagation();
    if (!isActive) return;
    setActivePlane(null);
    setHover(false);
    clearTimeout(timeoutID.current);
    timeoutID.current = setTimeout(() => {
      setCloseActive(false);
    }, 1500);
  };

  return (
    <group
      ref={$root}
      name="toto"
      onClick={() => {
        setActivePlane(index);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <PlaneItem
        width={width}
        height={height}
        texture={item.imageSlider.url}
        active={isActive}
      />

      {isCloseActive ? (
        <mesh position={[0, 0, 0.01]} onClick={handleClose}>
          <planeGeometry args={[viewport.width, viewport.height]} />
          <meshBasicMaterial transparent={true} opacity={0} color={"red"} />
        </mesh>
      ) : null}
    </group>
  );
};

export default CarouselItem;
