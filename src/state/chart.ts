import { atom } from "jotai";
import { CategoryType, ChartType } from "../definitions/chart";

export const ChartTypeState = atom(ChartType.SIMPLE_COLUMN);

export const CategoryTypeState = atom(CategoryType.LINEAGE);
