"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { Input } from "@/components/ui/input"
import { SearchIcon, ArrowLeft } from "lucide-react"

export default function SearchPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const popularSearches = ["파스타", "피자", "치킨", "햄버거", "초밥", "떡볶이"]

  const recentRestaurants = [
    {
      id: 1,
      name: "메종 크림 파스타",
      category: "파스타",
      rating: 4.8,
      reviews: 109,
      distance: "1.8km",
      price: "3,000원",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "천상궁물",
      category: "찌개/탕/찜",
      rating: 4.6,
      reviews: 617,
      distance: "1.5km",
      price: "2,000원",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "어번로즈 선샤인",
      category: "양식",
      rating: 4.9,
      reviews: 456,
      distance: "3.9km",
      price: "5,900원",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const handleSearch = () => {
    if (!searchQuery.trim()) return

    // Simulate search results
    setSearchResults(recentRestaurants)
    setHasSearched(true)
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
          <SearchIcon className="h-4 w-4 text-gray-500 mr-2" />
          <Input
            placeholder="음식, 매장 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent focus-visible:ring-0 flex-1 h-6 p-0"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch()
            }}
          />
        </div>
      </header>

      <div className="p-4">
        {!hasSearched ? (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">인기 검색어</h2>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term, index) => (
                  <button
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    onClick={() => {
                      setSearchQuery(term)
                      handleSearch()
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-3">최근 주문한 맛집</h2>
              <div className="space-y-4">
                {recentRestaurants.map((restaurant) => (
                  <div
                    key={restaurant.id}
                    className="flex items-start"
                    onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                  >
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{restaurant.name}</h3>
                      <p className="text-sm text-gray-500">{restaurant.category}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs ml-1">{restaurant.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">리뷰 {restaurant.reviews}</span>
                        <span className="text-xs text-gray-500 ml-2">{restaurant.distance}</span>
                      </div>
                      <p className="text-xs">배달팁 {restaurant.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-lg font-medium mb-3">검색 결과</h2>
            <div className="space-y-4">
              {searchResults.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex items-start"
                  onClick={() => router.push(`/restaurant/${restaurant.id}`)}
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant.category}</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-xs ml-1">{restaurant.rating}</span>
                      <span className="text-xs text-gray-500 ml-2">리뷰 {restaurant.reviews}</span>
                      <span className="text-xs text-gray-500 ml-2">{restaurant.distance}</span>
                    </div>
                    <p className="text-xs">배달팁 {restaurant.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  )
}
