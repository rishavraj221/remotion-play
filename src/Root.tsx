// import "./index.css";
// import { Composition } from "remotion";
// import { HelloWorld, myCompSchema } from "./HelloWorld";
// import { Logo, myCompSchema2 } from "./HelloWorld/Logo";

// // Each <Composition> is an entry in the sidebar!

// export const RemotionRoot: React.FC = () => {
//   return (
//     <>
//       <Composition
//         // You can take the "id" to render a video:
//         // npx remotion render HelloWorld
//         id="HelloWorld"
//         component={HelloWorld}
//         durationInFrames={150}
//         fps={30}
//         width={1920}
//         height={1080}
//         // You can override these props for each render:
//         // https://www.remotion.dev/docs/parametrized-rendering
//         schema={myCompSchema}
//         defaultProps={{
//           titleText: "Welcome to Remotion",
//           titleColor: "#000000",
//           logoColor1: "#91EAE4",
//           logoColor2: "#86A8E7",
//         }}
//       />

//       {/* Mount any React component to make it show up in the sidebar and work on it individually! */}
//       <Composition
//         id="OnlyLogo"
//         component={Logo}
//         durationInFrames={150}
//         fps={30}
//         width={1920}
//         height={1080}
//         schema={myCompSchema2}
//         defaultProps={{
//           logoColor1: "#91dAE2" as const,
//           logoColor2: "#86A8E7" as const,
//         }}
//       />
//     </>
//   );
// };

import { FadeIn } from "./FadeIn";
import { MyComposition } from "./MyComposition";
import { BrandLogo } from "./Level1-BrandLogo";
import { TypographyAnimation } from "./Level2-Typography";
import { ColorTransitions } from "./Level3-ColorTransitions";
import { SocialTemplates } from "./Level4-SocialTemplates";
import { ProductShowcase } from "./Level5-ProductShowcase";
import { DataVisualization } from "./Level6-DataVisualization";
import { AdvancedMotionGraphics } from "./Level7-AdvancedMotion";
import { DynamicContent, dynamicContentSchema } from "./Level8-DynamicContent";
import { CloudSyncPro } from "./CloudSyncPro";
import { Composition } from "remotion";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyComposition"
        component={CloudSyncPro}
        durationInFrames={1350}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* <Composition
        id="MyComposition"
        component={DynamicContent}
        durationInFrames={300}
        fps={30}
        width={1920}
        height={1080}
        schema={dynamicContentSchema}
        defaultProps={{
          companyName: "TechFlow",
          productName: "Smart Analytics",
          launchDate: "Q1 2024",
          price: "$299",
          features: [
            "Real-time Analytics",
            "AI-Powered Insights",
            "Custom Dashboards",
            "Mobile Integration"
          ],
          colors: {
            primary: "#667eea",
            secondary: "#4ecdc4",
            accent: "#ffd700"
          },
          logo: "📊",
          stats: {
            users: 150000,
            revenue: 7500000,
            growth: 92
          }
        }}
      /> */}
      {/* <Composition
        id="MyComposition"
        component={BrandLogo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      /> */}
      {/* <Composition
        id="MyComposition"
        component={FadeIn}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      /> */}
    </>
  );
};
