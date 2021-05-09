import { app, firebase } from "FirebaseFolder";

const db = app.firestore();

export const HandleDeleteImage = async (user, id) => {
  const imgRef = await db.collection("images").doc(id);
  const userImgRef = await db.collection("users").doc(user);
  await imgRef.delete();
  await userImgRef.get().then((snapshot) => {
    const userImgs = snapshot.data().images;
    const updatedImgs = userImgs.filter((image) => image.id !== id);
    userImgRef.update({
      images: updatedImgs,
    });
  });
};

export const HandleUploadImage = async (file) => {
  const storageRef = app.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);
  return await fileRef.getDownloadURL();
};

export const HandleAddImage = async (user, img, title) => {
  const userRef = await db.collection("users").doc(user);
  const imgRef = await db.collection("images");
  const imgTitle = title;
  imgRef
    .add({
      user: user,
      image: img,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      title: imgTitle,
    })
    .then((doc) => {
      let imgId = doc.id;
      userRef.update({
        images: firebase.firestore.FieldValue.arrayUnion({
          id: imgId,
          image: img,
          title: imgTitle,
        }),
      });
    });
};

export const GetUserImages = async (user) => {
  const userRef = await db.collection("users").doc(user);
  return await userRef.get().then((snapshot) => {
    return snapshot.data().images.slice(0).reverse();
  });
};

export const GetAllImages = async () => {
  const imgsRef = await db
    .collection("images")
    .orderBy("timeStamp", "desc")
    .get();
  return imgsRef.docs.map((doc) => doc.data());
};

export const HandleSignup = async (user, password) => {
  const userRef = await db.collection("users").doc(user);
  return await userRef.get().then((snapshot) => {
    if (snapshot.exists) {
      return "user exists";
    }
    userRef.set({
      user: user,
      password: password,
      images: [],
    });
    return "success";
  });
};

export const HandleSignin = async (user, password) => {
  const userRef = await db.collection("users").doc(user);
  return await userRef.get().then((snapshot) => {
    if (snapshot.exists) {
      const dbPassword = snapshot.data().password;
      if (password !== dbPassword) {
        return "incorrect password";
      }
      return "success";
    } else {
      return "user does not exist";
    }
  });
};
