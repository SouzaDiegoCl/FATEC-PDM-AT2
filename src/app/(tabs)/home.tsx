import { useFocusEffect } from "expo-router";
import { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const ballAnimation = useRef(new Animated.Value(150)).current;

  useFocusEffect(() => {
    ballAnimation.setValue(150);
    Animated.spring(ballAnimation, {
      toValue: 450,
      friction: 1,
      tension: 40,
      useNativeDriver: true,
    }).start();
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.ballBounce,
          { transform: [{ translateY: ballAnimation }] },
        ]}
      >
        <Text style={styles.titleBounce}>
          Bem Vindo ao app <b>AT2</b>
        </Text>
      </Animated.View>
      <Text style={styles.title}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 48,
    backgroundColor: "#272727ff",

    display: "flex",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",

    textAlign: "center",
    marginTop: 32,
  },
  ballBounce: {
    height: 50,
    paddingHorizontal: 24,      
    borderRadius: 10,
    backgroundColor: "#fff",    

    display: "flex",
    justifyContent: "center",
    alignItems: "center",   
    position: "absolute",
    top: 0,
  },
  titleBounce: {
    color: "#272727ff",
    fontWeight: "600",
    fontSize: 24,
  }
});
