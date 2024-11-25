import * as React from "react";
import { Svg, Path } from "react-native-svg";

const Clock = (props) => {
    return(
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="20"
    fill="none"
    viewBox="0 0 22 20"
  >
    <Path
      fill="#F6B027"
      d="M11 2a9 9 0 1 0 9 9 9.01 9.01 0 0 0-9-9m0 16.5a7.5 7.5 0 1 1 7.5-7.5 7.51 7.51 0 0 1-7.5 7.5M4.781 1.78l-3 3A.75.75 0 0 1 .72 3.72l3-3A.75.75 0 1 1 4.78 1.78m16.5 3a.75.75 0 0 1-1.061 0l-3-3A.75.75 0 0 1 18.28.72l3 3a.75.75 0 0 1 0 1.06m-5.03 5.47a.75.75 0 1 1 0 1.5H11a.75.75 0 0 1-.75-.75V5.75a.75.75 0 1 1 1.5 0v4.5z"
    ></Path>
  </Svg>
)};

export default Clock;
