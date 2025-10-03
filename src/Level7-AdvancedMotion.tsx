import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  useTransform,
} from "remotion";

// Particle System Component
const ParticleSystem = ({ 
  particleCount = 50,
  colors = ["#667eea", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]
}: {
  particleCount?: number;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <>
      {Array.from({ length: particleCount }).map((_, i) => {
        const particleDelay = i * 2;
        const particleFrame = Math.max(0, frame - particleDelay);
        
        // Particle properties
        const speed = 0.5 + Math.sin(i) * 0.3;
        const angle = (i / particleCount) * Math.PI * 2;
        const size = 3 + Math.sin(i * 0.5) * 2;
        const color = colors[i % colors.length];
        
        // Position calculation
        const x = (width / 2) + Math.cos(angle) * 200 + Math.sin(particleFrame * 0.01) * 100;
        const y = (height / 2) + Math.sin(angle) * 200 + Math.cos(particleFrame * 0.015) * 80;
        
        // Animation properties
        const opacity = interpolate(
          particleFrame,
          [0, 60, 240, 300],
          [0, 0.8, 0.8, 0],
          { extrapolateRight: "clamp" }
        );
        
        const scale = spring({
          frame: particleFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 80,
          },
        });

        const rotation = interpolate(
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
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              boxShadow: `0 0 ${size * 3}px ${color}60`,
            }}
          />
        );
      })}
    </>
  );
};

// Morphing Shape Component
const MorphingShape = ({ 
  delay = 0,
  colors = ["#667eea", "#4ecdc4"]
}: {
  delay?: number;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const morphProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Shape morphing through different forms
  const shapeIndex = Math.floor(morphProgress * 4) % 4;
  const shapeProgress = (morphProgress * 4) % 1;

  const getShape = () => {
    switch (shapeIndex) {
      case 0: // Circle to Square
        const radius = 50 + (1 - shapeProgress) * 50;
        return {
          borderRadius: `${radius}px`,
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        };
      case 1: // Square to Triangle
        return {
          borderRadius: "0px",
          background: `linear-gradient(135deg, ${colors[1]}, ${colors[0]})`,
          clipPath: `polygon(50% 0%, 0% 100%, 100% 100%)`,
        };
      case 2: // Triangle to Diamond
        return {
          borderRadius: "0px",
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
        };
      case 3: // Diamond to Circle
        const newRadius = shapeProgress * 50;
        return {
          borderRadius: `${newRadius}px`,
          background: `linear-gradient(135deg, ${colors[1]}, ${colors[0]})`,
          clipPath: "none",
        };
      default:
        return {
          borderRadius: "50px",
          background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        };
    }
  };

  const shapeStyle = getShape();

  return (
    <div
      style={{
        width: 100,
        height: 100,
        ...shapeStyle,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        transform: `scale(${morphProgress})`,
      }}
    />
  );
};

// Wave Animation Component
const WaveAnimation = ({ 
  delay = 0,
  color = "#667eea",
  frequency = 2,
  amplitude = 50
}: {
  delay?: number;
  color?: string;
  frequency?: number;
  amplitude?: number;
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const waveProgress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Create wave path
  const points = [];
  const segments = 100;
  
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const y = height / 2 + Math.sin((i / segments) * frequency * Math.PI * 2 + frame * 0.05) * amplitude * waveProgress;
    points.push(`${x},${y}`);
  }

  const pathData = `M ${points.join(' L ')}`;

  return (
    <svg
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <path
        d={pathData}
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity={waveProgress}
        filter="drop-shadow(0 0 10px rgba(102, 126, 234, 0.5))"
      />
    </svg>
  );
};

// Floating Elements Component
const FloatingElements = ({ 
  elementCount = 20,
  colors = ["#667eea", "#4ecdc4", "#45b7d1", "#96ceb4"]
}: {
  elementCount?: number;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  return (
    <>
      {Array.from({ length: elementCount }).map((_, i) => {
        const elementDelay = i * 10;
        const elementFrame = Math.max(0, frame - elementDelay);
        
        // Element properties
        const size = 20 + Math.sin(i) * 15;
        const color = colors[i % colors.length];
        const speed = 0.3 + Math.sin(i * 0.3) * 0.2;
        
        // Position calculation with floating motion
        const x = (width * 0.1) + (i * 50) + Math.sin(elementFrame * speed) * 100;
        const y = (height * 0.1) + (i * 30) + Math.cos(elementFrame * speed * 0.7) * 80;
        
        // Animation properties
        const opacity = interpolate(
          elementFrame,
          [0, 60, 240, 300],
          [0, 0.7, 0.7, 0],
          { extrapolateRight: "clamp" }
        );
        
        const scale = spring({
          frame: elementFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 80,
          },
        });

        const rotation = interpolate(
          elementFrame,
          [0, 300],
          [0, 720],
          { extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              background: color,
              borderRadius: "50%",
              opacity,
              transform: `scale(${scale}) rotate(${rotation}deg)`,
              boxShadow: `0 0 ${size}px ${color}60`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: `${size * 0.4}px`,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {String.fromCharCode(65 + (i % 26))}
          </div>
        );
      })}
    </>
  );
};

// Energy Orb Component
const EnergyOrb = ({ 
  delay = 0,
  color = "#667eea",
  size = 150
}: {
  delay?: number;
  color?: string;
  size?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const orbProgress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const pulse = interpolate(
    frame,
    [delay, delay + 60],
    [1, 1.2],
    {
      extrapolateRight: "clamp",
    }
  );

  const rotation = interpolate(
    frame,
    [0, 300],
    [0, 360],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}40, ${color}20, transparent)`,
        border: `2px solid ${color}`,
        transform: `scale(${orbProgress * pulse}) rotate(${rotation}deg)`,
        boxShadow: `0 0 ${size}px ${color}60`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Inner energy */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}80, ${color}40, transparent)`,
          animation: "pulse 2s infinite",
        }}
      />
      
      {/* Energy rings */}
      {Array.from({ length: 3 }).map((_, i) => {
        const ringDelay = i * 20;
        const ringScale = spring({
          frame: frame - delay - ringDelay,
          fps,
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
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size + i * 30,
              height: size + i * 30,
              borderRadius: "50%",
              border: `1px solid ${color}${Math.floor(0.3 - i * 0.1).toString(16).padStart(2, '0')}`,
              transform: `translate(-50%, -50%) scale(${ringScale})`,
            }}
          />
        );
      })}
    </div>
  );
};

