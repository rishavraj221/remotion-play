import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const scale = spring({ frame, fps });

  return (
    <div
      style={{
        opacity,
        textAlign: "center",
        fontSize: "7em",
        transform: `scale(${scale})`,
      }}
    >
      {title}
    </div>
  );
};
