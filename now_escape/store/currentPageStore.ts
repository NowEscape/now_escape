import create from "zustand";

interface pageState{
    currentPage : string;
    setCurrentPage: (inputPage:string) => void;
}

const settingCurrentPage = (inputPage) =>{
    return inputPage;
}

const pageStore = create<pageState>((set)=>({
    currentPage: "Index",
    setCurrentPage: (inputPage)=>set((state)=>({
        currentPage: settingCurrentPage(inputPage)
    }))
}))

export default pageStore;