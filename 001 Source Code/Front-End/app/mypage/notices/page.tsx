"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function NoticesPage() {
  const router = useRouter()
  const [notices] = useState([
    {
      id: 1,
      title: "[공지] 앱 업데이트 안내 (v1.2.0)",
      date: "2023-04-15",
      isNew: true,
    },
    {
      id: 2,
      title: "[이벤트] 봄맞이 할인 이벤트 안내",
      date: "2023-04-01",
      isNew: false,
    },
    {
      id: 3,
      title: "[공지] 개인정보 처리방침 개정 안내",
      date: "2023-03-20",
      isNew: false,
    },
    {
      id: 4,
      title: "[공지] 서비스 이용약관 변경 안내",
      date: "2023-03-10",
      isNew: false,
    },
    {
      id: 5,
      title: "[이벤트] 신규 가입 혜택 안내",
      date: "2023-03-01",
      isNew: false,
    },
  ])

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">공지사항</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4">
        <div className="space-y-4">
          {notices.map((notice) => (
            <div key={notice.id} className="border-b pb-4" onClick={() => router.push(`/mypage/notices/${notice.id}`)}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{notice.title}</h3>
                    {notice.isNew && (
                      <span className="ml-2 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full">N</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
