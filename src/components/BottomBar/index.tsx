import React from "react";
import { useAtom } from "jotai";
import META from "../../data/meta.json";
import DataState from "../../state/data";
import styles from "./index.module.scss";

const BottomBar: React.FC = () => {
    const { lastUpdate } = META;
    const [data] = useAtom(DataState);
    return (
        <div className={styles.bottomBar}>
            n = {data.length} / 最后更新: {lastUpdate}
        </div>
    );
};

export default BottomBar;
