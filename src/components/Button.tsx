import {
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
        <Feather name="refresh-cw" size={24} color="#bbb" />
      ) : (
        <Feather name="x" size={24} color="#bbb" />
      )}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#010106",
    width: "50%",
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 4,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderColor: "#bbb",
    borderWidth: 2,
  },

  text: {
    color: "#bbb",
    fontSize: 16,
  },
});
