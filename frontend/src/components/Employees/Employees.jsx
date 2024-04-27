import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from 'axios';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function Employees() {

  const [employees, setEmployees] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/EMS/employee/allEmployees");
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  }

  const handleSearch = async (e) => {
    const key = e.target.value;

    if (key) {
      const response = await axios.get(`http://localhost:5000/EMS/employee/search/${key}`)
      if (response.data) {
        setEmployees(response.data);
      }
    } else {
      getEmployees();
    }



  }


  return (
    <div>
      <h1>List Of Employees</h1>
      <div className="flex m-2">
        <div className='flex bg-white rounded-3xl w-80 mx-2 justify-center'>
          <input
            onChange={handleSearch}
            type="text"
            name="q"
            className="w-full  h-12 p-4 rounded-full focus:outline-none"
            placeholder="Search"

          />
          <button className='p-2 text-gray-400'>
            <SearchSharpIcon />
          </button>
        </div>
        <div>
          <button type="button" onClick={()=>{navigate('/addEmployee')}} class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"><AddIcon />Add Employee</button>

        </div>
      </div>
      <div className="flex p-2">
        {employees.length > 0 ? (
          employees.map((employee, index) => (
            <Card key={index} sx={{ maxWidth: 345 }}
              className="m-3 hover:cursor-pointer	"
              onClick={() => {
                navigate(`/employeeDetails/${employee._id}`);
              }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {employee.name.charAt(0).toUpperCase()}
                  </Avatar>
                }
                title={employee.name}
                subheader={employee.joiningDate}
              />
              <CardMedia
                component="img"
                height="194"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDY5FlTbWIatHXzVDLQbK8bZaQLQcFjXlCuc6ok0LnZg&s"
                alt="Employee Avatar"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">

                  <h2>Email: {employee.email}</h2>
                  <h2>City: {employee.city}</h2>
                  <h2>Country: {employee.country}</h2>
                  <h2>Gender: {employee.gender}</h2>
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Employee Doesn't Exist</p>
        )}
      </div>
    </div>
  );
}
