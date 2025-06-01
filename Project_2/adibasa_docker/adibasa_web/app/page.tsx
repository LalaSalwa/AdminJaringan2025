"use client"
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { createScope, createTimeline, Scope } from "animejs";
import { useEffect, useRef } from "react";

export default function Home() {
  const root = useRef(null);
  const scope = useRef<Scope>(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      const tl = createTimeline({ autoplay: true })

      var ml4: any = {};
      ml4.opacityIn = [0, 1];
      ml4.durationIn = 800;
      ml4.durationOut = 600;
      ml4.easeOut = "outExpo";
      ml4.easeIn = "inExpo";

      tl.add('.nav', {
        opacity: ml4.opacityIn,
        duration: ml4.durationIn,
        translateY: [30, 0]
      })

      tl.add('.hero', {
        opacity: ml4.opacityIn,
        duration: ml4.durationIn,
        ease: ml4.easeIn,
        translateY: [30, 0]
      })

    });
    return () => {
      if (scope.current)
        return scope.current.revert();
    }

  }, []);
  return (
    <div ref={root}>
      <Navbar />
      <div className="hero opacity-0">
        <Hero />
      </div>
      <div className="feat-1 opacity-0">
        <Hero />
      </div>
    </div>
  );
}
