import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  useTransform,
} from "remotion";

// Color Palette
const colors = {
  primary: "#00A8FF",
  secondary: "#6C5CE7", 
  accent: "#00FFF2",
  background: "#0A1628",
  white: "#FFFFFF",
};

// Scene 1: The Problem - Chaotic File System
const Scene1Problem = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // Glitch effect
  const glitch = interpolate(frame, [0, 240], [0, 1], {
    extrapolateRight: "clamp",
  });

  // File chaos animation
  const chaosProgress = spring({
    frame,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 60,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, #1a2332)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Desktop Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, #1a2332, ${colors.background})`,
        }}
      />

      {/* Scattered Files */}
      {Array.from({ length: 20 }).map((_, i) => {
        const fileDelay = i * 10;
        const fileFrame = Math.max(0, frame - fileDelay);
        
        const fileX = (width * 0.1) + (i * 80) + Math.sin(fileFrame * 0.02) * 50;
        const fileY = (height * 0.2) + (i * 40) + Math.cos(fileFrame * 0.015) * 30;
        
        const rotation = interpolate(
          fileFrame,
          [0, 60],
          [0, 360],
          { extrapolateRight: "clamp" }
        );

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: fileX,
              top: fileY,
              width: 60,
              height: 80,
              background: `linear-gradient(135deg, #ff4757, #ff6b7a)`,
              borderRadius: 8,
              transform: `rotate(${rotation}deg) scale(${chaosProgress})`,
              opacity: interpolate(fileFrame, [0, 30, 210, 240], [0, 0.8, 0.8, 0]),
              boxShadow: "0 5px 15px rgba(255, 71, 87, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            📄
          </div>
        );
      })}

      {/* Error Notifications */}
      {Array.from({ length: 8 }).map((_, i) => {
        const errorDelay = i * 30;
        const errorFrame = Math.max(0, frame - errorDelay);
        
        const errorX = width * (0.1 + i * 0.1);
        const errorY = height * (0.1 + i * 0.1);
        
        const scale = spring({
          frame: errorFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 120,
          },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: errorX,
              top: errorY,
              width: 200,
              height: 60,
              background: `linear-gradient(135deg, #ff4757, #ff3838)`,
              borderRadius: 10,
              transform: `scale(${scale})`,
              opacity: interpolate(errorFrame, [0, 30, 180, 210], [0, 1, 1, 0]),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: "bold",
              boxShadow: "0 5px 15px rgba(255, 71, 87, 0.4)",
            }}
          >
            ⚠️ Sync Error
          </div>
        );
      })}

      {/* Glitch Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(90deg, transparent, rgba(255, 0, 0, 0.1), transparent)`,
          opacity: glitch * 0.3,
          transform: `translateX(${Math.sin(frame * 0.1) * 10}px)`,
        }}
      />

      {/* Problem Text */}
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
            fontSize: "3rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [60, 120], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Files everywhere.
        </div>
        <div
          style={{
            fontSize: "2rem",
            color: "#ff4757",
            marginTop: "10px",
            opacity: interpolate(frame, [120, 180], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Chaos.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: The Transition
const Scene2Transition = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // Transition progress
  const transitionProgress = spring({
    frame: frame - 240,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Logo animation
  const logoScale = spring({
    frame: frame - 280,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 120,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.secondary}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Glowing Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at center, ${colors.primary}20, transparent)`,
          opacity: transitionProgress,
        }}
      />

      {/* Organizing Files */}
      {Array.from({ length: 15 }).map((_, i) => {
        const fileDelay = i * 15;
        const fileFrame = Math.max(0, frame - 240 - fileDelay);
        
        const startX = width * (0.1 + i * 0.05);
        const startY = height * (0.2 + i * 0.03);
        const endX = width * 0.5;
        const endY = height * 0.5;
        
        const fileProgress = spring({
          frame: fileFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 80,
          },
        });

        const fileX = startX + (endX - startX) * fileProgress;
        const fileY = startY + (endY - startY) * fileProgress;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: fileX,
              top: fileY,
              width: 40,
              height: 50,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              borderRadius: 6,
              transform: `scale(${fileProgress})`,
              opacity: fileProgress,
              boxShadow: `0 0 20px ${colors.primary}60`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.2rem",
            }}
          >
            📁
          </div>
        );
      })}

      {/* CloudSync Pro Logo */}
      <div
        style={{
          transform: `scale(${logoScale})`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 0 30px ${colors.primary}`,
            marginBottom: "10px",
          }}
        >
          CloudSync Pro
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            color: colors.accent,
            opacity: logoScale,
          }}
        >
          The Cloud Storage Revolution
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: AI Organization
const Scene3AI = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // AI brain animation
  const brainScale = spring({
    frame: frame - 360,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // File organization
  const orgProgress = spring({
    frame: frame - 420,
    fps: 30,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.primary}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* AI Brain */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "8rem",
          opacity: brainScale,
          textShadow: `0 0 50px ${colors.accent}`,
          animation: "pulse 2s infinite",
        }}
      >
        🧠
      </div>

      {/* Organizing Files */}
      {Array.from({ length: 12 }).map((_, i) => {
        const fileDelay = i * 20;
        const fileFrame = Math.max(0, frame - 420 - fileDelay);
        
        const categories = [
          { name: "Photos", color: "#ff6b7a", icon: "📸" },
          { name: "Documents", color: "#4ecdc4", icon: "📄" },
          { name: "Videos", color: "#45b7d1", icon: "🎥" },
        ];
        
        const category = categories[i % 3];
        const categoryIndex = Math.floor(i / 3);
        
        const fileX = width * (0.2 + categoryIndex * 0.2);
        const fileY = height * (0.3 + (i % 3) * 0.1);
        
        const fileProgress = spring({
          frame: fileFrame,
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
              left: fileX,
              top: fileY,
              width: 50,
              height: 60,
              background: `linear-gradient(135deg, ${category.color}, ${category.color}dd)`,
              borderRadius: 8,
              transform: `scale(${fileProgress})`,
              opacity: fileProgress,
              boxShadow: `0 10px 20px ${category.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            {category.icon}
          </div>
        );
      })}

      {/* Feature Text */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [360, 420], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          AI-Powered Organization
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            color: colors.accent,
            marginTop: "10px",
            opacity: interpolate(frame, [420, 480], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Finds everything. Instantly.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Multi-Device Sync
const Scene4Sync = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // Device rotation
  const rotation = interpolate(frame, [480, 840], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Sync animation
  const syncProgress = spring({
    frame: frame - 540,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const devices = [
    { name: "Phone", icon: "📱", color: colors.primary },
    { name: "Tablet", icon: "📱", color: colors.secondary },
    { name: "Laptop", icon: "💻", color: colors.accent },
    { name: "Desktop", icon: "🖥️", color: "#ff6b7a" },
  ];

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.secondary}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Devices in Circle */}
      {devices.map((device, i) => {
        const angle = (i / devices.length) * Math.PI * 2 + (rotation * Math.PI) / 180;
        const deviceX = width * 0.5 + Math.cos(angle) * 200;
        const deviceY = height * 0.5 + Math.sin(angle) * 200;
        
        const deviceScale = spring({
          frame: frame - 480 - i * 30,
          fps: 30,
          config: {
            damping: 20,
            stiffness: 100,
          },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: deviceX - 40,
              top: deviceY - 40,
              width: 80,
              height: 80,
              background: `linear-gradient(135deg, ${device.color}, ${device.color}dd)`,
              borderRadius: 20,
              transform: `scale(${deviceScale})`,
              boxShadow: `0 20px 40px ${device.color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              color: "white",
            }}
          >
            {device.icon}
          </div>
        );
      })}

      {/* Sync Energy Beams */}
      {Array.from({ length: 8 }).map((_, i) => {
        const beamAngle = (i / 8) * Math.PI * 2;
        const beamX = width * 0.5 + Math.cos(beamAngle) * 100;
        const beamY = height * 0.5 + Math.sin(beamAngle) * 100;
        
        const beamProgress = spring({
          frame: frame - 540 - i * 10,
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
              left: beamX,
              top: beamY,
              width: 4,
              height: 200,
              background: `linear-gradient(180deg, ${colors.accent}, transparent)`,
              transform: `rotate(${beamAngle * 180 / Math.PI}deg) scaleY(${beamProgress})`,
              opacity: beamProgress,
              boxShadow: `0 0 20px ${colors.accent}`,
            }}
          />
        );
      })}

      {/* Feature Text */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [480, 540], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Real-Time Sync
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            color: colors.accent,
            marginTop: "10px",
            opacity: interpolate(frame, [540, 600], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Every device. Every time.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Security
const Scene5Security = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // Shield animation
  const shieldScale = spring({
    frame: frame - 840,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Encryption patterns
  const encryptionProgress = spring({
    frame: frame - 900,
    fps: 30,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.accent}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Shield */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "8rem",
          opacity: shieldScale,
          textShadow: `0 0 50px ${colors.accent}`,
          color: colors.accent,
        }}
      >
        🛡️
      </div>

      {/* Encryption Patterns */}
      {Array.from({ length: 16 }).map((_, i) => {
        const patternDelay = i * 15;
        const patternFrame = Math.max(0, frame - 900 - patternDelay);
        
        const angle = (i / 16) * Math.PI * 2;
        const patternX = width * 0.5 + Math.cos(angle) * 150;
        const patternY = height * 0.5 + Math.sin(angle) * 150;
        
        const patternProgress = spring({
          frame: patternFrame,
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
              left: patternX - 10,
              top: patternY - 10,
              width: 20,
              height: 20,
              background: colors.accent,
              borderRadius: 4,
              transform: `scale(${patternProgress}) rotate(${angle * 180 / Math.PI}deg)`,
              opacity: patternProgress,
              boxShadow: `0 0 20px ${colors.accent}`,
            }}
          />
        );
      })}

      {/* Lock Symbols */}
      {Array.from({ length: 8 }).map((_, i) => {
        const lockDelay = i * 20;
        const lockFrame = Math.max(0, frame - 960 - lockDelay);
        
        const lockX = width * (0.2 + i * 0.1);
        const lockY = height * (0.3 + i * 0.05);
        
        const lockScale = spring({
          frame: lockFrame,
          fps: 30,
          config: {
            damping: 25,
            stiffness: 120,
          },
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: lockX,
              top: lockY,
              fontSize: "2rem",
              color: colors.accent,
              transform: `scale(${lockScale})`,
              opacity: lockScale,
              textShadow: `0 0 20px ${colors.accent}`,
            }}
          >
            🔒
          </div>
        );
      })}

      {/* Feature Text */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [840, 900], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Military-Grade Encryption
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            color: colors.accent,
            marginTop: "10px",
            opacity: interpolate(frame, [900, 960], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Your data. Fort Knox secure.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Transformation Complete
const Scene6Transformation = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // Clean workspace animation
  const workspaceProgress = spring({
    frame: frame - 1050,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.primary}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Clean Desktop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(180deg, #2c3e50, ${colors.background})`,
          opacity: workspaceProgress,
        }}
      />

      {/* Organized Files */}
      {Array.from({ length: 9 }).map((_, i) => {
        const fileDelay = i * 20;
        const fileFrame = Math.max(0, frame - 1050 - fileDelay);
        
        const fileX = width * (0.2 + (i % 3) * 0.2);
        const fileY = height * (0.4 + Math.floor(i / 3) * 0.1);
        
        const fileProgress = spring({
          frame: fileFrame,
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
              left: fileX,
              top: fileY,
              width: 60,
              height: 80,
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: 10,
              transform: `scale(${fileProgress})`,
              opacity: fileProgress,
              boxShadow: `0 10px 20px ${colors.primary}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
            }}
          >
            📁
          </div>
        );
      })}

      {/* CloudSync Pro Interface */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 200,
          background: `linear-gradient(135deg, ${colors.primary}20, ${colors.secondary}20)`,
          borderRadius: 20,
          border: `2px solid ${colors.accent}`,
          opacity: workspaceProgress,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "1.2rem",
          fontWeight: "bold",
          boxShadow: `0 20px 40px ${colors.primary}40`,
        }}
      >
        CloudSync Pro Active
      </div>

      {/* Transformation Text */}
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
            fontSize: "3rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            opacity: interpolate(frame, [1050, 1110], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          Work smarter. Live simpler.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 7: Call to Action
const Scene7CTA = ({ frame }: { frame: number }) => {
  const { width, height } = useVideoConfig();

  // CTA animation
  const ctaProgress = spring({
    frame: frame - 1200,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Button pulse
  const buttonPulse = interpolate(frame, [1200, 1350], [1, 1.1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${colors.background}, ${colors.secondary}20)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Particles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const particleDelay = i * 10;
        const particleFrame = Math.max(0, frame - 1200 - particleDelay);
        
        const particleX = width * (0.1 + i * 0.04);
        const particleY = height * (0.1 + i * 0.03);
        
        const particleProgress = spring({
          frame: particleFrame,
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
              left: particleX,
              top: particleY,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: colors.accent,
              opacity: particleProgress * 0.6,
              boxShadow: `0 0 15px ${colors.accent}`,
            }}
          />
        );
      })}

      {/* CloudSync Pro Logo */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: ctaProgress,
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: colors.white,
            textShadow: `0 0 30px ${colors.primary}`,
            marginBottom: "20px",
          }}
        >
          CloudSync Pro
        </div>
        <div
          style={{
            fontSize: "2rem",
            color: colors.accent,
            marginBottom: "30px",
          }}
        >
          Starting at $9.99/month
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: ctaProgress,
        }}
      >
        <div
          style={{
            backgroundColor: colors.accent,
            color: colors.background,
            padding: "20px 60px",
            borderRadius: 50,
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: `0 20px 40px ${colors.accent}40`,
            cursor: "pointer",
            transform: `scale(${ctaProgress * buttonPulse})`,
            border: "3px solid white",
          }}
        >
          Start Free Trial
        </div>
      </div>

      {/* Website URL */}
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          opacity: ctaProgress,
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            color: colors.white,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          www.cloudsyncpro.com
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: colors.accent,
            marginTop: "10px",
          }}
        >
          Try it free for 30 days. No credit card required.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main CloudSync Pro Component
export const CloudSyncPro = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Scene timing (45 seconds = 1350 frames)
  const scene1End = 240;   // 0-8 seconds
  const scene2End = 360;   // 8-12 seconds
  const scene3End = 600;   // 12-20 seconds
  const scene4End = 840;   // 20-28 seconds
  const scene5End = 1050;  // 28-35 seconds
  const scene6End = 1200;  // 35-40 seconds
  const scene7End = 1350;  // 40-45 seconds

  return (
    <AbsoluteFill
      style={{
        width,
        height,
        overflow: "hidden",
      }}
    >
      {/* Scene 1: The Problem */}
      <Sequence from={0} durationInFrames={240}>
        <Scene1Problem frame={frame} />
      </Sequence>

      {/* Scene 2: The Transition */}
      <Sequence from={240} durationInFrames={120}>
        <Scene2Transition frame={frame} />
      </Sequence>

      {/* Scene 3: AI Organization */}
      <Sequence from={360} durationInFrames={240}>
        <Scene3AI frame={frame} />
      </Sequence>

      {/* Scene 4: Multi-Device Sync */}
      <Sequence from={600} durationInFrames={240}>
        <Scene4Sync frame={frame} />
      </Sequence>

      {/* Scene 5: Security */}
      <Sequence from={840} durationInFrames={210}>
        <Scene5Security frame={frame} />
      </Sequence>

      {/* Scene 6: Transformation Complete */}
      <Sequence from={1050} durationInFrames={150}>
        <Scene6Transformation frame={frame} />
      </Sequence>

      {/* Scene 7: Call to Action */}
      <Sequence from={1200} durationInFrames={150}>
        <Scene7CTA frame={frame} />
      </Sequence>
    </AbsoluteFill>
  );
};
