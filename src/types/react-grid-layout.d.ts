// declare module "react-grid-layout" {
//   import type React from "react";

//   export type ResizeHandle =
//     | ((resizeHandleAxis: ResizeHandleAxis, ref: React.Ref<HTMLElement>) => React.ReactNode)
//     | React.ReactNode;
//   export type ResizeHandleAxis = "e" | "n" | "ne" | "nw" | "s" | "se" | "sw" | "w";

//   export interface LayoutItem {
//     day?: number;
//     h: number;
//     i: string;
//     isBounded?: boolean;
//     isDraggable?: boolean;

//     isEditable?: boolean;
//     isResizable?: boolean;
//     maxH?: number;
//     maxW?: number;

//     minH?: number;
//     minW?: number;
//     moved?: boolean;
//     resizeHandle?:
//       | ((resizeHandleAxis: ResizeHandleAxis, ref: ReactRef<HTMLElement>) => React.ReactElement)
//       | React.ReactElement;

//     resizeHandles?: ResizeHandleAxis[];
//     static?: boolean;
//     temperature: null | number;
//     w: number;
//     x: number;
//     y: number;
//   }

//   export type ItemCallback = (
//     layout: LayoutItem[],
//     oldItem: LayoutItem,
//     newItem: LayoutItem,
//     placeholder: LayoutItem,
//     event: React.MouseEvent,
//     element: HTMLElement,
//   ) => void;

//   export interface PartialPosition {
//     left: number;
//     top: number;
//   }

//   export interface DroppingPosition {
//     event: Event;
//     left: number;
//     top: number;
//   }

//   export interface Size {
//     height: number;
//     width: number;
//   }

//   export interface GridDragEvent {
//     event: Event;
//     newPosition: PartialPosition;
//     node: HTMLElement;
//   }

//   export interface GridResizeEvent {
//     event: Event;
//     handle: string;
//     node: HTMLElement;
//     size: Size;
//   }

//   export type DragOverEvent = MouseEvent & {
//     nativeEvent: {
//       layerX: number;
//       layerY: number;
//     };
//   };

//   export interface GridLayoutElement {
//     gridRef: {
//       current: HTMLDivElement;
//     };
//   }

//   export interface GridLayoutProps {
//     allowOverlap?: boolean;
//     autoSize?: boolean;
//     children?: React.ReactNode;
//     className?: React.HTMLAttributes<HTMLElement>["className"];
//     cols?: number;
//     compactType?: "horizontal" | "vertical" | null;
//     containerPadding?: [number, number];
//     crossGridAcceptsDrop?: ((item: LayoutItem, sourceId: string) => boolean) | boolean;
//     crossGridTransform?: (
//       item: LayoutItem,
//       sourceConfig: DropTargetConfig,
//       targetConfig: DropTargetConfig,
//     ) => LayoutItem | undefined;
//     draggableCancel?: string;
//     draggableHandle?: string;
//     droppingItem?: { h: number; i: string; w: number };
//     enableCrossGridDrag?: boolean;
//     id?: string;
//     isBounded?: boolean;
//     isDraggable?: boolean;
//     isDroppable?: boolean;
//     isResizable?: boolean;
//     layout?: LayoutItem[];
//     margin?: [number, number];

//     maxRows?: number;
//     onDrag?: ItemCallback;
//     onDragStart?: ItemCallback;
//     onDragStop?: ItemCallback;

//     onDrop?: (layout: LayoutItem[], layoutItem?: LayoutItem, event: Event) => void;
//     onDropDragOver?: (event: DragOverEvent) => ?({ h?: number; w?: number } | false);
//     onLayoutChange?: (layout: LayoutItem[]) => void;
//     onResize?: ItemCallback;

//     onResizeStart?: ItemCallback;
//     onResizeStop?: ItemCallback;

//     preventCollision?: boolean;
//     ref?: { current: GridLayoutElement | null };
//     resizeHandle?: ResizeHandle;
//     resizeHandles?: ("e" | "n" | "ne" | "nw" | "s" | "se" | "sw" | "w")[];
//     rowHeight?: number;
//     style?: React.CSSProperties;
//     transformScale?: number;
//     useCSSTransforms?: boolean;
//     width?: number;
//   }

//   export type DropTargetType = "external" | "flex" | "grid";

