'use client'

import {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib/utils";

const ClubAdminInputGroup = ({getContent}: { getContent: any }) => {
    const [admin, setAdmin] = useState({name: "", isOpen: false});
    const [allUsers, setAllUsers] = useState<string[]>([]);

    const handleOpenChange = (isOpen: boolean) => {
        setAdmin((prevAdmin) => ({ ...prevAdmin, isOpen }));
    };

    const handleAdminChange = (value: string) => {
        const newAdmin = {...admin, name:value}
        setAdmin(newAdmin)
        getContent(newAdmin)
    };

    useEffect(() => {
        const fetchAllUsers = async () => {
            const response = await fetch('/api/users/fetchAll');
            const data = await response.json();
            const userNames = data.map((user: any) => user.name);
            setAllUsers(userNames);
        };
        fetchAllUsers();
    }, []);

    return (
        <div>
            <div className="w-full flex justify-between gap-4 pb-2">
                <Popover
                    open={admin.isOpen}
                    onOpenChange={(isOpen) => handleOpenChange(isOpen)}
                >
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-between">
                            {admin.name || "选择部门主管"}
                            <ChevronsUpDown className="opacity-50"/>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                        <Command>
                            <CommandInput placeholder="部门主管" className="h-9"/>
                            <CommandList>
                                <CommandEmpty>Î´ÕÒµ½¸ÃÐÕÃû.</CommandEmpty>
                                <CommandGroup>
                                    {allUsers.map((name) => (
                                        <CommandItem
                                            key={name}
                                            value={name}
                                            onSelect={() => {
                                                handleAdminChange(name);
                                                handleOpenChange(false);
                                            }}
                                        >
                                            {name}
                                            <Check
                                                className={cn("ml-auto", admin.name === name ? "opacity-100" : "opacity-0")}/>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    );
};

export default ClubAdminInputGroup;
