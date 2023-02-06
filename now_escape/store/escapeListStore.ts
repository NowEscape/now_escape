import create from "zustand";
import axios from "axios";

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
    themeDateList: string[];
}

interface escapeListState{
    escapeList:escapeListContent[];
    getEscapeList:(escapeList:escapeListContent[])=>void;
}

function getEscapeListAxios(){
    let resultData;
    axios.get('http://ec2-3-38-93-20.ap-northeast-2.compute.amazonaws.com:8080/openTimeThemeList')
        .then((response)=>{
            console.log(response.data);
            console.log("getEscapeList success")
        })
        .catch((error)=>{
            console.log('getEscapeList fail error : ', error)
        })
    resultData = resultData.map(data=>({
        cafeName: data.cafeName,
        theme: data.theme,
        themeDateList: data.themeDateList
    }));
    return resultData;
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
        themeDateList: [
            "09:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00"
        ]
    }],
    getEscapeList: (escapeList)=>set((state)=>({
       escapeList: getEscapeListAxios()
    }))
}))

export default escapeListStore;