class Admin {
    constructor() {
        this.myDiv = document.querySelector("#myDiv");
        this.myDiv2 = document.querySelector("#myDiv2");
        this.myDiv3 = document.querySelector("#myDiv3");
        this.containerDiv = document.createElement("div");
        this.containerDiv.id = "adminContainerDiv";
        this.search = document.createElement("input");
        this.search.placeholder = "search";
        this.myDiv.appendChild(this.search);
        
        this.search.addEventListener("input", (event) => {
            this.editEvents();
        })

        

        

        fetch("http://localhost:3000/admininfo")
            .then((results) => {
                return results.json();
            })
            .then((data) => {
                this.data = data;
                this.editEvents();
            })


    }
    editEvents() {
        while (this.containerDiv.firstChild) {
            this.containerDiv.removeChild(this.containerDiv.firstChild);
            
        }
        this.idP = document.createElement("p");
        this.idP.textContent = `id`
        this.idDiv = document.createElement("div");
        this.idDiv.appendChild(this.idP);


        this.namePtitle = document.createElement("p");
        this.namePtitle.textContent = `navn`
        this.nameDiv = document.createElement("div");
        this.nameDiv.appendChild(this.namePtitle);


        this.categoryPtitle = document.createElement("p");
        this.categoryPtitle.textContent = `kategori`
        this.categoryDiv = document.createElement("div");
        this.categoryDiv.appendChild(this.categoryPtitle);


        this.roomPtitle = document.createElement("p");
        this.roomPtitle.textContent = `sal`
        this.roomDiv = document.createElement("div");
        this.roomDiv.appendChild(this.roomPtitle);

        // this.createElement ("sal", this.roomPtitle)


        this.durationPtitle = document.createElement("p");
        this.durationPtitle.textContent = `varighed`
        this.durationDiv = document.createElement("div");
        this.durationDiv.appendChild(this.durationPtitle);


        this.pricePtitle = document.createElement("p");
        this.pricePtitle.textContent = `pris`
        this.priceDiv = document.createElement("div");
        this.priceDiv.appendChild(this.pricePtitle);


        this.timePtitle = document.createElement("p");
        this.timePtitle.textContent = `tid`
        this.timeDiv = document.createElement("div");
        this.timeDiv.appendChild(this.timePtitle);


        this.actionPtitle = document.createElement("p");
        this.actionPtitle.textContent = `action`
        this.actionDiv = document.createElement("div");
        this.actionDiv.appendChild(this.actionPtitle);


        this.data.data.forEach((element) => {
            if (element.name.indexOf(this.search.value) != -1 || element.time.indexOf(this.search.value) != -1 || element.category.indexOf(this.search.value) != -1 || element.room.indexOf(this.search.value) != -1) {
                this.idP = document.createElement("p");
                this.idP.textContent = element.id;
                this.idDiv.appendChild(this.idP)


                this.nameP = document.createElement("p");
                this.nameP.textContent = element.name;
                this.nameDiv.appendChild(this.nameP)


                this.categoryP = document.createElement("p");
                this.categoryP.textContent = element.category;
                this.categoryDiv.appendChild(this.categoryP)


                this.roomP = document.createElement("p");
                this.roomP.textContent = element.room;
                this.roomDiv.appendChild(this.roomP)


                this.durationP = document.createElement("p");
                this.durationP.textContent = element.duration;
                this.durationDiv.appendChild(this.durationP)


                this.priceP = document.createElement("p");
                this.priceP.textContent = element.price;
                this.priceDiv.appendChild(this.priceP)


                this.timeP = document.createElement("p");
                this.timeP.textContent = element.time;
                this.timeDiv.appendChild(this.timeP)


                this.currentActionDiv = document.createElement("div");
                this.editButton = document.createElement("img");
                this.editButton.src = "/img/pen.png";
                this.editButton.title = "redigere event " + element.name
                this.editButton.style.cursor = "pointer";
                this.deleteButton = document.createElement("img");
                this.deleteButton.src = "/img/trash.png";
                this.deleteButton.style.cursor = "pointer";
                this.deleteButton.title = "slet event " + element.name
                this.currentActionDiv.appendChild(this.editButton);
                this.currentActionDiv.appendChild(this.deleteButton);
                this.actionDiv.appendChild(this.currentActionDiv);
                this.editButton.addEventListener("click", () => {
                    while (this.myDiv2.firstChild) {
                        this.myDiv2.removeChild(this.myDiv2.firstChild);
                    }
                    this.myDiv2.style.display = "flex";
                    this.ax = document.createElement("a")
                    this.ax.textContent = "x";
                    this.ax.addEventListener("click", (event) => {
                        while (this.myDiv2.firstChild) {
                            this.myDiv2.removeChild(this.myDiv2.firstChild);
                            this.myDiv2.style.display = "none";
                        }
                    })
                    this.myDiv2.appendChild(this.ax);
                    this.inputDiv = document.createElement("div");
                    this.inputDiv.id = "inputDiv";
                    this.labelDiv = document.createElement("div");
                    this.labelDiv.id = "labelDiv";

                    this.nameLabel = document.createElement("label");
                    this.nameLabel.textContent = "navn"
                    this.labelDiv.appendChild(this.nameLabel);


                    this.categoryLabel = document.createElement("label");
                    this.categoryLabel.textContent = "kategori"
                    this.labelDiv.appendChild(this.categoryLabel);

                    this.roomLabel = document.createElement("label");
                    this.roomLabel.textContent = "sal"
                    this.labelDiv.appendChild(this.roomLabel);

                    this.durationLabel = document.createElement("label");
                    this.durationLabel.textContent = "varighed"
                    this.labelDiv.appendChild(this.durationLabel);

                    this.priceLabel = document.createElement("label");
                    this.priceLabel.textContent = "pris"
                    this.labelDiv.appendChild(this.priceLabel);

                    this.timeLabel = document.createElement("label");
                    this.timeLabel.textContent = "tid"
                    this.labelDiv.appendChild(this.timeLabel);


                    this.nameInput = document.createElement("input");
                    this.nameInput.placeholder = "name";
                    this.nameInput.value = element.name;

                    this.inputDiv.appendChild(this.nameInput);

                    this.catSelect = document.createElement("select");
                    this.catSelectDefaultOption = document.createElement("option");
                    this.catSelectDefaultOption.value = 0;
                    this.catSelectDefaultOption.textContent = "vælg en kategori";
                    this.catSelect.appendChild(this.catSelectDefaultOption);
                    this.data.cat.forEach((catElement) => {
                        this.catOption = document.createElement("option")
                        this.catOption.value = catElement.id;
                        this.catOption.textContent = catElement.name;
                        this.catSelect.appendChild(this.catOption);
                    })
                    this.catSelect.value = element.fk_category;
                    this.catSelectDiv = document.createElement("div");
                    this.catSelectDiv.appendChild(this.catSelect);
                    this.catSelectImage = document.createElement("img");
                    this.catSelectImage.src = "/img/plus.png";
                    this.catSelectImage.style.cursor = "pointer";
                    this.catSelectImage.title = "opret ny kategori"
                    this.catSelectDiv.appendChild(this.catSelectImage);


                    this.catSelectImage.addEventListener("click", (event) => {
                        while (this.myDiv3.firstChild) {
                            this.myDiv3.removeChild(this.myDiv3.firstChild);
                        }
                        this.catax = document.createElement("a")
                        this.catax.textContent = "x";
                        this.myDiv3.appendChild(this.catax);
                        this.catax.addEventListener("click", (event) => {
                            while (this.myDiv3.firstChild) {
                                this.myDiv3.removeChild(this.myDiv3.firstChild);
                                this.myDiv3.style.display = "none";
                            }
                        })
                        this.myDiv3.style.display = "flex";
                        this.div3Catlabel = document.createElement("label");
                        this.div3Catlabel.textContent = "kategori"
                        this.div3CatInput = document.createElement("input");
                        this.div3CatInput.placeholder = "kategori";

                        // this.catSubmitCancelDiv = document.createElement("div");
                        this.catSubmitButton = document.createElement("button");
                        this.catSubmitButton.textContent = "submit";
                        this.catCancelButton = document.createElement("button");
                        this.catCancelButton.textContent = "cancel";
                        this.myDiv3Container = document.createElement("div");
                        this.myDiv3Container.id = "myDiv3Container";
                        this.myDiv3Container.appendChild(this.div3Catlabel);
                        this.myDiv3Container.appendChild(this.div3CatInput);
                        this.myDiv3.appendChild(this.myDiv3Container)
                        this.myDiv3.appendChild(this.catSubmitButton);
                        this.myDiv3.appendChild(this.catCancelButton);
                        this.catCancelButton.addEventListener("click", (event) => {
                            while (this.myDiv3.firstChild) {
                                this.myDiv3.removeChild(this.myDiv3.firstChild);
                                this.myDiv3.style.display = "none";
                            }
                        })
                        this.catSubmitButton.addEventListener("click", (event) => {
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/json');
                            this.obj = JSON.stringify({
                                category: this.div3CatInput.value
                            });
                            console.log(this.obj);
                            let init = {
                                method: 'POST',
                                headers: headers,
                                body: this.obj,
                                credentials: 'include',
                                cache: 'no-cache',
                                mode: 'cors'
                            };
                            fetch("http://localhost:3000/addcat/", init)
                            fetch("http://localhost:3000/admininfo")
                                .then((results) => {
                                    return results.json();
                                })
                                .then((data) => {
                                    this.data = data;
                                    this.editEvents();
                                    while (this.catSelect.firstChild) {
                                        this.catSelect.removeChild(this.catSelect.firstChild);
                                    }
                                    this.catSelectDefaultOption = document.createElement("option");
                                    this.catSelectDefaultOption.value = 0;
                                    this.catSelectDefaultOption.textContent = "vælg en kategori";
                                    this.catSelect.appendChild(this.catSelectDefaultOption);
                                    this.data.cat.forEach((catElement) => {
                                        this.catOption = document.createElement("option")
                                        this.catOption.value = catElement.id;
                                        this.catOption.textContent = catElement.name;
                                        this.catSelect.appendChild(this.catOption);
                                    })
                                    this.catSelect.value = element.fk_category;
                                    while (this.myDiv3.firstChild) {
                                        this.myDiv3.removeChild(this.myDiv3.firstChild);
                                        this.myDiv3.style.display = "none";
                                    }
                                })

                        })

                    })

                    this.inputDiv.appendChild(this.catSelectDiv);
                    this.roomSelect = document.createElement("select");
                    this.roomSelectDefaultOption = document.createElement("option");
                    this.roomSelectDefaultOption.value = 0;
                    this.roomSelectDefaultOption.textContent = "vælg en sal";
                    this.roomSelect.appendChild(this.roomSelectDefaultOption);
                    this.data.room.forEach((roomElement) => {
                        this.roomOption = document.createElement("option")
                        this.roomOption.value = roomElement.id;
                        this.roomOption.textContent = roomElement.name;
                        this.roomSelect.appendChild(this.roomOption);
                    })
                    this.roomSelect.value = element.fk_room;
                    this.roomSelectDiv = document.createElement("div");
                    this.roomSelectDiv.appendChild(this.roomSelect);
                    this.roomSelectImage = document.createElement("img");
                    this.roomSelectImage.src = "/img/plus.png";
                    this.roomSelectImage.style.cursor = "pointer";
                    this.roomSelectImage.title = "opret ny sal"

                    this.roomSelectImage.addEventListener("click", (event) => {
                        while (this.myDiv3.firstChild) {
                            this.myDiv3.removeChild(this.myDiv3.firstChild);
                        }
                        this.roomax = document.createElement("a")
                        this.roomax.textContent = "x";
                        this.myDiv3.appendChild(this.roomax);
                        this.roomax.addEventListener("click", (event) => {
                            while (this.myDiv3.firstChild) {
                                this.myDiv3.removeChild(this.myDiv3.firstChild);
                                this.myDiv3.style.display = "none";
                            }
                        })
                        this.myDiv3.style.display = "flex";
                        this.div3roomlabel = document.createElement("label");
                        this.div3roomlabel.textContent = "sal"
                        this.div3roomInput = document.createElement("input");
                        this.div3roomInput.placeholder = "navn";

                        this.div3rowlabel = document.createElement("label");
                        this.div3rowlabel.textContent = "rækker"
                        this.div3rowInput = document.createElement("input");
                        this.div3rowInput.placeholder = "rækker";

                        this.div3seatlabel = document.createElement("label");
                        this.div3seatlabel.textContent = "sædder"
                        this.div3seatInput = document.createElement("input");
                        this.div3seatInput.placeholder = "sædder";


                        // this.roomSubmitCancelDiv = document.createElement("div");
                        this.roomSubmitButton = document.createElement("button");
                        this.roomSubmitButton.textContent = "submit";
                        this.roomCancelButton = document.createElement("button");
                        this.roomCancelButton.textContent = "cancel";
                        this.myDiv3Container = document.createElement("div");
                        this.myDiv3Container.id = "myDiv3Container";
                        this.myDiv3Container.appendChild(this.div3roomlabel);
                        this.myDiv3Container.appendChild(this.div3roomInput);
                        this.myDiv3Container.appendChild(this.div3rowlabel);
                        this.myDiv3Container.appendChild(this.div3rowInput);
                        this.myDiv3Container.appendChild(this.div3seatlabel);
                        this.myDiv3Container.appendChild(this.div3seatInput);
                        this.myDiv3.appendChild(this.myDiv3Container);
                        this.myDiv3.appendChild(this.roomSubmitButton);
                        this.myDiv3.appendChild(this.roomCancelButton);
                        this.roomCancelButton.addEventListener("click", (event) => {
                            while (this.myDiv3.firstChild) {
                                this.myDiv3.removeChild(this.myDiv3.firstChild);
                                this.myDiv3.style.display = "none";
                            }
                        })
                        this.roomSubmitButton.addEventListener("click", (event) => {
                            let headers = new Headers();
                            headers.append('Content-Type', 'application/json');
                            this.obj = JSON.stringify({
                                room: this.div3roomInput.value,
                                rows: this.div3rowInput.value,
                                seat: this.div3seatInput.value
                            });
                            console.log(this.obj);
                            let init = {
                                method: 'POST',
                                headers: headers,
                                body: this.obj,
                                credentials: 'include',
                                cache: 'no-cache',
                                mode: 'cors'
                            };
                            fetch("http://localhost:3000/addroom/", init)
                            fetch("http://localhost:3000/admininfo")
                                .then((results) => {
                                    return results.json();
                                })
                                .then((data) => {
                                    this.data = data;
                                    this.editEvents();
                                    while (this.roomSelect.firstChild) {
                                        this.roomSelect.removeChild(this.roomSelect.firstChild);
                                    }
                                    this.roomSelectDefaultOption = document.createElement("option");
                                    this.roomSelectDefaultOption.value = 0;
                                    this.roomSelectDefaultOption.textContent = "vælg en kategori";
                                    this.roomSelect.appendChild(this.roomSelectDefaultOption);
                                    this.data.room.forEach((roomElement) => {
                                        this.roomOption = document.createElement("option")
                                        this.roomOption.value = roomElement.id;
                                        this.roomOption.textContent = roomElement.name;
                                        this.roomSelect.appendChild(this.roomOption);
                                    })
                                    this.roomSelect.value = element.fk_room;
                                    while (this.myDiv3.firstChild) {
                                        this.myDiv3.removeChild(this.myDiv3.firstChild);
                                        this.myDiv3.style.display = "none";
                                    }
                                })

                        })

                    })
                    this.roomSelectDiv.appendChild(this.roomSelectImage);


                    this.inputDiv.appendChild(this.roomSelectDiv);

                    this.durationInput = document.createElement("input");
                    this.durationInput.placeholder = "duration";
                    this.durationInput.type = "number";
                    this.durationInput.value = element.duration;
                    this.inputDiv.appendChild(this.durationInput);

                    this.priceInput = document.createElement("input");
                    this.priceInput.placeholder = "price";
                    this.priceInput.type = "number";
                    this.priceInput.value = element.price;
                    this.inputDiv.appendChild(this.priceInput);


                    this.timeInput = document.createElement("input");
                    this.timeInput.placeholder = "time";
                    this.timeInput.type = "date";
                    this.timeInput.value = element.time;
                    this.inputDiv.appendChild(this.timeInput);
                    this.myDiv2.appendChild(this.labelDiv);
                    this.myDiv2.appendChild(this.inputDiv);

                    this.submitCancelDiv = document.createElement("div");
                    this.submitButton = document.createElement("button");
                    this.submitButton.textContent = "submit";
                    this.cancelButton = document.createElement("button");
                    this.cancelButton.textContent = "cancel";
                    this.submitCancelDiv.appendChild(this.submitButton);
                    this.submitCancelDiv.appendChild(this.cancelButton);
                    this.cancelButton.addEventListener("click", (event) => {
                        while (this.myDiv2.firstChild) {
                            this.myDiv2.removeChild(this.myDiv2.firstChild);
                            this.myDiv2.style.display = "none";
                        }
                    })
                    this.submitButton.addEventListener("click", (event) => {
                        let headers = new Headers();
                        headers.append('Content-Type', 'application/json');
                        this.obj = JSON.stringify({
                            name: this.nameInput.value, category: this.catSelect.value, room: this.roomSelect.value,
                            duration: this.durationInput.value, price: this.priceInput.value, time: this.timeInput.value
                        });
                        console.log(this.obj);
                        let init = {
                            method: 'PUT',
                            headers: headers,
                            body: this.obj,
                            credentials: 'include',
                            cache: 'no-cache',
                            mode: 'cors'
                        };
                        fetch("http://localhost:3000/editevent/" + element.id, init)
                        fetch("http://localhost:3000/admininfo")
                            .then((results) => {
                                return results.json();
                            })
                            .then((data) => {
                                this.data = data;
                                this.editEvents();
                                while (this.myDiv2.firstChild) {
                                    this.myDiv2.removeChild(this.myDiv2.firstChild);
                                    this.myDiv2.style.display = "none";
                                }
                            })

                    })

                    this.myDiv2.appendChild(this.submitCancelDiv);
                })
                this.deleteButton.addEventListener("click", () => {
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/json');
                    let init = {
                        method: 'DELETE',
                        headers: headers,
                        credentials: 'include',
                        cache: 'no-cache',
                        mode: 'cors'
                    };
                    fetch("http://localhost:3000/admindel/" + element.id, init)
                    fetch("http://localhost:3000/admininfo")
                        .then((results) => {
                            return results.json();
                        })
                        .then((data) => {
                            this.data = data;
                            this.editEvents();
                        })

                })

            }
        })
        this.containerDiv.appendChild(this.idDiv);
        this.containerDiv.appendChild(this.nameDiv);
        this.containerDiv.appendChild(this.categoryDiv);
        this.containerDiv.appendChild(this.roomDiv);
        this.containerDiv.appendChild(this.durationDiv);
        this.containerDiv.appendChild(this.priceDiv);
        this.containerDiv.appendChild(this.timeDiv);
        this.containerDiv.appendChild(this.actionDiv);
        this.myDiv.appendChild(this.containerDiv);


        this.adminCreate = document.querySelector(".adminCreate")
        this.adminCreate.addEventListener("click", (event) => {
            this.createEvent();
        })



    }
    createEvent() {


        this.myDiv2.style.display = "flex";
        this.ax = document.createElement("a")
        this.ax.textContent = "x";
        this.ax.addEventListener("click", (event) => {
            while (this.myDiv2.firstChild) {
                this.myDiv2.removeChild(this.myDiv2.firstChild);
                this.myDiv2.style.display = "none";
            }
        })
        this.myDiv2.appendChild(this.ax);
        this.inputDiv = document.createElement("div");
        this.inputDiv.id = "inputDiv";
        this.labelDiv = document.createElement("div");
        this.labelDiv.id = "labelDiv";

        this.nameLabel = document.createElement("label");
        this.nameLabel.textContent = "navn"
        this.labelDiv.appendChild(this.nameLabel);


        this.categoryLabel = document.createElement("label");
        this.categoryLabel.textContent = "kategori"
        this.labelDiv.appendChild(this.categoryLabel);

        this.roomLabel = document.createElement("label");
        this.roomLabel.textContent = "sal"
        this.labelDiv.appendChild(this.roomLabel);

        this.durationLabel = document.createElement("label");
        this.durationLabel.textContent = "varighed"
        this.labelDiv.appendChild(this.durationLabel);

        this.priceLabel = document.createElement("label");
        this.priceLabel.textContent = "pris"
        this.labelDiv.appendChild(this.priceLabel);

        this.timeLabel = document.createElement("label");
        this.timeLabel.textContent = "tid"
        this.labelDiv.appendChild(this.timeLabel);


        this.nameInput = document.createElement("input");
        this.nameInput.placeholder = "name";

        this.inputDiv.appendChild(this.nameInput);

        this.catSelect = document.createElement("select");
        this.catSelectDefaultOption = document.createElement("option");
        this.catSelectDefaultOption.value = 0;
        this.catSelectDefaultOption.textContent = "vælg en kategori";
        this.catSelect.appendChild(this.catSelectDefaultOption);
        this.data.cat.forEach((catElement) => {
            this.catOption = document.createElement("option")
            this.catOption.value = catElement.id;
            this.catOption.textContent = catElement.name;
            this.catSelect.appendChild(this.catOption);
        })

        this.catSelectDiv = document.createElement("div");
        this.catSelectDiv.appendChild(this.catSelect);
        this.catSelectImage = document.createElement("img");
        this.catSelectImage.src = "/img/plus.png";
        this.catSelectImage.title = "opret ny kategori"
        this.catSelectDiv.appendChild(this.catSelectImage);


        this.catSelectImage.addEventListener("click", (event) => {
            this.catax = document.createElement("a")
            this.catax.textContent = "x";
            this.myDiv3.appendChild(this.catax);
            this.catax.addEventListener("click", (event) => {
                while (this.myDiv3.firstChild) {
                    this.myDiv3.removeChild(this.myDiv3.firstChild);
                    this.myDiv3.style.display = "none";
                }
            })
            this.myDiv3.style.display = "flex";
            this.div3Catlabel = document.createElement("label");
            this.div3Catlabel.textContent = "kategori"
            this.div3CatInput = document.createElement("input");
            this.div3CatInput.placeholder = "kategori";

            // this.catSubmitCancelDiv = document.createElement("div");
            this.catSubmitButton = document.createElement("button");
            this.catSubmitButton.textContent = "submit";
            this.catCancelButton = document.createElement("button");
            this.catCancelButton.textContent = "cancel";
            this.myDiv3Container = document.createElement("div");
            this.myDiv3Container.id = "myDiv3Container";
            this.myDiv3Container.appendChild(this.div3Catlabel);
            this.myDiv3Container.appendChild(this.div3CatInput);
            this.myDiv3.appendChild(this.myDiv3Container)
            this.myDiv3.appendChild(this.catSubmitButton);
            this.myDiv3.appendChild(this.catCancelButton);
            this.catCancelButton.addEventListener("click", (event) => {
                while (this.myDiv3.firstChild) {
                    this.myDiv3.removeChild(this.myDiv3.firstChild);
                    this.myDiv3.style.display = "none";
                }
            })
            this.catSubmitButton.addEventListener("click", (event) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                this.obj = JSON.stringify({
                    category: this.div3CatInput.value
                });
                console.log(this.obj);
                let init = {
                    method: 'POST',
                    headers: headers,
                    body: this.obj,
                    credentials: 'include',
                    cache: 'no-cache',
                    mode: 'cors'
                };
                fetch("http://localhost:3000/addcat/", init)
                fetch("http://localhost:3000/admininfo")
                    .then((results) => {
                        return results.json();
                    })
                    .then((data) => {
                        this.data = data;
                        this.editEvents();
                        while (this.catSelect.firstChild) {
                            this.catSelect.removeChild(this.catSelect.firstChild);
                        }
                        this.catSelectDefaultOption = document.createElement("option");
                        this.catSelectDefaultOption.value = 0;
                        this.catSelectDefaultOption.textContent = "vælg en kategori";
                        this.catSelect.appendChild(this.catSelectDefaultOption);
                        this.data.cat.forEach((catElement) => {
                            this.catOption = document.createElement("option")
                            this.catOption.value = catElement.id;
                            this.catOption.textContent = catElement.name;
                            this.catSelect.appendChild(this.catOption);
                        })
                        while (this.myDiv3.firstChild) {
                            this.myDiv3.removeChild(this.myDiv3.firstChild);
                            this.myDiv3.style.display = "none";
                        }
                    })

            })

        })

