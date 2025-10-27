"use client"

import { useState } from "react"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"

export default function TasteMemoriesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const [memories] = useState([
    {
      id: 1,
      name: "삼겹살",
      image: "/placeholder.svg?height=120&width=120",
      visits: 20,
      rating: 4.5,
      category: "korean",
    },
    {
      id: 2,
      name: "파스타",
      image: "/placeholder.svg?height=120&width=120",
      visits: 16,
      rating: 4.5,
      category: "western",
    },
    {
      id: 3,
      name: "초밥",
      image: "/placeholder.svg?height=120&width=120",
      visits: 12,
      rating: 4.3,
      category: "japanese",
    },
    {
      id: 4,
      name: "햄버거",
      image: "/placeholder.svg?height=120&width=120",
      visits: 10,
      rating: 4.2,
      category: "fastfood",
    },
    {
      id: 5,
      name: "치킨",
      image: "/placeholder.svg?height=120&width=120",
      visits: 8,
      rating: 4.7,
      category: "chicken",
    },
    {
      id: 6,
      name: "피자",
      image: "/placeholder.svg?height=120&width=120",
      visits: 6,
      rating: 4.4,
      category: "pizza",
    },
    {
      id: 7,
      name: "떡볶이",
      image: "/placeholder.svg?height=120&width=120",
      visits: 5,
      rating: 4.6,
      category: "korean",
    },
    {
      id: 8,
      name: "라멘",
      image: "/placeholder.svg?height=120&width=120",
      visits: 4,
      rating: 4.8,
      category: "japanese",
    },
    {
      id: 9,
      name: "돈까스",
      image: "/placeholder.svg?height=120&width=120",
      visits: 3,
      rating: 4.1,
      category: "japanese",
    },
  ])

  const filteredMemories = activeTab === "all" ? memories : memories.filter((memory) => memory.category === activeTab)

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium flex-1 text-center">맛의 추억</h1>
        <div className="w-5"></div>
      </header>

      <div className="px-4 mb-4">
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto flex overflow-x-auto py-1 justify-start bg-transparent">
            <TabsTrigger
              value="all"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              전체
            </TabsTrigger>
            <TabsTrigger
              value="korean"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              한식
            </TabsTrigger>
            <TabsTrigger
              value="japanese"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              일식
            </TabsTrigger>
            <TabsTrigger
              value="western"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              양식
            </TabsTrigger>
            <TabsTrigger
              value="chinese"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              중식
            </TabsTrigger>
            <TabsTrigger
              value="chicken"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              치킨
            </TabsTrigger>
            <TabsTrigger
              value="pizza"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              피자
            </TabsTrigger>
            <TabsTrigger
              value="fastfood"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              패스트푸드
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className="relative aspect-square cursor-pointer rounded-lg overflow-hidden shadow-sm"
              onClick={() => router.push(`/taste-memories/${memory.id}`)}
            >
              <Image src={memory.image || "/placeholder.svg"} alt={memory.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col items-center justify-end p-2 text-white">
                <p className="font-medium text-sm">{memory.name}</p>
                <div className="flex items-center text-xs mt-1">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1">{memory.rating}</span>
                </div>
                <p className="text-xs mt-1">주문: {memory.visits}회</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
