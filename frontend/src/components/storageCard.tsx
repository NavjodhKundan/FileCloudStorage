import { userInfo } from "../states/zustandStates";
import { formatFileSize } from "./fileServices";

//const {storageLimit, storageUsed} = userInfo.getState();

export const StorageInfo = () => {
    const storageUsed = userInfo((state) => state.storageUsed);
    const storageLimit = userInfo((state) => state.storageLimit);
    const usedStorage = (storageUsed/storageLimit*100).toFixed(2);
    return (
        <div className="storageInfo">
            <p>{formatFileSize(storageUsed)} / {formatFileSize(storageLimit)}</p>
            {usedStorage === "NaN"? <p>Used 0%</p> : <p>Used {usedStorage}%</p>}
        </div>
    )
}

export const StorageCard = () => {
    return (
        <>
            <h3>Storage Overview</h3>
            <StorageInfo/>
        </>
    )
}