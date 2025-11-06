"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"

export default function TastePreferencesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [preferences, setPreferences] = useState({
    spicy: 3,
    sweet: 3,
    sour: 3,
    savory: 3,
  })

  const handleSliderChange = (name: keyof typeof preferences, value: number[]) => {
    setPreferences((prev) => ({ ...prev, [name]: value[0] }))
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
    // Save preferences to user profile
    toast({
      title: "입맛 설정 완료",
      description: "입맛 설정이 저장되었습니다.",
    })
    router.push("/home")
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20">
      <h1 className="text-xl font-medium text-center mb-8">입맛을 평가하겠습니다</h1>

      <div className="space-y-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium mb-4">내 입맛 프로필</h2>

          {/* Spicy */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">매운맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("spicy", preferences.spicy)}</span>
            </div>
            <Slider
              defaultValue={[preferences.spicy]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleSliderChange("spicy", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          {/* Sweet */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">단맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("sweet", preferences.sweet)}</span>
            </div>
            <Slider
              defaultValue={[preferences.sweet]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleSliderChange("sweet", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          {/* Sour */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">신맛</span>
              <span className="text-sm text-purple-600">{getTasteDescription("sour", preferences.sour)}</span>
            </div>
            <Slider
              defaultValue={[preferences.sour]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleSliderChange("sour", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>

          {/* Savory */}
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">느끼함</span>
              <span className="text-sm text-purple-600">{getTasteDescription("savory", preferences.savory)}</span>
            </div>
            <Slider
              defaultValue={[preferences.savory]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleSliderChange("savory", value)}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>약함</span>
              <span>강함</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSubmit} className="w-full bg-purple-600">
          완료
        </Button>
      </div>
    </div>
  )
}
