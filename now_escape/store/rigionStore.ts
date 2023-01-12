import create from "zustand"

interface rigionState{
    rigionList: [number];
    setRigionList: (rigionIdx: number) => void
}

function settingRigion(){

}

const rigionStore = create<rigionState>((set)=>({
    rigionList: [1],
    setRigionList: ()=>set((state)=>({

    }))
}))

export default rigionStore;