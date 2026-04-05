export interface TProps<T> {
  children: (results: T[]) => React.ReactNode;
  searchAction: (query: string) => Promise<T[]>;
}