// Main Advanced Motion Graphics Component
export const AdvancedMotionGraphics = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Background animation
  const backgroundHue = interpolate(frame, [0, 300], [200, 360], {
    extrapolateRight: "clamp",
  });

  // Title animation
  const titleScale = spring({
    frame: frame - 20,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const titleRotation = interpolate(
    frame,
    [0, 300],
    [0, 360],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${backgroundHue}, 70%, 60%), hsl(${backgroundHue + 60}, 70%, 40%))`,
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Particle System */}
      <ParticleSystem particleCount={60} />

      {/* Wave Animation */}
      <WaveAnimation delay={30} color="#667eea" frequency={3} amplitude={80} />
      <WaveAnimation delay={60} color="#4ecdc4" frequency={2} amplitude={60} />

      {/* Title Section */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              transform: `scale(${titleScale}) rotate(${titleRotation * 0.1}deg)`,
            }}
          >
            ADVANCED MOTION
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.8)",
              marginTop: "10px",
            }}
          >
            Complex Animations & Particle Effects
          </div>
        </div>
      </Sequence>

      {/* Morphing Shapes */}
      <Sequence from={60} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <MorphingShape delay={0} colors={["#667eea", "#4ecdc4"]} />
          <MorphingShape delay={30} colors={["#45b7d1", "#96ceb4"]} />
          <MorphingShape delay={60} colors={["#feca57", "#ff6b6b"]} />
        </div>
      </Sequence>

      {/* Energy Orb */}
      <Sequence from={120} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <EnergyOrb delay={0} color="#ffd700" size={200} />
        </div>
      </Sequence>

      {/* Floating Elements */}
      <FloatingElements elementCount={25} />

      {/* Background Grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          transform: `translate(${frame * 0.5}px, ${frame * 0.3}px)`,
        }}
      />

      {/* Energy Bursts */}
      {Array.from({ length: 8 }).map((_, i) => {
        const burstDelay = i * 30;
        const burstFrame = Math.max(0, frame - burstDelay);
        const colors = ["#667eea", "#4ecdc4", "#45b7d1", "#ffd700"];
        const burstColor = colors[i % colors.length];

        const x = interpolate(
          burstFrame,
          [0, 120],
          [0, width],
          { extrapolateRight: "clamp" }
        );
        const y = interpolate(
          burstFrame,
          [0, 120],
          [height, 0],
          { extrapolateRight: "clamp" }
        );

        const scale = spring({
          frame: burstFrame,
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
              background: burstColor,
              transform: `scale(${scale})`,
              boxShadow: `0 0 30px ${burstColor}`,
              opacity: interpolate(burstFrame, [0, 30, 90, 120], [0, 1, 1, 0]),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
