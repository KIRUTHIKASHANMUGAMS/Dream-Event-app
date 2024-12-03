import * as React from "react";
import Svg, { Mask, Path, G } from "react-native-svg";
import { useTheme } from "../../../components/theme/ThemeContext";
const Notification = (props) => {
    const { isDarkMode } = useTheme();

    const strokeColor = props.color || (isDarkMode ? "rgba(238 ,238,238,1)" : "rgba(71, 71, 71, 1)");
    return(
  <Svg
    width={19}
    height={22}
    viewBox="0 0 19 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Mask
      id="mask0_15_717"
      style={{
        maskType: "luminance",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={19}
      height={18}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H18.4969V17.348H0V0Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0_15_717)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.24699 1.5C5.752 1.5 3.31599 4.238 3.31599 6.695C3.31599 8.774 2.73899 9.735 2.22899 10.583C1.81999 11.264 1.49699 11.802 1.49699 12.971C1.66399 14.857 2.90899 15.848 9.24699 15.848C15.55 15.848 16.834 14.813 17 12.906C16.997 11.802 16.674 11.264 16.265 10.583C15.755 9.735 15.178 8.774 15.178 6.695C15.178 4.238 12.742 1.5 9.24699 1.5ZM9.24701 17.348C4.57101 17.348 0.345013 17.018 1.33547e-05 13.035C-0.00298665 11.387 0.500013 10.549 0.944013 9.811C1.39301 9.063 1.81601 8.358 1.81601 6.695C1.81601 3.462 4.80201 0 9.24701 0C13.692 0 16.678 3.462 16.678 6.695C16.678 8.358 17.101 9.063 17.55 9.811C17.994 10.549 18.497 11.387 18.497 12.971C18.148 17.018 13.923 17.348 9.24701 17.348Z"
        fill={strokeColor}
      />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.19803 21.5H9.19603C8.07503 21.499 7.01403 21.005 6.20903 20.108C5.93203 19.801 5.95703 19.326 6.26503 19.05C6.57303 18.772 7.04703 18.797 7.32403 19.106C7.84203 19.683 8.50703 20 9.19703 20H9.19803C9.89103 20 10.559 19.683 11.078 19.105C11.356 18.798 11.83 18.773 12.137 19.05C12.445 19.327 12.47 19.802 12.193 20.109C11.385 21.006 10.322 21.5 9.19803 21.5Z"
      fill={strokeColor}
    />
  </Svg>
)};
export default Notification;
