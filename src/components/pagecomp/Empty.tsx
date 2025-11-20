import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { FilesIcon } from "lucide-react"

export default function EmptyOutline() {
  return (
    <Empty className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FilesIcon />
        </EmptyMedia>
        <EmptyTitle>Empty Storage</EmptyTitle>
        <EmptyDescription>
          Upload files to learn with AI.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
