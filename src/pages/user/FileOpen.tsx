import Example from "@/components/pagecomp/AIChatBot"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function FileOpen() {
  return (
    <div className="flex w-full flex-col gap-6">
        <Tabs defaultValue="summary" className="">
            <TabsList className="w-full">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="quiz">Quiz</TabsTrigger>
                <TabsTrigger value="flash-card">Flash Card</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
                Summary Content
            </TabsContent>
            <TabsContent value="chat">
                <Example />
            </TabsContent>
            <TabsContent value="quiz">
                Quiz Content
            </TabsContent>
            <TabsContent value="flash-card">
                Flash Card Content
            </TabsContent>

        </Tabs>
        
    </div>
  )
}

export default FileOpen