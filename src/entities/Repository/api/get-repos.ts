import { RepositoryWithPagination, SearchParams } from "../model";

const SEARCH_REPOS_URL = 'https://api.github.com/search/repositories';

export const getRepos = async (params?: SearchParams): Promise<RepositoryWithPagination> => {
    const url = params ? `${SEARCH_REPOS_URL}?${new URLSearchParams({...params}).toString()}` : SEARCH_REPOS_URL;
    const response = await fetch(url);
    return await response.json();
  }