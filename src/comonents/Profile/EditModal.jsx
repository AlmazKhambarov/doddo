/** @format */

import React, { useEffect, useState } from "react";
import "./EditModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateUserName } from "../redux/extraReducer";
import { auth, firestore } from "../redux/api";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const EditModal = ({ setUserSetting, users }) => {
  const [newName, setNewName] = useState("");

  const [data, setData] = useState({
    username: "",
    bio: "",
    email: "",
  });
  var currentUserId = users?.find((el) => el.userEmail === data.email);
  useEffect(() => {
    auth.onAuthStateChanged((d) => {
      setData((prev) => ({
        ...prev,
        username: d.displayName,
        email: d.email,
        bio: currentUserId?.userBio,
      }));
    });
  }, [currentUserId]);

  var id = currentUserId?.id;
  const dispatch = useDispatch();
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      var bioRef = doc(firestore, "Users", id?.toString());
      await updateDoc(bioRef, {
        userBio: data.bio, // Set the userBio field to the new string value
      });
    } catch (e) {
      console.log(e);
    }
    if (data.username.length <= 0) {
      alert("please fill in the blanks ");
    }
    dispatch(updateUserName({ username: data.username }));
  };
  console.log(currentUserId);
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
          <textarea
            name=''
            id=''
            cols='30'
            value={data?.bio}
            rows='10'
            onChange={(e) =>
              setData((prev) => ({ ...prev, bio: e.target.value }))
            }></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className='w-screen'></div>
    </>
  );
};

export default EditModal;
