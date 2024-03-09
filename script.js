let addCard = document.getElementById("addCard");
let todoContainer = document.getElementById("toDo");

addCard.addEventListener("click", crateCard);

function crateCard() {

  let card = document.createElement("div");
  card.className = "card";
  card.id="card-"+Date.now()
  todoContainer.append(card);
  
  card.setAttribute("contenteditable", "true");
  card.setAttribute("data-text","Enter your Task")

  card.setAttribute("Draggable","true")
  card.focus();

  card.addEventListener("blur", (eventdetails) => {
    let targetCard = eventdetails.target;
    if (!targetCard.innerHTML.trim()) {
      targetCard.remove();
    }
  })
  card.addEventListener("dragstart",(eventdetails)=> {
    let cardDragged=eventdetails.target
    eventdetails.dataTransfer.setData("text/plain", cardDragged.id)
    cardDragged.style.opacity="0.5"
  })
  card.addEventListener("dragend",(eventdetails)=> {
    let cardDragged=eventdetails.target
    cardDragged.style.opacity=""
  })

  let dropEvent=["dragover","dragenter","drop"]
  dropEvent.forEach(dropping =>{
    document.querySelectorAll(".column").forEach(column =>{
        column.addEventListener(dropping,(eventDetails)=>{
            eventDetails.preventDefault()

            if(dropping == "drop"){
                const cardId = eventDetails.dataTransfer.getData("text/plain")
                const card=document.getElementById(cardId)
                column.append(card)
            }
        })
    })
  })

  /*this approach is stopped this is for selecting element is in which column
  const select = document.createElement("select");
  select.innerHTML = `
    <option value="toDo">todo</option>
    <option value="inProgress">In Progress</option>
    <option value="done">Done</option>

    `;
  cardDiv.append(select);
  select.addEventListener("change", (eventdetails) => {
    let status = eventdetails.target.value;
    document.getElementById(status).append(card);
  });*/

}
