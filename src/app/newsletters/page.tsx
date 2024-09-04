import NewsCard from "./_lib/NewsCard";

export default async function Home() {
  type Subscription = {
    subscribed: boolean;
    newsletter: {
      id: number;
      name: string;
      description: string;
    }
  };

  const subscriptions = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/subscriptions`,
    {
      cache: "no-store",
    }
  );
  const data = await subscriptions.json();

  return (
    <main className="flex flex-col p-10">
    <div className="flex flex-row justify-between">
      <div className="flex flex-col pt-5">
        <h1 className="text-3xl font-bold">Email Newsletters</h1>
      </div>
    </div>
        <div className="flex pt-10">
          <ul className="flex flex-wrap gap-4">
            {data.map((subscription: Subscription) => (
              <li key={subscription.newsletter.id}>
                <NewsCard
                  id={subscription.newsletter.id}
                  name={subscription.newsletter.name}
                  description={subscription.newsletter.description}
                  subscribed={subscription.subscribed}
                />
              </li>
            ))}
          </ul>
        </div>
  </main>
  );
}
