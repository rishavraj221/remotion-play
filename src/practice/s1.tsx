import { 
  useCurrentFrame, 
  interpolate, 
  AbsoluteFill, 
  Sequence, 
  useVideoConfig,
  Composition,
  random,
  Audio,
  Easing
} from 'remotion';
import { useMemo } from 'react';
import {loadFont} from '@remotion/google-fonts/RammettoOne';
import audioFile from '../assets/a1.mp3'; // keep audio in src/assets folder

// Load font once at module level
const {fontFamily} = loadFont();

// Animation type definitions
type AnimationType = 'appear' | 'slideUpDown' | 'slideLeftToCenter' | 'slideToRight';

interface AnimationConfig {
  intro: AnimationType;
  outro: AnimationType;
}

// A seeded Fisher-Yates shuffle algorithm
const seededShuffle = (arr: number[], seed: string) => {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random(seed + i) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// AnimatedText Component - Three phase animation: intro, hold, outro
const AnimatedText = ({ 
  title, 
  animationConfig 
}: { 
  title: string; 
  animationConfig: AnimationConfig;
}) => {
  const frame = useCurrentFrame();
  
  // Phase timings
  const INTRO_DURATION = 20;
  const HOLD_DURATION = 30;
  const OUTRO_DURATION = 20;
  
  // Current phase
  const isIntro = frame < INTRO_DURATION;
  const isHold = frame >= INTRO_DURATION && frame < INTRO_DURATION + HOLD_DURATION;
  const isOutro = frame >= INTRO_DURATION + HOLD_DURATION;
  
  // Phase progress (0 to 1)
  const introProgress = isIntro ? frame / INTRO_DURATION : 1;
  const outroProgress = isOutro ? (frame - (INTRO_DURATION + HOLD_DURATION)) / OUTRO_DURATION : 0;
  
  // Character reveal for hold phase
  const words = title.split(' ');
  const characters = title.split('');
  
  const shuffledIndices = useMemo(() => {
    const indices = Array.from(Array(characters.length).keys());
    return seededShuffle(indices, title); 
  }, [characters.length, title]);

  // Calculate visible characters during hold phase
  const holdStartFrame = frame - INTRO_DURATION;
  const charRevealSpeed = 2;
  const numCharsToReveal = isHold ? Math.floor(holdStartFrame / charRevealSpeed) : 0;
  const visibleChars = new Set(shuffledIndices.slice(0, numCharsToReveal));

  // Animation functions
  const getIntroTransform = () => {
    switch (animationConfig.intro) {
      case 'appear':
        return {
          opacity: introProgress,
          scale: 0.8 + (introProgress * 0.2),
        };
      case 'slideLeftToCenter':
        return {
          opacity: introProgress,
          translateX: interpolate(introProgress, [0, 1], [-1920, 0], {
            easing: Easing.out(Easing.back(1.2))
          }),
        };
      default:
        return { opacity: introProgress, scale: 1 };
    }
  };

  const getOutroTransform = () => {
    switch (animationConfig.outro) {
      case 'slideUpDown':
        // For "RECHEE MOTION" - first word goes up, second word goes down
        return {
          translateY: interpolate(outroProgress, [0, 1], [0, -200], {
            easing: Easing.in(Easing.cubic)
          }),
        };
      case 'slideToRight':
        return {
          translateX: interpolate(outroProgress, [0, 1], [0, 1920], {
            easing: Easing.in(Easing.cubic)
          }),
        };
      default:
        return { opacity: 1 - outroProgress };
    }
  };

  const introTransform = getIntroTransform();
  const outroTransform = getOutroTransform();

  // Combine transforms
  const transform = `translateX(${introTransform.translateX || outroTransform.translateX || 0}px) translateY(${outroTransform.translateY || 0}px) scale(${introTransform.scale || 1})`;
  const opacity = isOutro ? outroTransform.opacity || (1 - outroProgress) : introTransform.opacity || 1;

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      filter: 'drop-shadow(5px 5px 0px rgba(0, 0, 0, 0.4))',
      opacity,
      transform
    }}>
      <svg width="100%" height="100%" viewBox="0 0 1920 1080">
        <defs>
          <style type="text/css">
            {`
              .titleText {
                font-family: ${fontFamily};
                font-size: 250px;
                font-weight: 900;
                text-anchor: middle;
              }
            `}
          </style>
        </defs>

        <text 
          x="50%" 
          y="50%" 
          dy=".3em" 
          className="titleText"
          stroke="hotpink"
          strokeWidth="3"
          strokeDasharray="1000"
          strokeDashoffset={isIntro ? interpolate(introProgress, [0, 1], [1000, 0]) : 0}
        >
          {words.map((word, wordIndex) => (
            <tspan
              key={wordIndex}
              x="50%"
              dy={wordIndex === 0 ? "0em" : "1.2em"}
            >
              {word.split('').map((char, charIndex) => {
                const globalCharIndex = words.slice(0, wordIndex).join(' ').length + charIndex + wordIndex;
                const isVisible = visibleChars.has(globalCharIndex);
                const fillOpacity = isHold && isVisible ? 1 : 0;

                return (
                  <tspan
                    key={`char-${wordIndex}-${charIndex}`}
                    fill={`rgba(255, 105, 180, ${fillOpacity})`}
                  >
                    {char}
                  </tspan>
                );
              })}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
};

// Main Composition with multiple text sequences
const StrokeAndFillComposition = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const TEXT_DURATION = 70; // Duration for each text animation

  // Animate scale from 1 to 1.1 over the whole video for subtle zoom
  const scale = interpolate(frame, [0, durationInFrames], [1, 1.1]);

  return (
    <AbsoluteFill style={{ 
      backgroundColor: '#1E1E1E',
      backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      backgroundRepeat: 'repeat'
    }}>
      {/* Audio track */}
      <Audio src={audioFile} />
      
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Sequence from={0} durationInFrames={TEXT_DURATION}>
          <AnimatedText 
            title="RECHEE MOTION" 
            animationConfig={{ intro: 'appear', outro: 'slideUpDown' }}
          />
        </Sequence>

        <Sequence from={TEXT_DURATION} durationInFrames={TEXT_DURATION}>
          <AnimatedText 
            title="STROKE INTRO" 
            animationConfig={{ intro: 'slideLeftToCenter', outro: 'slideToRight' }}
          />
        </Sequence>

        <Sequence from={TEXT_DURATION * 2} durationInFrames={TEXT_DURATION}>
          <AnimatedText 
            title="MOGRT FILE" 
            animationConfig={{ intro: 'appear', outro: 'slideToRight' }}
          />
        </Sequence>

        <Sequence from={TEXT_DURATION * 3} durationInFrames={TEXT_DURATION}>
          <AnimatedText 
            title="ANIME" 
            animationConfig={{ intro: 'slideLeftToCenter', outro: 'slideUpDown' }}
          />
        </Sequence>

        <Sequence from={TEXT_DURATION * 4} durationInFrames={TEXT_DURATION}>
          <AnimatedText 
            title="CREATIVE" 
            animationConfig={{ intro: 'appear', outro: 'slideToRight' }}
          />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Export the composition for Remotion
export const S1Composition = () => {
  return (
    <Composition
      id="MyComposition"
      component={StrokeAndFillComposition}
      durationInFrames={350} // 5 text sequences * 70 frames each
      fps={30}
      width={1920}
      height={1080}
    />
  );
};

// Default export for direct use
export default StrokeAndFillComposition;
