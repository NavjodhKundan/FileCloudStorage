import { userInfo } from "../states/zustandStates";
import { formatFileSize } from "./fileCard";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const {storageLimit, storageUsed} = userInfo.getState();

export const StorageInfo = () => {
    return (
        <div className="storageInfo">
            <p>Used {formatFileSize(storageUsed)} of {formatFileSize(storageLimit)}</p>
        </div>
    )
}

export const StorageChart = () => {
    return (
        <div className="storageChart">
            <p>storage chart.</p>
        </div>
    )
}

export const StorageCard = () => {
    return (
        <>
            <StorageChart/>
            <StorageInfo/>
        </>
    )
}