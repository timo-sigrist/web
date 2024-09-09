//desk class
class DeskObject {

    constructor(id, name, available, address, price, latitude, longitude, comment) {
        this.id = id;
        this.name = name;
        this.available = available;
        this.address = address;
        this.price = price;
        this.latitude = latitude;
        this.longitude = longitude;
        this.comment = comment;
      }

    getIcon() {
        if (this.available == 1) {
          return '<img src="img/checkicon.png" class="icon" alt="Check Icon">';
        } else {
          return '<img src="img/crossicon.png" class="icon" alt="Cross Icon">';
        }
      }

    getClass() {
        if (this.available == 0) {
            return "table-danger";
          } else {
            return "table";
          }
    }

    getChf() {
        const roundedPrice = this.price * 1.0;
        return roundedPrice.toFixed(2);
    }

    async getEuro() {
        return new Promise((resolve, reject) => {
            fetch('https://api.exchangerate.host/convert?from=CHF&to=EUR')
                .then(response => response.json()).then(data => {
                    const rate = data.result;
                    const euro = this.price * rate; 
                    resolve(euro.toFixed(2));
                }).catch(error => {
                    console.error('exchangerate is unavailable', error);
                    reject('0');
                });
        });
    }
}


class ReservationObject {
    constructor(id, deskid, start, end, user, email, studid){
        this.id = id;
        this.deskId = deskid;
        this.start = start;
        this.end = end;
        this.user = user;
        this.email = email;
        this.studid = studid;
    }

    getStartTime() {
        const startDate = new Date(this.start);
        return startDate.getHours() +":" + startDate.getMinutes();
    }

    getStartDate() {
        const startDate = new Date(this.start);
        return startDate.getDay() + "." + startDate.getMonth() + "." + startDate.getFullYear();
    }

    getEndTime() {
        const endDate = new Date(this.end);
        return endDate.getHours() +":" + endDate.getMinutes();
    }

    getEndDate() {
        const endDate = new Date(this.end);
        return endDate.getDay() + "." + endDate.getMonth() + "." + endDate.getFullYear();
    }

}

// var for leaflet map
var map = null;

async function init() {
    loadAllDesks();
    // add currencyToggle
    const currencyToggle = document.getElementById('currencyToggle');
    currencyToggle.addEventListener('change', function(event) {
        loadAllDesks();
    });

    var currentDate = new Date();
    // Get the current date in the format YYYY-MM-DD
    var year = currentDate.getFullYear();
    var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    var day = currentDate.getDate().toString().padStart(2, '0');
    var currentDateFormatted = year + '-' + month + '-' + day;
    
    // Get the current time in the format HH:MM
    var hours = currentDate.getHours().toString().padStart(2, '0');
    var minutes = currentDate.getMinutes().toString().padStart(2, '0');
    var currentTimeFormatted = hours + ':' + minutes;

    // One hour later
    var oneHourLater = new Date(currentDate.getTime() + (60 * 60 * 1000)); // Add 1 hour in milliseconds
    var oneHourLaterHours = oneHourLater.getHours().toString().padStart(2, '0');
    var oneHourLaterMinutes = oneHourLater.getMinutes().toString().padStart(2, '0');
    var oneHourLaterFormatted = oneHourLaterHours + ':' + oneHourLaterMinutes;
    
    const fromDate = document.getElementById('fromDateInput');
    const fromTime = document.getElementById('fromTimeInput')
    const toDate = document.getElementById('toDateInput');
    const toTime = document.getElementById('toTimeInput');

    fromDate.value = currentDateFormatted;
    fromTime.value = currentTimeFormatted;
    toDate.value = currentDateFormatted;
    toTime.value = oneHourLaterFormatted;

    fromDate.addEventListener('change', swapDateTimeInputs);
    fromTime.addEventListener('change', swapDateTimeInputs);
    toDate.addEventListener('change', swapDateTimeInputs);
    toTime.addEventListener('change', swapDateTimeInputs);

    loadReservationList();
}

// swaps the date and time values if the end is lager than start
function swapDateTimeInputs() {
    const fromDate = document.getElementById('fromDateInput');
    const fromTime = document.getElementById('fromTimeInput')
    const toDate = document.getElementById('toDateInput');
    const toTime = document.getElementById('toTimeInput');

    const startDateTime = new Date(fromDate.value + 'T' +  fromTime.value + ":00");
    const endDateTime = new Date(toDate.value + 'T' + toTime.value + ":00");

    if (startDateTime > endDateTime) {
        const oldFromDate = fromDate.value;
        const oldFromTime = fromTime.value;
        fromDate.value = toDate.value;
        fromTime.value = toTime.value;
        toDate.value = oldFromDate;
        toTime.value = oldFromTime;
    }
}

