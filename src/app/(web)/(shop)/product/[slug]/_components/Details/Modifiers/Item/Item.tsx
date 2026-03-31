// import React, { useCallback, useEffect, useState } from "react";

// import { AutoHeight } from "~/components";
// import { ThemeComponent } from "~/theme";
// import { TProps } from "./types";
// import { StyledMain, StyledList, StyledItem, StyledPrice } from "./styled";

// const Item: React.FC<TProps> = ({ attributes, id, index, onAdd, onRemove }) => {
//   const { priceMarkupCZK, submodifiers, title } = attributes;
//   const [modifier, setModifier] = useState<TSelectedModifier | null>(null);

//   const handleModifierToggle = (): void => {
//     setModifier((prevModifier: TSelectedModifier | null): TSelectedModifier | null => {
//       if (prevModifier) return null;

//       return {
//         id,
//         price: priceMarkupCZK,
//         requiredSubModifier: attributes.requiredSubModifier,
//         title,
//       };
//     });
//   };

//   const handleSubmodifierToggle = useCallback(
//     ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>): void => {
//       const { dataset, value } = currentTarget;

//       setModifier((prevModifier: TSelectedModifier | null): TSelectedModifier | null => {
//         if (!prevModifier) return null;

//         return {
//           ...prevModifier,
//           submodifier: {
//             id: +dataset.id!,
//             title: value,
//           },
//         };
//       });
//     },
//     [submodifiers.data],
//   );

//   useEffect((): void => {
//     if (modifier) {
//       onAdd(modifier);

//       return;
//     }

//     onRemove(id);
//   }, [modifier]);

//   return (
//     <React.Fragment key={`${id}-item-modifier`}>
//       <AutoHeight>
//         <StyledMain>
//           <ThemeComponent.Checkbox
//             id={`${id}-modifier`}
//             label={
//               <React.Fragment>
//                 {title}
//                 {priceMarkupCZK !== 0 && (
//                   <React.Fragment>
//                     {" "}
//                     + <StyledPrice>{priceMarkupCZK} Kč</StyledPrice>
//                   </React.Fragment>
//                 )}
//               </React.Fragment>
//             }
//             onChange={handleModifierToggle}
//             type="checkbox"
//           />
//         </StyledMain>

//         {modifier && submodifiers && !!submodifiers.data.length && (
//           <StyledList>
//             {submodifiers.data.map(
//               ({ attributes: { title }, id: subModifierID }): React.ReactElement => (
//                 <StyledItem key={`${subModifierID}-${id}-submodifier`}>
//                   <ThemeComponent.Checkbox
//                     className="is-small"
//                     data-id={`${subModifierID}`}
//                     id={`${index}-${subModifierID}-submodifier`}
//                     label={title}
//                     name={`${index}-submodifier`}
//                     onChange={handleSubmodifierToggle}
//                     type="radio"
//                     value={title}
//                   />
//                 </StyledItem>
//               ),
//             )}
//           </StyledList>
//         )}
//       </AutoHeight>
//     </React.Fragment>
//   );
// };

// export { Item };
