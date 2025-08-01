"use client";

import { cn } from '@/lib/utils';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { vapi } from '@/lib/vapi.sdk';
import { interviewer } from '@/constants';
import { toast } from 'sonner';



enum CallStatus {
   INACTIVE = 'INACTIVE',
   CONNECTING = 'CONNECTING',
   ACTIVE = 'ACTIVE',
   FINISHED = 'FINISHED',
}

interface SavedMessage{
    role: 'user' | 'system' | 'assistant';
    content: string;
}

const Agent = ({ userName, userId, type, interviewId, questions }: AgentProps) => {
    const router = useRouter();
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);


    useEffect(() => {
      const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
      const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

      const onMessage = (message: Message) => {
        if(message.type === 'transcript' && message.transcriptType === 'final'){
            const newMessage = {role: message.role, content: message.transcript}

            setMessages((prev) => [...prev,newMessage]);
        }
      }
    
      const onSpeechStart = () => setIsSpeaking(true);
      const onSpeechEnd = () => setIsSpeaking(false);

      const onError = (error: Error) => console.log('Error', error);

      vapi.on('call-start', onCallStart);
      vapi.on('call-end', onCallEnd);
      vapi.on('message', onMessage);
      vapi.on('speech-start', onSpeechStart);
      vapi.on('speech-end', onSpeechEnd);
      vapi.on('error', onError);

      return () => {
        vapi.off('call-start', onCallStart);
        vapi.off('call-end', onCallEnd);
        vapi.off('message', onMessage);
        vapi.off('speech-start', onSpeechStart);
        vapi.off('speech-end', onSpeechEnd);
        vapi.off('error', onError);
      }

    }, [])
    
    const handleGenerateFeedback = async (messages: SavedMessage[]) => {
      console.log('Generate feedback here.');

      // TODO: Create a server action that generates feedback.
      const { success, id } = {
        success: true,
        id: 'feedback-id'
      }

      if(success && id){
        router.push(`/interview/${interviewId}/feedback`)
      } else {
        console.log('Error saving feedback');
        router.push('/');
      }
    }

    useEffect(() => {
        if(callStatus === CallStatus.FINISHED) {
          if(type === 'generate'){
            router.push('/')
          } else {
            handleGenerateFeedback(messages);
          }
        }
    }, [messages, callStatus, type, userId]);

    const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    } else {
      let formattedQuestions = "";
      if (questions) {
        formattedQuestions = questions
          .map((question) => `- ${question}`)
          .join("\n");
      }

      await vapi.start(interviewer, {
        variableValues: {
          questions: formattedQuestions,
        },
      });
    }
  }; 

    const handleDisconnect = async () => {
        setCallStatus(CallStatus.FINISHED);
        toast.success('Redirecting you to the dashboard.');
        vapi.stop();
    } 

    const latestMessage = messages[messages.length - 1]?.content;
    const isCallInactiveOtFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

    
    return (
        <>
            <div className='call-view'>
                <div className='card-border-interviewer'>
                  <div className='card-interviewer gap-0!'>
                      <div className='avatar bg-transparent!'>
                          <Image src="/man-avatar.png" alt="Vapi" width={118} height={114} className='object-cover ' />
                          {isSpeaking && <span className='animate-speak'/>}
                      </div>
                      <h3 className='text-black!'>Interview Generater</h3>
                  </div>
                </div>

                <div className='card-border'>
                    <div className='card-content gap-0!'>
                        <Image src="/user-avatar.png" alt="user avatar" width={540} height={540} className='rounded-full object-cover size-[110px] p-5 bg-[#333333]!' />
                        <h3 className='text-black!'>{userName}</h3>
                    </div>
                </div>

            </div>

            {messages.length > 0 && (
                <div className='transcript-border'>
                    <div className='transcript'>
                        <p key={latestMessage} className={cn('transition-opacity duration-500 opacity-0', 'animate-fadeIn opacity-100')}>
                            {latestMessage}
                        </p>
                    </div>
                </div>
            )}

            <div className='w-full flex justify-center py-2'>
                {callStatus != 'ACTIVE' ? (
                    <button className='relative btn-call' onClick={handleCall}>
                        <span className={cn('absolute animate-ping rounded-full opacity-75', callStatus != 'CONNECTING' &&'hidden')}/>
                        <span>
                            {isCallInactiveOtFinished ? 'Call to Generate Interview' : '. . .'}
                        </span>
                    </button>
                ) : (
                    <button className='btn-disconnect' onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
            </>
    )
}

export default Agent