async function loadAllDesks() {
    hideAllAlerts();
    fetch('https://matthiasbaldauf.com/wbdg23/desks').then(response => response.json()).then(data => {
        if (data.length > 0) {
            var allDesks = [];

            // sort data by id
            const sortedData = data.sort((a, b) => a.id - b.id);
            // put data in list
            const instances = data.map(item => allDesks.push(
                new DeskObject(item.id, item.name, item.available, item.address, item.price, item.lat, item.lon , item.comment)
            ));
            
            loadTable(allDesks);
            loadCombobox(allDesks);
        } else {
            console.error('Desks could not be loaded:', data);
            const alertContainer = document.getElementById('tableAlertContainer');
            showAlert(alertContainer, 'Server Error. Table could not be loaded. Please try again later');
        }
    })
    .catch(error => {
        console.error('Desks could not be loaded:', error);
        const alertContainer = document.getElementById('tableAlertContainer');
        showAlert(alertContainer, 'Server Error. Table could not be loaded. Please try again later');
    });
}


async function getDeskById(deskId) {
    return new Promise((resolve, reject) => {
        fetch('https://matthiasbaldauf.com/wbdg23/desks')
        .then(response => response.json()).then(data => {
            if (data.length > 0) {
                var allDesks = [];

                // sort data by id
                const sortedData = data.sort((a, b) => a.id - b.id);
                // put data in list
                const instances = data.map(item => allDesks.push(
                    new DeskObject(item.id, item.name, item.available, item.address, item.price, item.lat, item.lon , item.comment)
                ));
                
                allDesks.forEach(desk => {
                    if (desk.id == deskId){
                        resolve(desk);
                    }
                });
                reject();
            }
        })
        .catch(error => {
            console.error('Desks could not be loaded:', error);
            reject();
        });
    });
}

// loads the table
function loadTable(allDesks) {
    const datenTabelle = document.getElementById('deskTable');
    const tbody = datenTabelle.getElementsByTagName('tbody')[0];
    
    // clear table
    tbody.innerHTML = '';

    const currencyToggle = document.getElementById('currencyToggle');
  
    // add every desk in List into the table -> async because of currency conversion rate 
    allDesks.forEach(async desk => {

        // add row
        const row = document.createElement('tr');

        // add columns
        const idCell = document.createElement('td');
        const nameCell = document.createElement('td');
        const availableCell = document.createElement('td');     
        const addressCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const commentCell = document.createElement('td');
        const mapCell = document.createElement('td');
        // add content
        idCell.textContent = desk.id;
        nameCell.textContent = desk.name;
        addressCell.textContent = desk.address;

        if (currencyToggle.checked) {
            priceCell.textContent = await desk.getEuro() + ' EUR';
        } else {
            priceCell.textContent = desk.getChf() + ' CHF';
        }

        commentCell.textContent = desk.comment;
        
        // create maplink
        const mapLink = document.createElement('a');
        mapLink.innerText = "Map link";
        mapLink.href =  "https://www.google.com/maps/search/?api=1&query=" + desk.latitude + "," + desk.longitude+"";
        mapLink.target = "_blank";
        mapLink.classList.add("link-dark");
        mapCell.appendChild(mapLink);
        
        availableCell.innerHTML = desk.getIcon();
        row.classList.add(desk.getClass())

        // append row
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(availableCell);
        row.appendChild(addressCell);
        row.appendChild(priceCell);
        row.appendChild(commentCell);
        row.appendChild(mapCell);
        tbody.appendChild(row);
    });
}


// loads the combobox
function loadCombobox(allDesks) {
    const selectElement = document.getElementById("deskInput");

    allDesks.forEach(desk => {
        const option = document.createElement("option");
        option.value = desk.id;
        option.textContent = desk.name;
        selectElement.appendChild(option);
    });
}


// show for deskbookings
async function showDeskBookings() {
    hideAllAlerts();
    
    // get input values 
    const deskInput = document.getElementById("deskInput").value;
    const fromDateInput = document.getElementById("fromDateInput").value;
    const fromTimeInput = document.getElementById("fromTimeInput").value;
    const toDateInput = document.getElementById("toDateInput").value;
    const toTimeInput = document.getElementById("toTimeInput").value;
    const studidInput = document.getElementById("studIdInput").value;

    const startParam = fromDateInput + 'T' +  fromTimeInput + ":00";
    const endParam = toDateInput + 'T' + toTimeInput + ":00";

    const desk = await getDeskById(deskInput);
    displayDeskData(desk, startParam, endParam);
    const allReservations = await getReservationsFromAPI(desk.id, startParam, endParam, studidInput);
    loadReservations(allReservations);
}


