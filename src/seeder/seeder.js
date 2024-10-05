

// this file is used to seed the firestore database with some dummy data
// to use it, you need to run the seedPosts function in any file in the project

import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp,
} from "firebase/firestore";
import { firstorConfig } from "../contexts/firestoreContext";
import { initializeApp } from "firebase/app";
import dummyImag from "../assets/ropot.avif";

const post = {
  excert: "exciting news",
  title: "Hello, World!",
  body: "This is my first post!,\n I'm so excited to start this journey with you! I hope you enjoy my content and find it useful.\nPlease feel free to reach out to me if you have any questions or suggestions.\nI'm looking forward to hearing from you!",
  createdAt: serverTimestamp(),
  user: "mazin",
  slug: "hello-world",
  url: "https://img.freepik.com/free-photo/magenta-nature-fantasy-landscape_23-2150693719.jpg?t=st=1726962547~exp=1726966147~hmac=a58dac9c20ee1cddf914fda370a0620e3d4c315cbf4a04ddc7cab726e46ab10f?uid=R131894194&ga=GA1.1.777477840.1726927370",
};

// const getPosts = () => {
//   const posts = [];
//   Array(12)
//     .fill("d")
//     .forEach((_, ix) => {
//       posts.push({
//         ...post,
//         title: "post num " + ix + 1,
//         slug: "post-num-" + ix + 1,
//       });
//     });
//   return posts;
// };

const seedPosts = async () => {
  // console.log(getPosts());
  var posts = [];
  try {
    await fetch("http://localhost:3000/articles_updated_freepik.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        posts = data.map((post) => {
          return {
            ...post,
            slug: post.slug + "",
            createdAt: serverTimestamp(),
          };
        });
      })
      .catch((error) => {
        console.log("fetch failed", error.message);
      });

    // console.log(posts);

    initializeApp(firstorConfig);
    const db = getFirestore();
    const prmss = posts.map(async (post) => {
      const colRef = collection(db, "posts");
      await setTimeout(() => {
        return addDoc(colRef, post);
      }, 100);
    });
    await Promise.all(prmss);
    console.log("DONE");
  } catch (error) {
    console.log("seed failed", error.message);
  }
};

export default seedPosts;