        this.inputDiv.appendChild(this.catSelectDiv);
        this.roomSelect = document.createElement("select");
        this.roomSelectDefaultOption = document.createElement("option");
        this.roomSelectDefaultOption.value = 0;
        this.roomSelectDefaultOption.textContent = "vælg en sal";
        this.roomSelect.appendChild(this.roomSelectDefaultOption);
        this.data.room.forEach((roomElement) => {
            this.roomOption = document.createElement("option")
            this.roomOption.value = roomElement.id;
            this.roomOption.textContent = roomElement.name;
            this.roomSelect.appendChild(this.roomOption);
        })

        this.roomSelectDiv = document.createElement("div");
        this.roomSelectDiv.appendChild(this.roomSelect);
        this.roomSelectImage = document.createElement("img");
        this.roomSelectImage.src = "/img/plus.png";
        this.roomSelectImage.title = "opret ny sal"

        this.roomSelectImage.addEventListener("click", (event) => {
            this.roomax = document.createElement("a")
            this.roomax.textContent = "x";
            this.myDiv3.appendChild(this.roomax);
            this.roomax.addEventListener("click", (event) => {
                while (this.myDiv3.firstChild) {
                    this.myDiv3.removeChild(this.myDiv3.firstChild);
                    this.myDiv3.style.display = "none";
                }
            })
            this.myDiv3.style.display = "flex";
            this.div3roomlabel = document.createElement("label");
            this.div3roomlabel.textContent = "sal"
            this.div3roomInput = document.createElement("input");
            this.div3roomInput.placeholder = "navn";

            this.div3rowlabel = document.createElement("label");
            this.div3rowlabel.textContent = "rækker"
            this.div3rowInput = document.createElement("input");
            this.div3rowInput.placeholder = "rækker";

            this.div3seatlabel = document.createElement("label");
            this.div3seatlabel.textContent = "sædder"
            this.div3seatInput = document.createElement("input");
            this.div3seatInput.placeholder = "sædder";


            // this.roomSubmitCancelDiv = document.createElement("div");
            this.roomSubmitButton = document.createElement("button");
            this.roomSubmitButton.textContent = "submit";
            this.roomCancelButton = document.createElement("button");
            this.roomCancelButton.textContent = "cancel";
            this.myDiv3Container = document.createElement("div");
            this.myDiv3Container.id = "myDiv3Container";
            this.myDiv3Container.appendChild(this.div3roomlabel);
            this.myDiv3Container.appendChild(this.div3roomInput);
            this.myDiv3Container.appendChild(this.div3rowlabel);
            this.myDiv3Container.appendChild(this.div3rowInput);
            this.myDiv3Container.appendChild(this.div3seatlabel);
            this.myDiv3Container.appendChild(this.div3seatInput);
            this.myDiv3.appendChild(this.myDiv3Container);
            this.myDiv3.appendChild(this.roomSubmitButton);
            this.myDiv3.appendChild(this.roomCancelButton);
            this.roomCancelButton.addEventListener("click", (event) => {
                while (this.myDiv3.firstChild) {
                    this.myDiv3.removeChild(this.myDiv3.firstChild);
                    this.myDiv3.style.display = "none";
                }
            })
            this.roomSubmitButton.addEventListener("click", (event) => {
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                this.obj = JSON.stringify({
                    room: this.div3roomInput.value,
                    rows: this.div3rowInput.value,
                    seat: this.div3seatInput.value
                });
                console.log(this.obj);
                let init = {
                    method: 'POST',
                    headers: headers,
                    body: this.obj,
                    credentials: 'include',
                    cache: 'no-cache',
                    mode: 'cors'
                };
                fetch("http://localhost:3000/addroom/", init)
                fetch("http://localhost:3000/admininfo")
                    .then((results) => {
                        return results.json();
                    })
                    .then((data) => {
                        this.data = data;
                        this.editEvents();
                        while (this.roomSelect.firstChild) {
                            this.roomSelect.removeChild(this.roomSelect.firstChild);
                        }
                        this.roomSelectDefaultOption = document.createElement("option");
                        this.roomSelectDefaultOption.value = 0;
                        this.roomSelectDefaultOption.textContent = "vælg en kategori";
                        this.roomSelect.appendChild(this.roomSelectDefaultOption);
                        this.data.room.forEach((roomElement) => {
                            this.roomOption = document.createElement("option")
                            this.roomOption.value = roomElement.id;
                            this.roomOption.textContent = roomElement.name;
                            this.roomSelect.appendChild(this.roomOption);
                        })
                        this.roomSelect.value = element.fk_room;
                        while (this.myDiv3.firstChild) {
                            this.myDiv3.removeChild(this.myDiv3.firstChild);
                            this.myDiv3.style.display = "none";
                        }
                    })

            })

        })
        this.roomSelectDiv.appendChild(this.roomSelectImage);


