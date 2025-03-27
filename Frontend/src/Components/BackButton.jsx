import {Link } from 'react-router-dom';
import{ BsArrowLeft } from 'react-icons/bs';

const BackButton = () => {
    return (
        <Link to="/">
            <BsArrowLeft className='text-3xl text-blue-500'/>
        </Link>
    );
};

export default BackButton;