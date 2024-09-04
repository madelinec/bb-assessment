import { NextRequest, NextResponse } from "next/server";
import prisma from '../../../db/lib/prisma'

/* NOTE: HARD CODING USER IDS FOR DEMO */
export async function GET(request: NextRequest) {
  const subscriptions = await prisma.subscription.findMany({
      include: { newsletter: true },
      where: { userId: 12345} //HARD CODED FOR DEMO
    })
  return NextResponse.json(subscriptions, { status: 201 });
}

export async function PUT(request: NextRequest) {
   const formData = await request.json();
   const newsletterId = formData.newsletterId as number;
   const subscribed = formData.subscribed as boolean;

    const updatedSubscription = await prisma.subscription.update({
      where: {
        userId_newsletterId: {
          userId: 12345, //HARD CODED FOR DEMO
          newsletterId: newsletterId 
        },
      },
      data: {
        subscribed: subscribed,
      },
    })
    return NextResponse.json(updatedSubscription, { status: 201 });
}
