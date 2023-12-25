import { create } from 'zustand';

interface ProductItem {
    name: string,
    quantity: number,
    needed: boolean,
    category?: string
}

const baseList: ProductItem[] = [
    {
        name: 'abc',
        quantity: 3,
        needed: false,
        category: 'test'
    },
    {
        name: 'abcd',
        quantity: 3,
        needed: false,
        category: 'test'
    },
    {
        name: 'abcef',
        quantity: 3,
        needed: false,
        category: 'test'
    },
    {
        name: 'abcefg',
        quantity: 3,
        needed: false,
        category: 'test'
    },

]

interface OrderProps {
    itemsList: ProductItem[];
    setList: (newList: ProductItem[]) => void;
    addItem: (newItem: ProductItem) => void;
    clearList: () => void;
}

const useItemStorage = create<OrderProps>((set) => ({
    itemsList: baseList,
    setList: (newList: ProductItem[]) => set({ itemsList: newList}),
    addItem: (newItem: ProductItem) => set({ itemsList: [...baseList, newItem]}),
    clearList: () => set({ itemsList: []}),
}))

export default useItemStorage;