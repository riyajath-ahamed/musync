import React, { useEffect, useState } from "react";
import { getSongsByArtistName } from "../../api";

const PopupModal = ({ closeModal, data }) => {
  const [activeDialog, setActiveDialog] = useState(false);

  const CloseDialog = () => {
    setActiveDialog(closeModal);
  };

  const [songTableData, setSongTableData] = useState([]);

  useEffect(() => {
    if (data) {
      getSongsByArtistName(data.name).then((res) => {
        setSongTableData(res.song);
      });
    }
  }, [data]);

  const Tablerow = ({ serialNo, name, album, genre }) => (
    <tr className="hover">
      <td>{serialNo}</td>
      <td>{name}</td>
      <td>{album}</td>
      <td>{genre}</td>
    </tr>
  );

  return (
    <div>
      <>
        <div
          className={
            "fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 "
          }
        >
          <div className="relative w-880  bg-white shadow-lg rounded-xl space-y-2 overflow-y-scroll">
            <div className="sticky z-20 top-0 left-0 right-0 flex items-center justify-between bg-white shadow-sm py-4 px-6">
              <h1 className="text-sm md:text-2xl font-semibold">{data.name}</h1>
              <button class="btn btn-circle btn-outline" onClick={CloseDialog}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-2 px-6">
              <div className="flex flex-row ">
                <div class="basis-2/6">
                  <div className=" bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src={data.imageURL}
                        alt="artist"
                        className="object-cover w-40 h-40 rounded-t-lg"
                      />
                    </figure>
                    <div className=" p-7">
                      <h2 className="card-title">{data.name}</h2>
                      <p className="rounded-md inline-block ">
                        <a href={data.instagram}>
                          <button
                            type="button"
                            class="flex break-inside bg-white text-black border-2 shadow-md border-transparent rounded-3xl px-6 py-3 mb-4 w-full dark:bg-slate-800 dark:text-white"
                            href={data.instagram}
                          >
                            <div class="m-auto">
                              <div class="flex items-center justify-start flex-1 space-x-4">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="drop-shadow-md"
                                >
                                  <path
                                    d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7Z"
                                    stroke="#FF8A65"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
                                    stroke="#FF8A65"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M17.636 7h.012"
                                    stroke="#FF8A65"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>
                                <span class="font-medium mb-[-3px]">
                                  Instagram
                                </span>
                              </div>
                            </div>
                          </button>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="basis-4/6 bg-slate-50 rounded-sm shadow-md">
                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Album</th>
                          <th>Genre</th>
                        </tr>
                      </thead>
                      <tbody>
                        {songTableData.map(
                          ({ _id, name, album, genre, index }) => (
                            <Tablerow
                              key={_id}
                              name={name}
                              album={album}
                              genre={genre}
                              serialNo={index + 1}
                            />
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default PopupModal;
