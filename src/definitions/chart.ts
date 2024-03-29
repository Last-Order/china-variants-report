export enum ChartType {
    SIMPLE_COLUMN = 0,
    PERCENT_COLUMN_BY_WEEK = 1,
}

export const ChartTypeOptions = [
    {
        value: ChartType.SIMPLE_COLUMN,
        label: "简单柱状图",
    },
    {
        value: ChartType.PERCENT_COLUMN_BY_WEEK,
        label: "百分比柱状图（按周）",
    },
];

export enum CategoryType {
    LINEAGE = 0,
    CLADE = 1,
}

export const CategoryTypeOptions = [
    {
        value: CategoryType.LINEAGE,
        label: "Pango lineage",
    },
    {
        value: CategoryType.CLADE,
        label: "Clade",
    },
];
