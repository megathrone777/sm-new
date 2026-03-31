// import React, { useEffect, useState } from "react";
// import { useSearchParams, useRouter, usePathname } from "next/navigation";

// import { Item } from "./Item";
// import { TProps } from "./types";
// import { StyledHeading, StyledTitle, StyledList } from "./styled";

// const Modifiers: React.FC<TProps> = ({ modifiers, title, onUpdate }) => {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [selectedModifiers, setSelectedModifiers] = useState<TSelectedModifier[]>([]);

//   const handleModifierAdd = (modifier: TSelectedModifier): void => {
//     if (searchParams.get("action")) {
//       router.replace(pathname, {
//         scroll: false,
//       });
//     }

//     setSelectedModifiers((prevModifiers: TSelectedModifier[]): TSelectedModifier[] => {
//       const newModifiers = [...prevModifiers];
//       const foundIndex: number = prevModifiers.findIndex(({ id }): boolean => id === modifier.id);

//       if (foundIndex !== -1) {
//         newModifiers[foundIndex] = modifier;

//         return newModifiers;
//       }

//       return [...newModifiers, modifier];
//     });
//   };

//   const handleModifierRemove = (modifierID: TModifier["id"]): void => {
//     setSelectedModifiers((prevModifiers: TSelectedModifier[]): TSelectedModifier[] =>
//       prevModifiers.filter(({ id }): boolean => id !== modifierID),
//     );
//   };

//   useEffect((): void => {
//     onUpdate(selectedModifiers);
//   }, [selectedModifiers]);

//   useEffect((): void => {
//     if (searchParams.get("action")) {
//       toast(title, {
//         type: "error",
//         toastId: `actionError-${title}`,
//       });
//     }
//   }, [searchParams]);

//   return (
//     <div>
//       <StyledHeading>
//         <StyledTitle>{title}:</StyledTitle>
//       </StyledHeading>

//       {!!modifiers.length && (
//         <StyledList className={modifiers.length > 8 ? "columns" : ""}>
//           {modifiers.map(
//             ({ id, ...rest }: TModifier, index: number): React.ReactElement => (
//               <Item
//                 key={`${id}-modifier`}
//                 onAdd={handleModifierAdd}
//                 onRemove={handleModifierRemove}
//                 {...{ id, index, ...rest }}
//               />
//             ),
//           )}
//         </StyledList>
//       )}
//     </div>
//   );
// };

// export { Modifiers };
