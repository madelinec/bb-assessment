import prisma from '../../../db/lib/prisma'

/* NOTE: HARD CODING USER IDS FOR DEMO */
export function getAllSubscriptions(): Promise<any> {
    return prisma.subscription.findMany({
        include: { newsletter: true },
        where: { userId: 12345} //HARD CODED FOR DEMO
    })
}

export function updateSubscription(newsletterId: number, subscribed: boolean): Promise<any> {
   return prisma.subscription.update({
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
}