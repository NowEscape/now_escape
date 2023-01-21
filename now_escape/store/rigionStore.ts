import create from "zustand"
import _ from "lodash"

interface rigionState{
    rigionList: boolean[][];
    setRigionList: (rigionList:boolean[][], rigionIdx: number) => void;
}

const rigionStore = create<rigionState>((set)=>({
    rigionList: [[true, false, false],[false, false, false],[false, false, false],],
    setRigionList: (rigionList, rigionIdx)=>set((state)=>({
        rigionList: settingRigion(rigionList, rigionIdx)
    }))
}))


function settingRigion(rigionList:boolean[][], rigionIdx: number){
    const isTrue = (element) => element==true;
    let copyRigionList = _.cloneDeep(rigionList);
    if(!rigionList[rigionIdx]){
        copyRigionList[0][rigionList.findIndex(isTrue)] = false;
        copyRigionList[0][rigionIdx]=true;
    }
    return copyRigionList;
}

export default rigionStore;