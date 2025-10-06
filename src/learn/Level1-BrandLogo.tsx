import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

export const BrandLogo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animation 1: Logo fade in with scale
  const logoOpacity = interpolate(frame, [0, 30], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateRight: "clamp",
  });

  const logoScale = spring({
    frame,
    fps,
    config: {
      damping: 25,
      stiffness: 100,
    },
  });

  // Animation 2: Logo slide up from bottom
  const logoSlideY = interpolate(frame, [0, 45], [100, 0], {
    easing: Easing.out(Easing.back(1.2)),
    extrapolateRight: "clamp",
  });

  // Animation 3: Background color transition (brand colors)
  const backgroundProgress = interpolate(frame, [60, 120], [0, 1], {
    extrapolateRight: "clamp",
  });

  const backgroundColor = interpolate(
    backgroundProgress,
    [0, 1],
    [0, 255], // Start with green (RGB)
    { colorSpace: "rgb" }
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, rgb(255, ${backgroundColor}, 100), rgb(100, ${backgroundColor}, 255))`,
      }}
    >
      {/* Main Logo Container */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `translateY(${logoSlideY}px) scale(${logoScale})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Logo Circle */}
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "linear-gradient(45deg, #667eea, #764ba2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
            border: "4px solid white",
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: "bold",
              color: "white",
              fontFamily: "Arial, sans-serif",
            }}
          >
            B
          </span>
        </div>

        {/* Brand Name */}
        <div
          style={{
            fontSize: 48,
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          BRAND
        </div>
      </div>

      {/* Subtle particles effect */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "10%",
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.6)",
          opacity: interpolate(frame, [30, 60], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "70%",
          right: "15%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.4)",
          opacity: interpolate(frame, [40, 70], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      />
    </AbsoluteFill>
  );
};
