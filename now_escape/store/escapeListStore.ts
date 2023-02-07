import create from "zustand";

interface escapeListContent{
    cafeName: string;
    theme: {
        themeName: string,
        themeDescription: string,
        themeImageUrl: string,
        genre: {genreId: number, genreName: string},
        createdDate?: string,
        updatedDate?: string,
        themeOpenDate?: string
    };
    themeDateList: {
        themeDateId: number,
        themeTime: string,
        isOpen: boolean
    }[];
}

interface escapeListState{
    escapeList:escapeListContent[];
    getEscapeList:(escapeList:escapeListContent[])=>void;
}

const setEscapeListAxios = (escapeList) => {
    return escapeList;
}

const escapeListStore = create<escapeListState>((set, get)=>({
    escapeList: [{
        cafeName : "강남키이스케이프",
        theme: {
            themeName: "메모리컴퍼니",
            themeDescription: "메모리 컴퍼니 : 1921년 10월 1일에 설립된 회사로, 첫 창업자는 김예은, 김다은, 이하은, 이유진, 박준찬 5명이서 시작했다.",
            themeImageUrl: "",
            genre: {genreId : 0, genreName : "감성"},
        },
        themeDateList: [{
            themeDateId: 1,
            themeTime: "09:00",
            isOpen: true
        }]
    }],
    getEscapeList: (escapeList)=>set((state)=>({
        escapeList: setEscapeListAxios(escapeList).map((data)=>({
            cafeName : data.cafeName,
            theme : data.theme,
            themeDateList : data.themeDateList
        }))
    }))
}))

export default escapeListStore;