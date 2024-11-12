import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useContext } from 'react';

const Input = ({
  label,
  placeholder,
  keyboardType,
  borderRadius,
  borderColor,
  Icon,
}) => {

  const placeholderColor = '#505050';

  return (
    <View>
      <View style={styles.inputBox}>
        <Text style={[styles.label, { color:"#000000" }]}>{label}</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              {
                color:'rgba(128, 128, 128, 1)',
                borderRadius: borderRadius || 12,
                borderColor: borderColor || 'rgba(128, 128, 128, 1)',
                backgroundColor:'rgba(128, 128, 128, 1)' ,
              },
            ]}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            keyboardType={keyboardType}
          />
          {Icon && <Icon style={styles.icon} />}
        </View>
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputBox: {
    gap: 5,
  },
  label: {
    fontSize: 18,
    lineHeight: 34,
    color: '#121212',
    textTransform: 'capitalize',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderWidth: 1,
    minWidth: 140,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: '56%',
    transform: [{ translateY: -12 }],
  },
});
