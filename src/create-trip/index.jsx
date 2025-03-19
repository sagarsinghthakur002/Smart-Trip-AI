import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { selectBudgetOptions, selectTravelsList } from '../constants/options.jsx';

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 7) {
      console.log('Please enter Trip Days less than 7');
      return;
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-10 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your preferences 🏖️🏝️</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
        {/* Destination Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('destination', v.label);
              },
              styles: {
                input: (provided) => ({ ...provided, color: 'black' }),
                singleValue: (provided) => ({ ...provided, color: 'black' }),
                option: (provided) => ({ ...provided, color: 'black' })
              }
            }}
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for your trip?</h2>
          <input
            type='number'
            placeholder={'Ex. 3'}
            className="border p-2 rounded-md w-full"
            onChange={(e) => handleInputChange('noOfDays',e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('budget', item.title)}
                className={`border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg
                ${formData?.budget === item.title ? 'shadow-lg border-blue-700' : ''}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companion Selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectTravelsList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange('traveler', item.people)}
                className={`border p-4 rounded-md shadow-md cursor-pointer hover:shadow-lg
                ${formData?.traveler === item.people ? 'shadow-lg border-blue-700' : ''}`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}
        <div className='flex justify-end mt-10'>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition"
            
          >
            Generate Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
