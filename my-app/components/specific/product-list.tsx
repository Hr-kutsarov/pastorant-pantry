'use client'

// import types
import { ProductType } from '@/lib/types'

// import components
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// import state
import { useEffect, useState } from "react";
import useItemStorage from "@/hooks/orders";

// database
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/db/database";
import { Skeleton } from '../ui/skeleton';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';

export default function ProductsList() {
;
    // component state - local
    const [loading, setLoading] = useState<boolean>(false);
    // component state - global
    const dataStorage = useItemStorage();

    // toaster
    const { toast } = useToast()

    // get data
    const getData = async () => {
        // initialize loading state
        setLoading(true);

        // make an api call
        try {
            // querySnapshot returns a snapshot of the collection data
            const querySnapshot = await getDocs(collection(db, "products"));
            let arrNames: any[] = [];

            console.log(querySnapshot)
            // iterate over the collection
            querySnapshot.forEach((doc : any) => {
                // console.log(`${doc.id} => ${doc.data()}`);
                // doc.data() = {category: 'food', needed: false, quantity: 12, name: 'asd'}
                // console.log(doc.data())
                arrNames.push(doc.data())
                
            });

            dataStorage.setList(arrNames)

            toast({
                title: "Data fetched successfully!",
                description: `Fetched: ${arrNames}`,
                action: (
                    <ToastAction 
                    altText="Success">Done</ToastAction>
                ),
                });
            
            setLoading(false);

        } catch (err) {
            console.error("Error getting document: ", err);
            toast({
                title: "Error!",
                description: "There was an error displaying the data!",
                action: (
                  <ToastAction 
                  altText="Ooops try again">Oops!</ToastAction>
                ),
              });
            setLoading(false)
        }
    }

    // button actions

    const removeItemFromList = async (item: ProductType) => {
        // console.log(`removing ${item.name} from list`)
        
        // an array of items which are the remaining items in the list
        const remainingItems = dataStorage.itemsList.filter((i) => i.id !== item.id)
        // the sought for item
        const currentItem = dataStorage.itemsList.filter((i) => i.id === item.id)[0]
        // eddit the sought item's property
        currentItem['needed'] = false
        // set the new list
        dataStorage.setList([currentItem, ...remainingItems])
        // console.log(store.itemsList)
    }

    const addItemToList = async (item: ProductType) => {
        // console.log(`adding ${item.name} to list`)
        const remainingItems = dataStorage.itemsList.filter((i) => i.id !== item.id)
        const currentItem = dataStorage.itemsList.filter((i) => i.id === item.id)[0]
        currentItem['needed'] = true
        dataStorage.setList([currentItem, ...remainingItems])
        // console.log(store.itemsList)
    }

    // tailwind styles
    const buttonWrapperStyles = 'flex m-1 gap-2';
    const wrapperStyles = 'flex w-full h-full items-center p-1 rounded-md justify-between hover:bg-slate-100/30';
    const skeletonStyles = 'bg-transparent flex items-center justify-center p-4 font-semibold text-lg'

    // RENDER
    // useEffect(() => {
    //     getData();
    // }, [])

    return (
        <>
        {dataStorage.itemsList.length > 0 
        ? 
        dataStorage.itemsList?.map((item) => 
        (
        <motion.span 
            // initial={{opacity: 0, y: -20, height: '30px'}}
            // animate={{opacity: 1, y: 0, height: '100%'}}
            // transition={{ease: 'easeIn', duration: 2.4, delay: 0.3}}
            className={twMerge(wrapperStyles)}
            key={item.id}>
                {item.needed ? 
                <Label className='text-rose-600'>{item.name}</Label> 
                : 
                <Label>{item.name}</Label>}
            <span className={twMerge(buttonWrapperStyles)}>
                <Button 
                    onClick={() => removeItemFromList(item)}
                    variant='default'><RxCross2 size={20} /></Button>
                <Button
                    variant='destructive'
                    onClick={() => addItemToList(item)}
                    >Order</Button>
            </span>
        </motion.span>
        )) : null}
        {dataStorage.itemsList.length === 0 
        ? 
        (
        <Skeleton className={twMerge(skeletonStyles)}>
            <h5 className={twMerge('text-slate-200')}>
                Please select an option to continue
            </h5>
        </Skeleton>
        ) 
        : null}
        </>
    )
}