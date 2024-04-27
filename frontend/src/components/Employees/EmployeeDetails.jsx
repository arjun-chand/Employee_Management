import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function EmployeeDetails() {
    const params = useParams();
    const [employee, setEmployee] = React.useState(null);

    React.useEffect(() => {
        getEmployeeDetails();
    }, []); // Empty dependency array to execute the effect only once when component mounts

    const getEmployeeDetails = async() => {
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

    return (
        <div>
            <Card className='w-90 p-0 m-4' sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            {employee.name}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {employee.email}
                        </Typography>
                        {/* Display other employee details similarly */}
                        <h2>Phone:{employee.phone}</h2>
                        <h2>City:{employee.city}</h2>
                        <h2>State:{employee.state}</h2>
                        <h2>Country:{employee.country}</h2>
                        <h2>Gender:{employee.gender}</h2>
                        <h2>Education:{employee.education}</h2>
                        <h2>Hobbies:{employee.hobbies}</h2>
                    </CardContent>
                    <Box sx={{ display: 'flex'}}>
                        <DeleteIcon/>
                        <EditIcon/>
                    </Box>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDY5FlTbWIatHXzVDLQbK8bZaQLQcFjXlCuc6ok0LnZg&s"
                    alt="Employee avatar"
                />
            </Card>
        </div>
    );
}
