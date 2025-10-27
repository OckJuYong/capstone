"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Minus, Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function CartPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = searchParams.get("restaurant")

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "크림 파스타",
      price: 15000,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      options: ["스파게티", "새우 추가"],
    },
    {
      id: 2,
      name: "토마토 파스타",
      price: 14000,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      options: ["페투치니"],
    },
  ])

  const [restaurant] = useState({
    id: restaurantId,
    name: "메종 크림 파스타",
    deliveryFee: 3000,
  })

  const [deliveryOption, setDeliveryOption] = useState("delivery")
  const [requestText, setRequestText] = useState("")

  const increaseQuantity = (itemId: number) => {
    setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item)))
  }

  const decreaseQuantity = (itemId: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    )
  }

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId))
  }

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const total = subtotal + restaurant.deliveryFee

  const handleCheckout = () => {
    router.push(`/payment?restaurant=${restaurantId}`)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">장바구니</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <h2 className="font-medium mb-4">{restaurant.name}</h2>

        <div className="mb-4">
          <RadioGroup defaultValue="delivery" onValueChange={setDeliveryOption}>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delivery" id="delivery" />
                <Label htmlFor="delivery">배달</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pickup" id="pickup" />
                <Label htmlFor="pickup">포장</Label>
              </div>
            </div>
          </RadioGroup>
        </div>

        {cartItems.length > 0 ? (
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border p-4">
                <div className="flex justify-between items-start">
                  <div className="flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      {item.options.length > 0 && (
                        <div className="mt-1">
                          {item.options.map((option, index) => (
                            <span key={index} className="text-xs text-gray-500 block">
                              · {option}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="text-gray-400" onClick={() => removeItem(item.id)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex items-center">
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="mx-3 w-6 text-center">{item.quantity}</span>
                    <button
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-medium">{(item.price * item.quantity).toLocaleString()}원</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <X className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-6">장바구니가 비어있습니다</p>
            <Button
              variant="outline"
              className="border-purple-300 text-purple-700"
              onClick={() => router.push(`/restaurant/${restaurantId}`)}
            >
              메뉴 담으러 가기
            </Button>
          </div>
        )}

        {cartItems.length > 0 && (
          <>
            <div className="mb-6">
              <h3 className="font-medium mb-2">요청사항</h3>
              <Input
                placeholder="요청사항을 입력해주세요..."
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-6 bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between">
                <span>주문금액</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배달팁</span>
                <span>{restaurant.deliveryFee.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t mt-2">
                <span>총 결제금액</span>
                <span>{total.toLocaleString()}원</span>
              </div>
            </div>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <Button className="w-full bg-purple-600" onClick={handleCheckout}>
            {total.toLocaleString()}원 결제하기
          </Button>
        </div>
      )}
    </div>
  )
}
