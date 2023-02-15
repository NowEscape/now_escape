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
    rigion : "",
    rigionName : ["서울", "경기/인천", "충청", "경상","전라"],
    rigionListString : [
        ["전체","강남","잠실","홍대","대학로","성신여대앞","노원","종로","신림","노량진"],
        ["전체","안양","화성","평택","성남","구리","의정부","부천","인천"],
        ["전체","아산","천안","대전","청주"],
        ["전체","대구","부산"],
        ["전체","전주","여수"]
    ],
    rigionList: [
        [true, false, false,false,false,false,false,false,false,false,],
        [false, false, false,false,false,false,false,false,false,],
        [false, false, false,false,false,],
        [false,false,false],
        [false,false,false]
    ],
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