import * as React from "react";
import { useTheme } from "../../../components/theme/ThemeContext";
import { Svg, Path ,G ,Defs ,ClipPath} from "react-native-svg";

const MapIcon = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <G
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#clip0_16_453)"
            >
                <Path
                    fill="#F6B027"
                    stroke="#F6B027"
                    strokeWidth="1.5"
                    d="M14 6.667c0 4.666-6 8.666-6 8.666s-6-4-6-8.666a6 6 0 1 1 12 0"
                ></Path>
                <Path
                    fill="#000"
                    stroke="#000"
                    d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
                ></Path>
            </G>
            <Defs>
                <ClipPath id="clip0_16_453">
                    <Path fill="#fff" d="M0 0h16v16H0z"></Path>
                </ClipPath>
            </Defs>
        </Svg>
    )
};

export default MapIcon;
