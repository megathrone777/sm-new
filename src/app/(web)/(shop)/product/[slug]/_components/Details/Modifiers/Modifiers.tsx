import React from "react";
// import { useSearchParams } from "next/navigation";

import { Checkbox } from "@/ui";

import { listClass, itemClass, priceClass } from "./Modifiers.css";

import type { TProps } from "./Modifiers.types";

const Modifiers: React.FC<TProps> = ({ modifiers }) => {
  // const searchParams = useSearchParams();

  // const handleModifierAdd = (modifier: TCartModifier): void => {
  //   if (searchParams.get("action")) {
  // router.replace<string>(pathname, {
  //   scroll: false,
  // });
  // }

  // setSelectedModifiers((prevModifiers: TSelectedModifier[]): TSelectedModifier[] => {
  //   const newModifiers = [...prevModifiers];
  //   const foundIndex: number = prevModifiers.findIndex(({ id }): boolean => id === modifier.id);

  //   if (foundIndex !== -1) {
  //     newModifiers[foundIndex] = modifier;

  //     return newModifiers;
  //   }

  //   return [...newModifiers, modifier];
  // });
  // };

  // const handleModifierRemove = (modifierID: TModifier["id"]): void => {
  //   setSelectedModifiers((prevModifiers: TSelectedModifier[]): TSelectedModifier[] =>
  //     prevModifiers.filter(({ id }): boolean => id !== modifierID),
  //   );
  // };

  // useEffect((): void => {
  //   onUpdate(selectedModifiers);
  // }, [selectedModifiers]);

  // useEffect((): void => {
  //   if (searchParams.get("action")) {
  // toast(title, {
  //   type: "error",
  //   toastId: `actionError-${title}`,
  // });
  //   }
  // }, [searchParams]);

  return (
    <div className={modifiers.length > 8 ? "columns" : ""}>
      {modifiers.map(
        ({ id, price, subModifiers, title }: TModifier): React.ReactElement => (
          <div key={`${id}-modifier-item`}>
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
              type="checkbox"
            />

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
                        template="small"
                        type="radio"
                        value={title}
                      />
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>
        ),
      )}
    </div>
  );
};

export { Modifiers };
