/** @format */

import React, { useEffect, useState } from "react";
import "./EditModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUserName } from "../redux/extraReducer";
import { auth } from "../redux/api";
const EditModal = ({ setUserSetting }) => {
  const [newName, setNewName] = useState("");
  const [data, setData] = useState({
    username: "",
  });
  const dispatch = useDispatch();
  const handleUpdate = (e) => {
    e.preventDefault();
    if (data.username.length <= 0) {
      alert("please fill in the blanks ");
    }
    dispatch(updateUserName({ username: data.username }));
  };
  useEffect(() => {
    auth.onAuthStateChanged((d) => {
      setData((prev) => ({ ...prev, username: d.displayName }));
    });
  }, []);

  return (
    <>
      <div className='edit__modal'>
        <form onSubmit={handleUpdate}>
          <span onClick={() => setUserSetting(false)}>
            {" "}
            <FontAwesomeIcon
              icon={faClose}
              style={{ fontSize: "40px" }}
              className='icon'
            />
          </span>
          <label htmlFor=''>User Name</label>
          <input
            value={data?.username}
            type='text'
            className=''
            onChange={(e) =>
              setData((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <label htmlFor=''>Bio</label>
          <textarea name='' id='' cols='30' rows='10'></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default EditModal;