// This method retrives all reservations in given period
async function getReservationsFromAPI(deskId, startParam, endParam, studid) {
    return new Promise((resolve, reject) => {
        const url = "https://matthiasbaldauf.com/wbdg23/bookings?deskid=" + encodeURIComponent(deskId)
        + "&start=" + encodeURIComponent(startParam) + "&end=" + encodeURIComponent(endParam)
        + "&studid=" + encodeURIComponent(studid);
    
        fetch(url).then(response => response.json()).then(data => {
            var allReservations = [];

            // TODO:replace mock with data !!!!
            let mock = [{
                "id": "16",
                "deskid": "2",
                "start": "2020-10-17T12:30:00+02:00",
                "end": "2020-10-16T21:30:00+02:00",
                "user": "Matthias",
                "email": "matthias.baldauf@ost.ch",
                "studid": "1234"
                }, {
                "id": "17",
                "deskid": "2",
                "start": "2020-10-16T20:30:00+02:00",
                "end": "2020-10-18T13:45:00+02:00",
                "user": "Alex",
                "email": "alex.alexson@ost.ch",
                "studid": "5678"}, {
                    "id": "18",
                    "deskid": "2",
                    "start": "2020-10-16T20:30:00+02:00",
                    "end": "2020-10-18T13:45:00+02:00",
                    "user": "Alex",
                    "email": "alex.alexson@ost.ch",
                    "studid": "5678"}];
            // sort by startdate a > b - a < b for dates
            const sortedData = data.sort((a, b) => (a.start > b.start) - (a.start < b.start));
            const instances = data.map(item => {
                const startParam = item.start;
                const endParam = item.end;
                allReservations.push(new ReservationObject(item.id, item.deskid, startParam.slice(0, -5), endParam.slice(0, -5), item.user, item.email, item.studid));
            });
            resolve(allReservations);
        }).catch(error => {
            // Handle any errors
            console.error('Error:', error);
            const alertContainer = document.getElementById('reservationAlertContainer');
            showAlert(alertContainer, 'Server Error. Resevations could not be loaded Please try again later');
            reject([]);
        });
    });
    
}

// Diplays the data of a desk
async function displayDeskData(desk, start, end) {
    displayLeafletMap(desk);
    deskTitle.textContent = "Desk: " + desk.name;
    bookname.textContent = desk.name;

    let costPerHour = "";
    let currency = "";
    if (document.getElementById('currencyToggle').checked) {
        costPerHour = await desk.getEuro();
        currency = " EUR";
    } else {
        costPerHour = desk.getChf();
        currency = " CHF";
    }
    deskCost.textContent = costPerHour + currency;

    // calc hours
    const dt1 = new Date(start);
    const dt2 = new Date(end);
    const timeDiff = dt2 - dt1;
    const hours = timeDiff / (1000 * 60 * 60);
    //round to next hour
    const roundedHours = Math.ceil(hours);
    bookTime.textContent = roundedHours;
    const costs = costPerHour * roundedHours;
    bookCost.textContent = costs.toFixed(2) + currency;
}


// display leaflet map
function displayLeafletMap(desk) {
    if (this.map != null) {
        this.map.remove();
    }

    this.map = L.map(mapContainer).setView([desk.latitude, desk.longitude], 13);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([desk.latitude, desk.longitude]).addTo(map).bindPopup(desk.name).openPopup();
}


function loadReservations(allReservations) {
    const reservationIntro = document.getElementById("reservationIntro");
    if (allReservations.length == 0) {
        reservationIntro.innerHTML ="The Desk is free during the selected period of time.<br>Click book now to book the desk.";
        reservationIntro.classList.add("text-success");
        reservationIntro.classList.remove("text-warning");
        displayBookingControl();
    } else if (allReservations.length > 12) {
        hideBookingControl();
        reservationIntro.innerHTML ="Too many reservations.<br>Please select a more specific time range";
        reservationIntro.classList.remove("text-success");
        reservationIntro.classList.add("text-warning");
    } else {
        hideBookingControl();
        reservationIntro.innerHTML = "All reservations in selected period:";
        reservationIntro.classList.remove("text-success");
        reservationIntro.classList.remove("text-warning");
        // add all reservations into the list
        allReservations.forEach(reservation => {
            const startDate = new Date(reservation.start);
            const endDate = new Date(reservation.end);
           
            const reservationElement = document.createElement('li');
            const reservationInfo = document.createElement('span');
            reservationInfo.textContent = `From: ${startDate.toLocaleDateString("de-DE")} ${startDate.getHours()}: ${startDate.getMinutes()}  - until: ${endDate.toLocaleDateString("de-DE")} ${endDate.getHours()}: ${endDate.getMinutes()}  by ${reservation.user}`;
            reservationElement.appendChild(reservationInfo);
            reservationIntro.appendChild(reservationElement);
        });
    }
}


