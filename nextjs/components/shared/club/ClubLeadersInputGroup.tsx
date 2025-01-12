'use client'

import {useEffect, useState} from 'react';
import {Input} from "@/components/ui/input";
import {Check, ChevronsUpDown, CircleMinus} from "lucide-react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ClubLeadersInputGroup = ({positions, getContent}:{positions: string[], getContent: any}) => {

  const [leaders, setLeaders] = useState([{name: "", position: "", isOpen: false}]);



  // 添加新的输入框
  const handleAddLeader = () => {
    setLeaders([...leaders, {name: "", position: "", isOpen: false}]);
  };

  const handleOpenChange = (index: number, isOpen: boolean) => {
    const updatedLeaders = leaders.map((leader, i) =>
        i === index ? {name: leader.name, position: leader.position, isOpen: isOpen} : leader
    );
    console.log(updatedLeaders);
    getContent(updatedLeaders);
    setLeaders(updatedLeaders);
  }

  // 删除某个输入框
  const handleRemoveLeader = (index: number) => {
    const newLeaders = leaders.filter((_, i) => i !== index);
    getContent(newLeaders);
    setLeaders(newLeaders);
  };

  // 更新某个输入框的值
  const handleLeaderNamesChange = (index: number, event: any) => {
    const updatedLeaders = leaders.map((leader, i) =>
        i === index ? {name: event.target.value, position: leader.position, isOpen: leader.isOpen}  : leader
    );
    console.log(updatedLeaders);
    getContent(updatedLeaders);
    setLeaders(updatedLeaders);
  };

  return (
      <div>
        {leaders.map((leader, index) => {
          return(
            <div key={index} className="w-full flex justify-between gap-4 pb-2">
              <Input
                  type="text"
                  value={leader.name}
                  onChange={(e) => handleLeaderNamesChange(index, e)}
                  placeholder={`小组组长 #${index + 1}`}
                  className="w-full p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all "
              />

              <Popover open={leader.isOpen} onOpenChange={(isOpen)=>handleOpenChange(index, isOpen)}>
                <PopoverTrigger asChild>
                  <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={leader.isOpen}
                      className="w-full justify-between"
                  >
                    {leader.position
                        ? leader.position
                        : "选择职业..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="选择职位" className="h-9" />
                    <CommandList>
                      <CommandEmpty>未找到此职业.</CommandEmpty>
                      <CommandGroup>
                        {positions.map((position) => (
                            <CommandItem
                                key={position}
                                value={position}
                                onSelect={(currentValue) => {
                                  console.log(currentValue);
                                  const updatedLeaders = leaders.map((leader, i) =>
                                      i === index
                                          ? {
                                            ...leader,  // 保持其他属性不变
                                            position: leader.position !== currentValue ? currentValue : "",  // 确保只有在 `position` 不等时更新
                                            isOpen: false  // 关闭 Popover
                                          }
                                          : leader
                                  );
                                  getContent(updatedLeaders)
                                  setLeaders(updatedLeaders);  // 更新 leaders
                                }}

                            >
                              {position}
                              <Check
                                  className={cn(
                                      "ml-auto",
                                      leader.position === position ? "opacity-100" : "opacity-0"
                                  )}
                              />
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <CircleMinus onClick={() => handleRemoveLeader(index)} className='mt-1 w-[90px]'/>
            </div>
         )})}
        <Button type="button" className="mt-2 text-sm font-" onClick={handleAddLeader}>
          增加小组组长
        </Button>
      </div>
  );
};

export default ClubLeadersInputGroup;
