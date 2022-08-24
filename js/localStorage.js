let storage = {
    save: function() {
        localStorage.removeItem("cv");
        localStorage.setItem("cv", JSON.stringify(cv.obj));
    },
    load: function() {
        cv.obj = JSON.parse(localStorage.cv);
    }
}