import {
    View,
    Text,
    useWindowDimensions,
    Animated,
    StyleSheet,
    Pressable,
  } from "react-native";
  import React from "react";
  import { StatusBar } from "expo-status-bar";
  import Icon from "react-native-vector-icons/Ionicons";
  import { useEffect } from "react";
  
  const colors = ["#FA4EAB", "#FF2626", "#00B4D8", "#65C18C", "#F76E11"];
  
  const Index = () => {
    const [active, setActive] = React.useState(0);
  
    const scale = React.useRef(new Animated.Value(1)).current;
    const fade = React.useRef(new Animated.Value(1)).current;
  
    const next = active != colors.length - 1 ? active + 1 : 0;
  
    const showAnimation = () => {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          bounciness: 20,
          velocity: 30,
        }),
        Animated.timing(fade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    };
  
    const triggerAnimation = () => {
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 100,
        }),
        Animated.timing(fade, {
          toValue: 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        showAnimation();
        setActive(next);
      });
      useEffect(() => {
        if(active != 0) {
          triggerAnimation
        }
      },[active]);
    };
  
    const width = useWindowDimensions().width;
    return (
      <View style={styles.container}>
        <StatusBar style="light" backgroundColor={colors[active]} />
  
        <Text style={styles.text}>I</Text>
  
        <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
          <Pressable onPress={triggerAnimation}>
            <Icon name="heart" size={width / 1.2} color={colors[active]} />
          </Pressable>
        </Animated.View>
  
        <Text style={styles.text}>You</Text>
      </View>
    );
  };
  
  export default Index;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: 80,
      fontWeight: "bold",
      color: "black",
    },
  });