// Displays the bookingcontrol -  data is passed so it can't be changed afterwards
function displayBookingControl() {
    const bookingControl = document.getElementById("bookingControlls");
    bookingControl.classList.remove("d-none");
    const bookingInfo = document.getElementById("BookingInfo");
    bookingInfo.classList.add("d-none")

    //get saved username and email
    if (localStorage.getItem('username') !== null && localStorage.getItem('email') !== null) {
        document.getElementById("nameInput").value = localStorage.getItem('username')  ;
        document.getElementById("emailInput").value = localStorage.getItem('email');
    }
}


// Displays the bookingcontrol -  data is passed so it can't be changed afterwards
function hideBookingControl() {
    const bookingControl = document.getElementById("bookingControlls");
    bookingControl.classList.add("d-none");
    const bookingInfo = document.getElementById("BookingInfo");
    bookingInfo.classList.remove("d-none");
}


// Books a desk
function bookDeskAPI() {
    hideAllAlerts();
    const deskInput = document.getElementById("deskInput").value;
    const fromDateInput = document.getElementById("fromDateInput").value;
    const fromTimeInput = document.getElementById("fromTimeInput").value;
    const toDateInput = document.getElementById("toDateInput").value;
    const toTimeInput = document.getElementById("toTimeInput").value;
    const studidInput = document.getElementById("studIdInput").value;
    const nameInput = document.getElementById("nameInput").value;
    const emailInput = document.getElementById("emailInput").value;
    const startParam = fromDateInput + 'T' + fromTimeInput + ":00";
    const endParam = toDateInput +'T'+ toTimeInput + ":00";

    const reservation = new ReservationObject(0, deskInput,  startParam, endParam, nameInput, emailInput, studidInput);

    // store username and password in localstorage
    localStorage.setItem('username', reservation.user);
    localStorage.setItem('email', reservation.email);
    
    const url = "https://matthiasbaldauf.com/wbdg23/booking";
    const data = new FormData();
    data.append("deskid", reservation.deskId);
    data.append("user", reservation.user);
    data.append("email", reservation.email);
    data.append("start", reservation.start);
    data.append("end", reservation.end);
    data.append("studid", reservation.studid);

    const options = {
        method: "POST",
        body: data,
        'Content-Type': 'application/json'
    }

    fetch(url, options).then(response => response.json()).then(async result => {
          if (result.success) {
            const alertContainer = document.getElementById('bookingAlertContainer');
            showSuccessAlert(alertContainer, 'Booking successful. Check out your reservation section.');
            
            //retrive reservationid since not returned on success :(
            reservation.id = await retriveReservationId(reservation);
            addReservation(reservation);
            hideBookingControl();
          } else {
            console.error('Desks could not be loaded:', result);
            const alertContainer = document.getElementById('bookingAlertContainer');
            showAlert(alertContainer, 'Booking failed. Please check your input.');
          }
        }).catch(error => {
          console.error('Error:', error);
          const alertContainer = document.getElementById('bookingAlertContainer');
          showAlert(alertContainer, 'Server Error. Please try again later');
        });
}


// Show an alert
function showAlert(alertContainer, message) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-danger', 'alert-dismissible', 'fade', 'show');
    
    const messageElement = document.createElement('span');
    messageElement.textContent = message;

    alertElement.appendChild(messageElement);
    alertContainer.appendChild(alertElement);
}


// Show an success alert
function showSuccessAlert(alertContainer, message) {
    const alertElement = document.createElement('div');
    alertElement.classList.add('alert', 'alert-success', 'alert-dismissible', 'fade', 'show');
    
    const messageElement = document.createElement('span');
    messageElement.textContent = message;

    alertElement.appendChild(messageElement);
    alertContainer.appendChild(alertElement);
}

