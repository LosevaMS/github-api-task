import { FunctionComponent, useEffect, useState } from "react";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Repository, SearchParams } from "../../../entities/Repository/model";
import { getRepos } from "../../../entities/Repository/api";
import { RepositoryCard } from "../../../entities/Repository/ui";

import './Repositories.css';

interface Pagination {
    page: number;
    pageSize: number;
}

const TOTAL_REPO_COUNT = 1000;
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

const defaultSearchParams: SearchParams = {
    q: 'language:TypeScript',
    sort: 'stars',
    order: 'desc',
};

export const Repositories: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: DEFAULT_PAGE,
        pageSize: DEFAULT_PAGE_SIZE
    })

    useEffect(() => {
        setIsLoading(true);
        getRepos({
            ...defaultSearchParams,
            per_page: DEFAULT_PAGE_SIZE.toString(),
            page: DEFAULT_PAGE.toString(),
        }).then(repositories => {
            setRepos(repositories?.items);
            setIsLoading(false);
        });
    }, [])

    const changePagination = (page: number, pageSize: number) => {
        setIsLoading(true);
        getRepos({
            ...defaultSearchParams,
            per_page: pageSize.toString(),
            page: page.toString(),
        }).then(repositories => {
            setRepos(repositories?.items);
            setPagination({
                page,
                pageSize
            })
            setIsLoading(false);
        });        
    }

    return (
    <div className="repositories">
        {isLoading ? (
            <div className="repositories__loading">
                <LoadingOutlined />
            </div>
            ) : (
            <div className="repositories__list">
                {repos?.map((repo) => (
                <RepositoryCard repository={repo} key={repo.id}/>
            ))}
            </div>
        )}
        <Pagination
            defaultCurrent={DEFAULT_PAGE}
            defaultPageSize={DEFAULT_PAGE_SIZE}
            current={pagination.page}
            pageSize={pagination.pageSize}
            total={TOTAL_REPO_COUNT}
            onChange={changePagination}
            className={`repositories__pagination${!repos?.length && '_hidden'}`}
        />
    </div>
    )
}