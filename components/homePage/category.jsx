import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Category } from "../data/category"; // Ensure this is correctly imported
import { useTheme } from '../../components/theme/ThemeContext';


const SearchComponent = () => {
    const { isDarkMode } = useTheme();

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.categoryContainer}>
          {Category.map((option) => (
            <TouchableOpacity 
              key={option.value} 
              style={[styles.categoryButton, isDarkMode && styles.darkSearch]}
            >
              <Image source={option.icon} style={styles.optionIcon} />
              <Text style={[styles.categoryText, isDarkMode && styles.darkTitle]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  darkTitle: {
    color: "#fff",
  },
  categoryText: {
    color: '#333',
    fontWeight: "700",
    fontSize: 16,
    paddingLeft: 10,
  },
  optionIcon: {
    width: 24, // Adjust width as needed
    height: 24, // Adjust height as needed
  },
});
