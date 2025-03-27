import { services } from "../constant"
import ServiceCards from "../Components/ServiceCard"

const Services = () => {
  return (
    <section className='max-container flex justify-center flex-wrap gap-9'>
       <section className='max-container flex justify-center flex-wrap gap-9'>
      {services.map((service) => (
        <ServiceCards key={service.label} {...service} />
      ))}
    </section>
     
    </section>
  )
}

export default Services