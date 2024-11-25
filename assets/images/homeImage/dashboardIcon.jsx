import * as React from "react";
import { useTheme } from "../../../components/theme/ThemeContext";
import { Svg, Path } from "react-native-svg";

const dashboardIcon = (props) => {
    const { isDarkMode } = useTheme();

    // Define colors based on the current theme
    const strokeColor = isDarkMode ? "#fff" : "#000000";
    return(
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="20"
    fill={strokeColor}
    viewBox="0 0 22 20"
  >
    <Path
      fill="#000"
      d="M15.25.5C14.01.5 13 1.51 13 2.75V3H1.75a.75.75 0 1 0 0 1.5H13v.25C13 5.99 14.01 7 15.25 7s2.25-1.01 2.25-2.25V4.5h2.75a.75.75 0 1 0 0-1.5H17.5v-.25C17.5 1.51 16.49.5 15.25.5m-8.5 6.25C5.51 6.75 4.5 7.76 4.5 9v.25H1.75a.75.75 0 1 0 0 1.5H4.5V11c0 1.24 1.01 2.25 2.25 2.25S9 12.24 9 11v-.25h11.25a.751.751 0 1 0 0-1.5H9V9c0-1.24-1.01-2.25-2.25-2.25m7.5 6.25C13.01 13 12 14.01 12 15.25v.25H1.75a.751.751 0 1 0 0 1.5H12v.25c0 1.24 1.01 2.25 2.25 2.25s2.25-1.01 2.25-2.25V17h3.75a.751.751 0 1 0 0-1.5H16.5v-.25c0-1.24-1.01-2.25-2.25-2.25"
    ></Path>
  </Svg>
)};

export default dashboardIcon;
