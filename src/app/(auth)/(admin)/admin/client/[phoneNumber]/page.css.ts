import { css } from "@/theme";

export const wrapperClass = css({
  alignItems: "start",
  display: "grid",
  gap: 20,
  gridTemplateColumns: "repeat(2, 1fr)",
  marginBottom: 30,
});

export const labelClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
  marginBottom: 4,
}));

export const idClass = css(({ fonts }) => ({
  fontWeight: fonts.bold,
}));

export const linkClass = css(({ colors, fonts }) => ({
  borderRadius: 6,
  color: colors.black,
  columnGap: 10,
  display: "inline-grid",
  fontWeight: fonts.medium,
  gridAutoFlow: "column",
  padding: 8,

  ":hover": {
    backgroundColor: "rgba(0, 0, 0, .2)",
  },
}));

export const confirmWrapperClass = css({
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
