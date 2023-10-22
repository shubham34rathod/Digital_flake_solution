import { useEffect, useState } from 'react'
import '../css/addProduct.css'
import Sidebar from './Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import Product from './Product'
import { useSelector } from 'react-redux'


function Addproduct() {

    let navigate = useNavigate()
    let location = useLocation()
    let loginStatus = useSelector((state) => state.user.loginStatus)

    let [imageStatus, setImageStatus] = useState(false)

    let [newProduct, setNewproduct] = useState({
        userID: '',
        category: '',
        name: '',
        size: '',
        mrp: '',
        image: '',
        status: ''
    })

    if (!loginStatus) {
        navigate('/')
    }

    useEffect(() => {
        if (user) {
            setNewproduct((data) => ({
                ...data,
                userID: user._id
            }))
        }
    })

    //getting old product data 

    useEffect(() => {
        if (location.state != null) {
            // console.log('have id',location.state);
            fetch(`/get_product/${location.state}`)
                .then((data) => data.json())
                .then((res) => {
                    // console.log('update',res);
                    setNewproduct((data) => ({
                        ...data,
                        category: res.category,
                        name: res.name,
                        size: res.size,
                        mrp: res.price,
                        // image:res.image,
                        status: res.status
                    }))
                    // newProduct.description = res.description
                    // newProduct.status = res.status
                })
                .catch((error) => console.log(error))
        }
    }, [])

    let user = useSelector((state) => state.user.user)




    //fetching category

    let [categories, setCategories] = useState([])

    useEffect(() => {
        async function getCategories() {
            await fetch(`/get_category`)
                .then((data) => data.json())
                .then((res) => {
                    console.log(res);
                    setCategories(res)
                    // dispatch(setCategory(res))
                })
                .catch((error) => console.log(error))
        }
        getCategories()
    }, [])


    function handleProduct(e, prop) {
        setNewproduct((data) => ({
            ...data,
            [prop]: e.target.value
        }))
    }

    //upload to cloud

    async function uploadToCloud(e) {
        setImageStatus(true)
        let imageFile = e.target.files[0]
        let data2 = new FormData()
        data2.append('file', imageFile)
        data2.append('upload_preset', 'video_YT')
        await fetch('https://api.cloudinary.com/v1_1/df78wetic/image/upload', {
            method: 'POST',
            body: data2
        })
            .then((data) => data.json())
            .then((res) => {
                // console.log(res.url);
                setNewproduct((data) => ({
                    ...data,
                    image: res.url
                }))
                setImageStatus(false)
            })
            .catch(() => {console.log('img error');setImageStatus(false)})
    }

    async function handleSubmit() {
        console.log(newProduct);

        //url to update product
        if (location.state != null) {
            await fetch(`/update_product/${location.state}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
                .then((data) => data.json())
                .then((res) => {
                    console.log(res);
                    if (res == 'data updated3') {
                        setNewproduct({
                            name: '',
                            description: '',
                            status: ''
                        })
                    }
                })
                .catch((error) => console.log(error))
            // console.log(newProduct);
        }
        else {

            //url to add product
            await fetch(`/add_product`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            })
                .then((data) => data.json())
                .then((res) => {
                    // console.log(res);

                })
                .catch((error) => console.log(error))
        }
    }

    return <>
        <div className="add_product_container">
            <div className="add_product_box1">
                <Sidebar></Sidebar>
            </div>
            <div className="add_product_box2">
                <div className="add_product_sub1">
                    <h5><i className="bi bi-arrow-left"></i> &nbsp;Add product</h5>
                    <div className="row g-3">
                        <div className="col">
                            <select class="form-select" aria-label="Default select example" value={newProduct.category} onChange={(e) => handleProduct(e, 'category')}>
                                <option selected>Category</option>
                                {categories.map((data) => <>
                                    <option value={data.category}>{data.category}</option>
                                </>)}
                                {/* <option value="milk">Milk</option>
                                <option value="fruit">Fruit</option> */}
                            </select>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Product Name" aria-label="Last name" value={newProduct.name} onChange={(e) => handleProduct(e, 'name')} />
                        </div>
                        <div className="col">
                            <input type="number" className="form-control" placeholder="Pack Size in ml" aria-label="Last name" value={newProduct.size} onChange={(e) => handleProduct(e, 'size')} />
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col">
                            <input type="number" className="form-control" placeholder="MRP" aria-label="First name" value={newProduct.mrp} onChange={(e) => handleProduct(e, 'mrp')} />
                        </div>
                        <div className="col">
                            <input type="file" className="form-control" placeholder="Product Image" aria-label="Last name" onChange={(e) => uploadToCloud(e)} />
                        </div>
                        {imageStatus &&
                            <div class="spinner-border text-primary" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>}
                        <div className="col">
                            <select class="form-select" aria-label="Default select example" value={newProduct.status} onChange={(e) => handleProduct(e, 'status')}>
                                <option selected>Select</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                    <div className="add_product_btn">
                        <button className='add_cat_btn1' onClick={handleSubmit}>Save</button>
                        <button className='add_cat_btn2' onClick={() => navigate('/navbar/add_product')}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Addproduct