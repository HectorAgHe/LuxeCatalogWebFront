export interface Catalog {
  id: number;
  name: string;
  category: string | null;
  pages: number;
  coverImage: string | null;
  pdfUrl: string | null;
  visible: boolean;
  visibleCliente: boolean;
  seasonId: number;
  seasonLabel: string;
}

export interface CatalogRequest {
  name: string;
  category: string | null;
  pages: number;
  coverImage: string | null;
  pdfUrl: string | null;
  visible: boolean;
  visibleCliente: boolean;
  seasonId: number;
}