import create from "zustand";
import _ from "lodash";

interface genreState{
    genreList: boolean[];
    setGenreList: (genreIdx: number) => void;
}

function settingGenre(genreIdx: number){
    let copyGenreList = _.cloneDeep(this.state.genreList);
    if(!this.state.genreList[genreIdx]){
        copyGenreList[this.state.genreList.indexOf(true)] = false;
        copyGenreList[genreIdx]=true;
    }
    return copyGenreList;
}

const genreStore = create<genreState>((set)=>({
    genreList: [true, false, false, false, false, false, false, false, false],
    setGenreList: (genreIdx)=>set((state)=>({
        genreList: settingGenre(genreIdx)
    }))
}))

export default genreStore;