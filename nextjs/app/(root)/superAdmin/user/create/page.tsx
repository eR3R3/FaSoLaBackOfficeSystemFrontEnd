'use client'

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import CreateButton from "@/components/shared/CreateButton";

const userSchema = z.object({
  name: z.string().nonempty("名字不能为空"),
  gender: z.enum(["男", "女"], { required_error: "请选择性别" }),
  phone: z.string().min(10, "电话号码长度不正确"),
  email: z.string().email("无效的邮箱地址"),
  age: z.string().min(0, "年龄不能为负数"),
  adminClub: z.string().optional(),
  leadingClub: z.string().optional(),
  position: z.string().optional(),
  leadingMiniClub: z.string().optional(),
  role: z.string(),
  workingClub: z.string().optional(),
  workingMiniClub: z.string().optional(),
  password: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function CreateUserForm () {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      gender: "女",
      phone: "",
      email: "",
      age: undefined,
      adminClub: undefined,
      leadingClub: undefined,
      position: undefined,
      leadingMiniClub: "",
      role: "worker",
      workingClub: undefined,
      workingMiniClub: undefined,
      password: undefined,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data: UserFormValues) => {
    console.log("表单数据:", { ...data, age: Number(data.age) });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl font-bold text-center text-gray-900">FASOLA 员工创建表</h1>
        <p className="text-center text-gray-600 pt-3">
          创建一个员工的资料表单
        </p>

        <div className="flex flex-col md:flex-row gap-8 pt-9">
          <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                  <FormItem className="w-full ">
                    <FormLabel className="text-lg font-bold text-gray-800">员工姓名</FormLabel>
                    <FormControl>
                      <Input
                          placeholder="输入员工姓名"
                          value={field.value}
                          onChange={field.onChange}
                          className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      输入员工的姓名。
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">性别</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择性别" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="男">男</SelectItem>
                        <SelectItem value="女">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择员工的性别。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-5">
          <FormField
              control={form.control}
              name="phone"
              render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg font-bold text-gray-800">电话号码</FormLabel>
                    <FormControl>
                      <Input
                          placeholder="输入电话号码"
                          value={field.value}
                          onChange={field.onChange}
                          className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      输入员工的电话号码。
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg font-bold text-gray-800">邮箱地址</FormLabel>
                    <FormControl>
                      <Input
                          placeholder="输入邮箱地址"
                          value={field.value}
                          onChange={field.onChange}
                          className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      输入员工的邮箱地址。
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">年龄</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="输入年龄"
                      value={field.value !== undefined ? String(field.value) : ""}
                      onChange={field.onChange}
                      className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工的年龄。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="adminClub"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">管理的部门</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入管理的部门"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工管理的部门。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="leadingClub"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">组长的部门</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入组长的部门"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工组长的部门。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">职位</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入职位"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工的职位。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="leadingMiniClub"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">组长的小组</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入组长的小组"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工组长的小组。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">角色</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="leader">组长</SelectItem>
                        <SelectItem value="worker">员工</SelectItem>
                        <SelectItem value="admin">部长</SelectItem>
                        {/* 添加其他角色选项 */}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择员工的角色。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="workingClub"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">工作的部门</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入工作的部门"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工工作的部门。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="workingMiniClub"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">工作的小组</FormLabel>
                  <FormControl>
                    <Input
                        placeholder="输入工作的小组"
                        value={field.value}
                        onChange={field.onChange}
                        className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入员工工作的小俱乐部。
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8 pt-8">
          <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-lg font-bold text-gray-800">密码</FormLabel>
                    <FormControl>
                      <Input
                          placeholder="输入密码"
                          value={field.value}
                          onChange={field.onChange}
                          className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-sm text-gray-500">
                      输入员工的密码。
                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
        </div>

        <div className="text-center justify-center flex pt-4">
          <CreateButton
              name={submitting ? '创建员工中' : '创建员工'}
              type="submit"
          />
        </div>
      </form>
    </FormProvider>
  );
}
