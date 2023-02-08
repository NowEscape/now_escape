import create from "zustand";

interface searchDataContent{
    region1: string;
    region2: string;
    searchWord: string;
    genreName: string;
    themeTime: string;
}

interface searchState{
    searchText: string;
    setSearchText: (searchText:string) => void;
    searchData: searchDataContent;
    setSearchData: (searchInput:searchDataContent) => void;
}

const searchStore = create<searchState>((set)=>({
    searchText: '',
    setSearchText: (searchText)=>set((state)=>({
        searchText: searchText
    })),
    searchData: {
        region1: '',
        region2: '',
        searchWord: '',
        genreName: '',
        themeTime: '',
    },
    setSearchData: (searchInput) => set((state)=>({
        searchData: searchInput
    }))
}))

export default searchStore;