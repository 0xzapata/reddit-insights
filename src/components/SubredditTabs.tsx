import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TopPosts } from "@/components/TopPosts"
import { Themes } from "@/components/Themes"

export function SubredditTabs() {
  return (
    <Tabs defaultValue="top-posts" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
        <TabsTrigger value="themes">Themes</TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts">
        <TopPosts />
      </TabsContent>
      <TabsContent value="themes">
        <Themes />
      </TabsContent>
    </Tabs>
  )
}