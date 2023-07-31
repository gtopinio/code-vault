"use client";
import { Password } from 'primereact/password';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useState } from "react";
import { generateRandomPassword } from "@utils/generate-pw";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef } from 'react';

const Generator = () => {

    const router = useRouter();
    const { data: session } = useSession();
    const copyToast = useRef(null);

    const [password, setPassword] = useState({
        value: generateRandomPassword(),
        serviceName: '',
        category: '',
    });

    const [serviceSuggestions, setServiceSuggestions] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const serviceCategories = [
      'Social Media', 'Email', 'Entertainment', 'Shopping', 'Finance', 'Messaging', 'Productivity', 'Other'
    ];
  
    const services = [
      'Google', 'Facebook', 'Youtube', 'Twitter', 'Instagram', 
      'LinkedIn', 'GitHub', 'Amazon', 'Apple', 'Microsoft', 'Shopee', 'Lazada', 'Grab', 'FoodPanda', 
      'Yahoo', 'Netflix', 'Spotify', 'Twitch', 'PayPal', 'GCash', 'Maya', 'LandBank', 'BPO', 'BPI' ,
      'TikTok', 'Snapchat', 'Pinterest', 'Reddit', 'Tumblr', 'WhatsApp', 
      'Telegram', 'Discord', 'Zoom', 'Slack', 'Microsoft Teams', 'Skype', 'Adobe'
    ];
  
    const searchService = (event) => {
      setTimeout(() => {
          let filteredServices;
          if (!event.query.trim().length) {
              filteredServices = [...services];
          }
          else {
              filteredServices = services.filter((service) => {
                  return service.toLowerCase().startsWith(event.query.toLowerCase());
              });
          }
          setServiceSuggestions(filteredServices);
        })};

    const handleRandomizeButton = () => {
        // Generate random string using generateRandomPassword()
        setPassword({
            ...password,
            value: generateRandomPassword(),
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        if(!session?.user.id || !session?.user._keyArray || !session?.user._ivArray){
            console.log('User not logged in');
            setSubmitting(false);
            return;
        }

        try {
            const response = await fetch('/api/password/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    password: password.value,
                    serviceName: password.serviceName,
                    category: password.category,
                    key: session?.user._keyArray,
                    iv: session?.user._ivArray,
                }),
            });

            if(response){
                router.push('/profile');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }

    }

    const handleCopyClick = () => {
        navigator.clipboard.writeText(password.value);

        copyToast.current.show({severity:'success', summary: 'Copied!', detail: 'Password copied to clipboard', life: 1500});
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <form className='mt-16 glassmorphism' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold yellowGradient'>
                    <span>Generate Random Password</span>
                </h1>
                
                <div className='mt-4 flex flex-row justify-between'>
                    <Password
                    className='ml-2'
                    onChange={(e) => setPassword({
                        ...password,
                        value: e.target.value,
                    })}
                    value={password.value}
                    toggleMask
                    required
                    />

                    <div className='randomizeBtn mr-7' onClick={handleRandomizeButton}>
                        <i className='pi pi-bolt' style={{ fontSize: '2.75rem' }}></i>
                    </div>
                </div>

                {
                    session?.user.id ? (
                        <div>
                            <div className="flex flex-col ml-2">
                                <span className="font-semibold text-white text-xl mt-6">
                                    Which platform needs this password?
                                </span>
                                <span className="p-float-label mt-5">
                                <AutoComplete id="serviceName"
                                suggestions={serviceSuggestions}
                                value={password.serviceName}
                                completeMethod={searchService}
                                required
                                onChange={(e) => {
                                    setPassword({
                                        ...password,
                                        serviceName: e.target.value,
                                    })
                                }} />
                                <label htmlFor="serviceName">Service Name</label>
                                </span>
                            </div>

                            <div className="flex flex-col ml-2">
                                <span className="font-semibold text-white text-xl mt-6">
                                    Pick a Category
                                </span>
                                <span className="p-float-label mt-2">
                                <Dropdown
                                    value={password.category}
                                    className="w-full"
                                    options={serviceCategories}
                                    required
                                    onChange={(e) => {
                                        setPassword({
                                            ...password,
                                            category: e.target.value,
                                            });
                                }} />
                                </span>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )
                }
                

                {
                    session?.user.id ? (
                        <div className="flex justify-end mx-3 mb-1.5 gap-4 mt-7">
                            <button type="button" className='cancelBtn' onClick={
                                () => {
                                    setPassword({
                                        value: '',
                                        serviceName: '',
                                        category: '',
                                    })
                                }
                            }>
                                Clear
                            </button>

                            <button
                                type="submit"
                                className="submitButton"
                                disabled={submitting}
                            >
                                Save Password
                            </button>
                        </div>
                    ):(
                        <div className="flex justify-center mx-3 mb-1.5 gap-4 mt-7">
                            <button  type="button" className='submitButton' onClick={handleCopyClick}>
                                Copy Password
                            </button>
                        </div>
                    )
                }

            </form>
            <Toast ref={copyToast} /> 
        </section>
    )
}

export default Generator