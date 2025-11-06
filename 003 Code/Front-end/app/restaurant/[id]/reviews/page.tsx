"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, ThumbsUp, MessageCircle } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReviewsPage() {
  const params = useParams()
  const router = useRouter()
  const restaurantId = params.id
  const [activeTab, setActiveTab] = useState("all")

  const [reviews] = useState([
    {
      id: 1,
      user: "사용자 1",
      rating: 5,
      content: "맛있어요! 배달도 빨라요. 특히 소스가 일품이었어요. 다음에도 주문할 예정입니다.",
      date: "2023-04-01",
      image: "/placeholder.svg?height=80&width=80",
      likes: 12,
      comments: 3,
      tasteRatings: {
        sweet: 5,
        spicy: 3,
        sour: 4,
        savory: 5,
      },
      photos: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
      id: 2,
      user: "사용자 2",
      rating: 4,
      content: "전체적으로 만족스러웠어요. 다만 배달이 조금 늦었네요. 음식은 맛있었습니다!",
      date: "2023-03-15",
      image: "/placeholder.svg?height=80&width=80",
      likes: 8,
      comments: 1,
      tasteRatings: {
        sweet: 4,
        spicy: 5,
        sour: 3,
        savory: 5,
      },
      photos: ["/placeholder.svg?height=100&width=100"],
    },
    {
      id: 3,
      user: "사용자 3",
      rating: 5,
      content: "정말 맛있었어요! 특히 파스타가 쫄깃하고 소스가 일품이었습니다. 강력 추천합니다.",
      date: "2023-03-10",
      image: "/placeholder.svg?height=80&width=80",
      likes: 15,
      comments: 5,
      tasteRatings: {
        sweet: 5,
        spicy: 4,
        sour: 5,
        savory: 4,
      },
      photos: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      id: 4,
      user: "사용자 4",
      rating: 3,
      content: "평범했어요. 가격 대비 양이 조금 적은 것 같아요. 맛은 괜찮았습니다.",
      date: "2023-03-05",
      image: "/placeholder.svg?height=80&width=80",
      likes: 4,
      comments: 2,
      tasteRatings: {
        sweet: 3,
        spicy: 2,
        sour: 3,
        savory: 4,
      },
      photos: [],
    },
  ])

  const filteredReviews =
    activeTab === "all" ? reviews : reviews.filter((review) => review.rating === Number.parseInt(activeTab))

  const getTasteDescription = (type: string, value: number) => {
    const descriptions = {
      spicy: ["전혀 맵지 않음", "약간 매움", "적당히 매움", "매우 매움", "극도로 매움"],
      sweet: ["전혀 달지 않음", "약간 달음", "적당히 달음", "매우 달음", "극도로 달음"],
      sour: ["전혀 시지 않음", "약간 신맛", "적당히 신맛", "매우 신맛", "극도로 신맛"],
      savory: ["전혀 느끼하지 않음", "약간 느끼함", "적당히 느끼함", "매우 느끼함", "극도로 느끼함"],
    }

    return descriptions[type as keyof typeof descriptions][value - 1]
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">리뷰</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="text-2xl font-bold mr-2">4.7</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600"
            onClick={() => router.push(`/restaurant/${restaurantId}/review`)}
          >
            리뷰 작성
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full mb-4" onValueChange={setActiveTab}>
          <TabsList className="w-full h-auto flex overflow-x-auto py-1 justify-start bg-transparent">
            <TabsTrigger
              value="all"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              전체
            </TabsTrigger>
            <TabsTrigger
              value="5"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              5점
            </TabsTrigger>
            <TabsTrigger
              value="4"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              4점
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              3점
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              2점
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className="px-3 py-1 rounded-full data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
            >
              1점
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredReviews.map((review) => (
          <div key={review.id} className="mb-6 border-b pb-4">
            <div className="flex items-start">
              <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                <Image
                  src={review.image || "/placeholder.svg"}
                  alt={review.user}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{review.user}</h3>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-1">{review.date}</p>

                <p className="mt-2">{review.content}</p>

                {review.photos.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto">
                    {review.photos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0"
                      >
                        <Image src={photo || "/placeholder.svg"} alt="Review" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="flex justify-between text-xs">
                      <span>매운맛</span>
                      <span className="text-purple-600">{getTasteDescription("spicy", review.tasteRatings.spicy)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="flex justify-between text-xs">
                      <span>단맛</span>
                      <span className="text-purple-600">{getTasteDescription("sweet", review.tasteRatings.sweet)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="flex justify-between text-xs">
                      <span>신맛</span>
                      <span className="text-purple-600">{getTasteDescription("sour", review.tasteRatings.sour)}</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-2 rounded-md">
                    <div className="flex justify-between text-xs">
                      <span>느끼함</span>
                      <span className="text-purple-600">
                        {getTasteDescription("savory", review.tasteRatings.savory)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex mt-3">
                  <button className="flex items-center text-gray-500 text-sm mr-4">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>도움됨 {review.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-500 text-sm">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span>댓글 {review.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
