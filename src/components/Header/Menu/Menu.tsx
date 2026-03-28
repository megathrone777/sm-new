// import React, { useCallback, useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import type { TProps, TMenuItem } from "./types";

// const Menu: React.FC<TProps> = ({ phone }) => {
//   const pathname = usePathname();
//   const [isOpened, toggleOpened] = useState<boolean>(false);
//   // const { t } = useTranslation();
//   const menuItems = t<TMenuItem[]>("mainMenu");

//   const handleMenuToggle = (): void => {
//     toggleOpened(!isOpened);
//   };

//   const handleAnchorClick = useCallback(
//     (event: React.SyntheticEvent<HTMLAnchorElement>): void => {
//       const { currentTarget } = event;
//       const { dataset } = currentTarget;

//       if (dataset.anchor && dataset.anchor.includes("#") && pathname === "/") {
//         event.preventDefault();
//         const scrolledSection = document.getElementById(dataset.anchor.replace("/#", ""));

//         scrolledSection &&
//           scrolledSection.scrollIntoView({
//             behavior: "smooth",
//           });

//         toggleOpened(false);
//       }
//     },
//     [menuItems],
//   );

//   useEffect((): void => {
//     toggleOpened(false);
//   }, [pathname]);

//   useEffect((): void => {
//     if (isOpened) {
//       document.body.style.overflow = "hidden";

//       return;
//     }

//     document.body.style.overflow = "initial";
//   }, [isOpened]);

//   return (
//     <>
//       <div className={isOpened ? "is-opened" : ""}>
//         {menuItems && !!menuItems.length && (
//           <StyledList>
//             {menuItems.map(
//               ({ anchor, text }: TMenuItem, index: number): React.ReactElement => (
//                 <li key={`${index}-${anchor}`}>
//                   <StyledLink
//                     as={Link}
//                     className={pathname === anchor ? "is-active" : ""}
//                     data-anchor={anchor}
//                     href={anchor}
//                     onClick={handleAnchorClick}
//                     scroll
//                   >
//                     {text}
//                   </StyledLink>
//                 </li>
//               ),
//             )}
//           </StyledList>
//         )}

//         <StyledContact>
//           {phone && (
//             <StyledContactLink href={`tel:${phone.replace(/ /g, "")}`}>{phone}</StyledContactLink>
//           )}
//         </StyledContact>
//       </div>

//       <StyledBurger>
//         <ThemeComponent.Burger
//           {...{ isOpened }}
//           onToggle={handleMenuToggle}
//         />
//       </StyledBurger>
//     </>
//   );
// };

// export { Menu };

export const Menu = "";