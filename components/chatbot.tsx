"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User, Sparkles, Zap, Star } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your analytics assistant. I can help you understand the dashboard data, explain charts, or answer questions about the insights. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setShowParticles(true)
      const timer = setTimeout(() => setShowParticles(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const predefinedResponses = {
    intensity:
      "Intensity represents the strength or magnitude of a data point. In our dashboard, you can see intensity distribution across different sectors and regions. Higher intensity values indicate more significant impact or importance.",
    likelihood:
      "Likelihood shows the probability of an event occurring. The scatter plot correlates likelihood with relevance to help identify high-probability, high-relevance insights.",
    relevance:
      "Relevance measures how important or applicable a data point is to the current context. The radar chart shows average relevance across different sectors.",
    sectors:
      "Our data covers various sectors including Energy, Healthcare, Information Technology, Government, Manufacturing, and more. You can filter by sector to focus on specific industries.",
    regions:
      "The dashboard includes data from multiple regions: Northern America, Western Asia, Central America, Eastern Europe, Southern Asia, and others. Use the region filter to analyze geographic patterns.",
    filters:
      "You can filter data by End Year, Topics, Sector, Region, PESTLE factors, Source, and Country. Active filters are shown as badges and can be removed individually.",
    charts:
      "The dashboard includes bar charts, pie charts, scatter plots, radar charts, and line charts. Each chart is interactive with hover tooltips and responsive design.",
    default:
      "I can help you with questions about intensity, likelihood, relevance, sectors, regions, filters, or charts. You can also ask about specific data insights or how to use the dashboard features.",
  }

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("intensity")) return predefinedResponses.intensity
    if (message.includes("likelihood")) return predefinedResponses.likelihood
    if (message.includes("relevance")) return predefinedResponses.relevance
    if (message.includes("sector")) return predefinedResponses.sectors
    if (message.includes("region")) return predefinedResponses.regions
    if (message.includes("filter")) return predefinedResponses.filters
    if (message.includes("chart") || message.includes("graph")) return predefinedResponses.charts
    if (message.includes("hello") || message.includes("hi"))
      return "Hello! I'm here to help you navigate and understand the analytics dashboard. What would you like to know?"
    if (message.includes("help"))
      return "I can assist you with understanding the dashboard features, data insights, chart interpretations, and filtering options. What specific area would you like help with?"
    if (message.includes("thank"))
      return "You're welcome! Feel free to ask if you have any other questions about the dashboard or data insights."

    return predefinedResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateBotResponse(inputValue),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = ["What is intensity?", "How do I use filters?", "Explain the charts", "Show me regions data"]

  return (
    <>
      {/* Floating Particles */}
      {showParticles && (
        <div className="fixed bottom-20 right-20 pointer-events-none z-40">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float opacity-70"
              style={{
                left: `${Math.random() * 100}px`,
                top: `${Math.random() * 100}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {/* Pulsing Ring */}
          <div
            className={`absolute inset-0 rounded-full bg-blue-400 animate-ping ${isOpen ? "opacity-0" : "opacity-75"}`}
          />

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className={`
              relative rounded-full w-16 h-16 shadow-2xl transition-all duration-500 transform
              ${
                isOpen
                  ? "bg-red-500 hover:bg-red-600 rotate-180 scale-110"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-bounce-gentle hover:scale-110"
              }
              ripple-effect hover-glow
            `}
          >
            {isOpen ? (
              <X className="h-6 w-6 animate-rotate-360" />
            ) : (
              <MessageCircle className="h-6 w-6 animate-heartbeat" />
            )}

            {!isOpen && (
              <>
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full animate-pulse flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-white animate-rotate-360" />
                </div>
                <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce">
                  <Star className="h-3 w-3 text-white animate-pulse" />
                </div>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] z-40 animate-slide-up">
          <Card className="h-full shadow-2xl border-2 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900 animate-glow-border overflow-hidden">
            {/* Animated Header */}
            <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white rounded-t-lg relative overflow-hidden animate-gradient">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-slide-in-right" />
              <CardTitle className="flex items-center gap-2 text-lg relative z-10">
                <Bot className="h-6 w-6 animate-bounce" />
                <span className="animate-typewriter">Analytics Assistant</span>
                <Badge variant="secondary" className="ml-auto bg-white/20 text-white animate-pulse">
                  <Zap className="h-3 w-3 mr-1 animate-rotate-360" />
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>

                <div className="space-y-4 relative z-10">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-zoom-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`
                          max-w-[80%] p-3 rounded-lg relative group
                          ${
                            message.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none animate-slide-in-right"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none animate-slide-in-left"
                          }
                          shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                        `}
                      >
                        {/* Message Glow Effect */}
                        <div
                          className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${
                            message.sender === "user" ? "bg-white" : "bg-blue-400"
                          }`}
                        />

                        <div className="flex items-start gap-2 relative z-10">
                          {message.sender === "bot" && <Bot className="h-4 w-4 mt-0.5 text-blue-600 animate-pulse" />}
                          {message.sender === "user" && <User className="h-4 w-4 mt-0.5 animate-wave" />}
                          <div>
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1 flex items-center gap-1">
                              <span>
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </span>
                              {message.sender === "bot" && <Sparkles className="h-2 w-2 animate-pulse" />}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg rounded-bl-none shadow-lg animate-scale-pulse">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-blue-600 animate-bounce" />
                          <div className="flex space-x-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.2}s` }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500 animate-pulse">AI is thinking</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-up">
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 animate-pulse" />
                    Quick questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {quickQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputValue(question)}
                        className="text-xs hover:scale-105 transition-all duration-200 hover-glow animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about the dashboard..."
                    className="flex-1 focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:shadow-md animate-glow-border"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="hover:scale-110 transition-all duration-200 ripple-effect bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Send className="h-4 w-4 animate-pulse" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
