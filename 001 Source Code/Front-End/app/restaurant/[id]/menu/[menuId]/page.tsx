"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function MenuDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = params.id
  const menuId = params.menuId

  const [menu] = useState({
    id: menuId,
    name: "크림 파스타",
    price: 15000,
    image: "/placeholder.svg?height=200&width=400",
    description: "풍부한 크림 소스와 신선한 해산물이 어우러진 파스타",
    rating: 4.8,
    reviews: 109,
    options: {
      noodleType: [
        { name: "스파게티", price: 0 },
        { name: "페투치니", price: 1000 },
        { name: "링귀니", price: 1000 },
      ],
      toppings: [
        { name: "새우", price: 3000 },
        { name: "베이컨", price: 2000 },
        { name: "버섯", price: 2000 },
      ],
    },
  })

  const [selectedOptions, setSelectedOptions] = useState({
    noodleType: "스파게티",
    toppings: [] as string[],
  })

  const [quantity, setQuantity] = useState(1)
  const [showAnimation, setShowAnimation] = useState(false)

  const handleNoodleTypeChange = (value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      noodleType: value,
    }))
  }

  const handleToppingToggle = (topping: string) => {
    setSelectedOptions((prev) => {
      const toppings = [...prev.toppings]
      if (toppings.includes(topping)) {
        return { ...prev, toppings: toppings.filter((t) => t !== topping) }
      } else {
        return { ...prev, toppings: [...toppings, topping] }
      }
    })
  }

  const calculateTotalPrice = () => {
    let total = menu.price

    // Add noodle type price
    const selectedNoodle = menu.options.noodleType.find((n) => n.name === selectedOptions.noodleType)
    if (selectedNoodle) {
      total += selectedNoodle.price
    }

    // Add toppings price
    selectedOptions.toppings.forEach((topping) => {
      const selectedTopping = menu.options.toppings.find((t) => t.name === topping)
      if (selectedTopping) {
        total += selectedTopping.price
      }
    })

    return total * quantity
  }

  const addToCart = () => {
    setShowAnimation(true)

    toast({
      title: "장바구니에 추가됨",
      description: `${menu.name} ${quantity}개가 장바구니에 추가되었습니다.`,
    })

    setTimeout(() => {
      setShowAnimation(false)
      router.push(`/restaurant/${restaurantId}`)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">메뉴 상세</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4">
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 overflow-hidden">
          <Image
            src={menu.image || "/placeholder.svg"}
            alt={menu.name}
            width={400}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{menu.name}</h2>
          <span className="font-bold">{menu.price.toLocaleString()}원</span>
        </div>

        <div className="flex items-center mb-2">
          <span className="text-yellow-400">★</span>
          <span className="text-sm ml-1">
            {menu.rating} ({menu.reviews})
          </span>
        </div>

        <p className="text-gray-600 mb-6">{menu.description}</p>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">면 종류</h3>
            <div className="space-y-2">
              {menu.options.noodleType.map((option) => (
                <div
                  key={option.name}
                  className={`flex justify-between items-center p-3 border rounded-md ${
                    selectedOptions.noodleType === option.name ? "bg-purple-50 border-purple-300" : ""
                  }`}
                  onClick={() => handleNoodleTypeChange(option.name)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-full border ${
                        selectedOptions.noodleType === option.name
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-300"
                      } mr-2`}
                    >
                      {selectedOptions.noodleType === option.name && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <span>{option.name}</span>
                  </div>
                  {option.price > 0 && <span className="text-gray-500">+{option.price.toLocaleString()}원</span>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">추가 토핑</h3>
            <div className="space-y-2">
              {menu.options.toppings.map((option) => (
                <div
                  key={option.name}
                  className={`flex justify-between items-center p-3 border rounded-md ${
                    selectedOptions.toppings.includes(option.name) ? "bg-purple-50 border-purple-300" : ""
                  }`}
                  onClick={() => handleToppingToggle(option.name)}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-5 h-5 rounded-md border ${
                        selectedOptions.toppings.includes(option.name)
                          ? "bg-purple-600 border-purple-600"
                          : "border-gray-300"
                      } mr-2`}
                    >
                      {selectedOptions.toppings.includes(option.name) && (
                        <div className="w-full h-full flex items-center justify-center text-white">✓</div>
                      )}
                    </div>
                    <span>{option.name}</span>
                  </div>
                  <span className="text-gray-500">+{option.price.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">수량</h3>
            <div className="flex items-center border rounded-md p-3">
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                -
              </button>
              <span className="flex-1 text-center">{quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 border-t">
        <Button className="w-full bg-purple-600" onClick={addToCart}>
          {calculateTotalPrice().toLocaleString()}원 장바구니에 담기
        </Button>
      </div>

      {showAnimation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lg font-medium">장바구니에 추가되었습니다!</p>
            <p className="text-sm text-gray-500 mt-1">
              {menu.name} {quantity}개
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
