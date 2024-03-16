
const sendNotification = (title, options) => {
    if (!("Notification" in window)) {
        console.log("This browser does not support notifications.");
    } else if (Notification.permission === "granted") {
        // new Notification(title, options);
    } else if (Notification.permission === "denied") {
        alert("You have blocked notifications. Please update your browser settings to enable notifications.");
    } else {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification(title, options);
            } else {
                alert("You have blocked notifications. Please update your browser settings to enable notifications.");
            }
        });
    }
}

export {
    sendNotification
}