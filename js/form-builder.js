function saveInstitution(id) {
    var id = id.replace("-save", "");
    var fieldset = document.getElementById(id);
    var inputs = fieldset.querySelectorAll("input");
    var obj = {};
    inputs.forEach(input => {
        obj[input.name] = input.value;
    });
    // save to the local storage object
    cv.obj.education[0] = obj;
}

function addInstitution() {
    var fld1 = document.getElementById("institution-1");
    var institutionNumber = document.querySelectorAll("form[name='education'] fieldset").length + 1;
    var newFld = fld1.cloneNode(true);

    // Update the fieldset ID
    newFld.id = "institution-" + institutionNumber;

    // Update the legend
    newFld.querySelector("legend").innerText = "Institution " + institutionNumber;

    // Update the Labels
    newFld.querySelectorAll("label")
        .forEach(label => {
            var f = label.getAttribute("for").replace("-1-", "-" + institutionNumber + "-");
            label.setAttribute("for", f);
        });

    // Update the Input IDS and Names
    newFld.querySelectorAll("input")
        .forEach(input => {
            var id = input.getAttribute("id").replace("-1-", "-" + institutionNumber + "-");
            input.setAttribute("id", id);
            //input.setAttribute("name", id);
        });

    // 
    var sb = document.getElementById("school-add");
    sb.remove();

    // Append the new institution 
    var form = document.querySelector("form[name='education']");
    form.appendChild(newFld);
    form.appendChild(sb);
}

function loadPersonalData() {
    cv.obj.personal;

}

function updatePersonalData() {
    var pf = document.forms.personal.querySelectorAll("input");
    var obj = {};
    pf.forEach(input => {
        if (input.name != "") {
            obj[input.name] = input.value;
        }
    });
    cv.obj.personal = obj;
}

function init() {
    var a = document.getElementById("institution-add");
    a.addEventListener("click", function() {
        addInstitution();
        preventDefault();
    });


    document.getElementById("personal-update")
        .addEventListener("click", function(e) {
            updatePersonalData();
            preventDefault();
        });
}

init();