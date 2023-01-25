import create from "zustand";

interface dateState{
    date:any;
    setDate: (date:any) => void;
    dateVisible: boolean;
    setDateVisible: (visible:boolean) => void;
}

const dateStore = create<dateState>((set)=>({
    date: new Date(),
    setDate: (date)=>set((state)=>({
        date: date
    })),
    dateVisible: false,
    setDateVisible: (dateVisible)=>set((state)=>({
        dateVisible: settingDateVisible(dateVisible)
    }))
}))

const settingDateVisible = (dateVisible) =>{
    return !dateVisible;
}

export default dateStore;