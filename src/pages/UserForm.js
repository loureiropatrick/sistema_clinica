// UserForm.js
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const UserForm = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data found</div>;
  }

  return (
    <form>
      <label>
        Nome:
        <input type="text" value={userData.name || ''} readOnly />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={userData.email || ''} readOnly />
      </label>
      {/* Adicione mais campos conforme necessário */}
    </form>
  );
};

export default UserForm;