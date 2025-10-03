import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Color Transition Component
const ColorTransitionBox = ({ 
  delay = 0,
  duration = 60,
  startColor = "#ff6b6b",
  endColor = "#4ecdc4",
  size = 200,
  borderRadius = 20
}: {
  delay?: number;
  duration?: number;
  startColor?: string;
  endColor?: string;
  size?: number;
  borderRadius?: number;
}) => {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // Convert hex colors to RGB for interpolation
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 107 };
  };

  const startRgb = hexToRgb(startColor);
  const endRgb = hexToRgb(endColor);

  const currentColor = `rgb(${
    Math.round(startRgb.r + (endRgb.r - startRgb.r) * progress)
  }, ${
    Math.round(startRgb.g + (endRgb.g - startRgb.g) * progress)
  }, ${
    Math.round(startRgb.b + (endRgb.b - startRgb.b) * progress)
  })`;

  const scale = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        width: size,
        height: size,
        backgroundColor: currentColor,
        borderRadius,
        transform: `scale(${scale})`,
        boxShadow: `0 10px 30px ${currentColor}40`,
        transition: "all 0.3s ease",
      }}
    />
  );
};

// Gradient Background Component
const GradientBackground = ({ 
  frame,
  colors = ["#667eea", "#764ba2", "#f093fb", "#f5576c"]
}: {
  frame: number;
  colors?: string[];
}) => {
  const colorIndex = Math.floor((frame / 30) % colors.length);
  const nextColorIndex = (colorIndex + 1) % colors.length;
  const progress = (frame % 30) / 30;

  const currentColor = colors[colorIndex];
  const nextColor = colors[nextColorIndex];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${currentColor}, ${nextColor})`,
        opacity: interpolate(progress, [0, 0.5, 1], [1, 0.8, 1]),
      }}
    />
  );
};

// Animated Text with Color Transitions
const ColorText = ({ 
  text,
  delay = 0,
  fontSize = "4rem",
  colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]
}: {
  text: string;
  delay?: number;
  fontSize?: string;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();

  const colorProgress = interpolate(
    frame,
    [delay, delay + 120],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const colorIndex = Math.floor(colorProgress * colors.length);
  const currentColor = colors[colorIndex % colors.length];

  const scale = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  return (
    <div
      style={{
        fontSize,
        color: currentColor,
        fontWeight: "bold",
        transform: `scale(${scale})`,
        textShadow: `0 0 20px ${currentColor}60`,
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
      }}
    >
      {text}
    </div>
  );
};

// Brand Color Palette Component
const BrandPalette = ({ frame }: { frame: number }) => {
  const brandColors = [
    "#ff6b6b", // Coral
    "#4ecdc4", // Teal
    "#45b7d1", // Sky Blue
    "#96ceb4", // Mint
    "#feca57", // Yellow
    "#ff9ff3", // Pink
    "#54a0ff", // Blue
    "#5f27cd", // Purple
  ];

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {brandColors.map((color, index) => {
        const delay = index * 10;
        const scale = spring({
          frame: frame - delay,
          fps: 30,
          config: {
            damping: 20,
            stiffness: 100,
          },
        });

        const rotation = interpolate(
          frame,
          [delay, delay + 60],
          [0, 360],
          {
            extrapolateRight: "clamp",
          }
        );

        return (
          <div
            key={index}
            style={{
              width: 80,
              height: 80,
              backgroundColor: color,
              borderRadius: "50%",
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              boxShadow: `0 5px 15px ${color}40`,
              border: "3px solid white",
            }}
          />
        );
      })}
    </div>
  );
};

// Main Color Transitions Component
export const ColorTransitions = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Dynamic gradient colors
  const gradientColors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
    ["#43e97b", "#38f9d7"],
    ["#fa709a", "#fee140"],
    ["#a8edea", "#fed6e3"],
  ];

  const gradientIndex = Math.floor(frame / 60) % gradientColors.length;
  const currentGradient = gradientColors[gradientIndex];
  const nextGradient = gradientColors[(gradientIndex + 1) % gradientColors.length];
  const gradientProgress = (frame % 60) / 60;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${currentGradient[0]}, ${currentGradient[1]})`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(45deg, ${nextGradient[0]}, ${nextGradient[1]})`,
          opacity: interpolate(gradientProgress, [0, 0.5, 1], [0, 0.3, 0]),
        }}
      />

      {/* Title Section */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <ColorText
            text="COLOR MAGIC"
            delay={0}
            fontSize="5rem"
            colors={["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4"]}
          />
        </div>
      </Sequence>

      {/* Color Transition Boxes */}
      <Sequence from={60} durationInFrames={120}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "60px",
          }}
        >
          <ColorTransitionBox
            delay={0}
            startColor="#ff6b6b"
            endColor="#4ecdc4"
            size={150}
          />
          <ColorTransitionBox
            delay={20}
            startColor="#45b7d1"
            endColor="#96ceb4"
            size={150}
          />
          <ColorTransitionBox
            delay={40}
            startColor="#feca57"
            endColor="#ff9ff3"
            size={150}
          />
        </div>
      </Sequence>

      {/* Brand Palette */}
      <Sequence from={120} durationInFrames={120}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "2.5rem",
              color: "white",
              fontWeight: "bold",
              marginBottom: "30px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Brand Color Palette
          </div>
          <BrandPalette frame={frame} />
        </div>
      </Sequence>

      {/* Floating Color Orbs */}
      {Array.from({ length: 12 }).map((_, i) => {
        const orbDelay = i * 15;
        const orbFrame = Math.max(0, frame - orbDelay);
        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57", "#ff9ff3"];
        const orbColor = colors[i % colors.length];

        const x = interpolate(
          orbFrame,
          [0, 240],
          [0, width],
          { extrapolateRight: "clamp" }
        );
        const y = interpolate(
          orbFrame,
          [0, 240],
          [height, 0],
          { extrapolateRight: "clamp" }
        );

        const scale = spring({
          frame: orbFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 80,
          },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: orbColor,
              transform: `scale(${scale})`,
              boxShadow: `0 0 20px ${orbColor}`,
              opacity: interpolate(orbFrame, [0, 30, 210, 240], [0, 0.8, 0.8, 0]),
            }}
          />
        );
      })}

      {/* Gradient Overlay Effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at ${interpolate(frame, [0, 300], [0, 100])}%, transparent 0%, rgba(0,0,0,0.1) 70%)`,
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
