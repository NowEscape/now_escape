import create from "zustand";

interface timeState{
    timeList: string[];
    time: string,
    setTime: (time:string) => void;
    timeVisible:boolean;
    setTimeVisible:(visible:boolean)=>void;
}

const timeStore = create<timeState>((set)=>({
    timeList: ["09:00","10:00","11:00","12:00","13:00","14:00","15:00", "16:00", "17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"],
    time:"09:00",
    setTime: (time)=>set((state)=>({
        time: time
    })),
    timeVisible:false,
    setTimeVisible: (timeVisible)=>set((state)=>({
        timeVisible: settingTimeVisible(timeVisible)
    }))
}))

const settingTimeVisible = (timeVisible) =>{
    return !timeVisible;
}

export default timeStore;