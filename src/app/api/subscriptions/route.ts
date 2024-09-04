import { NextRequest, NextResponse } from "next/server";
import { getAllSubscriptions, updateSubscription  } from "./query";

export async function GET(request: NextRequest) {
  try {
      const subscriptions = await getAllSubscriptions()
      return NextResponse.json(subscriptions, { status: 201 });
  } catch (error) {
      return Response.json(
        { error: "Error fetching subscriptions" },
        { status: 500 }
      );
  }
}

export async function PUT(request: NextRequest) {
   const formData = await request.json();
   const newsletterId = formData.newsletterId as number;
   const subscribed = formData.subscribed as boolean;

   try {
      const updatedSubscription = await updateSubscription(newsletterId, subscribed)
      return NextResponse.json(updatedSubscription, { status: 201 });
  } catch (error) {
      return Response.json(
        { error: "Failed to update subscription" },
        { status: 500 }
      );
  }
}
