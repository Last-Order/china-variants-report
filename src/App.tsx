import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.main}>
            <SideBar />
            <Graph />
        </div>
    );
}

export default App;
