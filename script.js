const cardlist = [
    {id : 1, City: "Yangon", branchOne : "Haling Tsp",branchTwo : "Yankin Tsp", branchThree : "DownTown" },
    {id : 2, City: "Mandalay"},
    {id : 3, City: "NayPyiTaw"}
]

const cardContainer = document.getElementById("cardContainer")

const modal = (getlink,getID,getcontentID) => {

    const modal_link = document.getElementById(getlink)

    const modal_container = document.createElement("div")
    modal_container.classList.add("modal", "fade")
    modal_container.setAttribute("id",getID)
    modal_container.setAttribute("data-bs-backdrop","static")
    modal_container.setAttribute("data-bs-keyboard",false)
    modal_link.append(modal_container)

    const modal_dialog = document.createElement("div")
    modal_dialog.classList.add("modal-dialog","modal-dialog-centered")
    modal_container.append(modal_dialog)

    const modal_content = document.createElement("div")
    modal_content.classList.add("modal-content")
    modal_content.setAttribute("id","content"+getcontentID)
    modal_dialog.append(modal_content)
    
    
}

const header = (getID) => {
    const content = document.getElementById("content"+getID)
    const modal_header = document.createElement("div")
    modal_header.classList.add("modal-header")
    content.append(modal_header)
    const close = document.createElement("button")
    close.classList.add("btn","btn-close")
    close.setAttribute("data-bs-dismiss","modal")
    modal_header.append(close)
}

const body = (getID,getmapID) => {

    const content = document.getElementById("content"+getID)

    const modal_body = document.createElement("div")
    modal_body.classList.add("modal-body")
    content.append(modal_body)
    
    const mapID = document.createElement("div")
    mapID.setAttribute("id","map"+getmapID)
    mapID.classList.add("mapStyle")
    modal_body.append(mapID)

}

const footer = (getID,getLocation) => {
    const content = document.getElementById("content"+getID)

    const modal_footer = document.createElement("div")
    modal_footer.classList.add("modal-footer")
    content.append(modal_footer)

    const info = document.createElement("div")
    info.append("#This is location of our ShowRoom " + getLocation)
    info.classList.add("infoStyle")
    

    modal_footer.append(info)
    
}

async function initMap(getmapID, getlat, getlng) {
    const {Map} = await google.maps.importLibrary("maps")

    const map =  new Map(document.getElementById("map"+getmapID),{
        center : { lat : getlat, lng : getlng},
        zoom: 15
    })

    const marker = new google.maps.Marker({
        position : { lat : getlat, lng : getlng},
        Animation : google.maps.Animation.DROP
        
    })
    marker.setMap(map)

    marker.addListener("click", () => {
        map.setZoom(8)
    })
    
}

for(const card of cardlist){
   
    const cardDiv = document.createElement("div")
    cardDiv.classList.add("col-2","cardStyle")

    const imgDiv = document.createElement("img")
    imgDiv.setAttribute("src","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnO2kWFBrDIcIObCbyCgpgYJuoTUiZoTrvHNR9Aplcpk1w9foERUjKxPwalpqqIU_PpKw&usqp=CAU")

    const titleDiv = document.createElement("h3")
    titleDiv.append("Car ShowRoom : MaliBu" )
    titleDiv.classList.add("titleStyle")

    const branchDiv = document.createElement("h5")
    branchDiv.append("Branch : " + card.City)
    branchDiv.classList.add("BranchStyle")

    const location = document.createElement("div")
    location.innerText = 'Location'
    // location.append("Location")
    location.classList.add("locationStyle")
    location.setAttribute("id","location"+card.id)
    location.setAttribute("data-bs-target","#modalID"+card.id)
    location.setAttribute("data-bs-toggle","modal")
    
    cardDiv.append(imgDiv,titleDiv,branchDiv,location)
    cardContainer.append(cardDiv)

    modal("location"+card.id,"modalID"+card.id,card.id)
    header(card.id)
    body(card.id,card.id)
    footer(card.id,card.City)

    if(card.City === "Yangon"){
        initMap(card.id,16.8409,96.1735)
    } else if ( card.City === "Mandalay"){
        initMap(card.id,21.9588,96.0891)
    } else if ( card.City === "NayPyiTaw"){
        initMap(card.id,19.7633,96.0785)
    }
   
}