        this.inputDiv.appendChild(this.roomSelectDiv);

        this.durationInput = document.createElement("input");
        this.durationInput.placeholder = "duration";
        this.durationInput.type = "number";

        this.inputDiv.appendChild(this.durationInput);

        this.priceInput = document.createElement("input");
        this.priceInput.placeholder = "price";
        this.priceInput.type = "number";

        this.inputDiv.appendChild(this.priceInput);


        this.timeInput = document.createElement("input");
        this.timeInput.placeholder = "time";
        this.timeInput.type = "date";

        this.inputDiv.appendChild(this.timeInput);
        this.myDiv2.appendChild(this.labelDiv);
        this.myDiv2.appendChild(this.inputDiv);

        this.submitCancelDiv = document.createElement("div");
        this.submitButton = document.createElement("button");
        this.submitButton.textContent = "submit";
        this.cancelButton = document.createElement("button");
        this.cancelButton.textContent = "cancel";
        this.submitCancelDiv.appendChild(this.submitButton);
        this.submitCancelDiv.appendChild(this.cancelButton);
        this.cancelButton.addEventListener("click", (event) => {
            while (this.myDiv2.firstChild) {
                this.myDiv2.removeChild(this.myDiv2.firstChild);
                this.myDiv2.style.display = "none";
            }
        })
        this.submitButton.addEventListener("click", (event) => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            this.obj = JSON.stringify({
                name: this.nameInput.value, category: this.catSelect.value, room: this.roomSelect.value,
                duration: this.durationInput.value, price: this.priceInput.value, time: this.timeInput.value
            });
            console.log(this.obj);
            let init = {
                method: 'POST',
                headers: headers,
                body: this.obj,
                credentials: 'include',
                cache: 'no-cache',
                mode: 'cors'
            };
            fetch("http://localhost:3000/createevent/", init)
            fetch("http://localhost:3000/admininfo")
                .then((results) => {
                    return results.json();
                })
                .then((data) => {
                    this.data = data;
                    this.editEvents();
                    while (this.myDiv2.firstChild) {
                        this.myDiv2.removeChild(this.myDiv2.firstChild);
                        this.myDiv2.style.display = "none";
                    }
                })

        })

        this.myDiv2.appendChild(this.submitCancelDiv);

    }
}
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    let admin = new Admin();

})