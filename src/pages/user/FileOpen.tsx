import Example from "@/components/pagecomp/AIChatBot"
import FlaschCard from "@/components/pagecomp/FlaschCard"
import { QuizComp } from "@/components/pagecomp/QuizComp"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function FileOpen() {
  return (
    <div className="flex w-full flex-col gap-6 h-full">
        <Tabs defaultValue="summary" className="h-full" >
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
            <TabsContent value="quiz" className="w-full h-full">
                <QuizComp />   
            </TabsContent>
            <TabsContent value="flash-card">
                <FlaschCard/>
            </TabsContent>

        </Tabs>
        
    </div>
  )
}

export default FileOpen