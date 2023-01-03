import React, { useMemo } from "react";
import { countBy, groupBy } from "lodash";
import { useAtom } from "jotai";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Column, ColumnConfig, G2 } from "@ant-design/plots";
import DataState from "../../state/data";
import { ChartTypeState } from "../../state/chart";
import styles from "./index.module.scss";
import { ChartType } from "../../definitions/chart";

dayjs.extend(weekOfYear);

G2.registerInteraction("element-link", {
    start: [
        {
            trigger: "interval:mouseenter",
            action: "element-link-by-color:link",
        },
    ],
    end: [
        {
            trigger: "interval:mouseleave",
            action: "element-link-by-color:unlink",
        },
    ],
});

const Graph: React.FC = () => {
    const [data] = useAtom(DataState);
    const [chartType] = useAtom(ChartTypeState);
    const simpleColumnConfig = useMemo<ColumnConfig>(() => {
        const count = countBy(data, "pangoLineages");
        const columns = Object.entries(count)
            .map(([lineages, c]) => ({
                lineages,
                count: c,
            }))
            .sort((a, b) => b.count - a.count);
        return {
            autoFit: true,
            data: columns.slice(0, 15),
            xField: "lineages",
            yField: "count",
            meta: {
                lineages: {
                    alias: "Linages",
                },
                count: {
                    alias: "数量",
                },
            },
            padding: 64,
            label: {
                position: "top",
            },
        };
    }, [data]);
    const percentStackedAreaConfig = useMemo<ColumnConfig>(() => {
        const d = groupBy(data, (i) => {
            const t = dayjs(i.sampleDate);
            return t.year() * 100 + t.week();
            return `${t.year()}年第${t.week()}周`;
        });
        const e = Object.entries(d).map(([week, items]) => {
            const countByLineages = countBy(items, "pangoLineages");
            return Object.entries(countByLineages).map(([lineage, count]) => ({
                count,
                lineage,
                week,
            }));
        });
        return {
            data: e.flat(),
            xField: "week",
            yField: "count",
            seriesField: "lineage",
            isPercent: true,
            isStack: true,
            label: {
                position: "middle",
                content: (item) => {
                    return item.count > 0.01
                        ? `${(item.count * 100).toFixed(2)}%`
                        : "";
                },
                style: {
                    fill: "#fff",
                },
            },
            meta: {
                week: {
                    formatter: (value) =>
                        `${Math.floor(value / 100)}年第${value % 100}周`,
                },
            },
            padding: 64,
            tooltip: false,
            interactions: [
                {
                    type: "element-highlight-by-color",
                },
                {
                    type: "element-link",
                },
            ],
        };
    }, [data]);
    if (!data?.length) {
        return <div className={styles.noData}>暂无数据</div>;
    }
    return (
        <div className={styles.container} key={chartType}>
            <Column
                {...(chartType === ChartType.SIMPLE_COLUMN
                    ? simpleColumnConfig
                    : percentStackedAreaConfig)}
            />
        </div>
    );
};

export default Graph;
