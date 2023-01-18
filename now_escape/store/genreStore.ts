import create from "zustand";
import _ from "lodash";

interface genreState{
    genreList: boolean[];
    setGenreList: (genreList:boolean[], genreIdx: number) => void;
}

const genreStore = create<genreState>((set)=>({
    genreList: [true, false, false, false, false, false, false, false, false],
    setGenreList: (genreList, genreIdx)=>set((state)=>({
        genreList: settingGenre(genreList, genreIdx)
    }))
}))

function settingGenre(genreList:boolean[],genreIdx: number){
    const isTrue = (element) => element==true;
    let copyGenreList = _.cloneDeep(genreList);
    if(!genreList[genreIdx]){
        copyGenreList[genreList.findIndex(isTrue)] = false;
        copyGenreList[genreIdx]=true;
    }
    return copyGenreList;
}

export default genreStore;