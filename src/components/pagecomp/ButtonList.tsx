import { Button } from "../ui/button"
import PDFIcon from "../../assets/PDFIcon.svg"
import DOCIcon from "../../assets/DocIcon.svg"
import PPTIcon from "../../assets/PPTIcon.svg"
import { ChevronRight} from "lucide-react"
function ButtonList({name, fileType, date}:{name?:string, fileType?:string, date?:string}) {
  return (
    <div>
        <Button className="w-full h-auto flex items-center justify-between p-4" variant={"outline"}>
            <div className="flex items-start gap-3 ml-4">
                {
                    fileType === "pdf" ? (
                        <img src={PDFIcon} alt="PDF Icon" className="w-8 h-8" />
                    ) : fileType === "doc" ? (
                        <img src={DOCIcon} alt="DOC Icon" className="w-8 h-8" />
                    ) : (
                        <img src={PPTIcon} alt="File Icon" className="w-8 h-8" />
                    )
                }

                <div className="flex flex-col items-start">
                    <div className="font-medium text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground">Uploaded on: {date}</div>
                </div>
            </div>
            <ChevronRight size={68} />
        </Button>
    </div>
  )
}

export default ButtonList