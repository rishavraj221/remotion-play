import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  useTransform,
} from "remotion";
import { z } from "zod";

// Dynamic Content Schema
export const dynamicContentSchema = z.object({
  companyName: z.string().default("Your Company"),
  productName: z.string().default("Amazing Product"),
  launchDate: z.string().default("2024"),
  price: z.string().default("$99"),
  features: z.array(z.string()).default(["Feature 1", "Feature 2", "Feature 3"]),
  colors: z.object({
    primary: z.string().default("#667eea"),
    secondary: z.string().default("#4ecdc4"),
    accent: z.string().default("#ffd700"),
  }),
  logo: z.string().default("🚀"),
  stats: z.object({
    users: z.number().default(100000),
    revenue: z.number().default(5000000),
    growth: z.number().default(85),
  }),
});

type DynamicContentProps = z.infer<typeof dynamicContentSchema>;

// Dynamic Logo Component
const DynamicLogo = ({ 
  logo,
  companyName,
  delay = 0,
  colors
}: {
  logo: string;
  companyName: string;
  delay?: number;
  colors: { primary: string; secondary: string };
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const logoRotation = interpolate(
    frame,
    [delay, delay + 60],
    [0, 360],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        transform: `scale(${logoScale})`,
      }}
    >
      <div
        style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          boxShadow: `0 20px 40px ${colors.primary}40`,
          transform: `rotate(${logoRotation}deg)`,
        }}
      >
        {logo}
      </div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {companyName}
      </div>
    </div>
  );
};

// Dynamic Product Card
const DynamicProductCard = ({ 
  productName,
  price,
  delay = 0,
  colors
}: {
  productName: string;
  price: string;
  delay?: number;
  colors: { primary: string; secondary: string; accent: string };
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const cardSlide = spring({
    frame: frame - delay - 20,
    fps,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  return (
    <div
      style={{
        transform: `scale(${cardScale}) translateY(${(1 - cardSlide) * 50}px)`,
        width: 300,
        padding: "30px",
        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        borderRadius: 20,
        boxShadow: `0 20px 40px ${colors.primary}40`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white",
          marginBottom: "15px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {productName}
      </div>
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: colors.accent,
          marginBottom: "20px",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {price}
      </div>
      <div
        style={{
          backgroundColor: "white",
          color: colors.primary,
          padding: "12px 30px",
          borderRadius: 25,
          fontSize: "1.1rem",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        GET STARTED
      </div>
    </div>
  );
};

// Dynamic Features List
const DynamicFeaturesList = ({ 
  features,
  delay = 0,
  colors
}: {
  features: string[];
  delay?: number;
  colors: { primary: string; secondary: string };
}) => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "flex-start",
      }}
    >
      {features.map((feature, index) => {
        const featureDelay = delay + index * 20;
        const featureProgress = spring({
          frame: frame - featureDelay,
          fps: 30,
          config: {
            damping: 20,
            stiffness: 100,
          },
        });

        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transform: `translateX(${(1 - featureProgress) * -100}px)`,
              opacity: featureProgress,
            }}
          >
            <div
              style={{
                width: 25,
                height: 25,
                borderRadius: "50%",
                background: colors.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.8rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>
            <div
              style={{
                fontSize: "1.2rem",
                color: "white",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              }}
            >
              {feature}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Dynamic Statistics
const DynamicStatistics = ({ 
  stats,
  delay = 0,
  colors
}: {
  stats: { users: number; revenue: number; growth: number };
  delay?: number;
  colors: { primary: string; secondary: string; accent: string };
}) => {
  const frame = useCurrentFrame();

  const statProgress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const usersCount = Math.round(stats.users * statProgress);
  const revenueCount = Math.round(stats.revenue * statProgress);
  const growthCount = Math.round(stats.growth * statProgress);

  return (
    <div
      style={{
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Users */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${statProgress})`,
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.primary,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {usersCount.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "5px",
          }}
        >
          Users
        </div>
      </div>

      {/* Revenue */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${statProgress})`,
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.secondary,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          ${revenueCount.toLocaleString()}
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "5px",
          }}
        >
          Revenue
        </div>
      </div>

      {/* Growth */}
      <div
        style={{
          textAlign: "center",
          transform: `scale(${statProgress})`,
        }}
      >
        <div
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: colors.accent,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          {growthCount}%
        </div>
        <div
          style={{
            fontSize: "1rem",
            color: "rgba(255,255,255,0.8)",
            marginTop: "5px",
          }}
        >
          Growth
        </div>
      </div>
    </div>
  );
};

// Dynamic Launch Countdown
const DynamicLaunchCountdown = ({ 
  launchDate,
  delay = 0,
  colors
}: {
  launchDate: string;
  delay?: number;
  colors: { primary: string; secondary: string; accent: string };
}) => {
  const frame = useCurrentFrame();

  const countdownProgress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const pulse = interpolate(
    frame,
    [delay, delay + 60],
    [1, 1.1],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        textAlign: "center",
        transform: `scale(${countdownProgress * pulse})`,
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          color: "rgba(255,255,255,0.8)",
          marginBottom: "10px",
        }}
      >
        Launching in
      </div>
      <div
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: colors.accent,
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {launchDate}
      </div>
    </div>
  );
};

// Main Dynamic Content Component
export const DynamicContent = (props: DynamicContentProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Background animation based on primary color
  const backgroundHue = interpolate(frame, [0, 300], [200, 360], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${backgroundHue}, 70%, 60%), hsl(${backgroundHue + 60}, 70%, 40%))`,
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      {/* Dynamic Logo Section */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <DynamicLogo
            logo={props.logo}
            companyName={props.companyName}
            delay={0}
            colors={props.colors}
          />
        </div>
      </Sequence>

      {/* Dynamic Product Card */}
      <Sequence from={60} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <DynamicProductCard
            productName={props.productName}
            price={props.price}
            delay={0}
            colors={props.colors}
          />
        </div>
      </Sequence>

      {/* Dynamic Features List */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            right: "10%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <DynamicFeaturesList
            features={props.features}
            delay={0}
            colors={props.colors}
          />
        </div>
      </Sequence>

      {/* Dynamic Statistics */}
      <Sequence from={150} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "20%",
            transform: "translateX(-50%)",
          }}
        >
          <DynamicStatistics
            stats={props.stats}
            delay={0}
            colors={props.colors}
          />
        </div>
      </Sequence>

      {/* Dynamic Launch Countdown */}
      <Sequence from={180} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <DynamicLaunchCountdown
            launchDate={props.launchDate}
            delay={0}
            colors={props.colors}
          />
        </div>
      </Sequence>

      {/* Floating Elements with Dynamic Colors */}
      {Array.from({ length: 15 }).map((_, i) => {
        const delay = i * 15;
        const orbFrame = Math.max(0, frame - delay);
        const colors = [props.colors.primary, props.colors.secondary, props.colors.accent];
        const orbColor = colors[i % colors.length];

        const x = interpolate(
          orbFrame,
          [0, 300],
          [0, width],
          { extrapolateRight: "clamp" }
        );
        const y = interpolate(
          orbFrame,
          [0, 300],
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
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: orbColor,
              transform: `scale(${scale})`,
              boxShadow: `0 0 15px ${orbColor}60`,
              opacity: interpolate(orbFrame, [0, 30, 270, 300], [0, 0.7, 0.7, 0]),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
