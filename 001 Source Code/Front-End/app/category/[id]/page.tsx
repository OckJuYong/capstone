"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft, Star } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.id as string
  const [activeTab, setActiveTab] = useState("menu")
  const [activeCategoryTab, setActiveCategoryTab] = useState(categoryId)

  const foodCategories = [
    { id: "korean", name: "한식", icon: "🍚" },
    { id: "chinese", name: "중식", icon: "🥢" },
    { id: "japanese", name: "일식", icon: "🍣" },
    { id: "western", name: "양식", icon: "🍝" },
    { id: "cafe", name: "카페", icon: "☕" },
    { id: "chicken", name: "치킨", icon: "🍗" },
    { id: "pizza", name: "피자", icon: "🍕" },
    { id: "fastfood", name: "패스트푸드", icon: "🍔" },
  ]

  const getCategoryName = (id: string) => {
    const category = foodCategories.find((cat) => cat.id === id)
    return category ? category.name : "음식점"
  }

  const [restaurants] = useState({
    korean: [
      {
        id: 1,
        name: "대치삼겹호르몬리무",
        category: "한식",
        rating: 4.8,
        reviews: 109,
        distance: "1.8km",
        deliveryFee: "3,000원",
        image: "/placeholder.svg?height=120&width=120",
        description: "신선한 재료로 만든 정통 한식을 제공합니다.",
        matchPercentage: 92,
        menu: [
          { name: "삼겹살", price: 15000, description: "국내산 돼지고기 삼겹살" },
          { name: "김치찌개", price: 8000, description: "진한 맛의 김치찌개" },
          { name: "된장찌개", price: 8000, description: "구수한 된장찌개" },
        ],
      },
      {
        id: 2,
        name: "천상궁물",
        category: "한식",
        rating: 4.6,
        reviews: 517,
        distance: "1.5km",
        deliveryFee: "2,000원",
        image: "/placeholder.svg?height=120&width=120",
        description: "전통 방식으로 만든 한식 전문점입니다.",
        matchPercentage: 88,
        menu: [
          { name: "갈비탕", price: 12000, description: "진한 국물의 갈비탕" },
          { name: "비빔밥", price: 9000, description: "신선한 야채가 들어간 비빔밥" },
          { name: "불고기", price: 15000, description: "달콤한 양념의 불고기" },
        ],
      },
    ],
    chinese: [
      {
        id: 3,
        name: "홍콩반점",
        category: "중식",
        rating: 4.7,
        reviews: 324,
        distance: "2.1km",
        deliveryFee: "3,500원",
        image: "/placeholder.svg?height=120&width=120",
        description: "정통 중화요리를 맛볼 수 있는 곳입니다.",
        matchPercentage: 85,
        menu: [
          { name: "짜장면", price: 7000, description: "진한 춘장의 짜장면" },
          { name: "짬뽕", price: 8000, description: "매콤한 해물 짬뽕" },
          { name: "탕수육", price: 18000, description: "바삭한 탕수육" },
        ],
      },
      {
        id: 4,
        name: "마라왕",
        category: "중식",
        rating: 4.5,
        reviews: 218,
        distance: "1.7km",
        deliveryFee: "2,500원",
        image: "/placeholder.svg?height=120&width=120",
        description: "사천식 마라탕과 마라샹궈 전문점입니다.",
        matchPercentage: 90,
        menu: [
          { name: "마라탕", price: 12000, description: "매콤한 마라탕" },
          { name: "마라샹궈", price: 20000, description: "매콤한 마라샹궈" },
          { name: "꿔바로우", price: 15000, description: "바삭한 꿔바로우" },
        ],
      },
    ],
    japanese: [
      {
        id: 5,
        name: "스시히로",
        category: "일식",
        rating: 4.9,
        reviews: 412,
        distance: "2.3km",
        deliveryFee: "4,000원",
        image: "/placeholder.svg?height=120&width=120",
        description: "신선한 해산물로 만든 정통 일식을 제공합니다.",
        matchPercentage: 94,
        menu: [
          { name: "모듬초밥", price: 25000, description: "신선한 해산물로 만든 모듬초밥" },
          { name: "연어초밥", price: 15000, description: "신선한 연어초밥" },
          { name: "우동", price: 9000, description: "깊은 맛의 우동" },
        ],
      },
      {
        id: 6,
        name: "라멘히로",
        category: "일식",
        rating: 4.7,
        reviews: 287,
        distance: "1.9km",
        deliveryFee: "3,000원",
        image: "/placeholder.svg?height=120&width=120",
        description: "정통 일본식 라멘을 맛볼 수 있는 곳입니다.",
        matchPercentage: 87,
        menu: [
          { name: "돈코츠라멘", price: 10000, description: "진한 돈코츠 국물의 라멘" },
          { name: "미소라멘", price: 9000, description: "구수한 미소 국물의 라멘" },
          { name: "규동", price: 9000, description: "달콤한 소고기 덮밥" },
        ],
      },
    ],
    western: [
      {
        id: 7,
        name: "파스타리아",
        category: "양식",
        rating: 4.6,
        reviews: 356,
        distance: "2.0km",
        deliveryFee: "3,500원",
        image: "/placeholder.svg?height=120&width=120",
        description: "다양한 파스타와 피자를 맛볼 수 있는 이탈리안 레스토랑입니다.",
        matchPercentage: 91,
        menu: [
          { name: "크림파스타", price: 14000, description: "부드러운 크림소스 파스타" },
          { name: "토마토파스타", price: 13000, description: "상큼한 토마토소스 파스타" },
          { name: "마르게리타피자", price: 16000, description: "클래식한 마르게리타 피자" },
        ],
      },
      {
        id: 8,
        name: "스테이크하우스",
        category: "양식",
        rating: 4.8,
        reviews: 198,
        distance: "2.5km",
        deliveryFee: "4,000원",
        image: "/placeholder.svg?height=120&width=120",
        description: "최상급 소고기로 만든 스테이크를 제공합니다.",
        matchPercentage: 89,
        menu: [
          { name: "립아이스테이크", price: 35000, description: "부드러운 립아이 스테이크" },
          { name: "티본스테이크", price: 45000, description: "풍미가 좋은 티본 스테이크" },
          { name: "함박스테이크", price: 18000, description: "육즙이 풍부한 함박스테이크" },
        ],
      },
    ],
    cafe: [],
    chicken: [],
    pizza: [],
    fastfood: [],
  })

  useEffect(() => {
    // Update URL when category tab changes
    if (activeCategoryTab !== categoryId) {
      router.push(`/category/${activeCategoryTab}`, { scroll: false })
    }
  }, [activeCategoryTab, categoryId, router])

  const handleRestaurantClick = (restaurantId: number) => {
    // Navigate directly to restaurant detail page
    router.push(`/restaurant/${restaurantId}`)
  }

  const currentCategoryRestaurants = restaurants[activeCategoryTab as keyof typeof restaurants] || []

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium flex-1 text-center">{getCategoryName(activeCategoryTab)}</h1>
        <div className="w-5"></div>
      </header>

      {/* Horizontal Scrollable Category Tabs */}
      <div className="px-4">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {foodCategories.map((category) => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                activeCategoryTab === category.id
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveCategoryTab(category.id)}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1">
        {/* Restaurant list */}
        <div className="w-full p-4 overflow-y-auto">
          <div className="flex gap-2 overflow-x-auto mb-4">
            <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm whitespace-nowrap">
              인기순
            </button>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">거리순</button>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">배달팁 낮은순</button>
            <button className="px-3 py-1 bg-gray-100 rounded-full text-sm whitespace-nowrap">리뷰 많은순</button>
          </div>

          <div className="space-y-4">
            {currentCategoryRestaurants.length > 0 ? (
              currentCategoryRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:border-purple-300"
                  onClick={() => handleRestaurantClick(restaurant.id)}
                >
                  <div className="flex">
                    <div className="relative w-24 h-24">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{restaurant.name}</h3>
                          <p className="text-xs text-gray-500">{restaurant.category}</p>
                        </div>
                        <div className="bg-purple-100 rounded-full px-2 py-0.5">
                          <span className="text-xs font-medium text-purple-700">{restaurant.matchPercentage}%</span>
                        </div>
                      </div>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm ml-1">{restaurant.rating}</span>
                        <span className="text-xs text-gray-500 ml-2">리뷰 {restaurant.reviews}</span>
                      </div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span>{restaurant.distance}</span>
                        <span>배달팁 {restaurant.deliveryFee}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p>해당 카테고리의 음식점이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
