import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../ContextProvider/AuthContext";

export default function Chats() {
  const { currentUser } = useAuth();

  const jwt = currentUser.uid;
  const [Users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const docRef = doc(db, "USERS", jwt);
      const userSnapshot = await getDoc(docRef);
      const currentConnectedUser = userSnapshot.data()?.collabs;
      if (currentConnectedUser) {
        const usersDataArray = await Promise.all(
          currentConnectedUser.map(async (userId) => {
            const userDocRef = doc(db, "USERS", userId);
            const userSnapshot = await getDoc(userDocRef);
            const userData = userSnapshot.data();
            const chatId = generateChatId(userId, auth.currentUser.uid);
            // const chatIdHash = await generateSHA256Hash(chatId);
            return { ...userData, userId: userId, chatIdHash: chatId };
          })
        );
        setUsers(usersDataArray);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // async function generateSHA256Hash(input) {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(input);
  //   const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, "0"))
  //     .join("");
  //   return hashHex;
  // }

  const generateChatId = (userId1, userId2) => {
    const ids = [userId1, userId2].sort();
    const chatId = ids.join("-");
    return chatId;
  };

  console.log(Users);

  return (
    <main className="flex flex-col mx-2 mt-6 space-y-1">
      {Users.map((item, i) => {
        return (
          <React.Fragment key={i}>
            <Link to={`/chat/${item.chatIdHash}`}>
              <div className="flex items-center space-x-4 border-b-[1px] rounded border-zinc-800 p-3">
                <div>
                  <img
                    src={
                      item.Pic != null
                        ? item.Pic
                        : "https://firebasestorage.googleapis.com/v0/b/the-hub-97b71.appspot.com/o/6364b6fd26e2983209b93d18_ID_Playfal_DrawKit_Webflow_Display_2-min-png-934_2417--removebg-preview.png?alt=media&token=aa0f00e6-e1d5-4245-bfca-e5f6273ec980"
                    }
                    className="object-cover rounded-full w-14 h-14 "
                    alt=""
                  />
                </div>
                <div className="space-y-1">
                  <h1 className="font-semibold ">{item.Name}</h1>
                  <p className="text-sm font-semibold text-gray-400 ">
                    {item.Profession}
                  </p>
                </div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </main>
  );
}
