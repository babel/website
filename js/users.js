/* global window, document */
/*eslint quotes: ["error", "double", { "avoidEscape": true }]*/

"use strict";

class Users {
  constructor(element) {
    this.defaultSort = "position";
    this.totalCounter = 0;
    this.filterCounter = 0;

    this.displayAttributes = [
      "testimonial",
      "openSource",
      "contributor",
      "sponsor",
    ];

    this.displayOptions = [
      {
        label: "Babel",
      },
      {
        label: "Open Source",
        filterBy: "openSource",
      },
      {
        label: "Newest",
        sortBy: "added_timestamp",
      },
      {
        label: "Sponsors",
        filterBy: "sponsor",
      },
      {
        label: "Contributors",
        filterBy: "contributor",
      },
      {
        label: "Testimonials",
        filterBy: "testimonial",
      },
    ];
    this.displaySelected = this.displayOptions[0];

    this.container = element;
    this.users = {};

    this.render();
  }

  render() {
    const settings = this.container.dataset;

    if (!settings || settings.rendered === true) {
      return;
    }

    // check browser compatability
    if (!window.addEventListener || !window.JSON) {
      return;
    }

    this.container.setAttribute("data-rendered", true);

    // get and prepare our users
    if (settings.users) {
      try {
        this.users = JSON.parse(settings.users);
      } catch (e) {
        this.renderError("Error in parsing user JSON object");
        return;
      }
      this.users.map((user, i) => {
        // prepare users object
        if (!user.attributes) {
          user.attributes = {};
        }

        // get a timestamp, add as attribute (to filter on new/old)
        user.added_timestamp = new Date("1 Januari 1970").getTime();
        if (user.added) {
          const time = new Date(user.added);
          if (time) {
            user.added_timestamp = time.getTime();
          }
        }

        // default sorting
        user.position = i;
        return user;
      });
      this.renderList();
    } else {
      this.renderError("No users found");
      return;
    }
  }

  renderList() {
    let userList = [];
    const list = document.createElement("ul");
    const userTemplate = `
              <div class="\${className}">
                <a href="\${url}" target="_blank">
                    <img class="logo" src="/img/users/\${logo}">
                    <div class="name">\${name}</div>
                </a>
                <div class="attributes">
                    \${attributes}
                </div>
              </div>`;
    const clean = /\${[a-z]+}/gi;
    this.container.innerHTML = ""; // empty block
    this.totalCounter = 0;
    this.filterCounter = 0;

    if (this.users) {
      userList = this.users
        .filter(user => {
          // filter based on displaySelected
          this.totalCounter++;
          if (this.displaySelected !== null) {
            if (!user.attributes) {
              return false;
            }
            if (!this.displaySelected.filterBy) {
              return true;
            }
            const filterThis = Object.entries(user.attributes).find(
              attribute => {
                if (
                  this.displaySelected.filterBy === attribute[0] &&
                  ((!this.displaySelected.value && attribute[1]) ||
                    (this.displaySelected.value &&
                      this.displaySelected.value.test(attribute[1])))
                ) {
                  //no match for filter
                  return true;
                }
                return false;
              }
            );
            // no match for filter
            if (filterThis === undefined) {
              return false;
            }
          }
          this.filterCounter++;
          return true;
        })
        .sort((a, b) => {
          // sort by selected filter
          if (this.displaySelected !== null) {
            if (this.displaySelected.sortBy) {
              return (
                b[this.displaySelected.sortBy] - a[this.displaySelected.sortBy]
              );
            }
          }
          // or default sort
          return a[this.defaultSort] - b[this.defaultSort];
        })
        .map(user => {
          // from template to a list item
          const prepare = [];

          prepare.className = user.logoIcon ? "holder icon" : "holder";
          prepare.attributes = this.displayAttributes
            .map(displayAttribute => {
              if (!user.attributes) {
                return;
              }
              //match displayAttribute with user.attribute
              const value = user.attributes[displayAttribute];
              if (!value) {
                return;
              }

              if (displayAttribute === "testimonial") {
                return (
                  '<div class="testimonial"><div class="hr"><span>“</span></div><div class="test">' +
                  value +
                  "</div></div>"
                );
              } else {
                // flairs flairs
                return '<div class="' + displayAttribute + '"></div>';
              }
            })
            .join("");

          let template = this.template(userTemplate, prepare); // prepare
          template = this.template(template, user); // user

          const li = document.createElement("li");
          li.innerHTML = template.replace(clean, "");
          return li;
        });
    }

    // testimonial rows moved to every 7th position
    const testimonialList = [this.renderAdd()];

    let currentPosition = 1;
    userList.forEach(li => {
      const wholeRowPosition = currentPosition % 6 === 0;
      const testimonial = /class="testimonial"/i.test(li.innerHTML);
      // pop testimonial in our array
      if (testimonial) {
        testimonialList.push(li);
        return; // save for later
      }

      list.appendChild(li);
      currentPosition++;

      if (wholeRowPosition && testimonialList.length > 0) {
        const currentTestimional = testimonialList.pop(); //shift
        currentTestimional.className = "row";
        list.appendChild(currentTestimional);
      }
    });

    // if testimonialList not empty
    testimonialList.forEach(li => {
      if (li.className !== "row") {
        // non renderAdd()
        li.className = "row";
        list.appendChild(li);
      }
    });

    // stats
    this.container.appendChild(this.renderStats());

    // header
    this.container.appendChild(this.renderHeader());

    // render
    this.container.appendChild(list);
  }

  renderHeader() {
    const div = document.createElement("div");
    div.className = "filter";

    this.displayOptions.map((option, i) => {
      const dot = document.createElement("span");
      dot.innerHTML = " &middot; ";

      const a = document.createElement("a");
      a.className = this.displaySelected === option ? "active" : "";
      a.innerHTML = option.label;
      a.href = "#";
      a.addEventListener("click", event => {
        event.preventDefault();
        this.displaySelected = option;
        this.renderList();
      });
      i > 0 && div.appendChild(dot);
      div.appendChild(a);
    });
    return div;
  }

  renderAdd() {
    const li = document.createElement("li");
    li.className = "row";

    const button = document.createElement("button");
    button.innerHTML = "Add your company";
    button.addEventListener("click", event => {
      event.preventDefault();
      window.open("https://build.amsterdam/your-company/babel");
    });
    li.appendChild(button);
    return li;
  }

  renderStats() {
    const div = document.createElement("div");
    div.className = "stats";

    div.innerHTML =
      (this.displaySelected && this.displaySelected.filterBy
        ? "Showing " + this.filterCounter + " out of " + this.totalCounter
        : "Showing " + this.totalCounter) + " users.";
    return div;
  }

  renderError(msg) {
    const div = document.createElement("div");
    div.className = "error";
    div.innerHTML = msg;
    this.container.appendChild(div);
  }

  template(template, data) {
    const keyTemplate = "\\${key}";
    return (Object.keys(data) || []).reduce((template, key) => {
      const val =
        data[key] !== undefined && data[key] !== null ? data[key] : "";
      return template.replace(
        new RegExp(keyTemplate.replace("key", key), "gi"),
        val
      );
    }, template);
  }

  arrayize(obj) {
    return Object.keys(obj).map(key => {
      const item = obj[key];
      item._key = key;
      return item;
    });
  }
}

[...document.querySelectorAll(".users")].forEach(elem => new Users(elem));
