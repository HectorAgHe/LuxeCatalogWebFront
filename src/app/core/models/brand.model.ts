export interface Brand{
    id: number;
    name: string;
    logo: string | null;
    description: string;
}

export interface BrandRequest{
    name: string;
    logo: string | null;
    description: string | null;
}