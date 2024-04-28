import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function AddEmployee() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');
  const [education, setEducation] = useState('');
  const [hobbies, setHobbies] = useState('');
  const navigate = useNavigate();

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/EMS/employee/add', {
        name,
        email,
        phone,
        city,
        state,
        country,
        gender,
        education,
        hobbies
      },
        {
          headers: {
            "Content-Type": "application/json"
          }
        });
      console.log(response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
    navigate('/')
  };

  return (
    <>
      <div className='px-4'>
        <Box className="px-4" sx={{ width: '100%' }}>
          <Stepper className='mx-6 my-6' nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === 0 ? (
              <div>
                <h1 className='text-lg leading-6 font-medium text-gray-900 text-center my-6'>Employee Details</h1>
                <div className='flex flex-col md:flex-row mt-3 justify-center'>
                <input
                  
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name="name"
                  id="name"
                  className=" mx-2  rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Name"
                />
                <select
                  onChange={(e) => setGender(e.target.value)}
                  value={gender}
                  id="gender"
                  name="gender"
                  className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Select Gender"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                </div>
                <div className='flex flex-col md:flex-row mt-3 justify-center'>
                <select
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  type="text"
                  name="city"
                  id="city"
                  className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Select Employee City"
                >
                  <option value="">Select City</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Ahemdabad">Ahemdabad</option>
                  <option value="Dehradun">Dehradun</option>
                  <option value="Lucknow">Lucknow</option>
                  <option value="New York">New York</option>
                  <option value="Sheinghai">Sheinghai</option>
                  <option value="London">London</option>
                </select>
                <select
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                  type="text"
                  name="state"
                  id="state"
                  className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="State"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Texas">texas</option>
                  <option value="florida">florida</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Gujrat">Gujrat</option>

                </select>
                <select
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
                  type="text"
                  name="country"
                  id="country"
                  className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Country"
                >
                  <option value="">Select Country</option>
                  <option value="India">India</option>
                  <option value="Russia">Russia</option>
                  <option value="Unites States">United States</option>
                  <option value="China">China</option>
                  <option value="Japan">Japan</option>
                  <option value="South Koria">South koria</option>
                  <option value="Israel">Israel</option>
                  <option value="UAE">UAE</option>
                </select>
                </div>
                <div className='flex justify-center mt-3'>
                <input
                  onChange={(e) => setEducation(e.target.value)}
                  value={education}
                  type="text"
                  name="education"
                  id="education"
                  className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Education"
                />
                <input
                  onChange={(e) => setHobbies(e.target.value)}
                  value={hobbies}
                  type="text"
                  name="hobbies"
                  id="hobbies"
                  className=" mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                  placeholder="Enter the Hobbies"
                />
                </div>
              </div>
            ) : (
              <div>
                <h1 className='text-lg leading-6 font-medium text-gray-900 text-center my-6'>Employee Contact Details</h1>
                {activeStep === 1 && (
                  <div className='flex justify-center'>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      name="email"
                      id="email"
                      className="mx-2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                      placeholder="Email"
                    />
                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="tel"
                      name="phone"
                      id="phone"
                      className="mx-2rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-violet-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-500 sm:text-sm sm:leading-6"
                      placeholder="Phone Number"
                    />
                  </div>
                )}
              </div>
            )}
            <div>
              {activeStep === steps.length - 1 && (
                <div className='px-6'>
                  <h1 className='text-lg leading-6 font-medium text-gray-900 text-center my-6'>Employee Details</h1>
                  <p className='mt-1 text-center'>Name: {name}</p>
                  <p className='mt-1 text-center'>Email: {email}</p>
                  <p className='mt-1 text-center'>Mobile: {phone}</p>
                  <p className='mt-1 text-center'>City: {city}</p>
                  <p className='mt-1 text-center'>State: {state}</p>
                  <p className='mt-1 text-center'>Country: {country}</p>
                  <p className='mt-1 text-center'>Gender: {gender}</p>
                  <p className='mt-1 text-center'>Education: {education}</p>
                  <p className='mt-1 text-center'>Hobbies: {hobbies}</p>
                  <Button onClick={handleSubmit}>Submit</Button>
                </div>
              )}
            </div>
            <div sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep !== 0 && (
                <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
              )}
              {activeStep !== steps.length - 1 && (
                <>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} sx={{ mr: 1 }}>
                    Next
                  </Button>
                </>
              )}
            </div>
          </div>
        </Box>
      </div>
    </>
  );
}
