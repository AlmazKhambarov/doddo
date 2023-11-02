/** @format */

import React, { useState } from "react";
import "./CreatePost.scss";
import { useDispatch, useSelector } from "react-redux";
import { publishPosts } from "../redux/extraReducer";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CreatePost = ({ setVisibleUploadModal, user }) => {
  const { postLoading } = useSelector((state) => state.base);
  var dispatch = useDispatch();
  // this is func
  const [data, setData] = useState({
    // this is func
    user: user,
    title: "title",
    imageUpload: "",

    // this is func
  });
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [selected, setSelected] = useState();
  const [selectedImg, setSelectedImg] = useState(false);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setSelected(true);
    const file = event.target.files[0];
    const reader = new FileReader();
    // this is func
    reader.onload = (e) => {
      setSelectedImg(e.target.result);
    };
    // this is func
    reader.readAsDataURL(file);
  };

  const publishNewPost = () => {
    if (data.title != null) {
      dispatch(
        publishPosts({
          user: user,
          title: title,
          description: desc,
          imageUpload: file,
        })
      );
    }
  };
  return (
    <>
      {postLoading ? (
        <h2>Loading...</h2>
      ) : (
        <>
          <div className='modal-container'>
            <span
              className='close__modal__icon'
              onClick={() => setVisibleUploadModal(false)}>
              <FontAwesomeIcon icon={faClose} />
            </span>
            {selected ? (
              <button
                className='btn w-full'
                style={{ background: "red" }}
                // this issss
                onClick={() => setVisibleUploadModal(false)}>
                Cancel
              </button>
            ) : null}
            <div>
              {selected ? (
                <>
                  <div className='selected__img__container'>
                    {/* this is create modal for insta */}
                    {/* this issss */}
                    <img src={selectedImg} alt='' />
                  </div>
                  <form>
                    <input
                      placeholder='title'
                      type='text'
                      style={{ marginTop: "20px" }}
                      className='form-controller'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </form>
                  <button className='btn ' onClick={publishNewPost}>
                    Publish
                  </button>
                </>
              ) : (
                <>
                  <label className='labelforinput' htmlFor=''>
                    Select from compyter
                  </label>
                  <label htmlFor='file' className='labelforselect'>
                    Browse
                  </label>
                  <input
                    type='file'
                    onChange={handleFileChange}
                    id='file'
                    accept='image/*'
                  />
                </>
              )}
            </div>
          </div>
          <div className='w-screen'></div>
        </>
      )}
    </>
  );
};

export default CreatePost;
