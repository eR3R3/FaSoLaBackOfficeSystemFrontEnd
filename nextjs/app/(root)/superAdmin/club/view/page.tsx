'use client'

import React, {useEffect, useState} from 'react';
import ClubViewCard from "@/components/shared/club/ClubViewCard";

const View = () => {
  const [allClubs, setAllClubs] = useState([])

  useEffect(()=>{
    const fetchAllClubs = async () => {
      const allClubs = await fetch('/api/club/fetchAll').then(async res => await res.json())
      console.log("first time",allClubs)
      setAllClubs(allClubs)
    }
    fetchAllClubs()
  }, [])
  return (
    <div>
      <p className='font-extrabold text-5xl'>查看所有部门</p>
      <div className='flex flex-row gap-3 flex-wrap pt-14'>
        {allClubs.map((club, index) => {
          return (
              <ClubViewCard key={index} cardInfo={club}></ClubViewCard>
          )
        })}
      </div>
    </div>
  );
};

export default View;
