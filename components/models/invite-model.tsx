"use client"
import { Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
 
} from "@/components/ui/dialog"

import { useModel } from "@/hooks/use-model-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModel = () => {

  const { type, isOpen, onClose, data , onOpen} = useModel();
  const origin = useOrigin();

  const isModelOpen = isOpen && type === 'invite';
  const { server } = data;

  const [copied, setCopied] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  }
  const onNew = async () => {
    try{
      setLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
      onOpen("invite", {server: response.data});
      onOpen
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    
  }
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`; 

    return <Dialog open={isModelOpen} onOpenChange={onClose}>
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
      <DialogHeader className="pt-8 px-6">
        <DialogTitle className="text-2xl text-center font-bold">
          Invite Friends
        </DialogTitle>
      </DialogHeader>
      <div className="p-6">
        <Label className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
          Server invite link
        </Label>
        <div>
          <Input 
            disabled={isLoading}
            className="bg-zinc-300/50 vorder-0 focus-visible:ring-0
            text-black focus-visible:ring-offset-0"
            value={inviteUrl}
          />
          <Button disabled={isLoading} onClick={onCopy} size="icon">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4"/>}
            
          </Button>
        </div>
        <Button
          onClick={onNew}
          disabled={isLoading}
          className="text-xs text-zinc-500 mt-4"
          size={"sm"}
          variant={"link"}
        >
          Generate a new link 
          <RefreshCw className="ml-1"/>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
}