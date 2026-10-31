export type Source = {
    name: string;
    id: string;
};

export type SourcesResult = {
    status: 'ok' | 'error';
    sources: Source[];
};

export type Article = {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

export type NewsResult = {
    status: 'ok' | 'error';
    totalResults: number;
    articles: Article[];
};
