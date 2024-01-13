import { twMerge } from "tailwind-merge";
import {
    DrawerDescription,
} from "@/components/ui/drawer"
import { Button } from "../ui/button";
import { RxThickArrowLeft, RxThickArrowRight, RxCross1 } from "react-icons/rx";
import useItemStorage from "@/hooks/orders";

export function DrawerItem ({ item }: any) {
    const itemStorage = useItemStorage();

    const drawerItemColors = ' bg-rose-600/5 font-semibold text-slate-900 mb-1';
    const drawerItemShape = 'flex justify-between items-center '
    const buttonWrapperStyles = 'flex items-center gap-2'
    const itemQuantityNumberStyles = 'text-lg p-2 min-w-12 text-center'

    const itemInStorage = itemStorage.itemsList.find((i) => i.id === item.id)

    const decrementItemQuantity: () => void = () => {
        const itemReducedQuantity = (item.quantity - 1) <= 1 ? 1 : item.quantity - 1
        const itemIndex = itemStorage.itemsList.findIndex((i) => i.id === item.id)
        const leftSide = itemStorage.itemsList.slice(0, itemIndex);
        const rightSide = itemStorage.itemsList.slice(itemIndex + 1);
        const pr = {
            id: item.id,
            name: item.name,
            quantity: itemReducedQuantity,
            needed: item.needed,
            category: item.category
        }

        itemStorage.setList([...leftSide, pr, ...rightSide])
    }

    const incrementItemQuantity: () => void = () => {
        const itemIndex = itemStorage.itemsList.findIndex((i) => i.id === item.id)
        const leftSide = itemStorage.itemsList.slice(0, itemIndex);
        const rightSide = itemStorage.itemsList.slice(itemIndex + 1);
        const pr = {
            id: item.id,
            name: item.name,
            quantity: item.quantity + 1,
            needed: item.needed,
            category: item.category
        }

        itemStorage.setList([...leftSide, pr, ...rightSide])
    }
    
    const removeFromList: () => void = () => {
        // an array of items which are the remaining items in the list
        const remainingItems = itemStorage.itemsList.filter((i) => i.id !== item.id)
        // the sought for item
        const currentItem = itemStorage.itemsList.filter((i) => i.id === item.id)[0]
        // eddit the sought item's property
        currentItem['needed'] = false
        // set the new list
        itemStorage.setList([currentItem, ...remainingItems])
        // console.log(store.itemsList)

    }

    return (
        <DrawerDescription className={twMerge(drawerItemColors, drawerItemShape)}>
            <span className={twMerge(itemQuantityNumberStyles)}>{item.name}</span>
            <span className={twMerge(buttonWrapperStyles)}>
                <Button
                className="mr-4"
                variant='subAction'
                onClick={() => removeFromList()}
                >
                    <RxCross1 size="18" />
                </Button>
                <Button
                variant='subAction'
                onClick={() => decrementItemQuantity()}
                >
                    <RxThickArrowLeft size="18" />
                </Button>
                <span className={twMerge(itemQuantityNumberStyles)}>
                    {itemInStorage?.quantity}
                </span>
                <Button
                variant='subAction'
                onClick={() => incrementItemQuantity()}
                >
                    <RxThickArrowRight size="18" />
                </Button>
            </span>
        </DrawerDescription>
    )
}