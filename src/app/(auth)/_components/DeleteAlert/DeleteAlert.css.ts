import { rgba, style } from "@/theme";

export const wrapperClass = style(({ colors }) => ({
  alignItems: "center",
  backgroundColor: rgba(colors.black, 0.5),
  display: "grid",
  inset: 0,
  justifyContent: "center",
  position: "fixed",
  zIndex: 101,
}));

export const confirmClass = style(({ colors }) => ({
  backgroundColor: colors.white,
  borderRadius: 8,
  display: "grid",
  gap: 16,
  maxWidth: 360,
  padding: 24,
  width: "100%",
}));

export const confirmTextClass = style(({ fonts }) => ({
  fontSize: 16,
  fontWeight: fonts.bold,
  textAlign: "center",
}));

export const confirmActionsClass = style({
  display: "flex",
  gap: 8,
  justifyContent: "center",
});
