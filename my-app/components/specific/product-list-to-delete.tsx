'use client'
// import libs
import { motion } from 'framer-motion';

// import types
import { ProductType } from '@/lib/types'

// import components
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { twMerge } from "tailwind-merge";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// import state
import { useEffect, useState } from "react";
import useItemStorage from "@/hooks/orders";

// database
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from "@/db/database";


export default function ProductsListDeleteOnly() {
;
    // component state - local
    const [deleting, setDeleting] = useState<boolean>(false);
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

    const deleteFromList = async (item: ProductType) => {
        console.log(`Deleting ${item.id}`)
        setDeleting(true)
        try {
            await deleteDoc(doc(db, "products", item.id));
            setDeleting(false)
            toast({
                title: 'Deleted!',
                description: `Product with ID: ${item.id} deleted successfully!`,
                action: (
                    <ToastAction
                    altText='deletion successful'
                    >
                        Done
                    </ToastAction>
                )
            })
        } catch (err) {
            console.error(err)
        }
    }

    const changeStatus = async (item: ProductType) => {
        console.log(`changing item ${item.id}`)
    }

    // tailwind styles
    const buttonWrapperStyles = 'flex m-1 gap-2';
    const wrapperStyles = 'flex w-full h-full items-center p-1 rounded-md justify-between hover:bg-slate-50/5';
    const actionBtnStyles = "inline-flex text-sm rounded-full shadow-md font-medium px-4 py-2 bg-gradient-to-br from-rose-700 to-rose-900 hover:from-rose-500 hover:to-rose-700 text-slate-50 hover:bg-red-800";

    // RENDER
    // useEffect(() => {
    //     getData();
    // }, [])

    return (
        <>
        <Button variant="action" onClick={getData}>
            {loading ? <>Loading...</> : null}
            {!loading ? 
            <>Get data</> :
            null}
        </Button>
        <span className='mt-4 max-w-[960px] w-full flex flex-col'>
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
                    <Label className='text-slate-50/80'>{item.name}</Label>}
                <span className={twMerge(buttonWrapperStyles)}>
                    <Dialog>
                        <DialogTrigger
                        className={twMerge(actionBtnStyles)}
                        >
                            Delete
                        </DialogTrigger>
                        <DialogContent
                        className='bg-slate-50'>
                            <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription className='max-w-[82%]'>
                                This action cannot be undone. This will permanently delete your this item from the database.
                            </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                            <Button 
                            variant='secondary'
                            onClick={() => changeStatus(item)}>
                                Edit
                            </Button>
                            <Button 
                            variant='destructive'
                            onClick={() => deleteFromList(item)}>
                                Continue
                            </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </span>
            </motion.span>
            )) : null}
        </span>
        </>
    )
}