import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import useStateContext from "@/provider/state-provider"
import { toast } from "sonner"
import { History } from "@/provider/state"

export default function NewChatModal() {
  const [formData, setFormData] = useState<History>(() => ({
    id: Date.now(),
    title: "",
    started: new Date(),
    messages: []
  }))
  const closeRef = useRef<HTMLButtonElement>(null);

  const { addNewChat } = useStateContext();

  function newChat() {
    addNewChat(formData);
    setFormData(prev => ({
      ...prev,
      title: "",
      id: Date.now()
    }))
    toast.success("Successfull!");
    if (closeRef?.current) {
      closeRef.current.click();
    }
  }

  return <Dialog>
    <DialogTrigger className="h-9 px-4 py-2 has-[>svg]:px-3 text-[14px] font-[500]  bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 rounded-[8px]">New Chat</DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>New Chat</DialogTitle>
        <DialogDescription>
          Create a new chat!
        </DialogDescription>
      </DialogHeader>
      <div>
        <Input
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Name this chat..."
        />
        <Button
          className="bg-green-500 mt-4 cursor-pointer"
          variant="secondary"
          onClick={newChat}
        >
          Done
        </Button>
        <DialogClose ref={closeRef} />
      </div>
    </DialogContent>
  </Dialog>

}