// Hide all alerts
function hideAllAlerts() {
    const alertContainers = [];
    alertContainers.push(document.getElementById("cancelAlertContainer"));
    alertContainers.push(document.getElementById("tableAlertContainer"));
    alertContainers.push(document.getElementById("reservationAlertContainer"));
    alertContainers.push(document.getElementById("bookingAlertContainer"));

    alertContainers.forEach(alertContainer => {
        const existingAlert = alertContainer.querySelector('.alert');
        if (existingAlert) {
            alertContainer.removeChild(existingAlert);
        }
    });
}

// Loads reservations into your reservation sector
function loadMyReservations() {
    reservations = [];
    const reservationJson = JSON.parse(localStorage.getItem("myReservations"));
    if (reservationJson != null) {
        reservationJson.map(reservation => reservations.push(
            new ReservationObject(reservation.id, reservation.deskId, reservation.start, reservation.end, reservation.user, reservation.email, reservation.studid)
        ));
    } else {
        reservations = [];
    }
   
    return reservations;
    
}


// Retrieves with same booking the reservation-id since not return from booking
async function retriveReservationId(reservation) {
    const reservations = await getReservationsFromAPI(reservation.deskId, reservation.start, reservation.end, reservation.studid);
    
    let foundReservation = null;
    reservations.forEach(res => {
        if (res.start === reservation.start && res.end === reservation.end && res.deskId === reservation.deskId && res.user == reservation.user) {
            foundReservation = res;
        }
    });
    
    if (foundReservation != null && foundReservation.id > 0) {
        return foundReservation.id;
    } else {
        console.error("Could not find id");
        return 0;
    }
}


// Cancels a Reservation and refreshes list
function cancelReservation(reservation) {
    hideAllAlerts();
    const url = "https://matthiasbaldauf.com/wbdg23/booking?id=" + reservation.id +"&studid="+reservation.studid;
    const data = new FormData();
    data.append("id", reservation.id);
    data.append("studid", reservation.studid);
    
    const options = {
        method: "DELETE"
    }

    fetch(url, options).then(response => response.json()).then(async result => {
            if (result.success) {
                removeReservation(reservation);
            } else {
                console.error('Desks could not be loaded:', result);
                const alertContainer = document.getElementById('cancelAlertContainer');
                showAlert(alertContainer, 'Unknown reservation could not be canceled');
            }
        }).catch(error => {
          console.error('Error:', error);
          const alertContainer = document.getElementById('cancelAlertContainer');
          showAlert(alertContainer, 'Server Error. Please try again later');
        });
}


// Adds reservation into your reservation sector and localstorage
function addReservation(reservation) {
    const myReservations = loadMyReservations();
    myReservations.push(reservation);
    const reservationJson = JSON.stringify(myReservations);
    localStorage.setItem("myReservations", reservationJson);
    loadReservationList();
}

// Adds reservation into your reservation sector and localstorage
function removeReservation(reservation) {
    const myReservations = loadMyReservations();
    
    // backwards because delete while looping
    for (let i = myReservations.length - 1; i >= 0; i--) {
        if (myReservations[i].id === reservation.id) {
            myReservations.splice(i, 1);
        }
      }

    const reservationJson = JSON.stringify(myReservations);
    localStorage.setItem("myReservations", reservationJson);
    loadReservationList();
}


// Load list items dynamically
function loadReservationList() {
    const listContainer = document.getElementById('myReservationList');
    // clear list
    while (listContainer.firstChild) {
        listContainer.removeChild(listContainer.firstChild);
    }

    let reservations = loadMyReservations();

    // set reservation counter
    document.getElementById("reservationCounter").textContent = reservations.length;
    
    reservations.forEach(res => {
        const listItem = document.createElement('li');
        const listItemContent = document.createElement('div');
        listItemContent.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-0');
        const textItem = document.createElement('div');

        const listString = " <b>Deskid: " + res.deskId + "</b> From " + res.getStartDate() + " " + res.getStartTime() + " until " + res.getEndDate() + " " + res.getEndTime();
        textItem.innerHTML =  listString;
        textItem.classList.add("col-8")
        
        // Deletebutton
        const button = document.createElement("button");
        button.textContent = "Cancel";
        button.classList.add("btn", "btn-danger", "col-2", "float-end");
        button.addEventListener("click", function() {
            cancelReservation(res);
        });

        listItemContent.appendChild(textItem);
        listItemContent.appendChild(button);
        listItem.appendChild(listItemContent);
        listContainer.appendChild(listItem);
    });
}


// execute on load
document.addEventListener('DOMContentLoaded', init);
