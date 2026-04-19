let users = JSON.parse(localStorage.getItem("users")) || [];

let isAdmin = false;


// ADMIN LOGIN
function adminLogin(){

let pass = prompt("Enter Admin Password");

if(pass === "Ayush@7667"){

isAdmin = true;

alert("Admin Mode Activated");

renderSeats();

}else{

alert("Wrong Password");

}

}



// RENDER SEATS
function renderSeats(){

let container = document.getElementById("seatContainer");

container.innerHTML="";

for(let i=1;i<=60;i++){

let shift1 = users.find(u=>u.seat==i && u.shift=="10AM-2PM");

let shift2 = users.find(u=>u.seat==i && u.shift=="2PM-6PM");

let div=document.createElement("div");

div.className="seat";


div.innerHTML=`

Seat ${i}

<hr>

<b>10AM-2PM</b><br>

${
shift1
? (isAdmin
   ? shift1.name + "<br>" + shift1.phone + "<br>" + shift1.date + " " + (shift1.paid ? "✅":"❌")
   : "<span style='color:green;'>Booked</span>")
: "<span style='color:blue;'>Available</span>"
}

<br>

<b>2PM-6PM</b><br>

${
shift2
? (isAdmin
   ? shift2.name + "<br>" + shift2.phone + "<br>" + shift2.date + " " + (shift2.paid ? "✅":"❌")
   : "<span style='color:green;'>Booked</span>")
: "<span style='color:blue;'>Available</span>"
}

<br><br>


${isAdmin && shift1 ? `
<button onclick="paySeat(${i},'10AM-2PM')">Pay</button>
<button onclick="deleteSeat(${i},'10AM-2PM')">Delete</button>
` : ""}


${isAdmin && shift2 ? `
<button onclick="paySeat(${i},'2PM-6PM')">Pay</button>
<button onclick="deleteSeat(${i},'2PM-6PM')">Delete</button>
` : ""}


`;

container.appendChild(div);

}

}



// ADD USER
function addUser(){

// 🔒 Only Admin Allowed
if(!isAdmin){
alert("Only Admin Can Book Seat");
return;
}

let name=document.getElementById("name").value;

let phone=document.getElementById("phone").value;

let seat=document.getElementById("seat").value;

let date=document.getElementById("date").value;

let shift=document.getElementById("shift").value;


if(seat>60 || seat<1){

alert("Seat must be between 1-60");

return;

}


if(shift=="Double Shift"){

let s1 = users.find(u=>u.seat==seat && u.shift=="10AM-2PM");

let s2 = users.find(u=>u.seat==seat && u.shift=="2PM-6PM");


if(s1 || s2){

alert("Seat already booked in one shift");

return;

}


users.push({

name:name,
phone:phone,
seat:seat,
date:date,
shift:"10AM-2PM",
paid:false

});


users.push({

name:name,
phone:phone,
seat:seat,
date:date,
shift:"2PM-6PM",
paid:false

});


}else{


let exist = users.find(u=>u.seat==seat && u.shift==shift);


if(exist){

alert("Seat already booked in this shift");

return;

}


users.push({

name:name,
phone:phone,
seat:seat,
date:date,
shift:shift,
paid:false

});


}


localStorage.setItem("users",JSON.stringify(users));

renderSeats();

}

// PAY SEAT
function paySeat(seat,shift){

let user = users.find(u=>u.seat==seat && u.shift==shift);

user.paid=true;

localStorage.setItem("users",JSON.stringify(users));

renderSeats();

}



// DELETE SEAT
function deleteSeat(seat,shift){

users = users.filter(u=> !(u.seat==seat && u.shift==shift));

localStorage.setItem("users",JSON.stringify(users));

renderSeats();

}


renderSeats();