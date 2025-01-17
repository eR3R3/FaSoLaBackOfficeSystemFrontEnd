'use client'
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

const ClubViewCard = ({cardInfo}: {cardInfo: any}) => {
  const router = useRouter();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{cardInfo.clubName}</CardTitle>
          <CardDescription className='font-semibold'>总共人数：{cardInfo.leaders.length + cardInfo.workers.length + 1}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col justify-between gap-2'>
          <p><b>部长</b>: {cardInfo.admin?.name}</p>
          {((cardInfo.miniClubs).length!=0) && cardInfo.miniClubs.map((miniClub: any, index: number) => (
              <div className='flex flex-row justify-between gap-2' key={index}>
                <p><b>小组{index+1}</b>  名字: <span className='text-gray-500'>{miniClub.name }</span></p>
                <p>组长: <span className='text-gray-500'>{miniClub.leader[0]?.name}</span></p>
                <p>组员人数: <span className='text-gray-500'>{miniClub?.workers?.length}</span></p>
              </div>
            ))}
        </CardContent>
        <CardFooter>
          <Button onClick={()=>{router.push(`/superAdmin/user/view`)}}>查看人员信息</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClubViewCard;
