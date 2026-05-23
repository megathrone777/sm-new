"use client";
import React, { useState, useTransition } from "react";
import ReactGridLayout, { WidthProvider } from "react-grid-layout/legacy";

import type { TCartLayoutItem } from "@/store/cartLayout";

import {
  actionsClass,
  blockClass,
  blockHintClass,
  blockLabelClass,
  containerClass,
  gridWrapperClass,
  headerClass,
  hintClass,
  resetButtonClass,
  saveButtonClass,
  statusClass,
  titleClass,
} from "./CartGrid.css";

import type { Layout, LayoutItem } from "react-grid-layout/legacy";

const ResponsiveGrid = WidthProvider(ReactGridLayout);

const BLOCK_LABELS: Record<string, string> = {
  additionals: "Přidat navíc",
  cutlery: "Příbory",
  delivery: "Doručení",
  note: "Poznámka",
  payment: "Způsoby platby",
  promo: "Promo code",
};

interface TProps {
  cols: number;
  defaultLayout: TCartLayoutItem[];
  hint: string;
  initialLayout: TCartLayoutItem[];
  isResizable?: boolean;
  onSave: (layout: TCartLayoutItem[]) => Promise<TActionResult>;
  title: string;
}

const toLayoutItems = (items: TCartLayoutItem[]): LayoutItem[] =>
  items.map(({ h, i, w, x, y }) => ({ h, i, w, x, y }));

const getBlockHint = (item: LayoutItem, cols: number): string => {
  if (cols === 1) return `#${item.y + 1}`;

  const span = item.w === 2 ? "full width" : item.x === 0 ? "left" : "right";

  return `${span} · ${item.h} ${item.h === 1 ? "row" : "rows"}`;
};

const CartGrid: React.FC<TProps> = ({
  cols,
  defaultLayout,
  hint,
  initialLayout,
  isResizable = false,
  onSave,
  title,
}) => {
  const [layout, setLayout] = useState<LayoutItem[]>(toLayoutItems(initialLayout));
  const [status, setStatus] = useState<null | TActionResult>(null);
  const [isPending, startTransition] = useTransition();

  const handleLayoutChange = (newLayout: Layout): void => {
    setLayout([...newLayout]);
    setStatus(null);
  };

  const handleSave = (): void => {
    startTransition(async () => {
      const result = await onSave(layout.map(({ h, i, w, x, y }) => ({ h, i, w, x, y })));

      setStatus(result);
    });
  };

  const handleReset = (): void => {
    setLayout(toLayoutItems(defaultLayout));
    setStatus(null);
  };

  return (
    <div className={containerClass}>
      <div className={headerClass}>
        <h1 className={titleClass}>{title}</h1>

        <div className={actionsClass}>
          <button
            className={resetButtonClass}
            onClick={handleReset}
            type="button"
          >
            Reset to default
          </button>

          <button
            className={saveButtonClass}
            disabled={isPending}
            onClick={handleSave}
            type="button"
          >
            {isPending ? "Saving…" : "Save Layout"}
          </button>
        </div>
      </div>

      <div className={gridWrapperClass}>
        <ResponsiveGrid
          cols={cols}
          isDraggable
          isResizable={isResizable}
          layout={layout}
          measureBeforeMount={false}
          onLayoutChange={handleLayoutChange}
          rowHeight={80}
        >
          {layout.map((item) => (
            <div
              className={blockClass}
              key={item.i}
            >
              <span className={blockLabelClass}>{BLOCK_LABELS[item.i] ?? item.i}</span>

              <span className={blockHintClass}>{getBlockHint(item, cols)}</span>
            </div>
          ))}
        </ResponsiveGrid>
      </div>

      {status && (
        <p
          className={statusClass}
          data-type={status.type}
        >
          {status.message}
        </p>
      )}

      <p className={hintClass}>{hint}</p>
    </div>
  );
};

export { CartGrid };
