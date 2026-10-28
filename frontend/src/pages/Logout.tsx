import { userInfo } from "../states/zustandStates";

export function logout () {
    userInfo.getState().clearAll();
    userInfo.persist.clearStorage();
}