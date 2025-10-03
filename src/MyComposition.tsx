import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { FadeIn } from "./FadeIn";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        fontSize: 100,
        backgroundColor: "white",
      }}
    >
      This {width}x{height}px video is {durationInFrames / fps} seconds long.
      <div>Duration in frames: {durationInFrames} seconds.</div>
      <div>Frames per seconds: {fps} seconds.</div>
    </AbsoluteFill>
  );
};
