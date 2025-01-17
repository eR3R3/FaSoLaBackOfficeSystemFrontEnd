'use client'

import React, {useEffect, useRef, useState} from 'react';
import {z} from 'zod';
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { useRouter } from "next/navigation";
import CreateButton from '@/components/shared/CreateButton';
import ClubPositionsInputGroup from "@/components/shared/club/ClubPositionsInputGroup";
import ClubLeadersInputGroup from "@/components/shared/club/ClubLeadersInputGroup";
import ClubWorkersInputGroup from "@/components/shared/club/ClubWorkersInputGroup";
import ClubMiniClubsInputGroup from "@/components/shared/club/ClubMiniClubInputGroup";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"


const updateClub = () => {

  const router = useRouter()
  const [clubName, setClubName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [positionsList, setPositionsList] = useState([""])
  const [positions, setPositions] = useState([])
  const [workersList, setWorkersList] = useState([''])
  const [leadersList, setLeadersList] = useState([''])
  const [workers, setWorkers] = useState([])
  const [leaders, setLeaders] = useState([])
  const [miniClubs, setMiniClubs] = useState([])
  const [admin, setAdmin] = useState('')
  const [allUsers, setAllUsers] = useState([])

  const defaultValues = {
    admin: "",
    positions: [""],
    leaders: [{userName:"", position: ""}],
    workers:[{userName:"", position:""}],
    clubName: "",
    miniClubs:[{miniClubName:"", miniClubLeader:[""], miniClubWorkers:[""]}],
  }

  const getContentPosition= (inputPositions: string[]) => {
    setPositionsList(inputPositions)
    let positions = []
    inputPositions.map((position) => {
      positions.push({name: position})
    })
    setPositions(positions)
  }

  const getContentWorker = (inputWorkers: any) => {
    // @ts-ignore
    let workersList = []
    // @ts-ignore
    let workers = []
    inputWorkers.map((worker: Record<string, any>) => {
      workersList.push(worker.name)
    })
    inputWorkers.map((worker: Record<string, any>) => {
      workers.push({
        name: worker.name,
        position: {name: worker.position},
      })
    })
    console.log("getContentWorker, workersList:", workersList)
    console.log("getContentWorker, workers:", workers)
    setWorkersList(workersList)
    setWorkers(workers)
  }

  const getContentMiniClub = (inputMiniClubs: any) => {
    let miniClubs = []
    inputMiniClubs.map((miniClub: any)=>{
      miniClubs.push({
        name: miniClub.miniClubName,
        leader: [{name: miniClub.leader.leaderName}],
        workers: miniClub.workers.map((worker: Record<string, any>) => ({name: worker.name})),
      })
    })
    console.log("getContentMiniClub:", miniClubs)
    setMiniClubs(miniClubs)
  }

  const getContentLeader = (inputLeaders: any) => {
    // @ts-ignore
    let leadersList = []
    let leaders = []
    inputLeaders.map((worker: Record<string, any>) => {
      leadersList.push(worker.name)
    })
    inputLeaders.map((leader: Record<string, any>) => {
      leaders.push({
        name: leader.name,
        position: {name: leader.position},
      })
    })
    console.log("getContentLeader, leadersList:", leadersList)
    console.log("getContentLeader, leaders:", leaders)
    setLeadersList(leadersList)
    setLeaders(leaders)
  }

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


  // Handle input change
  const handleChange = (value: string) => {
    setInputValue(value);
    if (value) {
      const filtered = allUsers.filter((item) =>
          item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const form = useForm({ defaultValues: defaultValues})

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // @ts-ignore
  // @ts-ignore
  return (
      <FormProvider {...form}>
        <form className=" ">
          <h1 className="text-3xl font-bold text-center text-gray-900">FASOLA 部门创建表</h1>
          <p className="text-center text-gray-600 pt-3">
            创建一个部门的资料表单
          </p>

          <div className="flex flex-col md:flex-row gap-8 pt-9">
            <FormField
                control={form.control}
                name="clubName"
                render={({field}) => (
                    <FormItem className="w-full ">
                      <FormLabel className="text-lg font-bold text-gray-800">部门名字</FormLabel>
                      <FormControl>
                        <Input
                            placeholder="输入部门名字"
                            value={clubName}
                            onChange={(e) => {
                              setClubName(e.target.value)
                            }}
                            className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        Specify the recipient's age.
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="admin"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">部门主管</FormLabel>
                      <FormControl>
                        <Command>
                          <CommandInput
                              placeholder="Type a name..."
                              value={inputValue}
                              onValueChange={handleChange}
                          />
                          <CommandList className='max-h-10 overflow-y-auto z-10'>
                            {suggestions.length > 0 ? (
                                suggestions.map((suggestion, index) => (
                                    <CommandItem
                                        key={index}
                                        onSelect={(value) => {
                                          setInputValue(value); // Set the clicked suggestion as input value
                                          setSuggestions([]);  // Clear suggestions
                                        }}
                                    >
                                      {suggestion}
                                    </CommandItem>
                                ))
                            ) : (
                                <p className="px-4 py-1 text-sm text-gray-500">No results found.</p>
                            )}
                          </CommandList>
                        </Command>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>


          <div className="flex flex-col md:flex-row gap-6 mt-5">
            <FormField
                control={form.control}
                name="positions"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">部门职位</FormLabel>
                      <FormControl>
                        <ClubPositionsInputGroup getContent={getContentPosition}></ClubPositionsInputGroup>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        输入此部门的小组组长
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="leaders"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">部门组长</FormLabel>
                      <FormControl>
                        <ClubLeadersInputGroup positions={positionsList} getContent={getContentLeader}></ClubLeadersInputGroup>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        输入此部门的组长
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>


          <div className="flex flex-col md:flex-row gap-8 pt-8">
            <FormField
                control={form.control}
                name="workers"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">部门员工</FormLabel>
                      <FormControl>
                        <ClubWorkersInputGroup positions={positionsList} getContent={getContentWorker}></ClubWorkersInputGroup>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        输入所有部门员工
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 pt-8 pb-8">
            <FormField
                control={form.control}
                name="workers"
                render={({field}) => (
                    <FormItem className="w-full">
                      <FormLabel className="text-lg font-bold text-gray-800">部门小组设立</FormLabel>
                      <FormControl>
                        <ClubMiniClubsInputGroup leaderList={leadersList} workerList={workersList} getContent={getContentMiniClub}></ClubMiniClubsInputGroup>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        输入所有部门小组
                      </FormDescription>
                      <FormMessage/>
                    </FormItem>
                )}
            />
          </div>

          <div className="text-center justify-center flex pt-4">
            <CreateButton
                name={submitting ? '创建部门中' : '创建部门'}
                type="button"
                onClick={async () => {
                  setSubmitting(true);
                  if(!clubName){}
                  const res = await fetch('/api/clubs/update', {
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({
                      clubName: clubName,
                      admin: {name: admin},
                      leaders: leaders,
                      workers: workers,
                      miniClubs: miniClubs,
                      positions: positions,
                    }),
                  }).then(async res => await res.json())
                  setSubmitting(false);
                  router.push('/superAdmin/club/view')
                }}
            />
          </div>
        </form>
      </FormProvider>
  );
};
export default updateClub;
