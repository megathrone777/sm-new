export interface TProps {
  action: (formData: FormData) => Promise<void>;
  deleteId: string | string[] | undefined;
  deleteTitle: string | string[] | undefined;
  href: __next_route_internal_types__.RouteImpl<string>;
}
