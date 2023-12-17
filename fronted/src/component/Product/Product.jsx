import { CustomProducts as GetProducts } from '../../api/api'
import { Link } from 'react-router-dom';
const Product = () => {
    const header = {
        type: 'GET'
    }
    const [response] = GetProducts(header, '/api/v1/products/get');
    return (
        <div className='w-full h-auto min-h-screen flex flex-row flex-wrap bg-red-300 justify-between py-5'>
            <div className='w-[50%] flex justify-center items-center'>
                <div className='w-[48%] flex flex-col'>
                    {response.isloading && (<h1>Loading...</h1>)}
                    {response.message.error && (<h1>error...</h1>)}
                    {
                        response && response.data.map((pro, id) => (
                            <div key={id} className=' w-full md:w-[80%] py-2 border-2  border-white my-2 px-2'>
                                {pro.title}-------{pro.category}-------{pro.price}
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='w-[48%] flex flex-col justify-center items-center'>
                <Link to={'/'} className="border-2 p-2 rounded">Go to Home page</Link>
            </div>
        </div>
    )
}

export default Product