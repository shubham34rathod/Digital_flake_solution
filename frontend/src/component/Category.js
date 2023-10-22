import { useNavigate } from 'react-router-dom'
import '../css/category.css'
import Sidebar from './Sidebar'
import { useEffect, useState } from 'react'
import { setCategory } from '../redux/userSlice'
import { useDispatch,useSelector } from 'react-redux'

function Category() {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    let loginStatus=useSelector((state)=>state.user.loginStatus)

    if(!loginStatus)
    {
        navigate('/')
    }
    
    let [fliterTxt,setFlitertxt]=useState('')
    let [deleteID,setDeleteid]=useState('')
    let [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {
            await fetch(`/get_category`)
                .then((data) => data.json())
                .then((res) => {
                    // console.log(res);
                    setCategories(res)
                    dispatch(setCategory(res))
                })
                .catch((error) => console.log(error))
        }
        getCategories()
    }, [categories])


    // delete category 

    async function deleteProduct() {
        console.log(deleteID);
        await fetch(`/delete_category/${deleteID}`)
            .then((data) => data.json())
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
    }

    return <>
        <div className="category_container">
            <div className="category_box1">
                <Sidebar></Sidebar>
            </div>
            <div className="category_box2">
                <div className="category_box3">
                    <div className="category_sub_1">
                        <div className='category_sub_2'>
                            <i class="bi bi-diagram-3"></i>
                            <span>Category</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={fliterTxt} onChange={(e)=>{setFlitertxt(e.target.value)}}/>
                            <label for="floatingInput"><i class="bi bi-search"></i></label>
                        </div>
                        <button onClick={() => navigate('/navbar/add_category')}>Add Now</button>
                    </div>
                    <div className="category_box4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.filter((data)=>data.category.toLowerCase().includes(fliterTxt)||data.description.toLowerCase().includes(fliterTxt)).map((data, index) => <>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{data.category}</td>
                                        <td>{data.description}</td>
                                        <td className='status_box'>
                                            {data.status}
                                            <div className="update_img">
                                                <i class="bi bi-pencil-square" onClick={()=>navigate('/navbar/add_category',{state:data._id})}></i>
                                                {/* <i class="bi bi-trash"></i> */}

                                                <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                    <i class="bi bi-trash" onClick={()=>setDeleteid(data._id)}></i>
                                                </button>

                                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                                                    <i class="bi bi-exclamation-triangle-fill" style={{ color: 'red' }}></i>
                                                                    Delete
                                                                </h1>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body" >
                                                                Are you sure you want to delete ?
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                                <button type="button" class="btn btn-primary" onClick={() => deleteProduct()}>Confirm</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Category