let customers = JSON.parse(localStorage.getItem("customers"))||[];
let leads = JSON.parse(localStorage.getItem("leads"))||[];

let editCustomerIndex = -1;
let editLeadIndex = -1;

/* LOGIN / LOGOUT */
function login(){
  if(username.value && password.value){
    loginBox.classList.add("hidden");
    crmPanel.classList.remove("hidden");
    render();
  }
}
function logout(){
  crmPanel.classList.add("hidden");
  loginBox.classList.remove("hidden");
}


/* NAVIGATION */
function show(id){
  document.querySelectorAll("section").forEach(s=>s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* CUSTOMERS */
function saveCustomer(){
  let c = { name:cName.value, email:cEmail.value, phone:cPhone.value, status:cStatus.value };
  if(editCustomerIndex === -1) customers.push(c);
  else { customers[editCustomerIndex]=c; editCustomerIndex=-1; }
  localStorage.setItem("customers", JSON.stringify(customers));
  clearCustomer();
  render();
}
function editCustomer(i){
  editCustomerIndex = i;
  cName.value = customers[i].name;
  cEmail.value = customers[i].email;
  cPhone.value = customers[i].phone;
  cStatus.value = customers[i].status;
}
function deleteCustomer(i){
  customers.splice(i,1);
  localStorage.setItem("customers", JSON.stringify(customers));
  render();
}

/* SEARCH FUNCTION - BY NAME */
function searchCustomer(){
  let searchVal = searchCustomer.value.toLowerCase();
  document.querySelectorAll("#customerTable tr").forEach((row, i)=>{
    let name = customers[i].name.toLowerCase();
    row.style.display = name.includes(searchVal) ? "" : "none";
  });
}

/* LEADS */
function saveLead(){
  let l = { name:lName.value, source:lSource.value, priority:lPriority.value };
  if(editLeadIndex===-1) leads.push(l);
  else { leads[editLeadIndex]=l; editLeadIndex=-1; }
  localStorage.setItem("leads", JSON.stringify(leads));
  clearLead();
  render();
}
function editLead(i){
  editLeadIndex=i;
  lName.value=leads[i].name;
  lSource.value=leads[i].source;
  lPriority.value=leads[i].priority;
}
function deleteLead(i){
  leads.splice(i,1);
  localStorage.setItem("leads", JSON.stringify(leads));
  render();
}

/* CLEAR FORM */
function clearCustomer(){ cName.value=""; cEmail.value=""; cPhone.value=""; }
function clearLead(){ lName.value=""; }

/* RENDER DASHBOARD & TABLES */
function render(){
  customerTable.innerHTML="";
  customers.forEach((c,i)=>{
    customerTable.innerHTML+=`<tr>
      <td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td><td>${c.status}</td>
      <td><button onclick="editCustomer(${i})">Edit</button>
          <button onclick="deleteCustomer(${i})">Delete</button></td>
    </tr>`;
  });

  leadTable.innerHTML="";
  leads.forEach((l,i)=>{
    leadTable.innerHTML+=`<tr>
      <td>${l.name}</td><td>${l.source}</td><td>${l.priority}</td>
      <td><button onclick="editLead(${i})">Edit</button>
          <button onclick="deleteLead(${i})">Delete</button></td>
    </tr>`;
  });

  totalCustomers.innerText = customers.length;
  activeCustomers.innerText = customers.filter(c=>c.status==="Active").length;
  totalLeads.innerText = leads.length;

  rCustomers.innerText = customers.length;
  rActive.innerText = customers.filter(c=>c.status==="Active").length;
  rLeads.innerText = leads.length;





}


