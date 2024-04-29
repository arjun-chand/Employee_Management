import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FlagIcon from '@mui/icons-material/Flag';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FitbitIcon from '@mui/icons-material/Fitbit';

export default function EmployeeDetails() {
    const params = useParams();
    const [employee, setEmployee] = React.useState(null);
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [updatedEmployee, setUpdatedEmployee] = React.useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        state: '',
        country: '',
        gender: '',
        education: '',
        hobbies: ''
    });

    React.useEffect(() => {
        getEmployeeDetails();
    }, []); // Empty dependency array to execute the effect only once when component mounts

    const getEmployeeDetails = async () => {
        console.log(params.id);
        try {
            const response = await axios.get(`http://localhost:5000/EMS/employee/employeeDetail/${params.id}`);
            setEmployee(response.data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    }

    if (!employee) {
        return <div>Loading...</div>; // Show loading indicator until employee details are fetched
    }


    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        const confirmed = confirm("Are You Sure You want to Delete the Product");

        // Proceed with deletion only if the user confirms
        if (confirmed) {
            try {

                let response = await axios.delete(`http://localhost:5000/EMS/employee/delete/${id}`);
                alert("employee Deleted Successfully");
                navigate('/');
            } catch (error) {

                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product");
            }
        }
    }

    const handleUpdate = async () => {
        setIsPopupOpen(false);
        try {
            const response = await axios.put(`http://localhost:5000/EMS/employee/update/${employee._id}`, updatedEmployee);
            console.log(response.data);

            alert("Employee Updated Successfully")
            navigate('/')
        } catch (error) {
            console.error("Error updating employee:", error);
            // Handle error
        }
    }

    const handleEdit = () => {
        setIsPopupOpen(true);
        setUpdatedEmployee({ ...employee });
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    return (
        <div className='flex justify-center'>
            <Card className='employeeDetailCard mt-5 shadow-2xl' sx={{ display: 'flex', boxShadow: '0px 5px 20px rgba(0, 10, 5, 0.3)', width:'40%', borderRadius:'25px', marginTop:'4rem'}}>
                <Box className="mx-4" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <div className='flex'>
                            <BadgeIcon className='mx-2' />
                            <Typography className='text-4xl font-black text-violet-500 dark:text-white' component="div" variant="h5">
                                {employee.name}
                            </Typography>
                        </div>
                        <div className='flex mt-2'>
                            <EmailIcon className='mx-2' />
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {employee.email}
                            </Typography>
                        </div>

                        {/* Display other employee details similarly */}
                        <div className='flex mt-1'>
                            <PhoneIcon className='mx-2 flex gap-3'/>
                            <h2 className='mr-2'>Phone :</h2> <p>{employee.phone}</p>
                        </div>
                        <div className='flex mt-1'>
                            <LocationCityIcon className='mx-2'/>
                            <h2 className='mr-2'>City :</h2>{employee.city}
                        </div>
                        <div className='flex mt-1'>
                            <LocationOnIcon className='mx-2'/>
                            <h2 className='mr-2'>State :</h2>{employee.state}
                        </div>
                        <div className='flex mt-1'>
                            <FlagIcon className='mx-2'/>
                            <h2 className='mr-2'>Country :</h2>{employee.country}
                        </div>
                        <div className='flex mt-1'>
                            <AcUnitIcon className='mx-2'/>
                            <h2 className='mr-2'>Gender :</h2>{employee.gender}
                        </div>
                        <div className='flex mt-1'>
                            <MenuBookIcon className='mx-2'/>
                            <h2 className='mr-2'>Education :</h2>{employee.education}
                        </div>
                        <div className='flex mt-1'>
                            <FitbitIcon className='mx-2'/>
                            <h2 className='mr-2'>Hobbies :</h2>{employee.hobbies}
                        </div>
                    </CardContent>
                    <Box className="my-4" sx={{ display: 'flex' }}>
                    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl " onClick={() => handleDelete(employee._id)}>Delete
                        <DeleteIcon className='mx-2'/>
                        </button>
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer hover:scale-105 hover:duration-200 hover:transition-transform hover:ease-in-out shadow-2xl " onClick={handleEdit}>Update

                        <EditIcon className='mx-2'/>
                        </button>
                    </Box>
                </Box>
                <CardMedia
                    className='py-6 flex justify-center'
                    component="img"
                    sx={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}

                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDY5FlTbWIatHXzVDLQbK8bZaQLQcFjXlCuc6ok0LnZg&s"
                    alt="Employee avatar"
                />
            </Card>
            {isPopupOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Update Employee Details</h3>
                                        <div className="mb-2">
                                            <input type="text" name="name" value={updatedEmployee.name} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Name" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="email" name="email" value={updatedEmployee.email} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Email" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="tel" name="phone" value={updatedEmployee.phone} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Phone" />
                                        </div>
                                        <div className="mb-2">
                                            <select type="text" name="city" value={updatedEmployee.city} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="City" >
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
                                                <option value="Cambridge">Ahemdabad</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <select type="text" name="state" value={updatedEmployee.state} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="State">
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
                                        </div>
                                        <div className="mb-2">
                                            <select type="text" name="country" value={updatedEmployee.country} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Country">
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
                                        <div className="mb-2">
                                            <select name="gender" value={updatedEmployee.gender} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                                                <option value="">Select Gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="education" value={updatedEmployee.education} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Education" />
                                        </div>
                                        <div className="mb-2">
                                            <input type="text" name="hobbies" value={updatedEmployee.hobbies} onChange={handleInputChange} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Hobbies" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button onClick={handleUpdate} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Update
                                </button>
                                <button onClick={() => setIsPopupOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
