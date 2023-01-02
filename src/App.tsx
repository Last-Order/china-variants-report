import SideBar from "./components/SideBar";
import Graph from "./components/Graph";
import BottomBar from "./components/BottomBar";
import styles from "./App.module.scss";

function App() {
    return (
        <div className={styles.main}>
            <SideBar />
            <Graph />
            <BottomBar />
        </div>
    );
}

export default App;
