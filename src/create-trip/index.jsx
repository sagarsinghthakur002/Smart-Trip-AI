import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { AI_PROMPT, selectBudgetOptions, selectTravelsList } from '../constants/options.jsx';
import { toast, Toaster } from "sonner";
import { chatSession } from '../service/AiModel.jsx'
import { DialogDescription, DialogHeader } from "../../components/custom/Dialog.jsx";


const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  // to update form data
  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && (value < 1 || value > 7)) { // min ani max value define gare day select garda 
      toast("Please enter a trip duration between 1 and 7 days."); //pop-up info
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Gamini AI prompt
  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true)
      return;
    }






    if (!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays == null) {
      toast("Please fill in all details correctly."); // pop-up for checking if all fields are filled
      return;
    }

    const FINAL_PROMPT = AI_PROMPT // provied gare ko prompt ko value each selection ma change garna lai
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT); // sending final prompt to AI to get result
    console.log(result?.response?.text());

    toast("Event has been created.");
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 px-10 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your preferences 🏖️🏝️</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>

        {/* Google Place API for place selection */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v.label);
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
            min="1"
            max="7"
            onChange={(e) => handleInputChange('noOfDays', Number(e.target.value))}
            value={formData?.noOfDays || ""}
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
            onClick={OnGenerateTrip}
            disabled={!formData?.location || !formData?.budget || !formData?.traveler || !formData?.noOfDays}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          >
            Generate Trip
          </button>
        </div>

        <Dialog open={openDialog} >  
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <img src='/assest/images/planner.png'></img>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>



      </div>
    </div>
  );
};

export default CreateTrip;
