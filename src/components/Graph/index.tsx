import React, { useMemo } from "react";
import { countBy } from "lodash";
import { useAtom } from "jotai";
import { Column } from "@ant-design/plots";
import DataState from "../../state/data";
import styles from "./index.module.scss";

const Graph: React.FC = () => {
    const [data] = useAtom(DataState);
    const parsedData = useMemo(() => {
        const count = countBy(data, "pangoLineages");
        const columns = Object.entries(count)
            .map(([lineages, c]) => ({
                lineages,
                count: c,
            }))
            .sort((a, b) => b.count - a.count);
        return columns.slice(0, 15);
    }, [data]);
    if (!data?.length) {
        return <div className={styles.noData}>暂无数据</div>;
    }
    return (
        <div className={styles.container}>
            <Column
                autoFit
                data={parsedData}
                xField="lineages"
                yField="count"
                meta={{
                    lineages: {
                        alias: "Linages",
                    },
                    count: {
                        alias: "数量",
                    },
                }}
                padding={64}
                label={{ position: "top" }}
            />
        </div>
    );
};

export default Graph;
