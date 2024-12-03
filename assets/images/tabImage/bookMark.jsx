import * as React from "react";
import Svg, { Path } from "react-native-svg";
import { useTheme } from "../../../components/theme/ThemeContext";
const BookMark = (props) => {
    const { isDarkMode } = useTheme();

    const strokeColor = props.color || (isDarkMode ? "rgba(238 ,238,238,1)" : "rgba(71, 71, 71, 1)");
    return (
        <Svg
            width={15}
            height={17}
            viewBox="0 0 15 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <Path
                d="M14.5007 11.5673V7.82334C14.5007 4.60592 14.5007 2.9987 13.5122 1.99898C12.5237 1 10.9322 1 7.75082 1C4.56939 1 2.97793 1 1.98945 1.99898C1.00098 2.99795 1.00098 4.60742 1.00098 7.82334V11.568C1.00098 13.8899 1.00098 15.0517 1.55146 15.5587C1.81396 15.8009 2.14545 15.9532 2.49869 15.9937C3.23892 16.0784 4.10365 15.3134 5.83236 13.7842C6.59735 13.1085 6.97909 12.7702 7.42083 12.6817C7.63832 12.6367 7.86332 12.6367 8.08081 12.6817C8.5233 12.7702 8.90504 13.1085 9.66927 13.7842C11.398 15.3134 12.2627 16.0784 13.0029 15.9929C13.3554 15.9532 13.6877 15.8009 13.9502 15.5587C14.5007 15.0517 14.5007 13.8899 14.5007 11.5673Z"
                stroke={strokeColor}
            />
        </Svg>
    )
};
export default BookMark;