//   export interface DropTargetConfig {
//     // Flex-specific properties (only when type='flex')
//     acceptsDrop: ((item: LayoutNode, sourceId: string) => boolean) | boolean;
//     // Grid-specific properties (only when type='grid')
//     cols?: number;
//     containerHeight?: number;
//     direction?: "column-reverse" | "column" | "row-reverse" | "row";
//     element: HTMLElement;
//     gap?: number;
//     id: string;
//     margin?: [number, number];
//     // External container callbacks (only when type='external')
//     onDragEnter?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     onDragLeave?: (item: LayoutItem) => void;
//     onDragOver?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     onDrop?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     onItemRemoved?: (itemId: string) => void;
//     rowHeight?: number;
//     type: DropTargetType;
//   }

//   export interface RenderProps {
//     draggedItem?: LayoutItem;
//     isActive: boolean;
//     isSource: boolean;
//     mouseX?: number;
//     mouseY?: number;
//   }

//   export interface DroppableProps {
//     // Control whether this droppable accepts items
//     acceptsDrop?: ((item: LayoutItem, sourceId: string) => boolean) | boolean;
//     // Applied when mouse is over this droppable
//     activeClassName?: string;
//     // Children as render prop or React nodes
//     children: ((props: RenderProps) => React.ReactNode) | React.ReactNode;
//     // CSS classes
//     className?: string;
//     id: string;
//     // Optional drag event callbacks
//     onDragEnter?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     onDragLeave?: (item: LayoutItem) => void;
//     onDragOver?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     // Callback when item is dropped
//     onDrop?: (item: LayoutItem, mouseX: number, mouseY: number) => void;
//     // Applied when this is the drag source
//     sourceClassName?: string;
//     // Style
//     style?: React.CSSProperties;
//   }

//   export interface DragState {
//     draggedNode?: HTMLElement;
//     item: LayoutItem;
//     mouseX: number;
//     mouseY: number;
//     offsetX: number;
//     offsetY: number;
//     sourceId: string;
//   }

//   export interface DropState {
//     draggedItem?: LayoutItem;
//     isActive: boolean;
//     isSource: boolean;
//   }

//   export interface DragDropContextValue {
//     dragState?: DragState;
//     dropTargets: Map<string, DropTargetConfig>;
//     endDrag: (droppedOnTargetId?: string) => void;
//     findInnermostTarget?: (
//       mouseX: number,
//       mouseY: number,
//       sourceId: string,
//       item: LayoutItem,
//     ) => string;
//     getDropState: (targetId: LayoutItem["i"]) => DropState;
//     isDragging: () => boolean;
//     registerDropTarget: (
//       id: string,
//       element: HTMLElement,
//       type: DropTargetType,
//       config: Shape<DropTargetConfig>,
//     ) => void;
//     startDrag: (
//       sourceId: string,
//       item: LayoutItem,
//       mouseX: number,
//       mouseY: number,
//       offsetX: number,
//       offsetY: number,
//     ) => void;
//     transformItem?: (
//       layoutNode: LayoutNode,
//       sourceConfig: DropTargetConfig,
//       targetConfig: DropTargetConfig,
//     ) => LayoutItem;
//     unregisterDropTarget: (id: string) => void;
//     updateDrag: (mouseX: number, mouseY: number) => void;
//     updateDropTargetConfig: (id: string, updates: Partial<DropTargetConfig>) => void;
//   }

//   export interface WidthProviderProps {
//     className?: string;
//     measureBeforeMount?: boolean;
//     style?: React.CSSProperties;
//     width?: number;
//   }

//   export type LayoutGrid = Record<LayoutItem["i"], LayoutItem>;
//   export type LayoutByDay = Record<string, LayoutItem[]>;

//   export const DragDropProvider: React.FC<{
//     children: React.ReactNode;
//     transformItem?: (
//       layoutNode: LayoutNode,
//       sourceConfig: DropTargetConfig,
//       targetConfig: DropTargetConfig,
//     ) => LayoutNode;
//   }>;
//   export const DragDropContext: React.Context<DragDropContextValue> =
//     createContext<DragDropContextValue>(null);
//   export const Droppable: React.FC<DroppableProps>;
//   export const WidthProvider: (
//     props: React.FC<GridLayoutProps>,
//   ) => React.FC<GridLayoutProps & WidthProviderProps>;

//   declare const GridLayout: React.FC<GridLayoutProps>;

//   export default GridLayout;
// }
