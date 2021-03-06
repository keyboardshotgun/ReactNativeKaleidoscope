import Animated, { useSharedValue } from "react-native-reanimated";

export interface Vector<T = number> {
  x: T;
  y: T;
}

export const useVector = (
  x1 = 0,
  y1?: number
): Vector<Animated.SharedValue<number>> => {
  const x = useSharedValue(x1);
  const y = useSharedValue(y1 ?? x1);
  return { x, y };
};

export const distance = (a: Vector<number>, b: Vector<number>) => {
  "worklet";
  return Math.hypot(a.x - b.x, a.y - b.y);
};
