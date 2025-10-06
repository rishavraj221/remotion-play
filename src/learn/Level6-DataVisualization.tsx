import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Animated Bar Chart Component
const AnimatedBarChart = ({ 
  data,
  delay = 0,
  colors = ["#667eea", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"]
}: {
  data: { label: string; value: number }[];
  delay?: number;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div
      style={{
        display: "flex",
        alignItems: "end",
        gap: "20px",
        height: 300,
        padding: "20px",
        background: "rgba(255,255,255,0.1)",
        borderRadius: 15,
        backdropFilter: "blur(10px)",
      }}
    >
      {data.map((item, index) => {
        const barDelay = delay + index * 10;
        const barProgress = spring({
          frame: frame - barDelay,
          fps: 30,
          config: {
            damping: 20,
            stiffness: 100,
          },
        });

        const barHeight = (item.value / maxValue) * 250;
        const animatedHeight = barHeight * barProgress;

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Bar */}
            <div
              style={{
                width: 60,
                height: animatedHeight,
                background: `linear-gradient(180deg, ${colors[index % colors.length]}, ${colors[index % colors.length]}dd)`,
                borderRadius: "10px 10px 0 0",
                boxShadow: `0 5px 15px ${colors[index % colors.length]}40`,
                display: "flex",
                alignItems: "end",
                justifyContent: "center",
                paddingBottom: 10,
              }}
            >
              <div
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {Math.round(item.value * barProgress)}
              </div>
            </div>

            {/* Label */}
            <div
              style={{
                color: "white",
                fontSize: "0.8rem",
                fontWeight: "bold",
                textAlign: "center",
                opacity: barProgress,
              }}
            >
              {item.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Animated Pie Chart Component
const AnimatedPieChart = ({ 
  data,
  delay = 0,
  colors = ["#667eea", "#4ecdc4", "#45b7d1", "#96ceb4"]
}: {
  data: { label: string; value: number; color?: string }[];
  delay?: number;
  colors?: string[];
}) => {
  const frame = useCurrentFrame();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  const pieProgress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  let cumulativePercentage = 0;

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Pie Chart */}
      <svg width="200" height="200" style={{ position: "absolute" }}>
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = (cumulativePercentage / 100) * 360;
          const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
          
          // Animate the segment
          const animatedEndAngle = startAngle + (endAngle - startAngle) * pieProgress;
          
          const largeArcFlag = percentage > 50 ? 1 : 0;
          const x1 = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
          const y1 = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
          const x2 = 100 + 80 * Math.cos((animatedEndAngle * Math.PI) / 180);
          const y2 = 100 + 80 * Math.sin((animatedEndAngle * Math.PI) / 180);

          cumulativePercentage += percentage;

          return (
            <path
              key={index}
              d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
              fill={item.color || colors[index % colors.length]}
              opacity={0.8}
            />
          );
        })}
      </svg>

      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: "bold",
          opacity: pieProgress,
        }}
      >
        <div>Total</div>
        <div>{total}</div>
      </div>
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ 
  endValue,
  delay = 0,
  duration = 60,
  prefix = "",
  suffix = "",
  color = "#667eea"
}: {
  endValue: number;
  delay?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
}) => {
  const frame = useCurrentFrame();

  const countProgress = interpolate(
    frame,
    [delay, delay + duration],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const currentValue = Math.round(endValue * countProgress);

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
        fontSize: "3rem",
        fontWeight: "bold",
        color: color,
        textAlign: "center",
        transform: `scale(${scale})`,
        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
      }}
    >
      {prefix}{currentValue.toLocaleString()}{suffix}
    </div>
  );
};

