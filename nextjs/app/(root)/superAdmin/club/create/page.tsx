'use client'

import { useUser } from '@clerk/nextjs';
import React, {useEffect, useRef, useState} from 'react';
import {z} from 'zod';
import { useForm, FormProvider } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import CreateButton from '@/components/shared/CreateButton';
import ClubPositionsInputGroup from "@/components/shared/ClubPositionsInputGroup";
import ClubLeadersInputGroup from "@/components/shared/ClubLeadersInputGroup";
import ClubWorkersInputGroup from "@/components/shared/ClubWorkersInputGroup";
import ClubMiniClubsInputGroup from "@/components/shared/ClubMiniClubInputGroup";


const createClub = () => {

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
      positions.push({name: position, club: clubName})
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
        position: worker.position,
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
        leader: miniClub.leader.leaderName,
        workers: [miniClub.workers.map((worker: Record<string, any>) => (worker.name))],
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
        position: leader.position,
      })
    })
    console.log("getContentLeader, leadersList:", leadersList)
    console.log("getContentLeader, leaders:", leaders)
    setLeadersList(leadersList)
    setLeaders(leaders)
  }

  const formSchema = z.object({
  });

  const form = useForm({ defaultValues: defaultValues})


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
                        <Input
                            value={admin}
                            onChange={(e: any)=>{setAdmin(e.target.value)}}
                            placeholder="输入部门主管"
                            className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                        >
                        </Input>
                      </FormControl>
                      <FormDescription className="text-sm text-gray-500">
                        输入此部门的部门主管.
                      </FormDescription>
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
                  const res = await fetch('/api/club/create', {
                    method: 'POST',
                    headers: {"content-type": "application/json"},
                    body: JSON.stringify({
                      clubName: clubName,
                      admin: {name: admin},
                      leaders: leaders,
                      workers: workers,
                      miniClubs: miniClubs,
                      position: positions,
                    }),
                  }).then(async res => await res.json())
                  console.log(res)
                  setSubmitting(false);
                }}
            />
          </div>
        </form>
      </FormProvider>
  );
};
export default createClub;
