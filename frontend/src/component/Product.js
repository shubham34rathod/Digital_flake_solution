import '../css/product.css'
import Sidebar from './Sidebar'
import tmpImg from '../images/DIGITAL_flake.jpg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function Product() {

    let navigate = useNavigate()
    let loginStatus=useSelector((state)=>state.user.loginStatus)

    if(!loginStatus)
    {
        navigate('/')
    }

    let [fliterTxt,setFlitertxt]=useState('')
    let [deleteID,setDeleteid]=useState('')
    let [allProducts, setAllproducts] = useState([])

    useEffect(() => {
        async function getProducts() {
            await fetch(`/get_products`)
                .then((data) => data.json())
                .then((res) => {
                    // console.log(res);
                    setAllproducts(res)
                })
                .catch((error) => console.log(error))
        }
        getProducts()
    }, [allProducts])

    // delete product 

    async function deleteProduct()
    {
        console.log(deleteID);
        await fetch(`/delete_product/${deleteID}`)
        .then((data)=>data.json())
        .then((res)=>console.log(res))
        .catch((error)=>console.log(error))
    }


    return <>
        <div className="product_container">
            <div className="product_box1">
                <Sidebar></Sidebar>
            </div>
            <div className="product_box2">
                <div className="product_box3">
                    <div className="product_sub_1">
                        <div className='product_sub_2'>
                            <i class="bi bi-diagram-3"></i>
                            <span>product</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" value={fliterTxt} onChange={(e)=>setFlitertxt(e.target.value)}/>
                            <label for="floatingInput"><i class="bi bi-search"></i></label>
                        </div>
                        <button onClick={() => navigate('/navbar/add_product')}>Add Now</button>
                    </div>
                    <div className="product_box4">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Pack Size</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">MRP</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allProducts.filter((data)=>data.name.toLowerCase().includes(fliterTxt)||data.category.toLowerCase().includes(fliterTxt)||data.price.toLowerCase().includes(fliterTxt)).map((data,index) => <>
                                    <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{data.name}</td>
                                        <td>{data.size} ml</td>
                                        <td>{data.category}</td>
                                        <td>Rs{data.price}</td>
                                        <td id='product_img'>
                                            <div>
                                                <img src={data.image} alt="" />
                                            </div>
                                        </td>
                                        <td className='status_box'>
                                            {data.status}
                                            <div className="update_img">
                                                <i class="bi bi-pencil-square" onClick={()=>navigate('/navbar/add_product',{state:data._id})}></i>
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
                                                                <button type="button" class="btn btn-primary" onClick={()=>deleteProduct()}>Confirm</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>
                                </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Product