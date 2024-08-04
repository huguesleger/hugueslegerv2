"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const CanvasRealisations = dynamic(
  () => import("../components/three/canvasRealisations"),
  {
    ssr: false,
  }
);

export default function Realisations({ data }: any) {
  const dataRealisation = data[0];
  const dataHome = data[1];
  //let lenis = new Lenis();
  //let lenis = useLenis();

  // const lenis = useLenis(({ scroll }) => {
  //   //const { scrollY }: any = scroll;
  //   console.log(scroll);
  // });
  // console.log(lenis);

  // lenis.on("scroll", ({ scroll }: any) => {
  //   //console.log({ scroll });
  // });
  // console.log(lenis.scroll);

  return (
    <div className="realisations">
      <div className="realisations-img">
        <div className="inner-img">
          {dataRealisation.map((el: any, i: any) => {
            return (
              <div className="thumbnail" key={i}>
                <Image
                  src={el.imageSlider.url}
                  fill
                  alt={el.imageSlider.alt}
                  className="img-cover img-responsive"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* @ts-ignore  */}
      <CanvasRealisations props={dataRealisation} />
    </div>
  );
}
