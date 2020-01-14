import firebase from 'firebase';

class Fire {
	constructor(){
		this.init();
		this.checkAuth();
	}

	init = () => {
		if(!firebase.apps.length) {
			firebase.initializeApp({
    				apiKey: "AIzaSyC2DBdc7yAYkbW0svrRkoTgwoX0pFr3TUM",
    				authDomain: "chat-app-25a40.firebaseapp.com",
    				databaseURL: "https://chat-app-25a40.firebaseio.com",
    				projectId: "chat-app-25a40",
    				storageBucket: "chat-app-25a40.appspot.com",
    				messagingSenderId: "977911520507",
    				appId: "1:977911520507:web:e4ebfe7d90d0dc1b1aa45e",
    				measurementId: "G-EKJMMR0YEL"
			});
		}
	};

	checkAuth = () => {
		firebase.auth().onAuthStateChanged(user => {
			if(!user){
				firebase.auth().signInAnonymously();
			}
		});
	};

	send = messages => {
		messages.forEach(item => {
			const message = {
				text: item.text,
				timestamp: firebase.database.ServerValue.TIMESTAMP,
				user: item.user
			}

			this.db.push(message);
		});
	};

	parse = message => {
		const { user, text, timestamp } = message.val();
		const { key: _id } = message;
		const createdAt = new Date(timestamp);

		return {
			_id, createdAt, text, user
		};
	}

	get = callback => {
		this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
	}

	off() {
		this.db.off();
	}

	get db() {
		return firebase.database().ref("messages");
	}

	get uid() {
		return(firebase.auth().currentUser || {}).uid;
	}
}

export default new Fire();