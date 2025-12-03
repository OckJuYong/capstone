"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Star, Heart } from "lucide-react"

export default function FavoritesPage() {
  const router = useRouter()

  const [favorites] = useState([
    {
      id: 1,
      name: "메종 크림 파스타",
      category: "파스타",
      rating: 4.8,
      reviews: 109,
      distance: "1.8km",
      deliveryFee: "3,000원",
      minOrder: "15,000원",
      deliveryTime: "25-35분",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 2,
      name: "피자나라",
      category: "피자",
      rating: 4.5,
      reviews: 87,
      distance: "2.0km",
      deliveryFee: "2,000원",
      minOrder: "12,000원",
      deliveryTime: "30-40분",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 3,
      name: "치킨마루",
      category: "치킨",
      rating: 4.7,
      reviews: 156,
      distance: "1.5km",
      deliveryFee: "2,500원",
      minOrder: "16,000원",
      deliveryTime: "35-45분",
      image: "/placeholder.svg?height=120&width=120",
    },
  ])

  const removeFavorite = (id: number) => {
    // In a real app, this would remove the item from favorites
    console.log(`Remove favorite: ${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 border-b">
        <h1 className="text-xl font-bold text-center">찜한 가게</h1>
      </header>

      <div className="p-4">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="border rounded-lg overflow-hidden shadow-sm"
                onClick={() => router.push(`/restaurant/${favorite.id}`)}
              >
                <div className="relative h-32 w-full">
                  <Image src={favorite.image || "/placeholder.svg"} alt={favorite.name} fill className="object-cover" />
                  <button
                    className="absolute top-2 right-2 bg-white rounded-full p-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFavorite(favorite.id)
                    }}
                  >
                    <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                  </button>
                </div>

                <div className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{favorite.name}</h3>
                      <p className="text-sm text-gray-500">{favorite.category}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm ml-1">{favorite.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <span>리뷰 {favorite.reviews}</span>
                    <span className="mx-1">•</span>
                    <span>{favorite.distance}</span>
                  </div>

                  <div className="flex justify-between mt-2 text-xs">
                    <span>최소주문 {favorite.minOrder}</span>
                    <span>배달팁 {favorite.deliveryFee}</span>
                  </div>

                  <div className="mt-2 text-xs">
                    <span>배달시간 {favorite.deliveryTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">찜한 음식점이 없습니다.</p>
            <button className="mt-4 text-purple-600 font-medium" onClick={() => router.push("/home")}>
              맛집 찾아보기
            </button>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
