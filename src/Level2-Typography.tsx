import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Typewriter Effect Component
const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 3,
  fontSize = "4rem",
  color = "white",
  fontFamily = "monospace"
}: {
  text: string;
  delay?: number;
  speed?: number;
  fontSize?: string;
  color?: string;
  fontFamily?: string;
}) => {
  const frame = useCurrentFrame();
  const visibleChars = Math.max(0, Math.floor((frame - delay) / speed));
  const displayText = text.slice(0, Math.min(visibleChars, text.length));

  return (
    <span
      style={{
        fontSize,
        color,
        fontFamily,
        fontWeight: "bold",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {displayText}
      <span
        style={{
          opacity: frame > delay + visibleChars * speed ? 1 : 0,
          animation: "blink 1s infinite",
        }}
      >
        |
      </span>
    </span>
  );
};

// Slide-in Text Component
const SlideInText = ({ 
  text, 
  delay = 0,
  direction = "left",
  fontSize = "3rem",
  color = "white"
}: {
  text: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  fontSize?: string;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const getTransform = () => {
    const distance = 100;
    switch (direction) {
      case "left":
        return `translateX(${(1 - progress) * -distance}px)`;
      case "right":
        return `translateX(${(1 - progress) * distance}px)`;
      case "up":
        return `translateY(${(1 - progress) * -distance}px)`;
      case "down":
        return `translateY(${(1 - progress) * distance}px)`;
      default:
        return `translateX(${(1 - progress) * -distance}px)`;
    }
  };

  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight: "bold",
        transform: getTransform(),
        opacity: progress,
        fontFamily: "Arial, sans-serif",
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </div>
  );
};

// Rotating Text Component
const RotatingText = ({ 
  text, 
  delay = 0,
  fontSize = "2.5rem",
  color = "#667eea"
}: {
  text: string;
  delay?: number;
  fontSize?: string;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotation = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 80,
    },
  });

  const scale = spring({
    frame: frame - delay - 10,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight: "bold",
        transform: `rotate(${rotation * 360}deg) scale(${scale})`,
        fontFamily: "Arial, sans-serif",
        textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {text}
    </div>
  );
};

// Main Typography Animation Component
export const TypographyAnimation = () => {
  const frame = useCurrentFrame();

  // Background animation
  const backgroundHue = interpolate(frame, [0, 300], [200, 300], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${backgroundHue}, 70%, 60%), hsl(${backgroundHue + 60}, 70%, 40%))`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "50px",
      }}
    >
      {/* Main Title with Typewriter Effect */}
      <Sequence from={0} durationInFrames={120}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <TypewriterText
            text="WELCOME TO"
            delay={0}
            speed={4}
            fontSize="3rem"
            color="rgba(255,255,255,0.9)"
          />
        </div>
      </Sequence>

      {/* Brand Name with Slide-in Effect */}
      <Sequence from={60} durationInFrames={120}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <SlideInText
            text="CREATIVE BRAND"
            delay={0}
            direction="up"
            fontSize="5rem"
            color="white"
          />
        </div>
      </Sequence>

      {/* Subtitle with Typewriter */}
      <Sequence from={120} durationInFrames={90}>
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <TypewriterText
            text="Amazing Typography Effects"
            delay={0}
            speed={3}
            fontSize="2rem"
            color="rgba(255,255,255,0.8)"
            fontFamily="Arial, sans-serif"
          />
        </div>
      </Sequence>

      {/* Rotating Elements */}
      <Sequence from={180} durationInFrames={120}>
        <div
          style={{
            display: "flex",
            gap: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RotatingText
            text="INNOVATE"
            delay={0}
            fontSize="2rem"
            color="#667eea"
          />
          <RotatingText
            text="CREATE"
            delay={20}
            fontSize="2rem"
            color="#764ba2"
          />
          <RotatingText
            text="INSPIRE"
            delay={40}
            fontSize="2rem"
            color="#f093fb"
          />
        </div>
      </Sequence>

      {/* Call to Action */}
      <Sequence from={240} durationInFrames={60}>
        <div style={{ textAlign: "center" }}>
          <SlideInText
            text="Start Your Journey Today!"
            delay={0}
            direction="down"
            fontSize="2.5rem"
            color="#ffd700"
          />
        </div>
      </Sequence>

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const particleDelay = i * 10;
        const particleFrame = Math.max(0, frame - particleDelay);
        const opacity = interpolate(particleFrame, [0, 60], [0, 0.6], {
          extrapolateRight: "clamp",
        });
        const transform = interpolate(
          particleFrame,
          [0, 300],
          [0, 360],
          { extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${20 + (i * 10)}%`,
              left: `${10 + (i * 12)}%`,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.8)",
              opacity,
              transform: `rotate(${transform}deg) translateX(${50 + i * 20}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
