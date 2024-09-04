import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../db/lib/prisma'

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
   const { userId, newsletterId } = req.body;
    const subscription = await prisma.subscription.findUnique({
      where: {
        userId: userId,
        newsletterId: newsletterId 
      },
    })
    
    if (subscription) {
      const { subscribed } = subscription
      const updateScription = await prisma.subscription.update({
        where: {
          userId: userId,
          newsletterId: newsletterId 
        },
        data: {
          subscribed: !subscribed,
        },
      })
      res.status(201).json(updateScription);
    }
}
