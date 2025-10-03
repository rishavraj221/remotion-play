import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// 3D-like Product Card Component
const ProductCard = ({ 
  productName,
  price,
  delay = 0,
  color = "#667eea",
  position = { x: 0, y: 0 },
  scale = 1
}: {
  productName: string;
  price: string;
  delay?: number;
  color?: string;
  position?: { x: number; y: number };
  scale?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 3D rotation effect
  const rotationY = interpolate(
    frame,
    [delay, delay + 60],
    [0, 360],
    {
      extrapolateRight: "clamp",
    }
  );

  const rotationX = interpolate(
    frame,
    [delay + 30, delay + 90],
    [0, 15],
    {
      extrapolateRight: "clamp",
    }
  );

  // Scale animation
  const cardScale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
    },
  });

  // Shadow depth
  const shadowDepth = interpolate(
    frame,
    [delay, delay + 60],
    [0, 20],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: `perspective(1000px) rotateY(${rotationY}deg) rotateX(${rotationX}deg) scale(${cardScale * scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div
        style={{
          width: 200,
          height: 280,
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          borderRadius: 20,
          padding: 20,
          boxShadow: `0 ${shadowDepth}px 40px rgba(0,0,0,0.3)`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid white",
        }}
      >
        {/* Product Image Placeholder */}
        <div
          style={{
            width: "100%",
            height: 120,
            background: "rgba(255,255,255,0.2)",
            borderRadius: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2rem",
            color: "white",
            marginBottom: 15,
          }}
        >
          📱
        </div>

        {/* Product Info */}
        <div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "white",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {productName}
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            {price}
          </div>
        </div>

        {/* Buy Button */}
        <div
          style={{
            backgroundColor: "white",
            color: color,
            padding: "8px 16px",
            borderRadius: 25,
            textAlign: "center",
            fontSize: "0.9rem",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          BUY NOW
        </div>
      </div>
    </div>
  );
};

// Image Transition Component
const ImageTransition = ({ 
  images,
  delay = 0,
  duration = 60
}: {
  images: string[];
  delay?: number;
  duration?: number;
}) => {
  const frame = useCurrentFrame();

  const currentImageIndex = Math.floor((frame - delay) / duration) % images.length;
  const nextImageIndex = (currentImageIndex + 1) % images.length;
  const progress = ((frame - delay) % duration) / duration;

  const currentImage = images[currentImageIndex];
  const nextImage = images[nextImageIndex];

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 300,
        height: 200,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      }}
    >
      {/* Current Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${currentImage}, ${currentImage}dd)`,
          opacity: interpolate(progress, [0, 0.5, 1], [1, 0.5, 0]),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          color: "white",
        }}
      >
        {currentImageIndex === 0 ? "📱" : currentImageIndex === 1 ? "💻" : "⌚"}
      </div>

      {/* Next Image */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${nextImage}, ${nextImage}dd)`,
          opacity: interpolate(progress, [0, 0.5, 1], [0, 0.5, 1]),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          color: "white",
        }}
      >
        {nextImageIndex === 0 ? "📱" : nextImageIndex === 1 ? "💻" : "⌚"}
      </div>
    </div>
  );
};

// Feature Highlight Component
const FeatureHighlight = ({ 
  feature,
  icon,
  delay = 0,
  color = "#667eea"
}: {
  feature: string;
  icon: string;
  delay?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 25,
      stiffness: 80,
    },
  });

  const glow = interpolate(
    frame,
    [delay, delay + 60],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 15,
        transform: `translateX(${(1 - slideIn) * -100}px)`,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          boxShadow: `0 0 20px ${color}${Math.floor(glow * 100).toString(16).padStart(2, '0')}`,
        }}
      >
        {icon}
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
};

// Call-to-Action Component
const CallToAction = ({ 
  text,
  delay = 0,
  color = "#ff6b6b"
}: {
  text: string;
  delay?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 15,
      stiffness: 120,
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
        transform: `scale(${scale * pulse})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: color,
          color: "white",
          padding: "15px 40px",
          borderRadius: 30,
          fontSize: "1.3rem",
          fontWeight: "bold",
          boxShadow: `0 10px 30px ${color}40`,
          cursor: "pointer",
          border: "3px solid white",
        }}
      >
        {text}
      </div>
    </div>
  );
};

// Main Product Showcase Component
export const ProductShowcase = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Background animation
  const backgroundHue = interpolate(frame, [0, 300], [200, 360], {
    extrapolateRight: "clamp",
  });

  // Product images for transition
  const productImages = ["#667eea", "#4ecdc4", "#45b7d1"];

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
              marginBottom: "10px",
            }}
          >
            PRODUCT SHOWCASE
          </div>
          <div
            style={{
              fontSize: "1.5rem",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Amazing Products, Amazing Prices
          </div>
        </div>
      </Sequence>

      {/* Product Cards */}
      <Sequence from={60} durationInFrames={120}>
        <ProductCard
          productName="Smart Phone"
          price="$699"
          delay={0}
          color="#667eea"
          position={{ x: width * 0.1, y: height * 0.3 }}
        />
        <ProductCard
          productName="Laptop Pro"
          price="$1299"
          delay={20}
          color="#4ecdc4"
          position={{ x: width * 0.4, y: height * 0.3 }}
        />
        <ProductCard
          productName="Smart Watch"
          price="$399"
          delay={40}
          color="#45b7d1"
          position={{ x: width * 0.7, y: height * 0.3 }}
        />
      </Sequence>

      {/* Image Transition */}
      <Sequence from={120} durationInFrames={90}>
        <ImageTransition
          images={productImages}
          delay={0}
          duration={30}
        />
      </Sequence>

      {/* Feature Highlights */}
      <Sequence from={180} durationInFrames={90}>
        <div
          style={{
            position: "absolute",
            left: "10%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <FeatureHighlight
            feature="Premium Quality"
            icon="⭐"
            delay={0}
            color="#ffd700"
          />
          <FeatureHighlight
            feature="Fast Delivery"
            icon="🚚"
            delay={20}
            color="#4ecdc4"
          />
          <FeatureHighlight
            feature="24/7 Support"
            icon="🛟"
            delay={40}
            color="#667eea"
          />
        </div>
      </Sequence>

      {/* Call to Action */}
      <Sequence from={240} durationInFrames={60}>
        <div
          style={{
            position: "absolute",
            bottom: "15%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <CallToAction
            text="SHOP NOW - LIMITED TIME OFFER!"
            delay={0}
            color="#ff6b6b"
          />
        </div>
      </Sequence>

      {/* Floating Elements */}
      {Array.from({ length: 8 }).map((_, i) => {
        const delay = i * 15;
        const orbFrame = Math.max(0, frame - delay);
        const colors = ["#667eea", "#4ecdc4", "#45b7d1", "#ff6b6b"];
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
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: orbColor,
              transform: `scale(${scale})`,
              boxShadow: `0 0 15px ${orbColor}`,
              opacity: interpolate(orbFrame, [0, 30, 270, 300], [0, 0.7, 0.7, 0]),
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
