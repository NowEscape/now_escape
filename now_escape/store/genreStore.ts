import create from "zustand";
import _ from "lodash";

interface genreState{
    genre: string;
    genreList: boolean[];
    genreListName: string[];
    setGenreList: (genreList:boolean[], genreIdx: number) => void;
    setGenreValue: (genreListName:string[], genreIdx:number)=>void;
}

const genreStore = create<genreState>((set)=>({
    genre: '전체장르',
    genreList: [true, false, false, false, false, false, false, false, false, false],
    genreListName : ["전체장르","감성","판타지","액션","드라마","코믹","공포","추리","19금","기타"],
    setGenreList: (genreList, genreIdx)=>set((state)=>({
        genreList: settingGenre(genreList,genreIdx)
    })),
    setGenreValue: (genreListName, genreIdx)=>set((state)=>({
        genre: settingGenreValue(genreListName, genreIdx)
    }))
}))

function settingGenre(genreList:boolean[], genreIdx: number){
    const isTrue = (element) => element==true;
    let copyGenreList = _.cloneDeep(genreList);
    if(!genreList[genreIdx]){
        copyGenreList[genreList.findIndex(isTrue)] = false;
        copyGenreList[genreIdx]=true;
    }
    return copyGenreList;
}

function settingGenreValue(genreListName:string[], genreIdx:number){
    return genreListName[genreIdx];
}

export default genreStore;