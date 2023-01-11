import create from "zustand";

interface genreState{
    genreList: [string, boolean][];
    setGenreList: (genreIdx: number) => void;
}

function settingGenre(genreIdx: number){
    let copyGenreList = [...this.state.genreList];
    if(!this.state.genreList[genreIdx][1]){
        copyGenreList[this.state.genreList.indexOf(true)][1] = false;
        copyGenreList[genreIdx][1]=true;
    }
    return copyGenreList;
}

const genreStore = create<genreState>((set)=>({
    genreList: [["전체장르",true],["코믹",false],["로맨스",false],["감성",false],["추리",false],["SF",false],["공포",false]],
    setGenreList: (genreIdx)=>set((state)=>({
        genreList: settingGenre(genreIdx)
    }))
}))

export default genreStore;