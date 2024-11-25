import * as React from "react";
import Svg, { Circle, G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const TickIcon = (props) => (
  <Svg
    width={61}
    height={64}
    viewBox="0 0 61 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={30.5} cy={30} r={30} fill="#F6B027" />
    <G filter="url(#filter0_d_460_1277)">
      <Circle
        cx={30.5001}
        cy={30}
        r={25.231}
        stroke="black"
        strokeOpacity={0.7}
        strokeWidth={2}
      />
    </G>
    <Path
      d="M43.8318 23.4369C43.8318 24.2537 43.5113 25.0424 42.9285 25.6058L29.3782 38.732C28.7663 39.2954 27.9504 39.6334 27.1053 39.6334C26.2602 39.6334 25.4443 39.2954 24.8615 38.732L18.0718 32.1689C17.489 31.6056 17.1685 30.8169 17.1685 30C17.1685 29.1831 17.5181 28.4226 18.1009 27.8311C18.7129 27.2677 19.4997 26.9579 20.3448 26.9297C21.1898 26.9297 21.9766 27.2395 22.5886 27.8029L27.1053 32.1689L38.4117 21.2398C39.0237 20.6764 39.8105 20.3666 40.6556 20.3666C41.5006 20.3947 42.2874 20.7046 42.8993 21.2961C43.4822 21.8595 43.8318 22.62 43.8318 23.4369Z"
      fill="black"
    />
    <Defs></Defs>
  </Svg>
);
export default TickIcon;
