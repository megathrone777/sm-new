import { css } from "@/theme";

export const containerClass = css(() => ({
  padding: "24px 0",
}));

export const headerClass = css(() => ({
  alignItems: "center",
  display: "flex",
  gap: 16,
  justifyContent: "space-between",
  marginBottom: 24,
}));

export const titleClass = css(({ fonts }) => ({
  fontSize: 20,
  fontWeight: fonts.bold,
}));

export const actionsClass = css(() => ({
  alignItems: "center",
  display: "flex",
  gap: 12,
}));

export const saveButtonClass = css(({ colors, fonts }) => ({
  backgroundColor: colors.red,
  border: "none",
  borderRadius: 4,
  color: "#fff",
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 14,
  fontWeight: fonts.bold,
  padding: "10px 24px",
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: 0.6,
    },
    "&:hover:not(:disabled)": {
      backgroundColor: colors.redDarker,
    },
  },
}));

export const resetButtonClass = css(({ colors }) => ({
  background: "none",
  border: `1px solid ${colors.gray}`,
  borderRadius: 4,
  color: colors.gray,
  cursor: "pointer",
  fontFamily: "inherit",
  fontSize: 14,
  padding: "10px 20px",
  selectors: {
    "&:hover": {
      borderColor: colors.black,
      color: colors.black,
    },
  },
}));

export const gridWrapperClass = css(({ colors }) => ({
  backgroundColor: colors.whiteLighter,
  borderRadius: 8,
  padding: 16,
}));

export const blockClass = css(({ colors, fonts }) => ({
  alignItems: "center",
  backgroundColor: "#fff",
  border: `2px solid ${colors.red}`,
  borderRadius: 6,
  boxSizing: "border-box",
  cursor: "grab",
  display: "flex",
  flexDirection: "column",
  fontSize: 14,
  fontWeight: fonts.bold,
  gap: 4,
  justifyContent: "center",
  padding: 8,
  textAlign: "center",
  userSelect: "none",
}));

export const blockLabelClass = css(({ colors }) => ({
  color: colors.black,
  fontSize: 14,
}));

export const blockHintClass = css(({ colors }) => ({
  color: colors.gray,
  fontSize: 11,
}));

export const statusClass = css(({ colors }) => ({
  fontSize: 13,
  marginTop: 12,
  selectors: {
    "&[data-type='error']": {
      color: colors.red,
    },

    "&[data-type='success']": {
      color: colors.greenLighter,
    },
  },
}));

export const hintClass = css(({ colors }) => ({
  color: colors.gray,
  fontSize: 12,
  marginTop: 12,
}));
