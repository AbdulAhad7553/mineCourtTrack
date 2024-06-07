import MovingImage from '../components/utils/MovingImage';
import Dashboard from '../components/Dashboard';

function HomePage() {

  return (
    <div>
        <div className='w-screen h-screen fixed right-0 top-0 overflow-hidden'>
            <div className="w-full h-screen fixed right-0 top-0 overflow-hidden flex items-center justify-center bg-black opacity-20" >
            </div>
            <Dashboard/>
        </div>
        <MovingImage src='https://media.giphy.com/media/IJ6x5U3xP0XiCu163K/giphy.gif'/>
    </div>
  )
}

export default HomePage