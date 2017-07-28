export interface WalletModel {
  meta: {filename: string, label: string};
  entries: any[];
  balance?: number;
}
