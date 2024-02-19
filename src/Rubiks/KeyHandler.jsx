import { useKeyboardControls } from "@react-three/drei";
import { useEffect } from "react";

export function KeyHandler({ rotateSide, debugSide, disableDebug }) {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  let qDown = false;
  let shiftDown = false;
  useEffect(() => {
    const unsubscribeKeys = subscribeKeys(
      (state) => state.F || state.U || state.B || state.D || state.L || state.R,
      (pressed) => {
        if (pressed) {
          let side = Object.entries(getKeys()).filter(
            ([key, value]) => value
          )[0][0];

          console.log(side);

          if (qDown) {
            debugSide(side);
          } else {
            rotateSide(side, shiftDown);
          }
        }
      }
    );

    const unsubscribeQKey = subscribeKeys(
      (state) => state.Q,
      (pressed) => {
        qDown = pressed;

        if (!pressed) {
            disableDebug();
        }
      }
    );

    const unsubscribeShiftKey = subscribeKeys(
      (state) => state.Shift,
      (pressed) => {
        shiftDown = pressed;
      }
    );

    return () => {
      unsubscribeKeys();
      unsubscribeQKey();
      unsubscribeShiftKey();
    };
  }, []);
}
