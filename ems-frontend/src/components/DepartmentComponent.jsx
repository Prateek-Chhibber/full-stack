import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { createDepartment, getDepartmentById, updateDepartment } from "./services/DepartmentService";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(() => {
    getDepartmentById(id).then((response) => {
        setDepartmentName(response.data.departmentName);
        setDepartmentDescription(response.data.departmentDescription);
    }).catch(error => {
        console.log(error);
    })
  }, [])

  function saveOrUpdateDepartment(e){
    e.preventDefault();

    const department = { departmentName, departmentDescription };

    console.log(department);

    if (id) {
      updateDepartment(id, department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      createDepartment(department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Department</h2>
    } else {
        return <h2 className='text-center'>Add Department</h2>
    }
  }

  function handleCancelUpdate(){
    navigator('/departments')
}

  return(
    <div className='container'><br /><br />
      <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                pageTitle()
              }

              <div className='card-body'>
                  <form>
                      <div className='form-group mb-2'>
                          <label className='form-label'>Department Name:</label>
                          <input
                            type='text'
                            name='departmentName'
                            placeholder='Enter Department Name'
                            className='form-control'
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}

                          >
                          </input>
                      </div>

                      <div className='form-group mb-2'>
                          <label className='form-label'>Department Description:</label>
                          <input
                            type='text'
                            name='departmentDescription'
                            placeholder='Enter Department Description'
                            value={departmentDescription}
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            className='form-control'
                          >
                          </input>
                      </div>
                      <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateDepartment(e)}>Submit</button>
                      <button type="button" className="btn btn-danger ml-1" onClick={handleCancelUpdate}>Cancel</button>
                  </form>

              </div>
          </div>

      </div>

    </div>
  );
};

export default DepartmentComponent;
