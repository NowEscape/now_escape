import create from "zustand";

interface escapeListContent{
    cafeName: string;
    shortCutUrl: string;
    theme: {
        themeName: string,
        themeDescription: string,
        themeImageUrl: string,
        genre: {genreName: string},
        createdDate?: string,
        updatedDate?: string,
        themeOpenDate?: string
    };
    themeDateList: {
        themeTime: string,
        isOpen: boolean
    }[];
}

interface escapeListState{
    escapeList:escapeListContent[];
    getEscapeList:(escapeList:escapeListContent[])=>void;
    isEscapeListNull: boolean;
    setIsEscapeListNull: (isNull:boolean)=>void;
}

const settingIsEscapeListNull = (isNull:boolean) => {
    return isNull;
}

const escapeListStore = create<escapeListState>((set, get)=>({
    escapeList: [{
        cafeName : "강남키이스케이프",
        shortCutUrl: "",
        theme: {
            themeName: "메모리컴퍼니",
            themeDescription: "메모리 컴퍼니 : 1921년 10월 1일에 설립된 회사로, 첫 창업자는 김예은, 김다은, 이하은, 이유진, 박준찬 5명이서 시작했다.",
            themeImageUrl: "",
            genre: {genreName : "감성"},
        },
        themeDateList: [{
            themeTime: "09:00",
            isOpen: true
        }]
    }],
    getEscapeList: (escapeList)=>set((state)=>({
        escapeList: escapeList.map((data)=>({
            cafeName : data.cafeName,
            shortCutUrl: data.shortCutUrl,
            theme : data.theme,
            themeDateList : data.themeDateList
        }))
    })),
    isEscapeListNull: false,
    setIsEscapeListNull: (isNull)=>set((state)=>({
        isEscapeListNull: settingIsEscapeListNull(isNull)
    }))
}))

export default escapeListStore;