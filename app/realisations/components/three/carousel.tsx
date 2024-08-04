"use client";

import { lerp, getPiramidalIndex } from "@/components/utils/utils";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { usePrevious } from "react-use";
import CarouselItem from "./carouselItem";
import { easing } from "maath";
import { Line, useScroll } from "@react-three/drei";

/*------------------------------
Plane Settings
------------------------------*/
const planeSettings = {
  width: 2,
  height: 5,
  gap: 0.2,
};

/*------------------------------
Gsap Defaults
------------------------------*/
gsap.defaults({
  duration: 2.5,
  ease: "power3.out",
});

const Carousel = ({ projets }: any) => {
  const works = projets;
  const [$root, setRoot] = useState<any>();
  const refItems = useRef<any>(null);
  const refGeo = useRef<any>(null);
  const refMap = useRef<any>(null);

  const [activePlane, setActivePlane] = useState(null);
  const prevActivePlane = usePrevious(activePlane);
  const { viewport } = useThree();
  let scrollTarget = 0;
  let scrollPos = 0;
  let currentScroll = 0;
  const scroll = useScroll();

  /*--------------------
  Vars
  --------------------*/
  const progress = useRef(0);
  const speedWheel = 0.1;
  const oldProgress = useRef(0);
  const speed = useRef(0);

  /*--------------------
  Display Items
  --------------------*/
  const displayItems = (item: any, index: any, active: any) => {
    if (!refItems.current) return;
    item = refItems.current.children[index];
    const piramidalIndex = getPiramidalIndex(works, active)[index];
    gsap.to(item.position, {
      x: (index - active) * (planeSettings.width + planeSettings.gap),
      y: works.length * -0.1 + piramidalIndex * 0.1,
    });
  };

  /*--------------------
  RAF
  --------------------*/
  useFrame(() => {
    progress.current = Math.max(0, Math.min(progress.current, 100));
    const active = Math.floor((progress.current / 100) * (works.length - 1));
    works.forEach((item: any, index: any) => displayItems(item, index, active));
    speed.current = lerp(
      speed.current,
      Math.abs(oldProgress.current - progress.current),
      0.1
    );

    oldProgress.current = lerp(oldProgress.current, progress.current, 0.1);

    if (refItems.current) {
      refItems.current.thickness = speed.current;
    }

    // refMap.current.children.forEach((child: any, index: any) => {
    //   const y = scroll.curve(
    //     index / works.length - 1.5 / works.length,
    //     2 / works.length
    //   );
    //   easing.damp(child.scale, "y", 0.15 + y / 6, 0.15, 0.1);
    // });
  });

  /*--------------------
  Handle Wheel
  --------------------*/
  const handleWheel = (e: any) => {
    if (activePlane !== null) return;
    const isVerticalScroll = Math.abs(e.deltaY) > Math.abs(e.deltaX);
    const wheelProgress = isVerticalScroll ? e.deltaY : e.deltaX;
    progress.current = progress.current + wheelProgress * speedWheel;

    scrollTarget = e.deltaY / 500;

    scrollPos -= (scrollPos + scrollTarget) * 0.1;
    scrollTarget *= 0.9;
    currentScroll += scrollPos;

    // Update mesh positions
    works.forEach((el: any, index: any) => {
      const mesh = $root.parent?.children[index].children[0].children[0];
      const shiftValue = scrollPos * 3.5;
      mesh.material.uniforms.uShift.value = lerp(
        mesh.material.uniforms.uShift.value,
        shiftValue,
        0.1
      );
    });
  };

  /*--------------------
  Click
  --------------------*/
  useEffect(() => {
    if (!works) return;
    if (activePlane !== null && prevActivePlane === null) {
      progress.current = (activePlane / (works.length - 1)) * 100;
    }
  }, [activePlane, works]);

  /*--------------------
  Render Plane Events
  --------------------*/
  const renderPlaneEvents = () => {
    return (
      <mesh position={[0, 0, -0.01]} onWheel={handleWheel}>
        <planeGeometry ref={refGeo} args={[viewport.width, viewport.height]} />
        <meshBasicMaterial transparent={true} opacity={0} />
      </mesh>
    );
  };

  /*--------------------
  Render Slider
  --------------------*/
  const renderSlider = () => {
    return (
      <group ref={refItems}>
        {works.map((item: any, i: any) => (
          <group ref={setRoot} key={i} name="img">
            <CarouselItem
              width={planeSettings.width}
              height={planeSettings.height}
              setActivePlane={setActivePlane}
              activePlane={activePlane}
              key={i}
              item={item}
              index={i}
            />
          </group>
        ))}
      </group>
    );
  };

  const minimap = () => {
    return (
      <group ref={refMap}>
        {works.map((_: any, i: any) => (
          <Line
            key={i}
            points={[
              [0, 0.15, 0],
              [0, -0.15, 0],
            ]}
            color={"red"}
            lineWidth={1}
            position={[
              i * 0.06 - works.length * 0.03,
              -viewport.height / 2 + 0.6,
              0,
            ]}
          >
            <bufferGeometry attach="geometry" />
            <lineBasicMaterial attach="material" />
          </Line>
        ))}
      </group>
    );
  };

  return (
    <group>
      <group>
        {renderPlaneEvents()}
        {renderSlider()}
        {minimap()}
        {/* {activePlane == null ? <PostProcessing ref={$post} /> : null} */}
      </group>
    </group>
  );
};

export default Carousel;
