import AddProduct from "./AddProduct";
import { Link } from 'react-router-dom';

function App() {

  return (
    <div className='w-full h-auto min-h-screen flex flex-row flex-wrap bg-red-300 justify-between py-5'>
      <div className='w-[50%] flex justify-center items-center'>
        <div className='w-full md:w-[80%]'>
          <AddProduct/>
        </div>
      </div>
      <div className='w-[48%] flex flex-col justify-center items-center'>
        <Link to={'product'} className="border-2 p-2 rounded">See all products</Link>
      </div>
    </div>
  )
}

export default App;





