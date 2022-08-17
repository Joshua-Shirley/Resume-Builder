let Menu = {
    init: function() {
        var m = document.getElementById("mainMenu");
        m.innerHTML = "";
        m.appendChild(this.build());
    },
    links: [
        { href: "index.html", text: "Traditional" },
        { href: "index.html", text: "Functional" },
        { href: "shop-owner.html", text: "Shop Owner" },
        { href: "ski-instructor.html", text: "Ski Instructor" },
        { href: "index.html", text: "Builder" }
    ],
    build: function() {
        var ul = document.createElement("ul");
        this.links.forEach(link => {
            var li = document.createElement("li");
            var el = document.createElement("a");
            el.href = link.href;
            el.innerHTML = link.text;
            li.appendChild(el);
            ul.appendChild(li);
        });
        return ul;
    },
    toggle: function() {
        var m = document.getElementById("mainMenu");
        var h = document.querySelector(".hamburger");
        if (m.classList.contains("open")) {
            m.classList.remove("open");
            h.classList.remove("checked");
        } else {
            h.classList.add("checked");
            m.classList.add("open");

        }
    }
}

Menu.init();