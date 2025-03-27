
const ServiceCards = ({imgURL,label,subtext}) => {
    return (
      <section  className="flex-1 sm:w-[350px] sm:min-w-[350px] m-16">
        <div className='flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16 bg-gray-900'>
            <div className='w-11 h-11 flex justify-center items-center bg-orange-500 rounded-full'>
                <img src={imgURL} alt={label} width={24} height={24} />
            </div>
            <h3 className='mt-5 playwrite_2 text-3xl leading-normal font-bold'>
                {label}
            </h3>
            <p className='mt-3 dosis-regula break-words font-montserrat text-lg leading-normal text-slate-gray'>
                {subtext}
            </p>
      </div>
      </section>
    )
  }
  
  export default ServiceCards
  