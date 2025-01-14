'use client'

import React, {useEffect, useState} from 'react';
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const UserView = () => {
  const [currentClub, setCurrentClub] = useState<any>()
  const [currentMiniClub, setCurrentMiniClub] = useState<any>()
  const [content, setContent] = useState<any>()
  const [allClubs, setAllClubs] = useState([])
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {
    const fetchAllClubs = async () => {
      const allClubs_ = await fetch('/api/clubs/fetchAll').then(async res => await res.json())
      console.log("first time clubs", allClubs_)
      setAllClubs(allClubs_)
    }
    fetchAllClubs()
  }, [])

  useEffect(() => {
    const fetchAllUsers = async () => {
      const allUsers_ = await fetch('http://localhost:3001/api/users/fetchAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async res => await res.json())
      console.log("first time users", allUsers_)
      setAllUsers(allUsers_)
    }
    fetchAllUsers()
  }, [])


  async function findClubByClubName(clubName: string) {
    const club = await fetch('/api/clubs/findClub', {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({clubName: clubName}),
    }).then(async res => await res.json())
    console.log("first time find club", club)
    return club
  }

  async function findUsersByMiniClubName() {
  }


  return (
      <div>
        <div className="flex flex-row justify-between">
          <p className="text-5xl font-extrabold pb-8">查看员工</p>
          <div>
            <Button onClick={() => window.location.reload()}>查看所有</Button>
          </div>
        </div>

        <div>
          <p className="px-2 text-gray-500 pb-2">选择部门</p>
        </div>
        <div className="px-2 flex flex-row gap-5 flex-wrap pb-5">
          {allClubs.map((club: any, index: number) => (
              <Button
                  key={index}
                  variant="outline"
                  onClick={async () => {
                    const updatedClub = await findClubByClubName(club.clubName);
                    setCurrentClub(updatedClub);
                    setContent(updatedClub);
                  }}
              >
                {club.clubName}
              </Button>
          ))}
        </div>

        <div>
          <p className="px-2 text-gray-500 pb-2">选择小组</p>
        </div>
        <div className="px-2 flex flex-row gap-5 flex-wrap pb-20">
          {currentClub?.miniClubs?.map((miniClub: any, index: number) => (
              <Button
                  key={index}
                  variant="outline"
                  onClick={() => {
                    setCurrentMiniClub(miniClub);
                    setContent(miniClub);
                  }}
              >
                {miniClub.name}
              </Button>
          ))}
        </div>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">姓名</TableHead>
              <TableHead>岗位</TableHead>
              <TableHead>角色</TableHead>
              <TableHead>所属部门</TableHead>
              <TableHead className="text-right">所属小组</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!currentClub ? allUsers.map((user: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.position?.name}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        {user?.leadingClub?.clubName || user?.workingClub?.clubName || user?.adminClub?.clubName}
                      </TableCell>
                      <TableCell className="text-right">
                        {user?.leadingMiniClub?.name || user?.workingMiniClub?.name || "此人未在小组"}
                      </TableCell>
                    </TableRow>
                ))
                : ((content?.clubName )? (
                   <>
                     <TableRow >
                       <TableCell className="font-medium">{content.admin.name}</TableCell>
                       <TableCell>{content.admin?.position?.name}</TableCell>
                       <TableCell>{content.admin.role}</TableCell>
                       <TableCell>
                         {currentClub.clubName}
                       </TableCell>
                       <TableCell className="text-right">
                         {content.admin?.leadingMiniClub?.name || content.admin?.workingMiniClub?.name || "此人未在小组"}
                       </TableCell>
                     </TableRow>
                   {content.leaders.map((leader: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{leader.name}</TableCell>
                            <TableCell>{leader.position?.name}</TableCell>
                            <TableCell>{leader.role}</TableCell>
                            <TableCell>
                              {currentClub.clubName}
                            </TableCell>
                            <TableCell className="text-right">
                              {leader?.leadingMiniClub?.name || leader?.workingMiniClub?.name || "此人未在小组"}
                            </TableCell>
                          </TableRow>
                      ))}

                   {content.workers.map((worker: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{worker.name}</TableCell>
                            <TableCell>{worker.position?.name}</TableCell>
                            <TableCell>{worker.role}</TableCell>
                            <TableCell>
                              {currentClub.clubName}
                            </TableCell>
                            <TableCell className="text-right">
                              {worker?.leadingMiniClub?.name || worker?.workingMiniClub?.name || "此人未在小组"}
                            </TableCell>
                          </TableRow>
                      ))}
                  </>
                ) : (
                    <>
                      {content.leader.map((leader: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{leader.name}</TableCell>
                            <TableCell>{leader.position?.name}</TableCell>
                            <TableCell>{leader.role}</TableCell>
                            <TableCell>
                              {currentClub.clubName}
                            </TableCell>
                            <TableCell className="text-right">
                              {leader?.leadingMiniClub?.name || leader?.workingMiniClub?.name || "此人未在小组"}
                            </TableCell>
                          </TableRow>
                      ))}
                    {content.workers.map((worker: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{worker.name}</TableCell>
                            <TableCell>{worker.position?.name}</TableCell>
                            <TableCell>{worker.role}</TableCell>
                            <TableCell>
                              {currentClub.clubName}
                            </TableCell>
                            <TableCell className="text-right">
                              {worker?.leadingMiniClub?.name || worker?.workingMiniClub?.name || "此人未在小组"}
                            </TableCell>
                          </TableRow>
                      ))}
                    </>
                ))}
          </TableBody>
        </Table>
      </div>
  );
}

export default UserView;
