"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button"
import { useRef } from "react"
import { toast } from "sonner";
import useStateContext from "@/provider/state-provider";

export default function ClearChatAlert(
  { children, index }:
    { children: React.ReactNode, index?: number }
) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { clearChat } = useStateContext();

  function deleteChat() {
    clearChat(index)
    toast.success("Successfull!");
    if (closeRef?.current) {
      closeRef.current.click();
    }
  }

  return <AlertDialog>
    {children}
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your chats
          and remove your data from this device.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel ref={closeRef}>Cancel</AlertDialogCancel>
        <Button onClick={deleteChat}>Continue</Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>

}