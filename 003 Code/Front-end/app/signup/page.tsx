"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, Plus } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
    passwordCheck: "",
    email: "",
    phone: "",
    sex: "",
    age: "",
    allergies: [] as string[],
  })
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name || !formData.id || !formData.password) {
      toast({
        title: "회원가입 실패",
        description: "필수 정보를 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (formData.password !== formData.passwordCheck) {
      toast({
        title: "비밀번호 불일치",
        description: "비밀번호가 일치하지 않습니다.",
        variant: "destructive",
      })
      return
    }

    // Simulate signup success
    toast({
      title: "회원가입 성공",
      description: "회원가입이 완료되었습니다.",
    })

    login(formData.id)
    router.push("/onboarding/welcome")
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
          />

          <Input
            name="id"
            placeholder="ID"
            value={formData.id}
            onChange={handleChange}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
          />

          <Input
            name="password"
            type="password"
            placeholder="PW"
            value={formData.password}
            onChange={handleChange}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
          />

          <Input
            name="passwordCheck"
            type="password"
            placeholder="PW Check"
            value={formData.passwordCheck}
            onChange={handleChange}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
          />

          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
          />

          <div className="flex items-center">
            <Input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
            />
            <Button type="button" variant="outline" size="sm" className="ml-2 text-xs bg-gray-200 hover:bg-gray-300">
              인증하기
            </Button>
          </div>

          <div className="relative">
            <Select onValueChange={(value) => handleSelectChange("sex", value)}>
              <SelectTrigger className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:ring-0">
                <SelectValue placeholder="Sex" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">남성</SelectItem>
                <SelectItem value="female">여성</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="relative">
            <Select onValueChange={(value) => handleSelectChange("age", value)}>
              <SelectTrigger className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:ring-0">
                <SelectValue placeholder="Age" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10s">10대</SelectItem>
                <SelectItem value="20s">20대</SelectItem>
                <SelectItem value="30s">30대</SelectItem>
                <SelectItem value="40s">40대</SelectItem>
                <SelectItem value="50s">50대 이상</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500">Allergy</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => {
                toast({
                  title: "알레르기 추가",
                  description: "알레르기 정보 추가 기능이 구현되었습니다.",
                })
              }}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" variant="ghost">
            <ChevronDown className="h-6 w-6 rotate-[270deg]" />
          </Button>
        </div>
      </form>
    </div>
  )
}
