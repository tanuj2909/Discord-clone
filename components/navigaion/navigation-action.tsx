"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "@/components/action-tooltip"
import { useModel } from "@/hooks/use-model-store";
const NavigationAction = () => {
    const { onOpen } = useModel();
    return ( 
        <div>
            <ActionTooltip
                side="right"
                align="center"
                label="Add a server"
            >
                <button
                onClick={() => onOpen("createServer")}
                className="group flex items-center">
                    <div className="flex mx-3 g-[48px] w-[48px] rounded-[24px]
                    group-hover:rounded-[16px] transition-all overflow-hidden
                    items-center justify-center bg-background dark:bg-nutral-700
                    group-hover:bg-emerald-500">
                        <Plus 
                            className="group-hover:text-white transition h-12
                            text-emerald-500"
                            size={25}
                        />
                    </div>
                </button>
            </ActionTooltip>
            
            
        </div>
     );
}
 
export default NavigationAction;