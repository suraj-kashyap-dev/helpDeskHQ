export interface MenuItem {
  id: string;
  label: string;
  path?: string;
  icon?: JSX.Element;
  subMenus?: SubMenuItem[];
}

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
}
