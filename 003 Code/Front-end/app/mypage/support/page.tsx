"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function CustomerSupportPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")

  return (
    <div className="flex flex-col h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1 text-center">고객센터</h1>
      </header>

      <div className="flex-1 p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
          <p className="font-medium">무엇을 도와드릴까요 호갱님</p>
        </div>

        <div className="border-b pb-4 mb-4">
          <p className="text-sm text-gray-500">문의 내용을 입력해주세요</p>
        </div>
      </div>

      <div className="p-4 border-t flex">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 mr-2"
        />
        <Button className="bg-gray-300 text-black">전송</Button>
      </div>

      <BottomNavigation />
    </div>
  )
}
