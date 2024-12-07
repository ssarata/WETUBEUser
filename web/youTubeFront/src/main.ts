import './style.css'

interface Video{
  id :number,
  title: string ,
  description: string|null,
  mediaPath: string,
  status :Boolean ,
  userId :number,

}
function buidVideoCard(_video:Video): string {
  return`
          <div class="space-y-3 w-full">
              <div class="w-full bg-red-600 rounded-lg">
                  <video src="http://localhost:3000/videos/stream/${_video.id}" controls></video>
              </div>
              <div class="flex space-x-2">
                  <div>
                      <img src="./assets/logo.png" class="w-10 h-10 rounded-full bg-red-600" alt="">
                  </div>
                  <div class="flex flex-col">
                      <span class="font-semibold w-[200px]">${_video.title}</span>
                      <span class="text-gray-500">${_video.description} </span>
                      <span class="text-gray-500">355 vues il y a 23 minutes</span>
                  </div>
              </div>
          </div>
  
  
  `
  
}
function buidVideosCard(_videos : Video[]): string {
  let html:string="";
  for(const video of _videos){
    html+=buidVideoCard(video)
  }
  return html 
}

function insertCardVideo(_videos : Video[]): void  {
  const listeCard=document.getElementById("liste");
  if (listeCard!== null) {
    listeCard.innerHTML=buidVideosCard(_videos)
  }

 return
  
}


try {
  const response= await fetch('http://localhost:3000/videos')
  //console.log(response);
  if(response.status ===200){
    const videos : Video[] = await response.json()
    insertCardVideo(videos);
   // const result= await response.json()
    console.log(videos[0].description);
    
    console.log("succes");
  }
  else if(response.status===500){
    console.log("error");
    

  }
  

} catch (error) {
  console.error(error)
}