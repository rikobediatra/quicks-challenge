"use client"
import QuicksButton from '@/components/UI/quicksButton/QuicksButton'
import React, { useEffect, useState } from 'react'
import Task from '../task/Task';
import Inbox from '../inbox/Inbox';


const Quicks = () => {
    const [activeQuicks, setActiveQuicks] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        console.log("active quicks", activeQuicks);
    }, [activeQuicks])

    const renderedQuick = () => {
        if (activeQuicks === "task") {
            return <Task />;
        }

        if (activeQuicks === "inbox") {
            return <Inbox />
        }
    }

    return (
    <>  
        {/* quicks */}
        {
            activeQuicks && 
            <>
                <div className="bg-white w-[734px] h-[737px] mb-4 fixed flex flex-col bottom-24 end-6 rounded border border-primary-grey">
                    {renderedQuick()}
                </div>
            </>
        }
        {/* Quicks Button */}
        <div className="font-lato">
            <QuicksButton activeQuicks={activeQuicks} setActiveQuicks={setActiveQuicks}/>
        </div>
    </>
  )
}

export default Quicks