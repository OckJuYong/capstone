"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function RecommendationResultsPage() {
  const searchParams = useSearchParams()
  const taste = searchParams.get("taste")
  const category = searchParams.get("category")
  const { toast } = useToast()

  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "대치삼겹호르몬리무",
      rating: 4.8,
      reviews: 109,
      distance: "1.8km",
      matchPercentage: 92,
      tasteMatch: {
        sweet: 30,
        spicy: 70,
        sour: 20,
        savory: 85,
      },
    },
    {
      id: 2,
      name: "천상궁물",
      rating: 4.6,
      reviews: 517,
      distance: "1.5km",
      matchPercentage: 88,
      tasteMatch: {
        sweet: 20,
        spicy: 60,
        sour: 30,
        savory: 75,
      },
    },
    {
      id: 3,
      name: "비드 키친",
      rating: 4.7,
      reviews: 14,
      distance: "1.9km",
      matchPercentage: 85,
      tasteMatch: {
        sweet: 40,
        spicy: 30,
        sour: 50,
        savory: 90,
      },
    },
  ])

  const handleNavigate = (restaurantId: number) => {
    toast({
      title: "네비게이션",
      description: "네비게이션 기능이 구현되었습니다.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 text-center">
        <h1 className="text-lg font-medium">
          유성구 학하서로 <span>▲</span>
        </h1>
      </header>

      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">근처 음식점</h2>

        <div className="mb-6">
          <div className="w-full h-64 bg-gray-200 rounded-lg mb-4">
            <Image
              src="/placeholder.svg?height=256&width=384"
              alt="Map"
              width={384}
              height={256}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-4">
          {restaurants.map((restaurant) => (
            <div key={restaurant.id} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{restaurant.name}</h3>
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-bold">{restaurant.rating}</span>
                    <span className="text-gray-500 ml-1">({restaurant.reviews})</span>
                    <span className="text-gray-500 ml-2">{restaurant.distance}</span>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleNavigate(restaurant.id)} className="text-xs">
                  길찾기
                </Button>
              </div>

              <div className="mt-2">
                <p className="text-sm">사용자 입맛과 유사한 {restaurant.matchPercentage}% 일치하는 음식점</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
