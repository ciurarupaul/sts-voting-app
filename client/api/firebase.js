/* 
https://firebase.google.com/docs/projects/api-keys
so i am supposed to expose the firebase api key as it is only used to identify, not to authorize actions
*/

const firebaseConfig = {
	apiKey: "AIzaSyBcEQK2RWuO98q4TUbp0lV5Dp1XhA_B-rY",
	authDomain: "sts-voting-app.firebaseapp.com",
	projectId: "sts-voting-app",
	storageBucket: "sts-voting-app.firebasestorage.app",
	messagingSenderId: "325372604674",
	appId: "1:325372604674:web:45c1d984ba6ab16a7a121b",
	measurementId: "G-SYHG6D5X95",
};

export default firebaseConfig;

/* 
!!! see firebase's usage limitations in their console to protect sensitive operations !!!
*/
