'use client'

import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import useItemStorage from "@/hooks/orders"

interface Product {
    name: string,
    quantity: number,
    needed: boolean,
    category?: string
}

export default function ProductsList() {

    const store = useItemStorage();

    // button actions

    const removeItemFromList = async (item: Product) => {
        // console.log(`removing ${item.name} from list`)
        
        // an array of items which are the remaining items in the list
        const remainingItems = store.itemsList.filter((i) => i.name !== item.name)
        // the sought for item
        const currentItem = store.itemsList.filter((i) => i.name === item.name)[0]
        // eddit the sought item's property
        currentItem['needed'] = false
        // set the new list
        store.setList([currentItem, ...remainingItems])
        // console.log(store.itemsList)
    }

    const addItemToList = async (item: Product) => {
        // console.log(`adding ${item.name} to list`)
        const remainingItems = store.itemsList.filter((i) => i.name !== item.name)
        const currentItem = store.itemsList.filter((i) => i.name === item.name)[0]
        currentItem['needed'] = true
        store.setList([currentItem, ...remainingItems])
        // console.log(store.itemsList)
    }

    // tailwind styles

    const buttonWrapperStyles = 'flex m-1 gap-2';
    const wrapperStyles = 'flex w-full h-full items-center justify-between';

    // RENDER

    return (
        <>
        {store.itemsList?.map((item) => 
        <span 
        className={twMerge(wrapperStyles)}
        key={item.name}>
            {item.needed ? <Label>{item.name}</Label> : <Label className="text-slate-400 bg-rose-300">{item.name}</Label>}
            <span className={twMerge(buttonWrapperStyles)}>
                <Button 
                    onClick={() => removeItemFromList(item)}
                    variant='destructive'>Not needed</Button>
                <Button
                    onClick={() => addItemToList(item)}
                    >Order</Button>
            </span>
        </span>
        )}
        </>
    )
}