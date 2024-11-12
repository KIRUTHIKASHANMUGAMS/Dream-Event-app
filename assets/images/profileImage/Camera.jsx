import * as React from "react";
import { useTheme } from "../../../components/theme/ThemeContext";
import { Svg, Path } from "react-native-svg";
const Camera = (props) => {
    const { isDarkMode } = useTheme();

    // Define colors based on the current theme
    const strokeColor = isDarkMode ? "rgba(255, 255, 255, 1)" : "#000000";

    return (
        <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill={strokeColor} // Fill color based on theme
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            aria-label="SVG Icon" // Add accessibility label
        >
            <Path
                d="M13 3.5H11.2675L10.4156 2.2225C10.37 2.15409 10.3082 2.098 10.2357 2.05919C10.1632 2.02038 10.0822 2.00005 10 2H6C5.91777 2.00005 5.83682 2.02038 5.76432 2.05919C5.69182 2.098 5.63001 2.15409 5.58437 2.2225L4.73187 3.5H3C2.60218 3.5 2.22064 3.65804 1.93934 3.93934C1.65804 4.22064 1.5 4.60218 1.5 5V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V5C14.5 4.60218 14.342 4.22064 14.0607 3.93934C13.7794 3.65804 13.3978 3.5 13 3.5ZM13.5 12C13.5 12.1326 13.4473 12.2598 13.3536 12.3536C13.2598 12.4473 13.1326 12.5 13 12.5H3C2.86739 12.5 2.74021 12.4473 2.64645 12.3536C2.55268 12.2598 2.5 12.1326 2.5 12V5C2.5 4.86739 2.55268 4.74021 2.64645 4.64645C2.74021 4.55268 2.86739 4.5 3 4.5H5C5.08234 4.50005 5.16342 4.47977 5.23603 4.44096C5.30865 4.40214 5.37055 4.34599 5.41625 4.2775L6.2675 3H9.73188L10.5837 4.2775C10.6294 4.34599 10.6914 4.40214 10.764 4.44096C10.8366 4.47977 10.9177 4.50005 11 4.5H13C13.1326 4.5 13.2598 4.55268 13.3536 4.64645C13.4473 4.74021 13.5 4.86739 13.5 5V12ZM8 5.5C7.4561 5.5 6.92442 5.66128 6.47218 5.96346C6.01995 6.26563 5.66747 6.69512 5.45933 7.19762C5.25119 7.70012 5.19673 8.25305 5.30284 8.7865C5.40895 9.31995 5.67086 9.80995 6.05546 10.1945C6.44005 10.5791 6.93005 10.8411 7.4635 10.9472C7.99695 11.0533 8.54988 10.9988 9.05238 10.7907C9.55488 10.5825 9.98437 10.2301 10.2865 9.77782C10.5887 9.32558 10.75 8.7939 10.75 8.25C10.7492 7.52091 10.4592 6.82192 9.94363 6.30637C9.42808 5.79082 8.72909 5.50083 8 5.5ZM8 10C7.65388 10 7.31554 9.89736 7.02775 9.70507C6.73997 9.51278 6.51566 9.23947 6.38321 8.9197C6.25076 8.59993 6.2161 8.24806 6.28363 7.90859C6.35115 7.56913 6.51782 7.25731 6.76256 7.01256C7.00731 6.76782 7.31913 6.60115 7.65859 6.53363C7.99806 6.4661 8.34993 6.50076 8.6697 6.63321C8.98947 6.76566 9.26278 6.98997 9.45507 7.27775C9.64736 7.56554 9.75 7.90388 9.75 8.25C9.75 8.71413 9.56563 9.15925 9.23744 9.48744C8.90925 9.81563 8.46413 10 8 10Z"
                fill={strokeColor} // Use the same color for the path fill
            />
        </Svg>
    );
};

export default Camera;