export interface RepositoryWithPagination {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
}

interface Owner {
    avatar_url: string;
}

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    private: boolean;
    html_url: string;
    description: string;
    created_at: string;
    updated_at: string;
    language: string;
    stargazers_count: number;
    owner: Owner;
  }

  export type Order = 'desc' | 'asc';

  export type Sort = 'stars' | 'forks' | 'help-wanted-issues' | 'updated';

  export interface SearchParams {
    q: string;
    sort?: Sort;
    order?: Order;
    per_page?: string;
    page?: string;
  }