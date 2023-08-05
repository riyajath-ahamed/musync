import React from 'react'
import Header from './Header'
import { useStateValue } from '../context/StateProvider';
import moment from 'moment';

const Profile = () => {
    const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <Header/>
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
            <div class="bg-white p-3 border-t-4 border-orange-400">
              <div class="image overflow-hidden">
                <img
                  className="h-auto w-full mx-auto rounded-full"
                  src={user?.user?.imageURL}
                  alt="profile"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {user?.user?.name}
              </h1>
              <h3 class="text-gray-600 font-lg text-semibold leading-6">
                {user?.user?.role}
              </h3>
              <p className="text-sm text-gray-500 hover:text-gray-600 leading-6"></p>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Email Verified </span>
                  <span className="ml-auto">
                    {user?.user?.email_verified  ? (
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Verified
                      </span>
                    ) : (
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Not Verified
                      </span>
                    )}
                  </span>
                </li>
                <li className="flex items-center py-3">
                  <span>Since </span>
                  <span className="ml-auto">{moment(user?.user?.createdAt).format('lll')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

    </div>
  );
}

export default Profile