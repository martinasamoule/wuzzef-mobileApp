import app from "../firebase";
import auth from "../firebase";

const db = app.firestore();
const user = auth.auth().currentUser;
console.log(user);
// let username = localStorage.getItem("uid");
// console.log("User: " + username);
// let userId;
// if (user == null) {
//   userId = localStorage.getItem("uid");
// } else {
//   userId = user.uid;
// }

function addJobtoSavedPage({ ...saveddata }) {
  return new Promise((resolve, reject) => {
    const user = auth.auth().currentUser;
    const userId = user.uid;
    console.log(userId);

    const data = {
      saved: true,
      ...saveddata,
    };
    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .add(data)
      .then((docRef) => {
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
function getSavedJob() {
  return new Promise((resolve, reject) => {
    const user = auth.auth().currentUser;
    const userId = user.uid;
    console.log(userId);

    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .onSnapshot(
        (snapshot) => {
          const allacceptedJobs = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            companyId: doc.data().companyID,
          }));

          resolve(allacceptedJobs);
        },
        (error) => {
          reject(error);
        }
      );
  });
}
function deletSavedJob(jobId) {
  return new Promise((resolve, reject) => {
    const user = auth.auth().currentUser;
    const userId = user.uid;
    console.log(userId);

    db.collection("users")
      .doc(userId)
      .collection("savedJob")
      .doc(jobId)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);

        console.error("Error removing document: ", error);
      });
  });
}
// eslint-disable-next-line import/no-anonymous-default-export
export default { addJobtoSavedPage, getSavedJob, deletSavedJob };
