import { useCallback, useContext, useState } from "react";
import { FirestoreContext } from "../contexts/firestoreContext";
import { collection, getDocs, query, where } from "firebase/firestore";

const useFitchParam = (colName, slug) => {
  const { db } = useContext(FirestoreContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const docRef = collection(db, colName);
      const q = query(docRef, where("slug", "==", slug));
      const res = await getDocs(q);

      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate(),
        };
      });

      if (resData && resData.length) {
        setData(resData[0]);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }, [colName, db, slug]);

  return { loading, error, data, getData };
};

export default useFitchParam;
