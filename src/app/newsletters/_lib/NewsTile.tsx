'use client';
import { useState } from 'react';
import { FaCheck } from "react-icons/fa6";
import { PiSpinner } from "react-icons/pi";

export default function NewsTile({id, name, description, subscribed}: 
  { id: number, name: string; description: string; subscribed: boolean } ) {
  const [subscription, setSubscribed] = useState(subscribed);
  const [loading, setLoading] = useState(false);
  
  const newsletter = id.toString();
  /* NOTE: store link to image in db and 
     store image outside of application, e.g. S3 bucket */
  const imagePath = `/images/${newsletter}.png`;

  const renderButton = () => {
    if (!subscription) {
      return (
        <button className='button border-2 border-black' onClick={()=> updateSubscription()}> SIGN UP </button>
      )
    } else {
     return (
        <button className='button text-white color3000' onClick={()=> updateSubscription()}> 
          <div className='flex items-center justify-between'> 
            <FaCheck /> <div className='pl-2'> SIGNED UP </div> 
            </div>
        </button>
      )
    }
  }

 const updateSubscription = async () => {
  setLoading(true)
  const body = { newsletterId: id, subscribed: !subscription }
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/subscriptions`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  setLoading(false)
  if (response.ok) {
    const data = await response.json();
    setSubscribed(data.subscribed);
  } else {
    // NOTE: would add an error handling flow here
  }
 }

return (
    <div className='tile flex flex-col'>
      <div className={'header flex items-center justify-center color' + newsletter}> 
            <img
            src={imagePath}
            alt={name}
            />
      </div>
      <div className='tile-body flex flex-col items-center justify-between'> 
        <div className='flex flex-col items-center justify-center pt-2'>
          <div className='bold-text'>{name}</div>
          <div className='w-2/3 description'>{description}</div>
        </div>
        { loading ? 
            (<div className='flex items-center justify-between pb-2'> <PiSpinner /> Loading.. </div>) :
            (<div className='pb-2'> {renderButton()} </div>)
        }
      </div>
    </div>
  );
}