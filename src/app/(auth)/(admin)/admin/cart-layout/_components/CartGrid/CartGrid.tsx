"use client";
import React, { useState, useTransition } from "react";
import GridLayout from "react-grid-layout";

import { Button, Spinner } from "@/ui";

import {
  actionsClass,
  blockClass,
  blockHintClass,
  blockLabelClass,
  gridWrapperClass,
  headerClass,
  hintClass,
  spinnerClass,
  statusClass,
  titleClass,
  wrapperClass,
} from "./CartGrid.css";

import type { EventCallback, Layout, LayoutItem } from "react-grid-layout";
import type { TProps } from "./CartGrid.types";

const gridLabels: Record<string, string> = {
  additionals: "Přidat navíc",
  cutlery: "Příbory",
  delivery: "Doručení",
  note: "Poznámka",
  payment: "Způsoby platby",
  promo: "Promo code",
};

const getBlockHint = ({ h, w, x, y }: LayoutItem, cols: number): string => {
  if (cols === 1) return `#${y + 1}`;
  const span = w === 2 ? "full width" : x === 0 ? "left" : "right";

  return `${span} · ${h} ${h === 1 ? "row" : "rows"}`;
};

const layoutIsEqual = (layoutA: Layout, layoutB: Layout): boolean => {
  if (layoutA.length !== layoutB.length) return false;

  return layoutA.every((layoutItemA: LayoutItem) => {
    const layoutItemB = layoutB.find(({ i }: LayoutItem) => i === layoutItemA.i);

    return (
      layoutItemB &&
      layoutItemA.x === layoutItemB.x &&
      layoutItemA.y === layoutItemB.y &&
      layoutItemA.w === layoutItemB.w &&
      layoutItemA.h === layoutItemB.h
    );
  });
};

const toLayoutItems = (layout: Layout): Layout =>
  layout.map<LayoutItem>(({ h, i, w, x, y }) => ({ h, i, w, x, y }));

const CartGrid: React.FC<TProps> = ({
  cols,
  defaultLayout,
  hint,
  initialLayout,
  onSave,
  title,
}) => {
  const [layout, setLayout] = useState<Layout>(toLayoutItems(initialLayout));
  const [status, setStatus] = useState<null | TActionResult>(null);
  const [isLoading, startTransition] = useTransition();

  const handleDragStop: EventCallback = (newLayout: Layout): void => {
    if (layoutIsEqual(layout, newLayout)) return;

    startTransition(async () => {
      const responseStatus = await onSave(newLayout.map<LayoutItem>((layoutItem) => layoutItem));

      setStatus(responseStatus);
    });
  };

  const handleLayoutChange = (newLayout: Layout): void => {
    setLayout([...newLayout]);
    setStatus(null);
  };

  const handleResetClick = (): void => {
    setLayout(toLayoutItems(defaultLayout));
    setStatus(null);
  };

  console.log(layout);

  return (
    <div className={wrapperClass}>
      <div className={headerClass}>
        <h1 className={titleClass}>{title}</h1>

        <div className={actionsClass}>
          <Button
            onClick={handleResetClick}
            template="small"
            type="button"
          >
            Reset
          </Button>

          <div className={spinnerClass}>{isLoading && <Spinner template="small" />}</div>
        </div>
      </div>

      <div className={gridWrapperClass}>
        <GridLayout
          {...{ layout }}
          // compactor={getCompactor(null, true, true)}
          dragConfig={{
            enabled: true,
          }}
          dropConfig={{
            enabled: true,
          }}
          gridConfig={{
            cols: 2,
            maxRows: 6,
            rowHeight: 80,
          }}
          onDragStop={handleDragStop}
          onLayoutChange={handleLayoutChange}
          resizeConfig={{
            enabled: false,
          }}
          width={200}
        >
          {layout.map<React.ReactElement>((layoutItem: LayoutItem) => {
            const { i } = layoutItem;

            return (
              <div
                className={blockClass}
                key={i}
              >
                <span className={blockLabelClass}>{gridLabels[i] ?? i}</span>
                <span className={blockHintClass}>{getBlockHint(layoutItem, cols)}</span>
              </div>
            );
          })}
        </GridLayout>
      </div>

      {status && <p className={statusClass[status.type]}>{status.message}</p>}
      <p className={hintClass}>{hint}</p>
    </div>
  );
};

export { CartGrid };
