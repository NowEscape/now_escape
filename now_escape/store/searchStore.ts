import create from "zustand";
import _ from "lodash";

interface searchState{
    searchText: string;
    setSearchText: (searchInput:string) => void;
}

const searchStore = create<searchState>((set)=>({
    searchText: '',
    setSearchText: (searchInput) => set((state)=>({
        searchText: settingSearch(searchInput)
    }))
}))

function settingSearch(searchInput:string){
    return searchInput;
}

export default searchStore;