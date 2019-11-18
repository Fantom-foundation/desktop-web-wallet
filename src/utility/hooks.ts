import { useCallback, useEffect } from "react";

export const useCloseOnEscape = (
  onRequestClose: (() => void) | undefined,
  ignore_inputs = true
) => {
  const onEscape = useCallback(
    event => {
      if (event.key !== "Escape") return;
      if (
        ignore_inputs &&
        (event.target.tagName === "INPUT" ||
          event.target.tagName === "TEXTAREA")
      )
        return;

      if (onRequestClose) onRequestClose();
    },
    [ignore_inputs, onRequestClose]
  );

  useEffect(() => {
    window.addEventListener("keyup", onEscape);

    return () => {
      window.removeEventListener("keyup", onEscape);
    };
  }, [onEscape]);
};
