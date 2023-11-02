/** @format */

import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import "./Comments.scss";
import { auth, firestore } from "../redux/api";
export default function Comments({
  id,
  commentp,
  postImg,
  createdUserPhoto,
  setCommentModal,
}) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [users, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((ee) => {
      setUser(ee);
    });
  }, []);
  // const [currentlyLoggedinUser] = useAuthState(auth);
  const commentRef = doc(firestore, "Articles", id);
  useEffect(() => {
    const docRef = doc(firestore, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setComments(snapshot.data().comments);
    });
  }, []);

  const handleChangeComment = (e) => {
    if (e.key === "Enter" || e == "button") {
      updateDoc(commentRef, {
        comments: arrayUnion({
          user: users?.uid,
          userName: users?.displayName,
          comment: comment,
          createdAt: new Date(),
          commentId: uuidv4(),
        }),
      }).then(() => {
        setComment("");
      });
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(commentRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(comments);
  return (
    <>
      <div className='comment-modal'>
        <div className='modal-inner'>
          <div className='close-con' onClick={() => setCommentModal(false)}>
            <img src='https://t3.ftcdn.net/jpg/03/64/30/82/360_F_364308273_cV9OrZrqUpZ8En9rC8KxBqaxkVg95ZTY.jpg' />
          </div>
          <div>
            <div className='image__container'>
              <img src={postImg} alt='' />
            </div>
            <div className='text__container'>
              <ul className='comments'>
                {comments.map(
                  ({ commentId, user, comment, userName, createdAt }) => (
                    <li key={commentId}>
                      <p className='username'>{userName}</p>
                      <p className='comment'>{comment}</p>
                      <div className='delete-comment'>
                        {user === users.uid && (
                          <i
                            className='fa fa-times'
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              handleDeleteComment({
                                commentId,
                                user,
                                comment,
                                userName,
                                createdAt,
                              })
                            }></i>
                        )}
                      </div>
                    </li>
                  )
                )}
              </ul>

              <input
                type='text'
                name='comment'
                placeholder='Add a comment'
                value={comment}
                onKeyUp={(e) => {
                  handleChangeComment(e);
                }}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button onClick={() => handleChangeComment("button")}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='w-screen'></div>
    </>
  );
}
