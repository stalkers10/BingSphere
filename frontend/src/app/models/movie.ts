export interface Genre {
    id: number;
    name: string;
}

export interface Movie {
    id: number;
    title: string;
    description: string;
    release_date: string;
    thumbnail: string;
    genres: Genre[];
    video_url: string;
}
