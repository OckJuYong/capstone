"use client"

import { useState } from "react"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Star, ArrowLeft, Clock, MapPin, Tag, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpiringIngredientsPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const [stores] = useState([
    {
      id: 1,
      name: "대치삼겹호르몬리무",
      rating: 4.8,
      reviews: 109,
      distance: "1.8km",
      discount: "1Kg : 1,000원",
      originalPrice: "5,000원",
      discountRate: 80,
      expiryTime: "3시간 후",
      category: "meat",
      image: "/placeholder.svg?height=120&width=120",
      ingredients: ["삼겹살", "목살"],
    },
    {
      id: 2,
      name: "천상궁물",
      rating: 4.6,
      reviews: 517,
      distance: "1.5km",
      discount: "1Kg : 20,000원",
      originalPrice: "50,000원",
      discountRate: 60,
      expiryTime: "5시간 후",
      category: "seafood",
      image: "/placeholder.svg?height=120&width=120",
      ingredients: ["광어", "연어"],
    },
    {
      id: 3,
      name: "비드 키친",
      rating: 4.7,
      reviews: 14,
      distance: "1.9km",
      discount: "1L : 1,000원",
      originalPrice: "3,000원",
      discountRate: 67,
      expiryTime: "2시간 후",
      category: "dairy",
      image: "/placeholder.svg?height=120&width=120",
      ingredients: ["우유", "치즈"],
    },
    {
      id: 4,
      name: "그린 마켓",
      rating: 4.5,
      reviews: 89,
      distance: "2.2km",
      discount: "500g : 1,500원",
      originalPrice: "4,000원",
      discountRate: 63,
      expiryTime: "4시간 후",
      category: "vegetable",
      image: "/placeholder.svg?height=120&width=120",
      ingredients: ["토마토", "양상추"],
    },
  ])

  const filteredStores = activeTab === "all" ? stores : stores.filter((store) => store.category === activeTab)

  const handleNavigate = (storeId: number) => {
    toast({
      title: "네비게이션",
      description: "네비게이션 기능이 구현되었습니다.",
    })
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium flex-1 text-center">마감 임박 식재료</h1>
        <button className="p-2">
          <Filter className="h-5 w-5" />
        </button>
      </header>

      <div className="px-4">
        <Tabs defaultValue="all" className="w-full mb-4" onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto flex overflow-x-auto py-1 justify-start bg-transparent">
            <TabsTrigger
              value="all"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              전체
            </TabsTrigger>
            <TabsTrigger
              value="meat"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              육류
            </TabsTrigger>
            <TabsTrigger
              value="seafood"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              해산물
            </TabsTrigger>
            <TabsTrigger
              value="vegetable"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              채소
            </TabsTrigger>
            <TabsTrigger
              value="fruit"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              과일
            </TabsTrigger>
            <TabsTrigger
              value="dairy"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              유제품
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4">
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
          {filteredStores.map((store) => (
            <div key={store.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="flex">
                <div className="relative w-24 h-24">
                  <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs px-2 py-1">
                    {store.discountRate}% 할인
                  </div>
                </div>
                <div className="p-3 flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{store.name}</h3>
                      <div className="flex items-center text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-bold">{store.rating}</span>
                        <span className="text-gray-500 ml-1">({store.reviews})</span>
                      </div>
                    </div>
                    <div className="flex items-center text-red-500 text-sm">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{store.expiryTime}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {store.ingredients.map((ingredient, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
                        {ingredient}
                      </span>
                    ))}
                  </div>

                  <div className="mt-2 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 line-through">{store.originalPrice}</p>
                      <p className="text-sm font-bold text-red-500">{store.discount}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                        onClick={() => handleNavigate(store.id)}
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        길찾기
                      </Button>
                      <Button size="sm" className="text-xs h-8 bg-purple-600">
                        <Tag className="h-3 w-3 mr-1" />
                        예약하기
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
