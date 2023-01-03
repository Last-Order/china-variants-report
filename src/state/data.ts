import { atom } from "jotai";
import ALL_DATA_CSV from "../data/all.csv";

export interface Sequence {
    seqName: string;
    sampleDate: string;
    seqId: string;
    location: string;
    clade: string;
    pangoLineages: string;
    nextStrainClade: string;
    whoClade: string;
}

const DataState = atom(ALL_DATA_CSV as Sequence[]);

export const ALL_DATA = ALL_DATA_CSV as Sequence[];

export default DataState;
