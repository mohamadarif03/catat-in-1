import ButtonList from "@/components/pagecomp/ButtonList";
import EmptyOutline from "@/components/pagecomp/Empty";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const data = [
  {
    title: "Project Proposal.docx",
    fileType: "doc",
    modified: "2024-06-20",
    size: "45 KB",
  },
  {
    title: "Project Proposal.docx",
    fileType: "ppt",
    modified: "2024-06-20",
    size: "45 KB",
  },
  {
    title: "Project Proposal.docx",
    fileType: "pdf",
    modified: "2024-06-20",
    size: "45 KB",
  },
];

function AllFiles() {
  return (
    <div className=" h-full">
      <div className="relative mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          className="pl-9" // add padding so text doesn't overlap the icon
        />
      </div>

      <div className="flex flex-col gap-4">
        {data.map((file, index) => (
          <ButtonList
            key={index} // always add a key!
            name={file.title}
            fileType={file.fileType}
            date={file.modified}
          />
        ))}
      </div>
      <Button className="w-10 h-10 absolute bottom-10 right-10"><Plus/></Button>
    </div>
  );
}

export default AllFiles;
