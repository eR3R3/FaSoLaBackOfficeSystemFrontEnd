'use client'

import { useState } from 'react';
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CircleMinus} from "lucide-react";

const ClubPositionsInputGroup = ({getContent}:{getContent:any}) => {
  // 使用一个数组来存储所有的 leader 输入框数据
  const [positions, setPositions] = useState(['']);

  // 添加新的输入框
  const handleAddLeader = () => {
    setPositions([...positions, '']);
  };

  // 删除某个输入框
  const handleRemoveLeader = (index: number) => {
    const newLeaders = positions.filter((_, i) => i !== index);
    getContent(newLeaders);
    setPositions(newLeaders);
  };

  // 更新某个输入框的值
  const handleChange = (index: number, event: any) => {
    const updatedPositions = positions.map((leader, i) =>
        i === index ?  event.target.value  : leader
    );
    getContent(updatedPositions);
    setPositions(updatedPositions);
  };

  return (
      <div>
        {positions.map((leader, index) => (
            <div key={index} className="w-full flex justify-between gap-4 pb-2">
              <Input
                  type="text"
                  value={leader}
                  onChange={(e) => handleChange(index, e)}
                  placeholder={`职位 #${index + 1}`}
                  className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
              />
              <CircleMinus onClick={() => handleRemoveLeader(index)} className='mt-1'/>
            </div>
        ))}
        <Button type="button" className="mt-2 text-sm " onClick={handleAddLeader}>
          增加岗位
        </Button>
      </div>
  );
};

export default ClubPositionsInputGroup;
