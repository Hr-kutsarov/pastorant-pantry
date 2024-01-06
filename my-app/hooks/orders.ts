import { create } from 'zustand';
import { ProductType } from '@/lib/types';

const baseList: ProductType[] = [
    // {
    //     id: 'asd-asd-123-123',
    //     name: 'abc',
    //     quantity: 3,
    //     needed: false,
    //     category: 'test'
    // },
    // {
    //     id: 'asd-asd-124',
    //     name: 'abcd',
    //     quantity: 3,
    //     needed: false,
    //     category: 'test'
    // },
    // {
    // id: 'asd-asd-125',
    //     name: 'abcef',
    //     quantity: 3,
    //     needed: false,
    //     category: 'test'
    // },
    // {
    //     id: 'asd-asd-126',
    //     name: 'abcefg',
    //     quantity: 3,
    //     needed: false,
    //     category: 'test'
    // },
]

interface OrderProps {
    itemsList: ProductType[];
    setList: (newList: ProductType[]) => void;
    addItem: (newItem: ProductType) => void;
    clearList: () => void;
}

const useItemStorage = create<OrderProps>((set) => ({
    itemsList: baseList,
    setList: (newList: ProductType[]) => set({ itemsList: newList}),
    addItem: (newItem: ProductType) => set({ itemsList: [...baseList, newItem]}),
    clearList: () => set({ itemsList: []}),
}))

export default useItemStorage;