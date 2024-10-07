import { useCallback, useContext, useState } from "react";
import { FirestoreContext } from "../contexts/firestoreContext";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";

const useFetchCol = (colName) => {
  const { db } = useContext(FirestoreContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [data, setData] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);

  const getData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const colRef = collection(db, colName);
      const q = query(colRef, orderBy("createdAt", "desc"), limit(8));
      const res = await getDocs(q);

      const resData = res.docs.map((docLocal) => {
        const docData = docLocal.data();
        return {
          ...docData,
          id: docLocal.id,
          createdAt: docData.createdAt.toDate(),
        };
      });

      setData(resData);
      setLastDoc(res.docs[res.docs.length - 1]);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [colName, db]);

  const getNextData = useCallback(async (latestData) => {
    setFetching(true);
    setError(null);
    try {
      const colRef = collection(db, colName);
      const q = query(
        colRef,
        orderBy("createdAt", "desc"),
        startAfter(latestData),
        limit(8)
      );
      const res = await getDocs(q);

      const resData = res.docs.map((doc) => {
        const docData = doc.data();
        return {
          ...docData,
          id: doc.id,
          createdAt: docData.createdAt.toDate(),
        };
      });

      setData((prevData) => [...prevData, ...resData]);
      setLastDoc(res.docs[res.docs.length - 1]);
    } catch (err) {
      setError(err.message);
    }
    setFetching(false);
  }, [colName, db]);

  return { loading, error, data, getData, getNextData, fetching, lastDoc };
};

export default useFetchCol;
