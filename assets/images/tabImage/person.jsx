import * as React from "react";
import Svg, { Ellipse, Path } from "react-native-svg";
import { useTheme } from "../../../components/theme/ThemeContext";

const Person = (props) => {
    const { isDarkMode } = useTheme();

   
    const strokeColor = props.color || (isDarkMode ? "rgba(238 ,238,238,1)" : "rgba(71, 71, 71, 1)");
        return (
        <Svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Ellipse
                cx={11.6794}
                cy={7.27803}
                rx={4.77803}
                ry={4.77803}
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.1006 18.7013C4.09932 18.3654 4.17444 18.0336 4.32028 17.7311C4.77795 16.8157 6.06857 16.3306 7.1395 16.1109C7.91186 15.9461 8.69489 15.836 9.48275 15.7814C10.9414 15.6533 12.4085 15.6533 13.8672 15.7814C14.655 15.8366 15.438 15.9467 16.2104 16.1109C17.2814 16.3306 18.572 16.77 19.0297 17.7311C19.323 18.3479 19.323 19.0639 19.0297 19.6807C18.572 20.6418 17.2814 21.0812 16.2104 21.2917C15.439 21.4633 14.6557 21.5766 13.8672 21.6304C12.68 21.731 11.4872 21.7494 10.2974 21.6853C10.0228 21.6853 9.75735 21.6853 9.48275 21.6304C8.69722 21.5772 7.9169 21.464 7.14866 21.2917C6.06857 21.0812 4.7871 20.6418 4.32028 19.6807C4.17518 19.3746 4.10014 19.04 4.1006 18.7013Z"
                stroke={strokeColor}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
};
export default Person;
