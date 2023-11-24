"use client"
import { Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
 
} from "@/components/ui/dialog"
import qs from "query-string";
import { useModel } from "@/hooks/use-model-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";

export const DeleteMessageModel = () => {

  const { type, isOpen, onClose, data} = useModel();
  const isModelOpen = isOpen && type === 'deleteMessage';
  const { apiUrl, query } = data;
  const [isLoading, setLoading] = useState(false);

  const onClick =async () => {
    try{
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      })
      await axios.delete(url)
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

    return <Dialog open={isModelOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Delete Message
        </DialogTitle>
        <DialogDescription className="text-center text-zinc-500">
          Are you sure you want to delete this message?<span className="font-semibold text-indigo-500"></span>
          <br/>
          <div>It will permanently deleted!</div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className= "bg-gray-100 px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <Button
            disabled={isLoading}
            onClick={onClose}
            variant={"ghost"}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={onClick}
            variant={"primary"}
          >
            Confirm
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
}