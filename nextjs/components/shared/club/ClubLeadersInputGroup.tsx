'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown, CircleMinus } from "lucide-react";
import { cn } from "@/lib/utils";

const ClubLeadersInputGroup = ({ positions, getContent }: { positions: string[], getContent: any }) => {
  const [leaders, setLeaders] = useState([{ name: "", position: "", isNameOpen: false, isPositionOpen: false }]);
  const [allUsers, setAllUsers] = useState<string[]>([]);

// 添加新的输入框
  const handleAddLeader = () => {
    const newLeaders = [...leaders];
    newLeaders.push({ name: "", position: "", isNameOpen: false, isPositionOpen: false });
    setLeaders(newLeaders);
  };

// 更新 Popover 的打开状态
  const handleOpenChange = (index, field, isOpen) => {
    const newLeaders = [...leaders];
    newLeaders[index][field] = isOpen;
    setLeaders(newLeaders);
  };

// 删除某个输入框
  const handleRemoveLeader = (index) => {
    const newLeaders = [];
    for (let i = 0; i < leaders.length; i++) {
      if (i !== index) {
        newLeaders.push(leaders[i]);
      }
    }
    setLeaders(newLeaders);
    getContent(newLeaders);
  };

// 更新某个输入框的值
  const handleLeaderChange = (index, field, value) => {
    const newLeaders = [...leaders];
    newLeaders[index][field] = value;
    setLeaders(newLeaders);
    getContent(newLeaders);
  };


  // 加载用户数据
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
        {leaders.map((leader, index) => (
            <div key={index} className="w-full flex justify-between gap-4 pb-2">
              {/* Name Popover */}
              <Popover
                  open={leader.isNameOpen}
                  onOpenChange={(isOpen) => handleOpenChange(index, "isNameOpen", isOpen)}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {leader.name || "选择小组组长..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="搜索姓名..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>未找到该姓名.</CommandEmpty>
                      <CommandGroup>
                        {allUsers.map((name) => (
                            <CommandItem
                                key={name}
                                value={name}
                                onSelect={() => {
                                  handleLeaderChange(index, "name", name);
                                  handleOpenChange(index, "isNameOpen", false);
                                }}
                            >
                              {name}
                              <Check className={cn("ml-auto", leader.name === name ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Position Popover */}
              <Popover
                  open={leader.isPositionOpen}
                  onOpenChange={(isOpen) => handleOpenChange(index, "isPositionOpen", isOpen)}
              >
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {leader.position || "选择职位..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="选择职位" className="h-9" />
                    <CommandList>
                      <CommandEmpty>未找到此职位.</CommandEmpty>
                      <CommandGroup>
                        {positions.map((position) => (
                            <CommandItem
                                key={position}
                                value={position}
                                onSelect={() => {
                                  handleLeaderChange(index, "position", position);
                                  handleOpenChange(index, "isPositionOpen", false);
                                }}
                            >
                              {position}
                              <Check className={cn("ml-auto", leader.position === position ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* 删除按钮 */}
              <CircleMinus onClick={() => handleRemoveLeader(index)} className="mt-1 w-[90px] cursor-pointer" />
            </div>
        ))}
        <Button type="button" className="mt-2 text-sm" onClick={handleAddLeader}>
          增加小组组长
        </Button>
      </div>
  );
};

export default ClubLeadersInputGroup;
