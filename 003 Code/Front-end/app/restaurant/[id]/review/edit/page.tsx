"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"

export default function EditReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = params.id

  const [review, setReview] = useState({
    content: "우리 같이 리뷰를 남겨보자~",
    overallRating: 5,
    tasteRatings: {
      sweet: 5,
      spicy: 5,
      sour: 5,
      savory: 5,
    },
  })

  const handleRatingChange = (type: string, value: number[]) => {
    if (type === "overall") {
      setReview({ ...review, overallRating: value[0] })
    } else {
      setReview({
        ...review,
        tasteRatings: {
          ...review.tasteRatings,
          [type]: value[0],
        },
      })
    }
  }

  const handleSubmit = () => {
    toast({
      title: "리뷰 수정 완료",
      description: "리뷰가 성공적으로 수정되었습니다.",
    })
    router.push(`/restaurant/${restaurantId}/reviews`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">중범이만 레벨업</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">별점</h2>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button key={rating} onClick={() => handleRatingChange("overall", [rating])} className="mr-1 text-2xl">
                {rating <= review.overallRating ? "★" : "☆"}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <Textarea
            placeholder="리뷰를 작성해주세요..."
            value={review.content}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4">
            <Button variant="outline" size="sm">
              사진 추가
            </Button>
            <Button variant="outline" size="sm">
              사진 추가
            </Button>
            <Button variant="outline" size="sm">
              사진 추가
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span>내 기준 맵기</span>
              <span>{review.tasteRatings.spicy}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.spicy]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("spicy", value)}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>내 기준 짜기</span>
              <span>{review.tasteRatings.sweet}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.sweet]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("sweet", value)}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>내 기준 신맛</span>
              <span>{review.tasteRatings.sour}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.sour]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("sour", value)}
              className="mt-2"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>내 기준 느끼함</span>
              <span>{review.tasteRatings.savory}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.savory]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("savory", value)}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full" onClick={handleSubmit}>
          리뷰 수정하기
        </Button>
      </div>
    </div>
  )
}
