import React,{useState} from 'react'
import { IoChevronDown } from "react-icons/io5";


const FilterButton = ({filterData, flag}) => {

  const [filterName, setFilterName] = useState(null);
  const [filterMenu, setFilterMenu] = useState(false);

  return (
    <div className='border border-orange-400 rounded-md px-4 py-1 relative cursor-pointer hover:border-orange-500'>
      <p className='text-base tracking-wide text-textColor flex items-center gap-2'>
        {!filterName && flag} <IoChevronDown className={`text-base `}/>
      </p>
    </div>
  )
}

export default FilterButton