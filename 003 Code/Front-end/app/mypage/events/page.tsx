"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { BottomNavigation } from "@/components/bottom-navigation"

export default function EventsPage() {
  const router = useRouter()
  const [events] = useState([
    {
      id: 1,
      title: "봄맞이 할인 이벤트",
      description: "봄맞이 특별 할인 이벤트! 최대 50% 할인",
      period: "2023-04-01 ~ 2023-04-30",
      image: "/placeholder.svg?height=150&width=300",
      isActive: true,
    },
    {
      id: 2,
      title: "친구 초대 이벤트",
      description: "친구 초대하고 5,000원 쿠폰 받기",
      period: "2023-03-15 ~ 2023-05-15",
      image: "/placeholder.svg?height=150&width=300",
      isActive: true,
    },
    {
      id: 3,
      title: "리뷰 작성 이벤트",
      description: "리뷰 작성하고 포인트 받기",
      period: "2023-03-01 ~ 2023-04-30",
      image: "/placeholder.svg?height=150&width=300",
      isActive: true,
    },
    {
      id: 4,
      title: "설날 특별 이벤트",
      description: "설날 맞이 특별 할인 이벤트",
      period: "2023-01-20 ~ 2023-01-25",
      image: "/placeholder.svg?height=150&width=300",
      isActive: false,
    },
  ])

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">이벤트</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto mb-4">
          <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm whitespace-nowrap">
            진행중
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">종료</button>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">전체</button>
        </div>

        <div className="space-y-6">
          {events
            .filter((e) => e.isActive)
            .map((event) => (
              <div
                key={event.id}
                className="border rounded-lg overflow-hidden"
                onClick={() => router.push(`/mypage/events/${event.id}`)}
              >
                <div className="relative h-40 w-full">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                  <p className="text-xs text-gray-500 mt-2">{event.period}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
