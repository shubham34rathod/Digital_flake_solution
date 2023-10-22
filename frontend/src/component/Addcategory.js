import { useEffect, useState } from 'react'
import '../css/addCategory.css'
import Sidebar from './Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Addcategory() {

    let navigate = useNavigate()
    let location = useLocation()
    let loginStatus = useSelector((state) => state.user.loginStatus)

    let [newCategory, setCategory] = useState({
        name: '',
        description: '',
        status: ''
    })

    if (!loginStatus) {
        navigate('/')
    }

    //getting old categeroy data

  useEffect(()=>{
    if (location.state != null) {
        // console.log('have id',location.state);
        fetch(`/get_category/${location.state}`)
            .then((data) => data.json())
            .then((res) => {
                // console.log('update',res);
                setCategory((data) => ({
                    ...data,
                    name: res.category,
                    description: res.description,
                    status: res.status,
                }))
                // newCategory.description = res.description
                // newCategory.status = res.status
            })
            .catch((error) => console.log(error))
    }
  },[])


    function handleCategory(e, prop) {
        setCategory((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }

    async function submit_cat() {
        console.log(newCategory);
        //update category url

        if (location.state != null) {
            await fetch(`/update_category/${location.state}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })
                .then((data) => data.json())
                .then((res) => {
                    console.log(res);
                    if (res == 'data updated3') {
                        setCategory({
                            name: '',
                            description: '',
                            status: ''
                        })
                    }
                })
                .catch((error) => console.log(error))
            console.log(newCategory);
        }
        else {
            //add new category url

            await fetch(`/add_category`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            })
                .then((data) => data.json())
                .then((res) => {
                    console.log(res);
                    if (res == 'category added') {
                        setCategory({
                            name: '',
                            description: '',
                            status: ''
                        })
                    }
                })
                .catch((error) => console.log(error))
        }


    }

    return <>
        <div className="add_category_container">
            <div className="add_category_box1">
                <Sidebar></Sidebar>
            </div>
            <div className="add_category_box2">
                <div className="add_category_sub1">
                    <h5><i className="bi bi-arrow-left"></i> &nbsp;Add Category</h5>
                    <div className="row g-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Category Name" aria-label="First name" value={newCategory.name} onChange={(e) => handleCategory(e, 'name')} />
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Description" aria-label="Last name" value={newCategory.description} onChange={(e) => handleCategory(e, 'description')} />
                        </div>
                        <div className="col">
                            <select class="form-select" aria-label="Default select example" value={newCategory.status} onChange={(e) => handleCategory(e, 'status')}>
                                <option selected>Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="add_category_btn">
                        <button className='add_cat_btn1' onClick={submit_cat}>{(location.state) ? 'Update' : 'Save'}</button>
                        <button className='add_cat_btn2' onClick={() => navigate('/navbar/category')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Addcategory