// Progress Bar Component
const AnimatedProgressBar = ({ 
  percentage,
  delay = 0,
  color = "#667eea",
  label = ""
}: {
  percentage: number;
  delay?: number;
  color?: string;
  label?: string;
}) => {
  const frame = useCurrentFrame();

  const progress = spring({
    frame: frame - delay,
    fps: 30,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  const animatedPercentage = percentage * progress;

  return (
    <div
      style={{
        width: "100%",
        marginBottom: 20,
      }}
    >
      {label && (
        <div
          style={{
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: 20,
          background: "rgba(255,255,255,0.2)",
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${animatedPercentage}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            borderRadius: 10,
            transition: "width 0.3s ease",
            boxShadow: `0 2px 8px ${color}40`,
          }}
        />
      </div>
      <div
        style={{
          color: "white",
          fontSize: "0.9rem",
          textAlign: "right",
          marginTop: 5,
        }}
      >
        {Math.round(animatedPercentage)}%
      </div>
    </div>
  );
};

// Main Data Visualization Component
export const DataVisualization = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Sample data
  const barChartData = [
    { label: "Q1", value: 85 },
    { label: "Q2", value: 92 },
    { label: "Q3", value: 78 },
    { label: "Q4", value: 95 },
  ];

  const pieChartData = [
    { label: "Mobile", value: 45, color: "#667eea" },
    { label: "Desktop", value: 30, color: "#4ecdc4" },
    { label: "Tablet", value: 20, color: "#45b7d1" },
    { label: "Other", value: 5, color: "#96ceb4" },
  ];

  // Background animation
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
      {/* Title Section */}
      <Sequence from={0} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "3.5rem",
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              marginBottom: "10px",
            }}
          >
            DATA INSIGHTS
          </div>
          <div
            style={{
              fontSize: "1.3rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Visualizing Success Through Numbers
          </div>
        </div>
      </Sequence>

      {/* Bar Chart Section */}
      <Sequence from={60} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "20%",
            width: "40%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Quarterly Performance
          </div>
          <AnimatedBarChart data={barChartData} delay={0} />
        </div>
      </Sequence>

      {/* Pie Chart Section */}
      <Sequence from={90} durationInFrames={120}>
        <div
          style={{
            position: "absolute",
            right: "5%",
            top: "20%",
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: 20,
              textAlign: "center",
            }}
          >
            Device Distribution
          </div>
          <AnimatedPieChart data={pieChartData} delay={0} />
        </div>
      </Sequence>

      {/* Statistics Section */}
      <Sequence from={150} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            left: "5%",
            bottom: "25%",
            width: "40%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Key Metrics
          </div>
          <AnimatedCounter
            endValue={1250000}
            delay={0}
            duration={60}
            prefix="$"
            suffix="+"
            color="#ffd700"
          />
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "1rem",
              marginTop: 5,
            }}
          >
            Total Revenue
          </div>
        </div>
      </Sequence>

      {/* Progress Bars Section */}
      <Sequence from={180} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            right: "5%",
            bottom: "25%",
            width: "40%",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "1.3rem",
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Growth Targets
          </div>
          <AnimatedProgressBar
            percentage={85}
            delay={0}
            color="#4ecdc4"
            label="Customer Satisfaction"
          />
          <AnimatedProgressBar
            percentage={92}
            delay={20}
            color="#667eea"
            label="Market Share"
          />
          <AnimatedProgressBar
            percentage={78}
            delay={40}
            color="#45b7d1"
            label="Brand Recognition"
          />
        </div>
      </Sequence>

      {/* Floating Data Points */}
      {Array.from({ length: 10 }).map((_, i) => {
        const delay = i * 15;
        const orbFrame = Math.max(0, frame - delay);
        const colors = ["#667eea", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57"];
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
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: orbColor,
              transform: `scale(${scale})`,
              boxShadow: `0 0 10px ${orbColor}`,
              opacity: interpolate(orbFrame, [0, 30, 270, 300], [0, 0.6, 0.6, 0]),
            }}
          />
        );
      })}

      {/* Data Flow Lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => {
          const lineDelay = i * 30;
          const lineFrame = Math.max(0, frame - lineDelay);
          const progress = (lineFrame / 120) % 1;

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `${20 + i * 15}%`,
                left: `${progress * 100}%`,
                width: 2,
                height: 100,
                background: `linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)`,
                opacity: interpolate(progress, [0, 0.5, 1], [0, 1, 0]),
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
