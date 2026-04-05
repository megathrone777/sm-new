import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "grid",
  inset: 0,
  justifyContent: "center",
  position: "fixed",
  zIndex: 101,
});

export const confirmClass = css(({ colors }) => ({
  backgroundColor: colors.white,
  borderRadius: 8,
  display: "grid",
  gap: 16,
  maxWidth: 360,
  padding: 24,
  width: "100%",
}));

export const confirmTextClass = css(({ fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.bold,
  textAlign: "center",
}));

export const confirmActionsClass = css({
  display: "flex",
  gap: 8,
  justifyContent: "center",
});
