"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ChevronRight, Clock, Utensils, Sparkles } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [activeTrendingFilter, setActiveTrendingFilter] = useState("nearby")

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

  const recommendedRestaurants = [
    {
      id: 1,
      name: "메종 크림 파스타",
      category: "파스타마이",
      rating: 4.8,
      image: "/placeholder.svg?height=150&width=150",
      tags: ["매콤함", "크리미함"],
      matchPercentage: 95,
    },
    {
      id: 2,
      name: "트러플 리조또",
      category: "이탈리안 카페",
      rating: 4.7,
      image: "/placeholder.svg?height=150&width=150",
      tags: ["신선함", "고소함"],
      matchPercentage: 92,
    },
  ]

  const trendingRestaurants = {
    nearby: [
      {
        id: 3,
        name: "메종 운두부찌개",
        category: "한식당",
        rating: 4.9,
        distance: "0.3km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 88,
      },
      {
        id: 4,
        name: "치즈 닭갈비",
        category: "닭갈비 전문점",
        rating: 4.7,
        distance: "0.5km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 85,
      },
    ],
    popular: [
      {
        id: 5,
        name: "스시 오마카세",
        category: "일식당",
        rating: 4.9,
        distance: "1.2km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 90,
      },
      {
        id: 6,
        name: "화덕 피자",
        category: "피자 전문점",
        rating: 4.8,
        distance: "0.8km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 87,
      },
    ],
    new: [
      {
        id: 7,
        name: "뉴욕 스테이크",
        category: "스테이크 하우스",
        rating: 4.6,
        distance: "1.5km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 82,
      },
      {
        id: 8,
        name: "베트남 쌀국수",
        category: "베트남 음식",
        rating: 4.5,
        distance: "1.1km",
        image: "/placeholder.svg?height=60&width=60",
        matchPercentage: 80,
      },
    ],
  }

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to category page
    router.push(`/category/${categoryId}`)
  }

  const handleTrendingFilterClick = (filter: string) => {
    setActiveTrendingFilter(filter)
  }

  const getActiveTrendingRestaurants = () => {
    switch (activeTrendingFilter) {
      case "nearby":
        return trendingRestaurants.nearby
      case "popular":
        return trendingRestaurants.popular
      case "new":
        return trendingRestaurants.new
      default:
        return trendingRestaurants.nearby
    }
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-purple-600">MobiSync</h1>
      </header>

      <div className="px-4 py-2">
        <h2 className="text-xl font-medium">안녕하세요, 김맛찾님!</h2>
        <p className="text-sm text-gray-500">오늘은 어떤 메뉴를 추천해 드릴까요?</p>
      </div>

      {/* Quick Access Buttons */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-3 gap-3">
          <Link href="/random-recommendation" className="block">
            <div className="bg-purple-50 rounded-lg p-3 h-24 flex flex-col items-center justify-center border border-purple-100">
              <Sparkles className="h-6 w-6 text-purple-600 mb-1" />
              <span className="text-sm font-medium text-purple-800">랜 추</span>
            </div>
          </Link>

          <Link href="/taste-memories" className="block">
            <div className="bg-purple-50 rounded-lg p-3 h-24 flex flex-col items-center justify-center border border-purple-100">
              <Utensils className="h-6 w-6 text-purple-600 mb-1" />
              <span className="text-sm font-medium text-purple-800">맛의 추억</span>
            </div>
          </Link>

          <Link href="/expiring-ingredients" className="block">
            <div className="bg-purple-50 rounded-lg p-3 h-24 flex flex-col items-center justify-center border border-purple-100">
              <Clock className="h-6 w-6 text-purple-600 mb-1" />
              <span className="text-sm font-medium text-purple-800">마감임박</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Categories in Grid Layout */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-medium">카테고리</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {foodCategories.map((category) => (
            <button
              key={category.id}
              className="flex flex-col items-center"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center mb-1">
                <span className="text-2xl">{category.icon}</span>
              </div>
              <span className="text-xs">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-2">
        <div className="section-title">
          <span>맛을 추천 메뉴</span>
          <Link href="/recommended" className="section-title-more">
            더보기 &gt;
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {recommendedRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="restaurant-card min-w-[150px]"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              <div className="relative h-[150px] w-[150px]">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-yellow-400 rounded-full px-1.5  py-0.5 flex items-center">
                  <span className="rating-star">★</span>
                  <span className="text-xs ml-0.5">{restaurant.rating}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <span className="text-xs text-white font-medium">내 입맛과 {restaurant.matchPercentage}% 일치</span>
                </div>
              </div>
              <div className="restaurant-info">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <p className="restaurant-category">{restaurant.category}</p>
                <div className="restaurant-tags">
                  {restaurant.tags.map((tag, index) => (
                    <span key={index} className="restaurant-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 py-2 mt-4">
        <div className="section-title">
          <span>지금 뜨는 메뉴</span>
          <Link href="/trending" className="section-title-more">
            더보기 &gt;
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          <button
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeTrendingFilter === "nearby"
                ? "bg-purple-100 text-purple-700 font-medium"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleTrendingFilterClick("nearby")}
          >
            내 주변
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeTrendingFilter === "popular"
                ? "bg-purple-100 text-purple-700 font-medium"
                : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleTrendingFilterClick("popular")}
          >
            인기 메뉴
          </button>
          <button
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              activeTrendingFilter === "new" ? "bg-purple-100 text-purple-700 font-medium" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => handleTrendingFilterClick("new")}
          >
            신규 등록
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {getActiveTrendingRestaurants().map((restaurant) => (
            <div
              key={restaurant.id}
              className="flex items-center p-2 border-b"
              onClick={() => router.push(`/restaurant/${restaurant.id}`)}
            >
              <div className="relative h-[60px] w-[60px] mr-3">
                <Image
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  width={60}
                  height={60}
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{restaurant.name}</h3>
                <p className="text-xs text-gray-500">{restaurant.category}</p>
                <div className="flex items-center mt-1">
                  <span className="rating-star">★</span>
                  <span className="text-xs font-bold ml-0.5">{restaurant.rating}</span>
                  <span className="text-xs text-gray-500 ml-2">{restaurant.distance}</span>
                  <span className="text-xs text-purple-600 ml-2">내 입맛과 {restaurant.matchPercentage}% 일치</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
