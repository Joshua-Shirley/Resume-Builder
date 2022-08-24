const cv = {

    obj: {
        certifications: [{
            name: "",
            institution: ""
        }],
        education: [{
            id: 1,
            name: "University of Utah",
            location: "Salt Lake City, Utah",
            degree: "BS Finance",
            "date-start": "June 2019",
            "date-end": "August 2022",
            status: "graduated"
        }],
        personal: {
            first: "Joshua",
            last: "Shirley",
            email: "joshua_shirley@hotmail.com",
            phone: "801 910-4469",
            github: "https://github.com/Joshua-Shirley",
            website: ""
        },
        professional: [{
            id: 1,
            title: "Business Owner",
            statement: ""
        }],
        languages: [{
            id: 1,
            language: "English",
            proficiency: "Native"
        }],
        skills: [{
            id: 1,
            skill: "Classic ASP",
            level: 4,
            experience: "10 years",
            tags: [1]
        }, ],
        tags: [{
            id: 1,
            tag: "Programming"
        }]
    },

    init: function() {
        storage.load();
    },

    skills: {

        levels: ["novice", "competent", "experienced", "expert"],
        id: 0,
        index: 0,

        load: function() {
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            this.id = Number(urlParams.get("id"));
            this.index = this.indexOfId(this.id);
            const obj = cv.obj.skills[this.index];
            return obj;
        },

        new: function(obj) {
            if (this.indexOfName(obj.skill) === -1) {
                var n = {};
                n.id = this.nextId();
                n.skill = obj.skill;
                n.level = this.level(obj.level);
                n.experience = obj.experience;
                n.description = obj.description;
                n.tags = Number(JSON.parse(JSON.stringify(obj.tags)));
                cv.obj.skills.push(n);
            }
        },

        delete: function(id) {
            var index = this.indexOfId(id, "id");
            cv.obj.skills.splice(index, 1);
        },

        update: function(obj) {
            var index = indexOfId(obj.id);
            cv.obj.skills[index] = JSON.parse(JSON.stringify(obj));
        },

        indexOfId: function(id) {
            const s = new Array;
            cv.obj.skills.forEach(skill => {
                s.push(skill.id);
            });
            return s.indexOf(id);
        },

        indexOfName: function(searchTerm) {
            if (searchTerm == '') {
                return;
            }
            const s = new Array;
            cv.obj.skills.forEach(skill => {
                s.push(skill.skill.toLowerCase());
            });
            var f = searchTerm.toLowerCase();
            return s.indexOf(f);
        },

        nextId: function() {
            var max = 0;
            cv.obj.skills.forEach(
                skill => {
                    max = skill.id > max ? skill.id : max;
                }
            )
            return max;
        },

        level: function(searchString) {
            return this.levels.indexOf(searchString);
        }

    },

    tags: {
        newTag: function(value) {
            const t = new Map();
            cv.obj.tags.forEach(tag => {
                t.set(tag.tag);
            });
            if (!t.has(value)) {
                var obj = {};
                obj.id = cv.obj.tags.length;
                obj.tag = value;
                cv.obj.tags.push(obj);
            }
            var n = document.getElementById("new-tag-form");
            n.classList.remove("show");
            n.classList.add("add");

            // Save to the obj to localstorage
            storage.save();
        },
        checkbox: function(id, value) {
            var cb = document.createElement("input");
            cb.type = "checkbox";
            cb.className = "btn-check";
            cb.id = id;
            cb.name = "skill-tag";
            cb.value = value;
            return cb;
        },
        label: function(id, value) {
            var lb = document.createElement("label");
            lb.className = "btn";
            lb.setAttribute("for", id);
            lb.innerText = value;
            return lb;
        },
        viewTags: function(element) {
            element.innerText = "";
            cv.obj.tags.forEach(
                tag => {
                    var id = "skill-" + tag.id;
                    // checkbox
                    element.appendChild(this.checkbox(id, tag.tag));
                    // label
                    element.appendChild(this.label(id, tag.tag));
                }
            );
            // Add on the new tag form button
            element.appendChild(this.checkbox("new-tag", ""));
            var lb = this.label("new-tag", "Add New Tag");
            lb.classList.add("add-btn");
            element.appendChild(lb);

            document.getElementById("new-tag")
                .addEventListener("click", function() {
                    cv.tags.formView();
                });
        },
        formView: function() {
            var n = document.getElementById("new-tag-form");
            if (n.classList.contains("hide")) {
                n.classList.remove("hide");
                n.classList.add("show");
            } else {
                n.classList.remove("show");
                n.classList.add("hide");
            }
        }

    }

}