export interface TProps extends TClient {
  errors: Partial<Pick<TCart["errors"], "email" | "name" | "phone">>;
}
