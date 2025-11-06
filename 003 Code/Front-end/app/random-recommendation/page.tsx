"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RandomRecommendationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const [selectedTaste, setSelectedTaste] = useState<string | null>(null)

  const getCategoryName = (id: string | null) => {
    switch (id) {
      case "korean":
        return "한식"
      case "chinese":
        return "중식"
      case "japanese":
        return "일식"
      case "western":
        return "양식"
      case "cafe":
        return "카페"
      case "chicken":
        return "치킨"
      case "pizza":
        return "피자"
      case "fastfood":
        return "패스트푸드"
      default:
        return ""
    }
  }

  const handleTasteSelect = (taste: string) => {
    setSelectedTaste(taste)
    router.push(`/random-recommendation/results?taste=${taste}${category ? `&category=${category}` : ""}`)
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="p-4 flex items-center">
        <button onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-medium flex-1 text-center">
          {category ? `${getCategoryName(category)} 랜덤 추천` : "랜덤 추천"}
        </h1>
        <div className="w-5"></div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-3xl font-bold mb-2">오늘은</h2>
        <h2 className="text-3xl font-bold mb-2">어떤</h2>
        <h2 className="text-3xl font-bold mb-2">음식이</h2>
        <h2 className="text-3xl font-bold mb-8">땡김?</h2>

        <div className="w-full space-y-4 mt-8">
          <Button
            onClick={() => handleTasteSelect("sweet")}
            className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300"
          >
            달달한거
          </Button>

          <Button
            onClick={() => handleTasteSelect("spicy")}
            className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300"
          >
            매운거
          </Button>

          <Button
            onClick={() => handleTasteSelect("savory")}
            className="w-full bg-white hover:bg-gray-100 text-black border border-gray-300"
          >
            느끼한거
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  )
}
