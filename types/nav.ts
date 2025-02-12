export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface Category {
  id: string
  title: string
  icon: string
}

export interface Link {
  id: string;
  icon: string;
  url: string;
  title: string;
  description: string;
  rank: number | null;
  public: boolean;
  cid: string;
  page?: string;
}
