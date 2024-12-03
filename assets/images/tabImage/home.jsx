import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../components/theme/ThemeContext";
const Home = (props) => {
    const { isDarkMode } = useTheme();


    const strokeColor = props.color || (isDarkMode ? "rgba(238 ,238,238,1)" : "rgba(71, 71, 71, 1)");    return (
        <Svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M0.899902 11.204C0.899902 8.915 0.899902 7.771 1.4199 6.823C1.9379 5.874 2.8869 5.286 4.7839 4.108L6.7839 2.867C8.7889 1.622 9.7919 1 10.8999 1C12.0079 1 13.0099 1.622 15.0159 2.867L17.0159 4.108C18.9129 5.286 19.8619 5.874 20.3809 6.823C20.8999 7.772 20.8999 8.915 20.8999 11.203V12.725C20.8999 16.625 20.8999 18.576 19.7279 19.788C18.5559 21 16.6709 21 12.8999 21H8.8999C5.1289 21 3.2429 21 2.0719 19.788C0.900902 18.576 0.899902 16.626 0.899902 12.725V11.204Z"
                stroke={strokeColor}
                strokeWidth={1.5}
            />
            <Path
                d="M10.8999 14V17"
                stroke={strokeColor}
                strokeWidth={1.5}
                strokeLinecap="round"
            />
        </Svg>
    )
};

export default Home;