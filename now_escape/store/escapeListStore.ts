import create from "zustand";
// import axios from "axios";

interface escapeListContent{
    cafeName: string;
    theme: {
        themeName: string,
        themeDescription: string,
        themeImageUrl: string,
        genre: [genreId: number, genreName: string],
        createdDate?: string,
        updatedDate?: string,
        themeOpenDate?: string
    };
    themeDateList: [[themeDateId:number,themeTime:string]];
}

interface escapeListState{
    escapeList:escapeListContent[];
    getEscapeList:()=>void;
}

function getEscapeList(){
    // axios.get('http://localhost:8080/openTimeThemeList')
    //     .then((response)=>{
    //         response.data.children.map(child=>({
    //             cafeName: child.data.cafeName,
    //             theme: child.data.theme,
    //             themeDateList: child.data.themeDateList
    //         }));
    //         console.log(response.data);
    //         console.log("getEscapeList success")
    //     })
    //     .catch(()=>{
    //         console.log('getEscapeList fail')
    //     })
}

const escapeListStore = create<escapeListState>((set, get)=>({
    escapeList: [],
    getEscapeList: ()=>{getEscapeList()}
}))

export default escapeListStore;