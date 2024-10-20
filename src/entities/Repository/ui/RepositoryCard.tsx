import { FunctionComponent } from "react";
import {Card} from "antd";
import { StarFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import { Repository } from "../model";

import './RepositoryCard.css';

interface Props {
    repository: Repository;
}

export const RepositoryCard: FunctionComponent<Props> = ({repository}) => {
    const updateDate = dayjs(repository.updated_at).format('DD-MM-YYYY');

    const formatNum = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(1)}К` : `${n}`;

    return (
        <Card className="repository-card">
            <div className="repository-card__main-info">
                <img src={repository.owner.avatar_url} alt="author_avatar" className="repository-card__avatar"/>
                <a href={repository.html_url} target="blank">{repository.full_name}</a>
            </div>
            <p className="repository-card__description">{repository.description}</p>
            <div className="repository-card__sub-info">
                <div className="repository-card__stars">
                    <StarFilled />
                    {formatNum(repository.stargazers_count)}
                </div>
                <span className="repository-card__divider">·</span>
                {`Updated on ${updateDate}`}
            </div>
        </Card>
    )
}