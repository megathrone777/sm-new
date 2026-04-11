import { styled } from "~/theme";

export const StyledWrapper = styled.div(({ theme: { rem } }) => ({
  height: rem(36),
  marginBottom: rem(20),
  position: "relative",
}));

export const StyledLabel = styled.label(({ theme: { rem } }) => ({
  backgroundColor: "transparent",
  cursor: "pointer",
  position: "absolute",
  left: rem(4),
  top: "50%",
  transform: `translateY(calc(-50% - ${rem(1)}))`,
  width: rem(20),
  zIndex: 30,
}));

export const StyledFlag = styled.img({
  display: "block",
  maxWidth: "100%",
});
