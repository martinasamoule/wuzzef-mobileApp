import app from "../firebase";
const db = app.firestore();

function getAlljobs() {
  return new Promise((resolve, reject) => {
    db.collectionGroup("jobs")
      .where("status", "==", "ACCEPTED")
      .get()
      .then((allJobs) => {
        const allacceptedJobs = allJobs.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          companyId: doc.data().companyID,
        }));
        resolve(allacceptedJobs);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getSingleJob(companyId, jobId) {
  return new Promise((resolve, reject) => {
    db.collection("company")
      .doc(`${companyId}`)
      .collection("jobs")
      .doc(`${jobId}`)
      .get()
      .then((response) => {
        const app = {
          id: response.id,
          ...response.data(),
        };
        resolve(app);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default { getAlljobs, getSingleJob };
