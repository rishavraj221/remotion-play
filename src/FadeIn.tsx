import {
  useCurrentFrame,
  AbsoluteFill,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Title } from "./components/Title";

export const FadeIn = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  //   const opacity = Math.min(1, frame / 60);
  const opacity = interpolate(frame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({
    fps,
    frame,
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Sequence durationInFrames={40} layout="none">
        <Title title="Hello Rishav!"></Title>
      </Sequence>
      <Sequence from={40} layout="none">
        <Title title="Hello Namitha!"></Title>
      </Sequence>
      <Title title={`Frame: ${frame}`}></Title>
    </AbsoluteFill>
  );
};
