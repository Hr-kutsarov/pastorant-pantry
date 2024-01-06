"use client"

// libs
import { redirect } from 'next/navigation'
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { RxLink1 } from "react-icons/rx";

import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

// database
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/db/database";

// global state storage
import useItemStorage from "@/hooks/orders";

// import components
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandGroup,
    CommandItem,
  } from "@/components/ui/command"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"


export default function SelectProductOptionsComponent() {
    // local state
    const [open, setOpen] = useState<boolean>(false)
    const [value, setValue] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    // global state
    const dataStorage = useItemStorage();

    // alerter
    const { toast } = useToast();
    
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
                console.log(`${doc.id} => ${doc.data()}`);
                // doc.data() = {category: 'food', needed: false, quantity: 12, name: 'asd'}
                console.log(doc.data())
                arrNames.push(doc.data())
                
            });

            dataStorage.setList(arrNames)

            toast({
                title: "Data fetched successfully!",
                description: `The list contains ${arrNames.length} items`,
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

    // OPTIONS
    const options = [
        {
            value: "create",
            label: "Create",
            fn: () => {getData()}
        },
        {
            value: "check",
            label: "Check",
            fn: () => {getData()}
        },
        {
            value: "charts",
            label: "Charts",
            fn: () => {console.log('displaying charts')}
        },
    ]

    // tw styles
    const sectionStyles = 'bg-transparent text-slate-50 mb-4 '

    return (
        <section className={twMerge(sectionStyles)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="destructive"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full gap-4 font-semibold text-lg"
                    >
                    {value
                        ? options.find((o) => o.value === value)?.label
                        : "Select options"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <Command>
                    <CommandGroup className='min-w-[330px] p-0'>
                        {options.map((o) => (
                        <CommandItem
                            className={twMerge('flex gap-1 font-semibold text-md cursor-pointer rounded-full p-2')}
                            key={o.value}
                            value={o.value}
                            onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue)
                            setOpen(false)
                            o.fn()
                            }}
                        >
                            <RxLink1 
                            size={24}
                            className={twMerge(
                                "mr-2 text-slate-600",
                                value === o.value ? "opacity-100" : "opacity-0"
                            )}
                            />
                            {o.label}
                        </CommandItem>
                        ))}
                    </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        </section>
    )
}
