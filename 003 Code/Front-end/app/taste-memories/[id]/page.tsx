"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TasteMemoryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const memoryId = params.id

  const [memory] = useState({
    id: memoryId,
    name: "삼겹살",
    image: "/placeholder.svg?height=200&width=400",
    visits: 20,
    rating: 4.5,
    category: "korean",
    lastVisit: "2023-04-01",
    restaurants: [
      {
        id: 1,
        name: "대치삼겹호르몬리무",
        rating: 4.8,
        visits: 12,
        lastVisit: "2023-04-01",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 2,
        name: "천상궁물",
        rating: 4.6,
        visits: 5,
        lastVisit: "2023-03-15",
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: 3,
        name: "비드 키친",
        rating: 4.7,
        visits: 3,
        lastVisit: "2023-02-20",
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    tasteProfile: {
      sweet: 20,
      spicy: 70,
      sour: 30,
      savory: 85,
    },
  })

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <div className="relative h-48 bg-gray-100">
        <Image src={memory.image || "/placeholder.svg"} alt={memory.name} fill className="object-cover" />
        <button className="absolute top-4 left-4 bg-white rounded-full p-2" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h1 className="text-2xl font-bold text-white">{memory.name}</h1>
          <div className="flex items-center text-white mt-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span>{memory.rating}</span>
            <span className="mx-2">•</span>
            <span>총 {memory.visits}회 방문</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="bg-purple-50 rounded-lg p-4 mb-6">
          <h2 className="font-medium mb-3">나의 {memory.name} 입맛 프로필</h2>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">단맛</span>
                <span className="text-sm">{memory.tasteProfile.sweet}%</span>
              </div>
              <div className="w-full h-2 bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500" style={{ width: `${memory.tasteProfile.sweet}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">매운맛</span>
                <span className="text-sm">{memory.tasteProfile.spicy}%</span>
              </div>
              <div className="w-full h-2 bg-red-100 rounded-full overflow-hidden">
                <div className="h-full bg-red-500" style={{ width: `${memory.tasteProfile.spicy}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">신맛</span>
                <span className="text-sm">{memory.tasteProfile.sour}%</span>
              </div>
              <div className="w-full h-2 bg-green-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${memory.tasteProfile.sour}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">감칠맛</span>
                <span className="text-sm">{memory.tasteProfile.savory}%</span>
              </div>
              <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${memory.tasteProfile.savory}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="font-medium mb-4">자주 방문한 {memory.name} 맛집</h2>

        <div className="space-y-4">
          {memory.restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex items-start border-b pb-4"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              <div className="relative w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{restaurant.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm">{restaurant.rating}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{restaurant.visits}회 방문</span>
                  <Clock className="h-3 w-3 ml-2 mr-1" />
                  <span>최근 방문: {restaurant.lastVisit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t max-w-md mx-auto">
        <Button className="w-full bg-purple-600" onClick={() => router.push(`/category/korean`)}>
          {memory.name} 맛집 더 찾아보기
        </Button>
      </div>

      <BottomNavigation />
    </div>
  )
}
