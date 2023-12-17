import { useForm } from "react-hook-form"
import { useEffect, useState } from 'react'
import axios from 'axios'
const AddProduct = () => {
    const { register,
        handleSubmit,
        reset,
        formState,
     } = useForm({ defaultValues: { title: "" }})
    const [response, setResponse] = useState({
        isloading: false,
        data: [],
        message: {
            error: false,
            message: ''
        }
    })
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({ title: "",price:'',description:'',category:'' })
        }
    }, [formState, reset])
    const onSubmit = (data) => {
        const controller = new AbortController();
        const signal = controller.signal;
        let responsedata;
        (async () => {
            try {
                setResponse({ ...response, message: { error: false, message: '' }, isloading: true })
                responsedata = await axios.post('/api/v1/products/add', {
                    signal: signal, data: data
                })
                setResponse({ ...response, data: responsedata.data, isloading: false })
            } catch (error) {
                if (axios.isAxiosError(error)) return
                setResponse({ ...response, message: { error: true, message: error.message }, isloading: false })
            }
        })();
    }
    console.log(response)

    return (
        <>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col justify-center items-start mt-3'>
                    <label htmlFor="title">Title:</label>
                    <input type='text' {...register('title', { required: 'true' })} id='title' name='title' className='w-full rounded-md outline-none px-3 py-2' />
                </div>
                <div className='flex flex-col justify-center items-start mt-3'>
                    <label htmlFor="price">Price:</label>
                    <input type='text' {...register('price', { required: 'true' })} id='price' name='price' className='w-full rounded-md outline-none px-3 py-2' />
                </div>
                <div className='flex flex-col justify-center items-start mt-3'>
                    <label htmlFor="category">Category:</label>
                    <input type='text' {...register('category', { required: 'true' })} id='category' name='category' className='w-full rounded-md outline-none px-3 py-2' />
                </div>
                <div className='flex flex-col justify-center items-start mt-3'>
                    <label htmlFor="description">Description:</label>
                    <textarea type='text' {...register('description', { required: 'true' })} id='description' name='description' className='w-full rounded-md outline-none px-3 py-2' />
                </div>
                <div className='flex flex-col justify-center items-start mt-3'>
                    <button type='submit' className='w-full rounded-md outline-none px-3 py-2 bg-slate-600'>Save</button>
                </div>
            </form>
        </>
    )
}
export default AddProduct;