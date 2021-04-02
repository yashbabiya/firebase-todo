const list = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form')
//create elements

function rendercafe(doc)
{
    let li = document.createElement('li');
    let name= document.createElement('span');
    let city= document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id',doc.id);
    name.textContent = doc.data().title;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name)
    li.appendChild(city)
    li.appendChild(cross)
    list.appendChild(li);
    //del
    cross.addEventListener('click',(e)=>{
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafe').doc(id).delete()
    })
    //////
}


//static
// db.collection('cafe').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         rendercafe(doc)
//     });

// })
//dynamically
db.collection('cafe').onSnapshot((snapshot)=>{
    let changes = snapshot.docChanges();
    changes.forEach(change=>{
        if(change.type=='added')
        {
            rendercafe(change.doc)
        }
        else if(change.type == 'removed')
        {
            let li = document.querySelector('[data-id='+change.doc.id+']')
            list.removeChild(li);
        }
    })
})


///query.////////////
// db.collection('cafe').where('city','==','surat').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         rendercafe(doc)
//     });

// })

//orderby//////////
// db.collection('cafe').orderBy('city').get().then((snapshot)=>{
//     snapshot.docs.forEach(doc => {
//         rendercafe(doc)
//     });

// })

//add
form.addEventListener('submit',(e)=>{
    e.preventDefault()
   
   if(form.name.value!=''&&form.city.value)
   {
   


    db.collection('cafe').add({
        title:form.name.value,
        city:form.city.value
    })

    form.name.value='';
    form.city.value='';
}
else{
    alert("Fill Message and Subject!!");
}
})


