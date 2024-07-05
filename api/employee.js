const { set } = require('date-fns');
const express = require('express');
const router = express.Router();    
const path = require('path')
data = {
    employees:require(path.join(__dirname,'..','data','employee.json')),
    setEmployees:(data)=>{this.employees = data}
}

router.route('/')
        .get((req,res)=>{
            res.json(data.employees);
        })
        .post((req,res)=>{
            const newEmployee ={
                employee_id:data.employees?.length?data.employees[data.employees.length-1].employee_id+1:1,
                first_name:req.body.first_name,
                last_name:req.body.last_name
            }
            if(!newEmployee.first_name || !newEmployee.last_name)
            {
                res.status(400).json({"message":"First,last name required"})
            }
            data.setEmployees([...data.employees,newEmployee]);
            res.status(200).json(data.employees);
        })
        
router.route('/:id')
         .put((req,res)=>{
         const updateEmployee = data.employees.find(emp=>emp.employee_id===parseInt(req.params.id))
             if(!updateEmployee)
             {
                 res.status(400).json({"message":`Employee id ${req.body.employee_id} not found`})
             }
             if(req.body.first_name)
                 updateEmployee.first_name=req.body.first_name
             if(req.body.last_name)
                 updateEmployee.last_name=req.body.last_name
         
             const filteredEmployees = data.employees.filter((emp)=>{emp.employee_id !== parseInt(req.params.id)})
             const newEmployees = [...filteredEmployees,updateEmployee]
             newEmployees.sort((a,b)=>a.employee_id - b.employee_id)
             data.setEmployees(newEmployees)
             res.status(200).json(newEmployees);
         })
         .delete((req,res)=>{
             const deletedEmployee = data.employees.find(emp=>emp.employee_id===parseInt(req.params.id))
             if(!deletedEmployee)
             {
                 res.status(400).json({"message":`Employee id ${req.body.employee_id} not found`})
             }
             const filteredEmployees = data.employees.filter((emp)=>{ return emp.employee_id !== parseInt(req.params.id)})
             data.setEmployees(...filteredEmployees);
             console.log(filteredEmployees);
             res.status(200).json(filteredEmployees);
         
         })
module.exports = router