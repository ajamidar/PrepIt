import Agent from '@/app/components/AgentFeedback'
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async ({ params }:RouteParams) => {
    const { id } = await params;
    const interview = await getInterviewById(id);
    const user = await getCurrentUser();

    const feedback = await getFeedbackByInterviewId({
                interviewId: id!,
                userId: user?.id!,
            })

    if(!interview) redirect('/')

    let feedbackScript="";
        
        if (feedback) {
            feedbackScript = `Here is some brief feedback on how your interview went: Your total score was ${feedback?.totalScore}out of 100;The Final brief assessment that me and colleagues formed is that ${feedback?.finalAssessment}. A few strengths that you've shown were ${feedback.strengths}, however you can improve on ${feedback.areasForImprovement}.`;
        }

    return (
        <>
        <Agent userName={user?.name || ''} userId={user?.id} interviewId={id} type="analyst" feedback={feedbackScript} />
        </>
    )
}

export default page