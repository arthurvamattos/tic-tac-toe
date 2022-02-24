import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type ButtonProps = TouchableOpacityProps & {
  icon: "refresh" | "clean";
  text: string;
};

export default function Button({ icon, text, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.95} {...rest}>
      {icon === "refresh" ? (
        <Feather name="refresh-cw" size={24} color="#f1f1f6" />
      ) : (
        <Feather name="x" size={24} color="#f1f1f6" />
      )}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#363636",
    width: "50%",
    padding: 16,
    borderRadius: 4,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    color: "#f1f1f6",
    fontSize: 16,
  },
});
