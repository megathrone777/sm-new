import React from "react";

import { Checkbox } from "@/ui";

import { wrapperClass, listClass, itemClass, priceClass } from "./Item.css";

import type { TProps } from "./Item.types";

const Item: React.FC<TProps> = ({
  id,
  isSelected,
  // onAdd,
  onRemove,
  price,
  // requiredSubModifier,
  subModifiers,
  title,
}) => {
  //   const [modifier, setModifier] = useState<TSelectedModifier | null>(null);

  const handleModifierToggle = (): void => {
    if (isSelected) {
      onRemove(id);

      return;
    }

    // onAdd();

    // setModifier((prevModifier: TSelectedModifier | null): TSelectedModifier | null => {
    //   if (prevModifier) return null;

    //   return {
    //     id,
    //     price,
    //     requiredSubModifier: attributes.requiredSubModifier,
    //     title,
    //   };
    // });
  };

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

  return (
    <>
      <div className={wrapperClass}>
        <Checkbox
          id={`${id}-modifier`}
          label={
            <>
              {title}
              {price !== 0 && (
                <>
                  {" "}
                  + <span className={priceClass}>{price} Kč</span>
                </>
              )}
            </>
          }
          onChange={handleModifierToggle}
          type="checkbox"
        />
      </div>

      {subModifiers && !!subModifiers.length && (
        <ul className={listClass}>
          {subModifiers.map(
            ({ id: subModifierID, title }: TSubmodifier): React.ReactElement => (
              <li
                className={itemClass}
                key={`${subModifierID}-${id}-submodifier`}
              >
                <Checkbox
                  className="is-small"
                  label={title}
                  name={`${id}-submodifier`}
                  // onChange={handleSubmodifierToggle}
                  type="radio"
                  value={title}
                />
              </li>
            ),
          )}
        </ul>
      )}
    </>
  );
};

export { Item };
