document.getElementById('btn').addEventListener('click',function(){
	let inputData=document.getElementById('songName').value;
     fetch(`https://api.lyrics.ovh/suggest/${inputData}`)
	  .then(res=>res.json())
	  .then(data=>{
	     getSongInformation(data);
	    })
	})

 function getSongInformation(info){
 	      const list=document.getElementById('allSongList');
    	 	for (let i = 0; i <10; i++)
    	 	{
    	 		 const name=info.data[i];
    	 		 const p=document.createElement('p');
    	 		 p.innerHTML=`
                  <div id="song-part" class="song">
                       <div class="box box1">
                        <h4><span id="inside">Song Name: </span><strong>${name.title}</strong></h4>
                        <h4><span id="inside">Artist Name: </span><strong>${name.artist.name}</strong></h4>
                        <h4><span id="inside">Album: </span><strong>${name.album.title}</strong></h4>
                        <h4><span id="inside">World Rank: </span><strong>${name.rank}</strong></h4>
                       </div>
                       <div ><button class="btn btn-success" onclick="getLyrics('${name.artist.name}','${name.title}')">Get Lyrics</button></div>
                  </div>
    	 		 `
    	 		 list.appendChild(p);
    	 	}

}
function getLyrics(artist,title) {
  const songLyrics=document.getElementById('lyrics');
  const headTitle=document.getElementById('head');
  headTitle.innerText=title+'-'+artist;
	fetch(`https://api.lyrics.ovh/v1/${artist}/${title}/`)
	.then(res=>res.json())
	.then(data=>{
      songLyrics.innerText=data.lyrics;
	})
}
