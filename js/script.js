const searchMobile =() => {
  const searchField = document.getElementById('search-field');
  
  const searchText = searchField.value;
  // console.log(searchText);
  
  searchMobileDetails(searchText);
  // clear data 
  document.getElementById('search-field').value='';
}

// load data 
const searchMobileDetails =(searchText)=>{
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}
  `;
   fetch(url)
   .then(res =>  res.json())
   .then(data => displayMobile(data.data));
}
// searchMobileDetails("Apple");
const displayMobile = (mobile)=>{
  // console.log(mobile);
  
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML='';
  
  mobile.forEach(mobiles =>{
    console.log(mobiles);
    const div = document.createElement('div');
    div.classList.add('col')
    div.innerHTML=`<div class="card h-100">
    <img src="${mobiles.image}" class=" w-75 h-75  card-img-top img-fluid" alt="...">
    <div class="card-body">
      <h5 class="card-title">${mobiles.phone_name}</h5>
      <h5 class="card-title">${mobiles.brand}</h5>
     </div>
    <div class="text-center text-success">
   <button onclick="loadMobileData('${mobiles.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
    </div>
    `;
    searchResult.appendChild(div);
  });
}
const loadMobileData = (id) => {
  console.log(id);
  const url =`https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showMobileDetails(data.data));
}
const showMobileDetails = (allInfo)=>{
  console.log(allInfo);
  const modalTitle = document.getElementById('mobileNameModal');
  modalTitle.innerText=allInfo.name;

  const mobileResult = document.getElementById('mobile-details');
  mobileResult.innerHTML='';
  
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
  <img src="${allInfo.image}" class="w-50 h-50 card-img-top img-fluid" alt=".....">
  <div class="card-body">
  <p>Release Date: ${allInfo.releaseDate ? allInfo.releaseDate : 'No Release Date Found'}</p>
  <p>Storage: ${allInfo.mainFeatures ? allInfo.mainFeatures.storage : 'No Storage Information '}</p>
    <p>Display: ${allInfo.mainFeatures ? allInfo.mainFeatures.displaySize : 'No Display Information '}</p>
    <p>Sensor: ${allInfo.mainFeatures.sensors ? allInfo.mainFeatures.sensors[0] : 'no sensor'}</p>
    <p>Others: ${allInfo.others ? allInfo.others.Bluetooth : 'No Bluetooth Information'}</p>
    </div>
  `;
  mobileResult.appendChild(div);

}