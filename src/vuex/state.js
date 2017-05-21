const state = {
    list: {
        return: db.ref("/list").once("value").then(function(snapshot){
           return snapshot.val().list;
        })
    },
    activeNote: {
        title:"",
        content: ""
    }
}
export default state;