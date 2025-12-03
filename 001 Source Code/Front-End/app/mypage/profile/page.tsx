"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Camera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const [profile, setProfile] = useState({
    name: user || "사용자",
    email: "user@example.com",
    phone: "010-1234-5678",
    gender: "male",
    birthYear: "1990",
    allergies: ["땅콩", "우유"],
  })

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    toast({
      title: "프로필 저장 완료",
      description: "프로필이 성공적으로 저장되었습니다.",
    })
    router.back()
  }

  const handleAddAllergy = () => {
    // In a real app, this would open a modal to add allergies
    const newAllergy = "새우"
    if (!profile.allergies.includes(newAllergy)) {
      setProfile((prev) => ({
        ...prev,
        allergies: [...prev.allergies, newAllergy],
      }))
    }
  }

  const handleRemoveAllergy = (allergy: string) => {
    setProfile((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((a) => a !== allergy),
    }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">프로필 관리</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-700">{profile.name.charAt(0).toUpperCase()}</span>
            </div>
            <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2">
              <Camera className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">이름</label>
            <Input
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">이메일</label>
            <Input
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">전화번호</label>
            <Input
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus-visible:ring-0"
            />
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">성별</label>
            <Select value={profile.gender} onValueChange={(value) => handleChange("gender", value)}>
              <SelectTrigger className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:ring-0">
                <SelectValue placeholder="성별 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">남성</SelectItem>
                <SelectItem value="female">여성</SelectItem>
                <SelectItem value="other">기타</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">출생년도</label>
            <Select value={profile.birthYear} onValueChange={(value) => handleChange("birthYear", value)}>
              <SelectTrigger className="border-b border-t-0 border-l-0 border-r-0 rounded-none px-0 focus:ring-0">
                <SelectValue placeholder="출생년도 선택" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 50 }, (_, i) => 2005 - i).map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}년
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm text-gray-500">알레르기</label>
              <Button variant="ghost" size="sm" className="text-purple-600 h-8 px-2" onClick={handleAddAllergy}>
                추가
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.allergies.map((allergy) => (
                <div
                  key={allergy}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {allergy}
                  <button className="ml-2 text-purple-500" onClick={() => handleRemoveAllergy(allergy)}>
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full bg-purple-600" onClick={handleSave}>
          저장하기
        </Button>
      </div>
    </div>
  )
}
