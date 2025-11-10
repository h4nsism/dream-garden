"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Paperclip, Tag, Sparkles, Edit2, Grid3x3 } from "lucide-react"
import Link from "next/link"

type ViewMode = "chat" | "tags"

export default function RecordRoomPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("chat")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [message, setMessage] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [suggestedTags, setSuggestedTags] = useState<string[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")

  const [records, setRecords] = useState([
    {
      date: "2025.11.09",
      time: "14:30",
      content: "화분 돌보기 활동에 적극적으로 참여했습니다. 물 주는 순서를 기억하고 스스로 실행했어요.",
      tags: ["참여도높음", "성장기록"],
    },
    {
      date: "2025.11.08",
      time: "10:15",
      content: "텃밭에서 수확한 상추를 함께 씻으며 즐거워했습니다.",
      tags: ["협동", "기분좋음"],
    },
    {
      date: "2025.11.07",
      time: "15:20",
      content: "점심시간에 친구들과 대화하며 웃는 모습이 많았습니다.",
      tags: ["기분좋음", "협동"],
    },
    {
      date: "2025.11.06",
      time: "11:00",
      content: "씨앗 심기 활동에서 다른 친구를 도와주는 모습을 보였습니다.",
      tags: ["협동", "성장기록", "참여도높음"],
    },
  ])

  const getTagStats = () => {
    const tagMap = new Map<string, { count: number; records: typeof records }>()

    records.forEach((record) => {
      record.tags.forEach((tag) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { count: 0, records: [] })
        }
        const stats = tagMap.get(tag)!
        stats.count++
        stats.records.push(record)
      })
    })

    return Array.from(tagMap.entries())
      .map(([tag, stats]) => ({ tag, ...stats }))
      .sort((a, b) => b.count - a.count)
  }

  const tagStats = getTagStats()
  const filteredRecords = selectedTag ? records.filter((r) => r.tags.includes(selectedTag)) : records

  const analyzeTextForTags = (text: string) => {
    const tagKeywords = {
      참여도높음: ["적극", "참여", "열심", "집중"],
      성장기록: ["스스로", "기억", "성장", "발전"],
      협동: ["함께", "같이", "협동", "나눠"],
      기분좋음: ["즐거", "웃", "행복", "좋아"],
      집중력: ["집중", "주의", "관찰"],
      건강: ["건강", "잘먹", "운동"],
      도전행동: ["어려움", "힘들", "거부"],
      감정표현: ["표현", "말", "감정", "이야기"],
    }

    const suggested: string[] = []
    const lowerText = text.toLowerCase()

    Object.entries(tagKeywords).forEach(([tag, keywords]) => {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        suggested.push(tag)
      }
    })

    return suggested
  }

  const handleMessageChange = (text: string) => {
    setMessage(text)
    if (text.length > 10) {
      const suggested = analyzeTextForTags(text)
      setSuggestedTags(suggested.filter((tag) => !tags.includes(tag)))
    } else {
      setSuggestedTags([])
    }
  }

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
    setSuggestedTags(suggestedTags.filter((t) => t !== tag))
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleSaveEdit = (index: number) => {
    const updatedRecords = [...records]
    updatedRecords[index].content = editContent
    setRecords(updatedRecords)
    setEditingIndex(null)
    setEditContent("")
  }

  const handleStartEdit = (index: number, content: string) => {
    setEditingIndex(index)
    setEditContent(content)
  }

  const getTagColor = (tag: string) => {
    const colorMap: Record<string, string> = {
      참여도높음: "bg-blue-100 text-blue-700 border-blue-200",
      성장기록: "bg-green-100 text-green-700 border-green-200",
      협동: "bg-purple-100 text-purple-700 border-purple-200",
      기분좋음: "bg-yellow-100 text-yellow-700 border-yellow-200",
      집중력: "bg-indigo-100 text-indigo-700 border-indigo-200",
      건강: "bg-emerald-100 text-emerald-700 border-emerald-200",
      도전행동: "bg-orange-100 text-orange-700 border-orange-200",
      감정표현: "bg-pink-100 text-pink-700 border-pink-200",
    }
    return colorMap[tag] || "bg-neutral-100 text-neutral-700 border-neutral-200"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-3xl">🌱</div>
                <div>
                  <h1 className="font-semibold text-foreground">김하늘</h1>
                  <p className="text-xs text-muted-foreground">꿈뜰 2반</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
              <Button
                variant={viewMode === "chat" ? "default" : "ghost"}
                size="sm"
                onClick={() => {
                  setViewMode("chat")
                  setSelectedTag(null)
                }}
                className="h-8 text-xs"
              >
                기록
              </Button>
              <Button
                variant={viewMode === "tags" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("tags")}
                className="h-8 text-xs gap-1"
              >
                <Grid3x3 className="h-3 w-3" />
                태그 모아보기
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {viewMode === "tags" ? (
          <div className="space-y-6">
            {/* Tag Statistics */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-foreground">태그 통계</h2>
                <div className="flex flex-wrap gap-3">
                  {tagStats.map(({ tag, count }) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                      className={`px-4 py-2 rounded-xl border-2 transition-all ${
                        selectedTag === tag
                          ? getTagColor(tag) + " shadow-sm scale-105"
                          : "bg-card hover:bg-muted border-border"
                      }`}
                    >
                      <div className="text-sm font-medium">{tag}</div>
                      <div className="text-xs text-muted-foreground">{count}회</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Filtered Records by Tag */}
            {selectedTag && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    #{selectedTag} 기록 ({filteredRecords.length}건)
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTag(null)}>
                    전체 보기
                  </Button>
                </div>
                <div className="space-y-4">
                  {filteredRecords.map((record, idx) => (
                    <Card key={idx} className="bg-card">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-2">
                          {record.date} {record.time}
                        </p>
                        <p className="text-sm leading-relaxed mb-3 text-foreground">{record.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {record.tags.map((tag) => (
                            <Badge
                              key={tag}
                              className={`text-xs border ${getTagColor(tag)} ${
                                tag === selectedTag ? "ring-2 ring-offset-1" : ""
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Tags Overview */}
            {!selectedTag && (
              <div className="space-y-4">
                {tagStats.map(({ tag, records: tagRecords }) => (
                  <Card key={tag} className="overflow-hidden">
                    <CardContent className="p-0">
                      <button
                        onClick={() => setSelectedTag(tag)}
                        className={`w-full p-4 text-left hover:bg-muted/50 transition-colors border-l-4 ${
                          getTagColor(tag).split(" ")[0]
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${getTagColor(tag)} border`}>{tag}</Badge>
                          <span className="text-xs text-muted-foreground">{tagRecords.length}개 기록</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{tagRecords[0].content}</p>
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 mb-32">
            {records.map((record, idx) => (
              <div key={idx} className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">
                  {record.date} {record.time}
                </p>
                <Card className="bg-card group relative">
                  <CardContent className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-7 w-7"
                      onClick={() => handleStartEdit(idx, record.content)}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>

                    {editingIndex === idx ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="min-h-[100px] text-sm"
                        />
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleSaveEdit(idx)} className="bg-primary">
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingIndex(null)
                              setEditContent("")
                            }}
                          >
                            취소
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed mb-3 text-foreground pr-8">{record.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {record.tags.map((tag) => (
                            <Badge key={tag} className={`text-xs border ${getTagColor(tag)}`}>
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </main>

      {viewMode === "chat" && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            {suggestedTags.length > 0 && (
              <div className="mb-3 p-3 bg-accent/10 rounded-xl animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">입력한 내용에서 태그를 찾았어요</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleAddTag(tag)}
                      className="px-3 py-1 text-xs rounded-full bg-accent/30 hover:bg-accent/50 text-accent-foreground transition-colors"
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} className="bg-primary text-primary-foreground gap-1 px-3 py-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-primary-foreground/70">
                      ✕
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2">
              <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                <Paperclip className="h-4 w-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  placeholder="오늘의 관찰을 기록하세요..."
                  value={message}
                  onChange={(e) => handleMessageChange(e.target.value)}
                  className="pr-10 bg-muted/50"
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7">
                  <Tag className="h-4 w-4" />
                </Button>
              </div>
              <Button size="icon" className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
