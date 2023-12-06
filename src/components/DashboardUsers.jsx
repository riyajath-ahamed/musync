import React, { useEffect, useState } from 'react'
import { useStateValue } from "../context/StateProvider";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";

import moment from "moment"
import { changingUserRole, getAllUsers, removeUser } from '../api';

import { actionType } from "../context/reducer";


export const DashboardUserCard =({data, index}) =>{

  const [{user, allUsers}, dispatch] = useStateValue();

  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false); 

  const [isUserDeleted, setIsUserDeleted] = useState(false);

  
  

  const updateUserRole = (userId, role)=>{

    setIsUserRoleUpdated(false);
    
    changingUserRole(userId,role).then((res) =>{
      if(res){
        getAllUsers().then((data) =>
        {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        }
        )

      }
    })

  }


  const deleteUser = (userId) => {

    setIsUserDeleted(false)

    removeUser(userId).then((res) => {
      if(res){
        getAllUsers().then((data) =>
        {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        }
        )

      }
    })
  }



  const createdAt= moment(new Date(data.createdAt)).format("MMMM Do YYYY");

  

    return(
      <motion.div key={index}
      className='relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md'
       
      >
        {
          data._id !== user?.user._id && (
            <motion.div whileTap={{scale : 0.75}} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200"
              onClick={() => setIsUserDeleted(true)}
            >
              <MdDelete className='text-xl text-red-500 hover:text-red-700'/>

            </motion.div>

          )
        }

          {isUserDeleted &&(
            <motion.div 
            initial={{opacity:0, scale:0.5}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0.5}}
            
            className='absolute z-40 top-6 left-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'>
            <p className='text-textColor text-sm font-semibold'>Are you sure, Do you want to delete User 
            <span className='font-bold text-red-600'>  {data.name}</span> ?
            </p>
            <div className='flex items-center gap-8'>
              <motion.button whileTap={{scale:0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-700 text-white hover:shadow-md"
              onClick={() => deleteUser(data._id)}
              >
                Yes
              </motion.button>
              <motion.button whileTap={{scale:0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-600 text-white hover:shadow-md"
               onClick={() => setIsUserDeleted(false)} 
              >
                No
              </motion.button>

            </div>

          </motion.div>
          )}
        
        {/* profile*/}
        <div className='w-275 min-w-[160px] flex items-center justify-center'>
          <img src={data.imageURL} referrerPolicy="no-referrer" alt="Profile" className='w-10 h-10 object-cover rounded-full min-w-[40px]'/>
        </div>
        {/* name*/}
        <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.name}</p>
        <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email}</p>
        <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{data.email_verified ? "True" : "False"}</p>
        <p className='text-base text-textColor w-275 min-w-[160px] text-center'>{createdAt}</p>
        
        <div className='w-275 min-w-[160px] text-center flex items-center justify-center gap-6 relative'>
          <p className='text-base text-textColor text-center'>{data.role}</p>

          {/*Role changing ======> Artist */}
          {
            data._id !== user?.user._id && (
              <motion.p whileTap={{scale :0.75}} className='text-[10px] font-semibold text-textColor p-1 bg-purple-200 rounded-sm hover:shadow-md' onClick={() => setIsUserRoleUpdated(true)}>
                  {data.role === "Admin" ? "Member" : "Admin"}
              </motion.p>
            )
          }
          {isUserRoleUpdated &&(
            <motion.div 
            initial={{opacity:0, scale:0.5}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0, scale:0.5}}
            
            className='absolute z-10 top-6 right-4 p-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md'>
            <p className='text-textColor text-sm font-semibold'>Are you sure, Do you want to change User role as  
            <span className='font-bold text-red-600'>{data.role === "Admin" ? " Member" : " Admin"}</span> ?
            </p>
            <div className='flex items-center gap-8'>
              <motion.button whileTap={{scale:0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-700 text-white hover:shadow-md"
              onClick={() => updateUserRole(data._id, data.role === "Admin" ? "Member" : "Admin")}
              >
                Yes
              </motion.button>
              <motion.button whileTap={{scale:0.75}} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-600 text-white hover:shadow-md"
               onClick={() => setIsUserRoleUpdated(false)} 
              >
                No
              </motion.button>

            </div>

          </motion.div>
          )}
          
        </div>

  
      </motion.div>
      
      
    )
  }


const DashboardUsers = () => {

  const [{allUsers}, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data)=>{
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data.data,
        })
        
      })
      
      
    } 
  }, [])

  
  return (
    <div className='w-full p-4 flex items-center justify-center flex-col'>
      {/* filters*/}


      {/* data form*/}
      <div className='relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border
       border-gray-300 rounded-md gap-3'>
        {/* total user count*/}
        <div className='absolute top-4 left-4 border border-orange-300 bg-white px-1 rounded-md shadow-md'>
          <p className='text-sm font-semibold'>
            Count :<span className='text-xl font-bold text-textColor'>{allUsers?.length}</span>
          </p>

        </div>
        
        {/* table header*/}
        <div className='w-full min-w-[750px] flex items-center justify-between '>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Profile</p>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Name</p>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Email</p>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Verified</p>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Created</p>
          <p className='text-sm text-textColor font-bold min-w-[160px] text-center'>Role</p>

        </div>

        {/* table body*/}
        <div className='w-full min-w-[750px] flex flex-col items-center justify-between h-600 overflow-y-auto'>

        {
          allUsers &&(
            allUsers?.map((data, i) =>
              <DashboardUserCard data={data} index={i} />
            
          )
          )
        }
        </div>




      </div>

    </div>
  )
}



export default DashboardUsers