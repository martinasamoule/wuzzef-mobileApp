import app from "../firebase";
import auth from "../firebase";
const db = app.firestore();

function addApplicationJob(
  jobId,
  companyId,
  { ...questions },
  { ...jobDetails }
) {
  return new Promise((resolve, reject) => {
    const user = auth.auth().currentUser;
    const userId = user.uid;

    const data = {
      companyId: companyId,
      jobId: jobId,
      userId: userId,
      questions: questions,
    };
    db.collection("jobApplication")
      .add(data)
      .then((docRef) => {
        db.collection("users")
          .doc(userId)
          .collection("applicion")
          .add(jobDetails)
          .then((doc) => {
            resolve(doc);
          });
        resolve(docRef);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { addApplicationJob };
