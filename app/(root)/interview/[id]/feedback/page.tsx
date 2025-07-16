import { Button } from '@/components/ui/button';
import { getCurrentUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'




const page = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();
  
  const interview = await getInterviewById(id);
  if (!interview) redirect('/');

  const feedback = await getFeedbackByInterviewId({
    interviewId: id,
    userId: user?.id!,
  })


  //const feedbackScript = `Hi ${user?.name}. Here is some brief feedback on how your interview went:Your total score was ${feedback?.totalScore}/100;The Final brief assessment that me and colleagues formed is that ${feedback?.finalAssessment}.`;


  return (
   <section className="section-feedback mb-4">
      <div className="flex flex-row justify-center">
        <h1 className="text-4xl font-semibold">
          Feedback on the Interview -{" "}
          <span className="capitalize">{interview.role}</span> Interview
        </h1>
      </div>

      <div className="flex flex-row justify-center ">
        <div className="flex flex-row gap-5">
          {/* Overall Impression */}
          <div className="flex flex-row gap-2 items-center">
            <Image src="/star.svg" width={22} height={22} alt="star" />
            <p className='text-black'>
              Overall Impression:{" "}
              <span className="text-[#2f60ff] font-bold">
                {feedback?.totalScore}
              </span>
              /100
            </p>
          </div>

          {/* Date */}
          <div className="flex flex-row gap-2 text-black">
            <Image src="/calendar.svg" width={22} height={22} alt="calendar" />
            <p className='text-black'>
              {feedback?.createdAt
                ? dayjs(feedback.createdAt).format("MMM D, YYYY h:mm A")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className='flex flew-rol items-center'>
        <Button className="btn-secondary flex-1">
          <Link
            href={`/interview/${id}/feedback/feedback-analyst`}
            className="flex w-full justify-center"
          >
            <p className="text-xl font-semibold text-[#78f658] text-center">
              Get Feedback from AI Analyst
            </p>
          </Link>
        </Button>
      </div>

      <hr />

      <p className='text-black'>{feedback?.finalAssessment}</p>

      {/* Interview Breakdown */}
      <div className="flex flex-col gap-4 opacity-0 animate-[slideInLeft_0.5s_ease-out_forwards] delay-200 duration-500">
        <h2>Breakdown of the Interview:</h2>
        {feedback?.categoryScores?.map((category, index) => (
          <div key={index}>
            <p className="font-bold text-black">
              {index + 1}. {category.name} ({category.score}/100)
            </p>
            <p className='text-[#333333]'>{category.comment}</p>
          </div>
        ))}
      </div>

      <div 
        className={'flex flex-col gap-3'}>
        <h3 className='text-black'>Strengths</h3>
        <ul>
          {feedback?.strengths?.map((strength, index) => (
            <li key={index}>{strength}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3 ">
        <h3 className='text-black'>Areas for Improvement</h3>
        <ul>
          {feedback?.areasForImprovement?.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
      </div>

      <div className="buttons">
        <Button className="btn-secondary flex-1">
          <Link href="/" className="flex w-full justify-center">
            <p className="text-sm font-semibold text-primary-200 text-center">
              Back to dashboard
            </p>
          </Link>
        </Button>

        <Button className="btn-secondary flex-1">
          <Link
            href={`/interview/${id}`}
            className="flex w-full justify-center"
          >
            <p className="text-sm font-semibold text-[#f65858] text-center">
              Retake Interview
            </p>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default page