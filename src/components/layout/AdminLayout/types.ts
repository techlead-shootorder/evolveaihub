export interface NavItem {
    title: string;
    path: string;
    icon: JSX.Element;
    subItems?: NavItem[];
  }