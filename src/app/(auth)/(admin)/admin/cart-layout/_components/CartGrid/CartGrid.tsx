"use client";
import React, { useRef, useState, useTransition } from "react";
import GridLayout, { useContainerWidth } from "react-grid-layout";
import { toast } from "react-toastify";

import { Button, Spinner } from "@/ui";

import {
  actionsClass,
  blockClass,
  blockLabelClass,
  gridWrapperClass,
  headerClass,
  hintClass,
  spinnerClass,
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
  const [layout, setLayout] = useState<Layout>(() => toLayoutItems(initialLayout));
  const [isLoading, startTransition] = useTransition();
  const { containerRef, mounted, width } = useContainerWidth();
  const savedLayoutRef = useRef<Layout>(toLayoutItems(initialLayout));

  const persistLayout = (nextLayout: Layout): void => {
    if (layoutIsEqual(savedLayoutRef.current, nextLayout)) return;

    savedLayoutRef.current = nextLayout;

    startTransition(async () => {
      const { message, type } = await onSave(nextLayout);

      toast(message, { type });
    });
  };

  const handleDragStop: EventCallback = (newLayout: Layout): void => {
    persistLayout(toLayoutItems(newLayout));
  };

  const handleLayoutChange = (newLayout: Layout): void => {
    setLayout([...newLayout]);
  };

  const handleResetClick = (): void => {
    const resetLayout = toLayoutItems(defaultLayout);

    setLayout(resetLayout);
    persistLayout(resetLayout);
  };

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

      <div
        className={gridWrapperClass}
        ref={containerRef}
      >
        {mounted && (
          <GridLayout
            {...{ layout, width }}
            dragConfig={{
              enabled: true,
            }}
            dropConfig={{
              enabled: true,
            }}
            gridConfig={{
              cols,
              maxRows: 6,
              rowHeight: 80,
            }}
            onDragStop={handleDragStop}
            onLayoutChange={handleLayoutChange}
            resizeConfig={{
              enabled: false,
            }}
          >
            {layout.map<React.ReactElement>(({ i }: LayoutItem) => (
              <div
                className={blockClass}
                key={i}
              >
                <span className={blockLabelClass}>{gridLabels[i] ?? i}</span>
              </div>
            ))}
          </GridLayout>
        )}
      </div>

      <p className={hintClass}>{hint}</p>
    </div>
  );
};

export { CartGrid };
