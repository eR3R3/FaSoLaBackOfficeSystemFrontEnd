'use client'

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown, CircleMinus, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ClubMiniClubsInputGroup = ({leaderList, workerList, getContent}: {leaderList: string[], workerList: string[], getContent:any}) => {
  const [miniClubs, setMiniClubs] = useState([
    {
      miniClubName: "",
      leader: { leaderName: "", isOpen: false },
      workers: [{ name: "", isOpen: false }],
    },
  ]);



  // 增加 miniClub
  const addMiniClub = () => {
    setMiniClubs([
      ...miniClubs,
      {
        miniClubName: "",
        leader: { leaderName: "", isOpen: false },
        workers: [{ name: "", isOpen: false }],
      },
    ]);
  };

  // 删除 miniClub
  const removeMiniClub = (index: number) => {
    setMiniClubs(miniClubs.filter((_, i) => i !== index));
  };

  // 更新 miniClub 的名称
  const updateMiniClubName = (index: number, value: string) => {
    const updatedClubs = miniClubs.map((club, i) =>
        i === index ? { ...club, miniClubName: value } : club
    );
    getContent(updatedClubs);
    setMiniClubs(updatedClubs);
  };

  // 更新 miniClub 的 leader
  const updateLeader = (index: number, leaderName: string) => {
    const updatedClubs = miniClubs.map((club, i) =>
        i === index
            ? {
              ...club,
              leader: { ...club.leader, leaderName, isOpen: false },
            }
            : club
    );
    getContent(updatedClubs);
    setMiniClubs(updatedClubs);
  };

  // 添加 worker
  const addWorker = (miniClubIndex: number) => {
    const updatedClubs = miniClubs.map((club, i) =>
        i === miniClubIndex
            ? { ...club, workers: [...club.workers, { name: "", isOpen: false }] }
            : club
    );
    getContent(updatedClubs);
    setMiniClubs(updatedClubs);
  };

  // 删除 worker
  const removeWorker = (miniClubIndex: number, workerIndex: number) => {
    const updatedClubs = miniClubs.map((club, i) =>
        i === miniClubIndex
            ? {
              ...club,
              workers: club.workers.filter((_, j) => j !== workerIndex),
            }
            : club
    );
    getContent(updatedClubs);
    setMiniClubs(updatedClubs);
  };

  // 更新 worker 名称
  const updateWorker = (
      miniClubIndex: number,
      workerIndex: number,
      name: string
  ) => {
    const updatedClubs = miniClubs.map((club, i) =>
        i === miniClubIndex
            ? {
              ...club,
              workers: club.workers.map((worker, j) =>
                  j === workerIndex ? { ...worker, name, isOpen: false } : worker
              ),
            }
            : club
    );
    getContent(updatedClubs);
    setMiniClubs(updatedClubs);
  };

  return (
      <div>
        {miniClubs.map((miniClub, index) => (
            <div key={index} className="w-full flex flex-col gap-4 pb-4 border-b">
              {/* MiniClub Name */}
              <Input
                  value={miniClub.miniClubName}
                  onChange={(e) => updateMiniClubName(index, e.target.value)}
                  placeholder={`小组名称 #${index + 1}`}
                  className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
              />

              {/* Leader Selector */}
              <Popover
                  open={miniClub.leader.isOpen}
                  onOpenChange={(isOpen) =>
                      setMiniClubs((prev) =>
                          prev.map((club, i) =>
                              i === index
                                  ? { ...club, leader: { ...club.leader, isOpen } }
                                  : club
                          )
                      )
                  }
              >
                <PopoverTrigger asChild>
                  <Button className="w-full justify-between"
                          variant="outline"
                          role="combobox">
                    {miniClub.leader.leaderName || "选择组长..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="搜索组长..." />
                    <CommandList>
                      <CommandEmpty>未找到组长</CommandEmpty>
                      <CommandGroup>
                        {leaderList.map((leader) => (
                            <CommandItem
                                key={leader}
                                onSelect={() => updateLeader(index, leader)}
                            >
                              {leader}
                              <Check
                                  className={cn(
                                      "ml-auto",
                                      miniClub.leader.leaderName === leader
                                          ? "opacity-100"
                                          : "opacity-0"
                                  )}
                              />
                            </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {/* Workers */}
              {miniClub.workers.map((worker, workerIndex) => (
                  <div key={workerIndex} className="flex items-center gap-4">
                    <Popover
                        open={worker.isOpen}
                        onOpenChange={(isOpen) =>
                            setMiniClubs((prev) =>
                                prev.map((club, i) =>
                                    i === index
                                        ? {
                                          ...club,
                                          workers: club.workers.map((w, j) =>
                                              j === workerIndex
                                                  ? { ...w, isOpen }
                                                  : w
                                          ),
                                        }
                                        : club
                                )
                            )
                        }
                    >
                      <PopoverTrigger asChild>
                        <Button className="w-full justify-between"
                                variant="outline"
                                role="combobox">
                          {worker.name || "选择员工..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="搜索员工..." />
                          <CommandList>
                            <CommandEmpty>未找到员工</CommandEmpty>
                            <CommandGroup>
                              {workerList.map((workerName) => (
                                  <CommandItem
                                      key={workerName}
                                      onSelect={() =>
                                          updateWorker(index, workerIndex, workerName)
                                      }
                                  >
                                    {workerName}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            worker.name === workerName
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                  </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <CircleMinus
                        onClick={() => removeWorker(index, workerIndex)}
                        className="cursor-pointer text-red-500"
                    />
                  </div>
              ))}
              <div className='flex justify-between'>
                <Button
                    onClick={() => addWorker(index)}
                    className=" mt-2"
                    type="button"
                >
                  增加员工
                </Button>

                {/* Remove MiniClub */}
                <Button
                    onClick={() => removeMiniClub(index)}
                    className="text-red-500 mt-4"
                    type="button"
                >
                  删除小组
                </Button>
              </div>
            </div>
        ))}
        <Button type="button" onClick={addMiniClub} className="mt-4">
          增加小组
        </Button>
      </div>
  );
};

export default ClubMiniClubsInputGroup;
