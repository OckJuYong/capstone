"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"

export default function WriteReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = params.id

  const [review, setReview] = useState({
    content: "",
    overallRating: 5,
    tasteRatings: {
      sweet: 3,
      spicy: 3,
      sour: 3,
      savory: 3,
    },
    photos: [] as string[],
  })

  const [previewPhotos, setPreviewPhotos] = useState([
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
    "/placeholder.svg?height=100&width=100",
  ])

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

  const getTasteDescription = (type: string, value: number) => {
    const descriptions = {
      spicy: ["전혀 맵지 않음", "약간 매움", "적당히 매움", "매우 매움", "극도로 매움"],
      sweet: ["전혀 달지 않음", "약간 달음", "적당히 달음", "매우 달음", "극도로 달음"],
      sour: ["전혀 시지 않음", "약간 신맛", "적당히 신맛", "매우 신맛", "극도로 신맛"],
      savory: ["전혀 느끼하지 않음", "약간 느끼함", "적당히 느끼함", "매우 느끼함", "극도로 느끼함"],
    }

    return descriptions[type as keyof typeof descriptions][value - 1]
  }

  const handleSubmit = () => {
    if (!review.content.trim()) {
      toast({
        title: "리뷰 내용을 입력해주세요",
        description: "리뷰 내용은 필수 입력 항목입니다.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "리뷰 등록 완료",
      description: "리뷰가 성공적으로 등록되었습니다.",
    })
    router.push(`/restaurant/${restaurantId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">리뷰 작성</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">별점</h2>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange("overall", [rating])}
                className="mr-1 text-3xl text-yellow-400"
              >
                {rating <= review.overallRating ? (
                  <Star className="h-8 w-8 fill-yellow-400" />
                ) : (
                  <Star className="h-8 w-8 text-gray-300" />
                )}
              </button>
            ))}
            <span className="ml-2 text-lg font-medium">{review.overallRating}.0</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">리뷰 내용</h2>
          <Textarea
            placeholder="음식의 맛, 양, 서비스 등 솔직한 리뷰를 작성해주세요..."
            value={review.content}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            className="min-h-[100px] resize-none"
          />
          <p className="text-xs text-gray-500 mt-1">최소 10자 이상 작성해주세요.</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">사진 추가</h2>
          <div className="grid grid-cols-4 gap-2">
            {previewPhotos.map((photo, index) => (
              <div key={index} className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
                <Image src={photo || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
            ))}
            <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
              <Camera className="h-6 w-6 text-gray-400" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">최대 10장까지 추가할 수 있습니다.</p>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">매운맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("spicy", review.tasteRatings.spicy)}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.spicy]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("spicy", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">단맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("sweet", review.tasteRatings.sweet)}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.sweet]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("sweet", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">신맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("sour", review.tasteRatings.sour)}</span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.sour]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("sour", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="font-medium">느끼함</span>
              <span className="text-sm text-purple-600">
                {getTasteDescription("savory", review.tasteRatings.savory)}
              </span>
            </div>
            <Slider
              defaultValue={[review.tasteRatings.savory]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRatingChange("savory", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <Button className="w-full bg-purple-600" onClick={handleSubmit}>
          리뷰 등록하기
        </Button>
      </div>
    </div>
  )
}
