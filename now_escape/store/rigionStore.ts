import create from "zustand"
import _ from "lodash"

interface rigionState{
    rigion: string;
    rigionName: string[];
    rigionListString: string[][];
    rigionList: boolean[][];
    setRigionList: (rigionList:boolean[][], rigionIdx:number, rigionItemIdx: number) => void;
    setRigion : (rigionName:string[], rigionListString:string[][], rigionIdx:number, rigionItemIdx: number)=>void;
}

const rigionStore = create<rigionState>((set)=>({
    rigion : "서울 전체",
    rigionName : ["서울", "경기", "충청"],
    rigionListString : [["전체","강남","홍대"],["전체","수원","파주"],["전체","대전","세종"]],
    rigionList: [[true, false, false],[false, false, false],[false, false, false],],
    setRigionList: (rigionList, rigionIdx, rigionItemIdx)=>set((state)=>({
        rigionList: settingRigionList(rigionList, rigionIdx, rigionItemIdx),
    })),
    setRigion: (rigionName, rigionListString, rigionIdx, rigionItemIdx)=>set((state)=>({
        rigion: settingRigion(rigionName, rigionListString, rigionIdx, rigionItemIdx)
    }))
    }))

function settingRigionList(rigionList:boolean[][], rigionIdx:number, rigionItemIdx: number){
    const isTrue = (element) => element==true;
    let copyRigionList = _.cloneDeep(rigionList);
    if(!rigionList[rigionIdx][rigionItemIdx]){
        copyRigionList[rigionIdx][rigionList.findIndex(isTrue)] = false;
        copyRigionList[rigionIdx][rigionItemIdx]=true;
    }
    return copyRigionList;
}

function settingRigion(rigionName:string[], rigionListString:string[][], rigionIdx:number, rigionItemIdx: number){
    return String(rigionName[rigionIdx]) + ' ' + String(rigionListString[rigionIdx][rigionItemIdx]);
}

export default rigionStore;