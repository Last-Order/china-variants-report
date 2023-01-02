import { atom } from "jotai";
import ALL_DATA from "../data/all.json";

interface Sequence {
    seqName: string;
    sampleDate: string;
    seqId: string;
    location: string;
    clade: string;
    pangoLineages: string;
    nextStrainClade: string;
    whoClade: string;
}

const DataState = atom<Sequence[]>(ALL_DATA);

export default DataState;
