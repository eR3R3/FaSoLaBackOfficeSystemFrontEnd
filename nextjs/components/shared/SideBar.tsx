'use client'

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem
} from "@/components/ui/sidebar"
import {ChevronDown} from "lucide-react";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible";
import { User, CirclePlus, FolderKanban, CircleMinus, RotateCw, UserRoundSearch, ScanSearch} from "lucide-react"
import {useRouter} from "next/navigation";
import Link from "next/link";


const sideBarContent = [
  {
    content: "人员管理",
    url: "/",
    icon: User,
    subContent: [
      {
        content: "人员查看",
        url: "/superAdmin/user/view",
        icon: UserRoundSearch
      },
      {
        content: "人员创建",
        url: "/superAdmin/user/create",
        icon: CirclePlus,
      },
      {
        content: "人员删除",
        url: "/superAdmin/user/delete",
        icon: CircleMinus,
      },
      {
        content: "人员更新",
        url: "/superAdmin/user/update",
        icon: RotateCw,
        subSubContent: [
          {
            content: "人员换职务",
            url: "/"
          },
          {
            content: "人员换部门",
            url: "/"
          },
          {
            content: "人员加入部门",
            url: "/"
          },
          {
            content: "人员添加个人信息",
            url: "/"
          },
        ]
      }
    ]
  },
  {
    content: "部门管理",
    url:"/superAdmin/club",
    icon: FolderKanban,
    subContent: [
      {
        content: "部门查看",
        url: "/superAdmin/club/view",
        icon: ScanSearch,
      },
      {
        content: "部门创建",
        url: "/superAdmin/club/create",
        icon: CirclePlus,
      },
      {
        content: "部门删除",
        url: "/superAdmin/club/delete",
        icon: CircleMinus,
      },
      {
        content: "部门更新人员",
        url: "/superAdminclub/user/update",
        icon: RotateCw,
      }
    ]
  },
  {
    content: "职位管理"
  }
]

const SideBar = () => {
  const router = useRouter()
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className='pt-3'>
              <span className='p-1 text-black font-extrabold'>全局管理</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className='text-black'>
                人员管理
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/*@ts-ignore*/}
                  {sideBarContent[0].subContent.map((subContent) => {
                    return (
                        <SidebarMenuItem key={subContent.content}>
                          <SidebarMenuButton asChild>
                            <a href={subContent.url}>
                              <subContent.icon />
                              <span>{subContent.content}</span>
                            </a>
                          </SidebarMenuButton>
                          {subContent.subSubContent&&(
                              <SidebarMenuSub>
                              {subContent.subSubContent.map((subSubContent) => {
                                return(
                                    <SidebarMenuSubItem key={subSubContent.content}>
                                      <SidebarMenuSubButton asChild>
                                        <Link href={subSubContent.url}>
                                          <span>{subSubContent.content}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                )
                              })}
                              </SidebarMenuSub>
                          )}
                        </SidebarMenuItem>)
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className='text-black'>
                部门管理
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {/*@ts-ignore*/}
                  {sideBarContent[1].subContent.map((subContent) => {
                    return (
                        <SidebarMenuItem key={subContent.content}>
                          <SidebarMenuButton asChild>
                            <Link href={subContent.url}>
                              <subContent.icon />
                              <span>{subContent.content}</span>
                            </Link>
                          </SidebarMenuButton>
                          {subContent.subSubContent&&(
                              <SidebarMenuSub>
                                {subContent.subSubContent.map((subSubContent) => {
                                  return(
                                      <SidebarMenuSubItem key={subSubContent.content}>
                                        <SidebarMenuSubButton asChild>
                                          <a href={subSubContent.url}>
                                            <span>{subSubContent.content}</span>
                                          </a>
                                        </SidebarMenuSubButton>
                                      </SidebarMenuSubItem>
                                  )
                                })}
                              </SidebarMenuSub>
                          )}
                        </SidebarMenuItem>)
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </Sidebar>
    </div>
  );
};

export default SideBar;
