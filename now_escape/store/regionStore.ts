import create from "zustand"
import _ from "lodash"

interface regionState{
    region: string;
    regionName: string[];
    regionListString: string[][];
    regionList: boolean[][];
    setRegionList: (regionList:boolean[][], regionIdx:number, regionItemIdx: number) => void;
    setRegion : (regionName:string[], regionListString:string[][], regionIdx:number, regionItemIdx: number)=>void;
}

const RegionStore = create<regionState>((set)=>({
    region : "",
    regionName : ["서울", "경기/인천", "충청", "경상","전라"],
    regionListString : [
        ["전체","강남","잠실","홍대","대학로","성신여대앞","노원","종로","신림","노량진"],
        ["전체","안양","화성","평택","성남","구리","의정부","부천","인천"],
        ["전체","아산","천안","대전","청주"],
        ["전체","대구","부산"],
        ["전체","전주","여수"]
    ],
    regionList: [
        [true, false, false,false,false,false,false,false,false,false,],
        [false, false, false,false,false,false,false,false,false,],
        [false, false, false,false,false,],
        [false,false,false],
        [false,false,false]
    ],
    setRegionList: (regionList, regionIdx, regionItemIdx)=>set((state)=>({
        regionList: settingRegionList(regionList, regionIdx, regionItemIdx),
    })),
    setRegion: (regionName, regionListString, regionIdx, regionItemIdx)=>set((state)=>({
        region: settingRegion(regionName, regionListString, regionIdx, regionItemIdx)
    }))
}))

function settingRegionList(regionList:boolean[][], regionIdx:number, regionItemIdx: number){
    const isTrue = (element) => element==true;
    let copyRegionList = _.cloneDeep(regionList);
    if(!regionList[regionIdx][regionItemIdx]){
        copyRegionList[regionIdx][regionList.findIndex(isTrue)] = false;
        copyRegionList[regionIdx][regionItemIdx]=true;
    }
    return copyRegionList;
}

function settingRegion(regionName:string[], regionListString:string[][], regionIdx:number, regionItemIdx: number){
    return String(regionName[regionIdx]) + ' ' + String(regionListString[regionIdx][regionItemIdx]);
}

export default RegionStore;