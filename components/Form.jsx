"use client";

import Link from "next/link";
import { useState } from "react";
import { Password } from 'primereact/password';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
}) => {

  const [serviceSuggestions, setServiceSuggestions] = useState([]);

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

  return (
    <section className="w-full max-w-full flex flex-col lg:flex-row lg:justify-between">
      <div className="lg:mr-10">
        <h1 className="headerText lg:ml-10">
          <span className="yellowGradient">{type} Password</span>
        </h1>
        <p className="descText lg:ml-10 text-left max-w-md">
          CodeVault is dedicated to helping you fortify your online security effortlessly. 
          Let us handle the complexity of password creation, so you can focus on what truly matters—exploring 
          the digital world with peace of mind.
        </p>
      </div>

      <div className="lg:w-6/12">
        <form
          onSubmit={handleSubmit}
          className="mt-5 w-full lg:w-7/12 lg:h-full flex flex-col gap-7 glassmorphism"
        >
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-white text-xl">
              Your Password
            </span>
            <div>
              <Password
                className="mt-5 text-white"
                value={post.password}
                onChange={(e) => {
                  setPost({
                    ...post,
                    password: e.target.value
                  })
                }} 
                toggleMask
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          
          <div className="flex flex-col ml-2">
            <span className="font-semibold text-white text-xl">
                Which platform needs this password?
            </span>
            <span className="p-float-label mt-7">
              <AutoComplete id="serviceName"
              value={post.serviceName}
              suggestions={serviceSuggestions} 
              completeMethod={searchService}
              required
              onChange={(e) => {
                setPost({
                  ...post,
                  // Sentence case the e.target.value
                  serviceName: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                })
              }} />
              <label htmlFor="serviceName">Service Name</label>
            </span>
          </div>

          <div className="flex flex-col ml-2">
            <span className="font-semibold text-white text-xl">
                Pick a Category
            </span>
            <span className="p-float-label mt-7">
              <Dropdown id="serviceCategory"
              className="w-full"
              value={post.category}
              options={serviceCategories}
              required
              onChange={(e) => {
                setPost({
                  ...post,
                  // Sentence case the e.target.value
                  category: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                })
              }} />
              <label htmlFor="serviceCategory">Service Category</label>
            </span>
          </div>

          <div className="flex justify-end mx-3 mb-5 gap-4">

              <Link href="/" className="cancelButton">
                Cancel
              </Link>

              <button
                type="submit"
                className="submitButton"
                disabled={submitting}
              >
                {submitting ? `${type}...`: `${type}`}
              </button>

          </div>
        </form>
      </div>
    </section>
  )
}

export default Form