export interface TabsConfig {
  id: string;
  label: string;
  render: () => React.ReactNode;
}

export type UseSwipeTabsOptions = {
  tabs: TabsConfig[];
  initialTabId?: string;
  threshold?: number;
};
