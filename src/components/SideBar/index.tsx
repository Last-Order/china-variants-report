import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import PROVINCES from "../../definitions/provinces";
import DataState, { ALL_DATA } from "../../state/data";
import styles from "./index.module.scss";

const SideBar: React.FC = () => {
    const [data, setData] = useAtom(DataState);
    const [startDate, setStartDate] = useState("2022-12-01");
    const [endDate, setEndDate] = useState(dayjs().format("YYYY-MM-DD"));
    const [area, setArea] = useState("All");
    useEffect(() => {
        const startTime = dayjs(startDate).valueOf();
        const endTime = dayjs(endDate).valueOf();
        const filteredData = ALL_DATA.filter((item) => {
            const { sampleDate, location } = item;
            const sampleTime = dayjs(sampleDate).valueOf();
            if (area === "All") {
                return sampleTime >= startTime && sampleTime <= endTime;
            }
            return (
                sampleTime >= startTime &&
                sampleTime <= endTime &&
                location === area
            );
        });
        setData(filteredData);
    }, [startDate, endDate, area]);
    return (
        <div className={styles.sidebar}>
            <div className={styles.form}>
                <div className={styles.formItem}>
                    <div className={styles.label}>起始时间</div>
                    <div className={styles.field}>
                        <input
                            type="date"
                            id="start"
                            value={startDate}
                            min="2022-12-01"
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles.label}>结束时间</div>
                    <div className={styles.field}>
                        <input
                            type="date"
                            id="end"
                            value={endDate}
                            min="2022-12-01"
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        ></input>
                    </div>
                </div>
                <div className={styles.formItem}>
                    <div className={styles.label}>范围</div>
                    <div className={styles.field}>
                        <select
                            onChange={(e) => {
                                setArea(e.target.value);
                            }}
                        >
                            {PROVINCES.map((item) => {
                                const { value, label } = item;
                                return (
                                    <option value={value} key={value}>
                                        {label}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
