'use client';
import { useState } from 'react';

export default function NewsCard({id, name, description, subscribed}: 
  { id: number, name: string; description: string; subscribed: boolean } ) {
  const [subscription, setSubscribed] = useState(subscribed);
  
  const news = id.toString();
  /* NOTE: store link to image in db and 
     store image outside of application, e.g. S3 bucket */
  const imagePath = `/images/${news}.png`;

 const buttonLabel = subscription? 'SIGNED UP': 'SIGN UP';

 const updateSubscription = async () => {
  // NOTE: would add a loader or subscription flow here!
  const body = { newsletterId: id, subscribed: !subscription }
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/subscriptions`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  if (response.ok) {
    const data = await response.json();
    setSubscribed(data.subscribed);
  } else {
    // would add an error handling flow here
  }
 }

return (
    <div className="card">
      <div className={ "header " + "color" + news}> 
        <img
        src={imagePath}
        alt={name}
        />
      </div>
      <div>{name}</div>
      <div>{description}</div>
      <button onClick={()=> updateSubscription()}>{ buttonLabel }</button>
    </div>
  );
}