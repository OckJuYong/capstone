"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const restaurantId = searchParams.get("restaurant")

  const [paymentMethod, setPaymentMethod] = useState("kakaopay")
  const [requestText, setRequestText] = useState("")
  const [termsAccepted, setTermsAccepted] = useState({
    dailyUse: true,
    safetyMode: true,
  })
  const [selectedCoupon, setSelectedCoupon] = useState<string | null>(null)
  const [showCouponDialog, setShowCouponDialog] = useState(false)

  const coupons = [
    { id: "1", name: "신규 가입 쿠폰", discount: "3,000원", minOrder: "15,000원 이상" },
    { id: "2", name: "첫 주문 할인", discount: "5,000원", minOrder: "20,000원 이상" },
    { id: "3", name: "생일 축하 쿠폰", discount: "10,000원", minOrder: "30,000원 이상" },
  ]

  const handlePayment = () => {
    toast({
      title: "결제 완료",
      description: "주문이 성공적으로 완료되었습니다.",
    })
    router.push("/order-history")
  }

  const getSelectedCoupon = () => {
    return coupons.find((coupon) => coupon.id === selectedCoupon)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium flex-1 text-center">결제하기</h1>
        <div className="w-8"></div>
      </header>

      <div className="p-4 flex-1">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dailyUse"
              checked={termsAccepted.dailyUse}
              onCheckedChange={(checked) => setTermsAccepted((prev) => ({ ...prev, dailyUse: checked === true }))}
            />
            <Label htmlFor="dailyUse">일회용품 사용</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="safetyMode"
              checked={termsAccepted.safetyMode}
              onCheckedChange={(checked) => setTermsAccepted((prev) => ({ ...prev, safetyMode: checked === true }))}
            />
            <Label htmlFor="safetyMode">안심번호 모드</Label>
          </div>

          <div>
            <p className="mb-1">주소: 대전광역시 유성구 학하서로</p>
            <p className="mb-4">요청사항: {requestText || "없음"}</p>
          </div>

          <div className="flex justify-between items-center">
            <span>할인쿠폰</span>
            <Dialog open={showCouponDialog} onOpenChange={setShowCouponDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  {selectedCoupon ? getSelectedCoupon()?.name : "선택"}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>쿠폰 선택</DialogTitle>
                </DialogHeader>
                <RadioGroup value={selectedCoupon || ""} onValueChange={setSelectedCoupon}>
                  {coupons.map((coupon) => (
                    <div key={coupon.id} className="flex items-start space-x-2 py-2 border-b">
                      <RadioGroupItem value={coupon.id} id={`coupon-${coupon.id}`} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={`coupon-${coupon.id}`} className="font-medium">
                          {coupon.name}
                        </Label>
                        <p className="text-sm text-gray-500">{coupon.minOrder} 주문 시</p>
                        <p className="text-sm font-medium text-purple-600">{coupon.discount} 할인</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                <div className="flex justify-end mt-4">
                  <Button onClick={() => setShowCouponDialog(false)} className="bg-purple-600">
                    적용하기
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <div className="flex justify-between">
              <span>결제금액:</span>
              <span>23,000원</span>
            </div>
            <div className="flex justify-between">
              <span>총 금액:</span>
              <span>25,000원</span>
            </div>
            <div className="flex justify-between">
              <span>할인금액:</span>
              <span>2,000원</span>
            </div>
          </div>

          <div className="pt-4">
            <RadioGroup defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="kakaopay" id="kakaopay" />
                  <Label htmlFor="kakaopay" className="flex-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-yellow-400 rounded-md mr-2"></div>
                      카카오페이
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="naverpay" id="naverpay" />
                  <Label htmlFor="naverpay" className="flex-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-green-500 rounded-md mr-2"></div>
                      네이버페이
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border rounded-lg p-3">
                  <RadioGroupItem value="creditcard" id="creditcard" />
                  <Label htmlFor="creditcard" className="flex-1">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-500 rounded-md mr-2"></div>
                      신용카드
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="pt-4">
            <Button className="w-full bg-purple-600 h-12" onClick={handlePayment}>
              23,000원 결제하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
