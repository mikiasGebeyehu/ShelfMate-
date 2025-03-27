import React from 'react'
import book2 from '../assets/book2.jpeg'
import Bookfeature from '../assets/Bookfeature.png'
const Hero = () => {
  return (
    <section className='flex flex-col items-center justify-center text-center mt-10 p-5'>
 
 <div className='flex flex-col gap-10 justify-center items-center w-full md:flex-col lg:flex-row max-sm:flex-col'>
        <div className='justify-center item-center text-left p-5 '>
          <h2 className=' capitalize text-6xl lg:max-w-lg playwrite m-3 mb-9'>
            Find Your Next 
            <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text text-5xl font-bold '> Favorite Book </span>Today
          </h2>
          <p className='m-5 info-text lg:max-w-lg dosis-regular '>
            Explore our collection of books across every genre, from timeless classics
            to the latest bestsellers. Find your next adventure today! Whether you're seeking inspiration or escaping into fiction,
            we have something for everyone. Start your journey with us now!
          </p>
          <p className='mt-6 info-text lg:max-w-lg delius-swash-caps-regular m-5'>
          Our dedication to detail and excellence ensures your satisfaction
          </p>
          <div className='mt-8 bg-gradient-to-r from-orange-500 to-orange-800 inline-block m-5 p-2 rounded-lg text-black text-2xl hover:opacity-50 transition duration-300'>            <button className='bg-coral-red p-1 rounded-full hover:bg-full-red pl-5 pr-5 lg:max-w-lg'>View details</button>
          </div>
        </div>
    
        <div className=' flex justify-center items-center'>
        <img src={Bookfeature} alt="shoe8" width={570} height={522}/>
        </div>
    </div>
    

      <div className='flex flex-col items-center justify-center text-center mt-10 p-5'>
        <div className='max-w-xl'>
            <h3 className='m-5 text-4xl '>Get started today  <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text text-5xl font-bold">– find your next great read!</span> </h3>   
        </div>
        <p className="max-w-3xl text-center oxanium mt-10 text-lg text-gray-500 mb-10">
            Discover a world of knowledge at LMS library. Explore our collection of books,
            journals, eBooks, and digital resources. Whether you’re looking for a new book or 
            reserving your next read, we’ve got you covered!
            
        </p> 
         
      </div>         
        
    </section>
  )
}

export default Hero
