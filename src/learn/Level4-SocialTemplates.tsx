import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Instagram Stories Template (9:16)
const InstagramStoriesTemplate = () => {
  const frame = useCurrentFrame();

  // Background gradient animation
  const gradientProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  const gradientColors = [
    ["#667eea", "#764ba2"],
    ["#f093fb", "#f5576c"],
    ["#4facfe", "#00f2fe"],
  ];

  const colorIndex = Math.floor(gradientProgress * gradientColors.length);
  const currentGradient = gradientColors[colorIndex % gradientColors.length];
  const nextGradient = gradientColors[(colorIndex + 1) % gradientColors.length];
  const progress = (gradientProgress * gradientColors.length) % 1;

  // Header animation
  const headerScale = spring({
    frame: frame - 20,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Content slide-in
  const contentSlide = spring({
    frame: frame - 40,
    fps: 30,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  // CTA button animation
  const ctaScale = spring({
    frame: frame - 80,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 120,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${currentGradient[0]}, ${currentGradient[1]})`,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: "40px 30px",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          transform: `scale(${headerScale})`,
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          INSTAGRAM STORY
        </div>
        <div
          style={{
            fontSize: "1.2rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "10px",
          }}
        >
          9:16 Aspect Ratio
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          transform: `translateY(${(1 - contentSlide) * 50}px)`,
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            marginBottom: "30px",
          }}
        >
          YOUR BRAND
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: "1.4",
            maxWidth: "300px",
          }}
        >
          Create engaging stories that connect with your audience
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          transform: `scale(${ctaScale})`,
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            color: "#667eea",
            padding: "15px 40px",
            borderRadius: "25px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            textAlign: "center",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            cursor: "pointer",
          }}
        >
          SWIPE UP
        </div>
      </div>

      {/* Decorative Elements */}
      {Array.from({ length: 6 }).map((_, i) => {
        const delay = i * 20;
        const orbFrame = Math.max(0, frame - delay);
        const opacity = interpolate(orbFrame, [0, 60], [0, 0.6], {
          extrapolateRight: "clamp",
        });
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
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.6)",
              opacity,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// TikTok Template (9:16)
const TikTokTemplate = () => {
  const frame = useCurrentFrame();

  // Dynamic background
  const backgroundHue = interpolate(frame, [0, 180], [200, 360], {
    extrapolateRight: "clamp",
  });

  // Main content animation
  const contentProgress = spring({
    frame: frame - 30,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Sidebar animations
  const sidebarProgress = spring({
    frame: frame - 60,
    fps: 30,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${backgroundHue}, 70%, 60%), hsl(${backgroundHue + 60}, 70%, 40%))`,
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${contentProgress})`,
        }}
      >
        <div
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          TIKTOK VIBES
        </div>
        <div
          style={{
            fontSize: "1.8rem",
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            lineHeight: "1.3",
          }}
        >
          Viral content that gets shared
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        style={{
          position: "absolute",
          right: "20px",
          top: "50%",
          transform: `translateY(-50%) scale(${sidebarProgress})`,
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Profile */}
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            background: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#667eea",
          }}
        >
          B
        </div>

        {/* Action Buttons */}
        {["❤️", "💬", "📤"].map((emoji, i) => {
          const buttonDelay = i * 10;
          const buttonScale = spring({
            frame: frame - 80 - buttonDelay,
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
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem",
                transform: `scale(${buttonScale})`,
                backdropFilter: "blur(10px)",
              }}
            >
              {emoji}
            </div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          right: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          @yourbrand
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: "1rem",
          }}
        >
          #viral #trending
        </div>
      </div>
    </AbsoluteFill>
  );
};

// YouTube Shorts Template (9:16)
const YouTubeShortsTemplate = () => {
  const frame = useCurrentFrame();

  // Background animation
  const backgroundProgress = interpolate(frame, [0, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Content animations
  const titleScale = spring({
    frame: frame - 20,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const descriptionSlide = spring({
    frame: frame - 40,
    fps: 30,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  const subscribeButton = spring({
    frame: frame - 80,
    fps: 30,
    config: {
      damping: 15,
      stiffness: 120,
    },
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, #ff0000, #cc0000)`,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        padding: "30px",
      }}
    >
      {/* YouTube Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          ▶️ YOUTUBE SHORTS
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          9:16 Format
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "3.5rem",
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            transform: `scale(${titleScale})`,
            marginBottom: "30px",
          }}
        >
          SHORT CONTENT
        </div>
        <div
          style={{
            fontSize: "1.4rem",
            color: "rgba(255,255,255,0.9)",
            lineHeight: "1.4",
            maxWidth: "300px",
            transform: `translateY(${(1 - descriptionSlide) * 30}px)`,
          }}
        >
          Quick, engaging videos that keep viewers watching
        </div>
      </div>

      {/* Subscribe Button */}
      <div
        style={{
          transform: `scale(${subscribeButton})`,
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            backgroundColor: "#ff0000",
            color: "white",
            padding: "12px 30px",
            borderRadius: "20px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            textAlign: "center",
            border: "2px solid white",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          SUBSCRIBE
        </div>
      </div>

      {/* Channel Info */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#ff0000",
            }}
          >
            Y
          </div>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: "bold" }}>
              Your Channel
            </div>
            <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
              1.2M subscribers
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "0.9rem",
            opacity: 0.8,
          }}
        >
          🔔
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Main Social Templates Component
export const SocialTemplates = () => {
  const frame = useCurrentFrame();

  // Cycle through templates every 60 frames (2 seconds)
  const templateIndex = Math.floor(frame / 60) % 3;

  const renderTemplate = () => {
    switch (templateIndex) {
      case 0:
        return <InstagramStoriesTemplate />;
      case 1:
        return <TikTokTemplate />;
      case 2:
        return <YouTubeShortsTemplate />;
      default:
        return <InstagramStoriesTemplate />;
    }
  };

  return (
    <AbsoluteFill
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      {renderTemplate()}
      
      {/* Template Indicator */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: index === templateIndex ? "white" : "rgba(255,255,255,0.5)",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
