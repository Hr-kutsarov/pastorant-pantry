'use client'

// import types
import { ProductType } from '@/lib/types';
// import libs
import { useState } from 'react';
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from 'uuid';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from 'framer-motion';

// use Zustand store
import useItemStorage from '@/hooks/orders'

// import DB 
import { 
    collection, 
    addDoc, 
    getDocs, 
    setDoc,
    doc
} from "firebase/firestore"; 
import { db } from '@/db/database'

// import icons
import { RxPlusCircled, RxStar } from "react-icons/rx";

// import components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from "react-hook-form"

import { DrawerItem } from '@/components/specific/drawer-item';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"



import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import { CommandSeparator } from '@/components/ui/command';

// form schema
const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    category: z.string().optional()
  })

export default function NavAuthModule() {
    const { toast } = useToast();

    const dataStorage = useItemStorage();

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
    const [err, setErr] = useState<boolean>(false);
    const [stage, setStage] = useState<number>(0);

    // STYLES
    const spanStyles = 'flex bg-transparent rounded-full w-auto h-full items-center justify-end ';
    // using this as it is to prevent hydration erros by using <Button> within components already declared as buttons
    const actionBtnStyles = ' lg:w-[270px] h-10 px-4 py-2 inline-flex items-center shadow-md rounded-full justify-center whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 bg-gradient-to-br from-slate-500 to-slate-700 text-slate-50 w-full md:max-w-[320px]'
    const drawerContentStyles = 'bg-slate-50';
    const drawerHeaderStyles = 'mb-4 text-slate-500 text-center';

    // save product to the database
    // Define the form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: "",
        category: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
        setLoading(true);
        const productId = uuidv4();

        const product: ProductType = {
            id: productId,
            name: values.name,
            quantity: 1,
            needed: false,
            category: values.category
        }

        try {
            const res = await setDoc(doc(db, "products", productId), product);
            // display the resource
            console.log(res)
            // change the state
            toast({
                title: "Saved successfully",
                description: "Friday, February 10, 2023 at 5:57 PM",
                action: (
                  <ToastAction 
                  altText="Goto schedule to undo">Done</ToastAction>
                ),
              });
            setLoading(false)

        } catch (err) {
            console.error(err)
            // change the state
            setErr(true)
            setLoading(false)
            toast({
                title: "There was an error!",
                description: "Just now!",
                action: (
                  <ToastAction 
                  altText="Error message">Oops!</ToastAction>
                ),
              });
        }

        // experimental
        setStage(2)
        
    }

    const submitOrderList = () => {
        setLoadingSubmit(!loadingSubmit)
        const orderList = dataStorage.itemsList.filter((item) => item.needed === true);
        console.log(orderList)
    }

    // RENDER
    return (
        <>
        <Dialog>
            <DialogTrigger>
                <motion.span 
                    // hover effects
                    whileHover={{ scale: 1.1 }}
                    // whileHover={{ scale: 1.2, rotate: 90 }}
                    whileTap={{
                    scale: 0.9,
                    }}
                    // styles
                    className={twMerge(spanStyles)}>
                    {/* span menu here */}
                    <div 
                    onClick={() => {setStage(1)}}
                    className='text-sm inline-flex items-center shadow-md justify-center whitespace-nowrap h-10 px-4 py-2 bg-gradient-to-br from-slate-500 to-slate-700 text-slate-50 gap-2 rounded-full'>
                        <RxPlusCircled size={24} />
                        Add
                    </div>
                </motion.span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] bg-slate-50">
                <DialogHeader className='mb-4'>
                    {/* STAGE 1 - Add product - Title + Description */}
                    {stage === 1 ? 
                    <>
                    <DialogTitle>
                        Add base product
                    </DialogTitle>
                    <DialogDescription className='text-sm text-slate-400'>
                        This form will create a new item
                    </DialogDescription>
                    </>
                    : null}
                    {/* STAGE 2 - Title = Completed! */}
                    {stage === 2 ? 
                    <>
                    <DialogTitle>
                        Completed!
                    </DialogTitle>
                    </>
                    : null}
                </DialogHeader>
                
                {/* STAGE 1 - FORM */}
                {stage !== 1 && !err ? null :
                                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='ml-0'>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                Input the product's name.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="ml-0">Category</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                                (Optional) This is the product's category. 
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button 
                        type="submit" 
                        variant="action">Submit</Button>
                    </form>
                </Form>
                }

                {/* <DialogFooter>
                    <AnimatePresence>
                    {stage === 1 && !err ? 
                    
                    <motion.span
                    initial={{opacity: 0}}
                    transition={{ease: 'easeIn', duration: 0.4, delay: 0.1}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    >
                        <Button 
                            onClick={() => {postData()}} 
                            variant="action" type="submit">Save changes
                        </Button>
                    </motion.span>
                    
                    : null}
                    </AnimatePresence>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>

        <Drawer>
            {/* Trigger at the top right of the screen/navbar */}
            <motion.span
                // hover effects
                whileHover={{ scale: 1.1 }}
                // whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{
                scale: 0.9,
                }}
            >
                <DrawerTrigger className={twMerge(actionBtnStyles)}>
                    {/* add trigger here */}
                    <RxStar size={24} />
                    See orders
                </DrawerTrigger>
            </motion.span>

            {/* Drawer where quantities are changed before submitting */}
            <DrawerContent className={twMerge(drawerContentStyles)}>
                <DrawerHeader >
                    {dataStorage.itemsList.filter((item) => item.needed === true).length > 0 ? 
                    <DrawerTitle className={twMerge(drawerHeaderStyles)}>Ordered items</DrawerTitle> :
                    <DrawerTitle className={twMerge(drawerHeaderStyles)}>The order list is empty</DrawerTitle>}
                    <ScrollArea className='bg-transparent max-h-[440px] w-full max-w-[960px] justify-self-center'>

                        {dataStorage.itemsList.filter((item) => item.needed === true ).map((item) => 
                        <DrawerItem key={item.id} item={item}>
                        </DrawerItem>)}

                    </ScrollArea>
                </DrawerHeader>
                <DrawerFooter className='grid grid-cols-2 md:mx-auto'>
                {/* if there are needed items in the list of fetched data */}
                {dataStorage.itemsList.filter((item) => item.needed === true).length > 0 ?                 
                <Button 
                className='lg:w-[270px]'
                onClick={() => submitOrderList()}
                variant="action">
                    {loadingSubmit ? <>Now Loading</> : <>Submit list</>}
                </Button> : null}
                <DrawerClose className={twMerge(actionBtnStyles)}>
                    Cancel
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
        </>
    )
}
