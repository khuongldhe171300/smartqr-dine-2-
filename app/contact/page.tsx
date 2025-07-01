"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"

export default function ContactPage() {
  const heroAnimation = useScrollAnimation()
  const formAnimation = useScrollAnimation()
  const infoAnimation = useScrollAnimation()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div
            ref={heroAnimation.ref}
            className={`flex flex-col items-center justify-center space-y-4 text-center transition-all duration-1000 ${heroAnimation.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-text">
                Liên hệ với chúng tôi
              </h1>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto animate-fade-in-up stagger-1">
                Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn giải pháp tốt nhất cho nhà hàng của bạn
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <div
              ref={formAnimation.ref}
              className={`transition-all duration-1000 ${formAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
            >
              <Card className="hover-lift hover-glow">
                <CardHeader>
                  <CardTitle className="animate-fade-in-up">Gửi tin nhắn cho chúng tôi</CardTitle>
                  <CardDescription className="animate-fade-in-up stagger-1">
                    Điền thông tin bên dưới và chúng tôi sẽ liên hệ lại trong vòng 24 giờ
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 animate-fade-in-up stagger-1">
                      <Label htmlFor="firstName">Họ</Label>
                      <Input
                        id="firstName"
                        placeholder="Nhập họ của bạn"
                        className="hover:border-orange-300 transition-colors"
                      />
                    </div>
                    <div className="space-y-2 animate-fade-in-up stagger-2">
                      <Label htmlFor="lastName">Tên</Label>
                      <Input
                        id="lastName"
                        placeholder="Nhập tên của bạn"
                        className="hover:border-orange-300 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 animate-fade-in-up stagger-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="hover:border-orange-300 transition-colors"
                    />
                  </div>
                  <div className="space-y-2 animate-fade-in-up stagger-4">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0123 456 789"
                      className="hover:border-orange-300 transition-colors"
                    />
                  </div>
                  <div className="space-y-2 animate-fade-in-up stagger-5">
                    <Label htmlFor="restaurant">Tên nhà hàng</Label>
                    <Input
                      id="restaurant"
                      placeholder="Tên nhà hàng của bạn"
                      className="hover:border-orange-300 transition-colors"
                    />
                  </div>
                  <div className="space-y-2 animate-fade-in-up stagger-6">
                    <Label htmlFor="message">Tin nhắn</Label>
                    <Textarea
                      id="message"
                      placeholder="Mô tả nhu cầu của bạn..."
                      rows={4}
                      className="hover:border-orange-300 transition-colors"
                    />
                  </div>
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 hover-lift hover-glow animate-fade-in-up stagger-6">
                    Gửi tin nhắn
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div
              ref={infoAnimation.ref}
              className={`space-y-6 transition-all duration-1000 ${infoAnimation.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
            >
              <Card className="hover-lift hover-glow animate-fade-in-up">
                <CardHeader>
                  <CardTitle>Thông tin liên hệ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 animate-fade-in-left stagger-1">
                    <Phone className="h-5 w-5 text-orange-500 flex-shrink-0 hover-rotate" />
                    <div>
                      <p className="font-medium">Hotline</p>
                      <p className="text-gray-500">0329919200</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 animate-fade-in-left stagger-2">
                    <Mail className="h-5 w-5 text-orange-500 flex-shrink-0 hover-rotate" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-500">khuongld2909@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 animate-fade-in-left stagger-3">
                    <MapPin className="h-5 w-5 text-orange-500 flex-shrink-0 hover-rotate" />
                    <div>
                      <p className="font-medium">Địa chỉ</p>
                      <p className="text-gray-500">Thôn 3 Thạch hòa, Thạch Thất, Hà Nội</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 animate-fade-in-left stagger-4">
                    <Clock className="h-5 w-5 text-orange-500 flex-shrink-0 hover-rotate" />
                    <div>
                      <p className="font-medium">Giờ làm việc</p>
                      <p className="text-gray-500">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                      <p className="text-gray-500">Thứ 7: 8:00 - 12:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-lift hover-glow animate-fade-in-up stagger-1">
                <CardHeader>
                  <CardTitle>Hỗ trợ nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover-lift animate-fade-in-up stagger-1"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Gọi điện tư vấn
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover-lift animate-fade-in-up stagger-2"
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Chat trực tuyến
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
