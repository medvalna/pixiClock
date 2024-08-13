import { useEffect, useRef } from "react";
import { ClockWidget } from "./Clock";
import * as PIXI from "pixijs";
export const ClockContainer = () => {
  const pixiContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    {
      // Create a new application
      const app = new PIXI.Application({
        antialias: true,
        background: "#1099bb",
        resizeTo: window,
      });

      // Append the application canvas to the document body
      app.stage.sortableChildren = true;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pixiContainerRef.current.appendChild(app.view);

      const onTick = [
        ClockWidget({
          app: app,
          position: new PIXI.Point(160, 50),
          ratio: 200,
        }),
        ClockWidget({
          app: app,
          position: new PIXI.Point(210, 100),
          ratio: 100,
        }),
      ];

      // Listen for animate update
      app.ticker.add((time) => {
        // Call tick handling for each spinner.
        onTick.forEach((cb) => {
          cb(time);
        });
      });
    }
  }, []);
  return (
    <div
      ref={pixiContainerRef}
      // style={{ height: '100%' }}
      // style={{ overflow: 'auto' }}
    />
  );
};
