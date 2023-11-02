/** @format */

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, firestore, storage } from "./api";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const initialState = {
  loading: null,
  error: null,
  userPost: [],
  postLoading: false,
};
export const createUser = createAsyncThunk(
  "user/createUserAndProfile",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        data.email,
        // thisssss dapsdjao[ifhufhsafg]
        data.password
      );

      const usersData = {
        userPhoto: data.photo,
        userName: data.name,
        userEmail: data.email,
        userId: user.user.uid,
        userBio: "",
        followers: [],
      };
      const usersRef = collection(firestore, "Users");
      await addDoc(usersRef, usersData);
      await updateProfile(auth.currentUser, {
        // thisssss dapsdjao[ifhufhsafg]
        displayName: data.name,
        photoURL: data.photo,
        phoneNumber: data.phone,
      });
      console.log(user);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
      // thisssss dapsdjao[ifhufhsafg]
    }
  }
);
export const deletePost = createAsyncThunk("Delete", async (payload) => {
  console.log(payload);

  const storageRef = ref(storage, payload.name);

  // Check if the file exists before attempting to delete it
  try {
    await getDownloadURL(storageRef);

    // The file exists, so delete it
    await deleteObject(storageRef);

    console.log("File deleted successfully");

    // Also delete the corresponding document in Firestore
    await deleteDoc(doc(firestore, "Articles", payload.id));

    console.log("Document deleted successfully");
  } catch (error) {
    console.error("Error deleting file or document:", error);
  }
});
export const UserLogin = createAsyncThunk("login", async (data, thunkAPI) => {
  try {
    const user = await signInWithEmailAndPassword(
      // thisssss dapsdjao[ifhufhsafg]
      auth,
      data.email,
      data.password
    );
    return user;
  } catch (error) {
    // dispatch(errorMessage(error))
    console.log(error);
  }
});
const baseStore = createSlice({
  name: "login",
  initialState,
  reducers: {
    errorMessage: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // this is comment for redux
      .addCase(UserLogin.pending, (state, action) => {
        state.loading = true;
        // this is comment for redux
      })
      .addCase(UserLogin.fulfilled, (state, action) => {
        state.loading = true;
      })
      .addCase(UserLogin.rejected, (state, action) => {
        state.error = action.error.message;
      });
    builder
      .addCase(createUser.pending, (state, actio) => {
        state.loading = true;
      })

      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        // this is comment for redux
        state.error = action.error.message;
      });
    builder
      .addCase(getUserPost.pending, (state, action) => {
        state.loading = true;
        // this is comment toooooooooooooo
      })
      // this is comment toooooooooooooo
      .addCase(getUserPost.fulfilled, (state, action) => {
        state.userPost = action.payload;
      })
      .addCase(getUserPost.rejected, (state, action) => {
        // this is comment toooooooooooooo
        state.error = action.error.message;
      });
    builder
      .addCase(publishPosts.pending, (state, action) => {
        state.postLoading = true;
        console.log("pending");
        // this is comment toooooooooooooo
      })
      // this is comment toooooooooooooo
      .addCase(publishPosts.fulfilled, (state, action) => {
        state.postLoading = false;
        console.log("succses");
      })
      .addCase(publishPosts.rejected, (state, action) => {
        // this is comment toooooooooooooo
        state.error = action.error.message;
      });
    builder
      .addCase(updateUserName.pending, (state, action) => {
        state.postLoading = true;
        console.log("pending");
        // this is comment toooooooooooooo
      })
      // this is comment toooooooooooooo
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.postLoading = false;
        console.log("succses");
      })
      .addCase(updateUserName.rejected, (state, action) => {
        // this is comment toooooooooooooo
        state.error = action.error.message;
      });
  },
});
export const { errorMessage } = baseStore.actions;
export default baseStore.reducer;

export const getUserPost = createAsyncThunk(
  "folders/get",
  async (userId, { rejectWithValue }) => {
    try {
      const filesRef = collection(firestore, "Articles");
      const userFolder = query(filesRef, where("userId", "==", userId));
      const snapshot = await getDocs(userFolder);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return posts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// thisssss dapsdjao[ifhufhsafg]
export const publishPosts = createAsyncThunk(
  "posts/publish",
  async (data, thunkAPI) => {
    console.log(data);
    const { title, imageUpload, user } = data;
    // thisssss dapsdjao[ifhufhsafg]
    try {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${imageUpload?.name}`
        // thisssss dapsdjao[ifhufhsafg]
      );

      const uploadImage = uploadBytesResumable(storageRef, imageUpload);
      // Await the uploadImage to complete
      // thisssss dapsdjao[ifhufhsafg]
      await uploadImage;

      const url = await getDownloadURL(uploadImage.snapshot.ref);

      const articleData = {
        title: title,
        // thisssss dapsdjao[ifhufhsafg]
        imageUrl: url,
        createdAt: Timestamp.now().toDate(),
        createdUserPhoto: user?.photoURL,
        createdBy: user?.displayName,
        userId: user?.uid,
        likes: [],
        comments: [],
      };

      const articleRef = collection(firestore, "Articles");
      // thisssss dapsdjao[ifhufhsafg]
      await addDoc(articleRef, articleData);

      return {}; // You can return data if needed
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserName = createAsyncThunk(
  "user/changeProfile",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await updateProfile(auth.currentUser, {
        displayName: data.username,
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
