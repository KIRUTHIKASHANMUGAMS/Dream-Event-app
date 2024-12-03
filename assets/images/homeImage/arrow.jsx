import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../components/theme/ThemeContext";
const Arrow = (props) => {

    const { isDarkMode } = useTheme();

    const strokeColor = props.color || (isDarkMode ? "rgba(238 ,238,238,1)" : "rgba(71, 71, 71, 1)");
    return (
        <Svg
            width={11}
            height={5}
            viewBox="0 0 11 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path opacity={0.898205} d="M0 0H10.614L5.30702 5L0 0Z" fill={strokeColor} />
        </Svg>
    )
};
export default Arrow;
