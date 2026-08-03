// src/types/movie.types.ts
export interface MovieProps {
    filmId: number;
    nameRu: string;
    nameEn: string;
    posterUrl: string;
    posterUrlPreview: string;
    rating: string;
    year: string;
    description?: string;
    genres: { genre: string }[];
    countries: { country: string }[];
    type: string;
    filmLength: string;
}

export interface ApiResponse {
    keyword: string;
    pagesCount: number;
    searchFilmsCountResult: number;
    films: MovieProps[];
}